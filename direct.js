// Jonas Karg 2018

const DirectJs = {
    data: {
        initElement: undefined,
        insertElement: undefined,
        loadedScripts: undefined,
        expectedScripts: undefined,
        allScriptsLoaded: undefined,
    },

    core: {
        insert(d1, d2, context, insertFunc) {
            let occurs, result;
            occurs = context.split(d1);
            result = occurs.shift();
            if ((context.match(d2) || []).length <= 0) return context;

            for (let part of occurs) {
                let [key, rest, overflow] = part.split(d2);
                let temp = insertFunc(key);
                if (temp) result += insertFunc(key) + rest;
                else result += `${d1}${key}${d2}${rest}`;

            } return result;
        },

        loadData(path, callback) {
            DirectJs.data.expectedScripts++;
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
                    DirectJs.data.loadedScripts++;
                }
            };

            xhttp.open("GET", path, true);
            xhttp.send();
        },

        addScript(code) {
            let tempInsertElement = DirectJs.data.insertElement.cloneNode();
            tempInsertElement.innerHTML = code;
            document.head.appendChild(tempInsertElement);
        },

        init() {
            DirectJs.data.loadedScripts = 0;
            DirectJs.data.expectedScripts = 0;
            DirectJs.data.allScriptsLoaded = false;
            DirectJs.data.initElement = document.currentScript;
            let scriptElements = Array.from(document.getElementsByTagName("script"));
            DirectJs.data.insertElement = document.createElement("script");
            DirectJs.data.insertElement.setAttribute("type", "application/javascript");

            scriptElements.map(tag => {
                if (tag == DirectJs.data.initElement || tag.getAttribute("type") != "direct-js") return;
                let src = tag.getAttribute("src");
                if (src) DirectJs.core.loadData(src, code => DirectJs.core.addScript(DirectJs.core.compile(code)));
                else if (tag.innerText) DirectJs.core.addScript(
                    DirectJs.core.compile(DirectJs.core.compile(DirectJs.core.compile(tag.innerText, "'"), "\""), "\`"));
                else console.warn(`(Parser): Found a "useless" <script type="direct-js">-tag!`);
                tag.remove();
            });

            DirectJs.core.fileWatcher();
        },

        compile(code, splitter) {
            let parsed = "";
            let sectors = code.split(splitter);
            if (sectors.length % 2 != 1) throw new Error("(DirectJs):\nCould not compile.\nQuote was opened but not closed.\n");

            for (let i = 0; i < sectors.length; i++) {
                if (i % 2 == 0) {
                    // Multiline
                    sectors[i] = sectors[i].replace(/=\s*<div( +.*)*>/gim, match => `=\`${match.slice(1)}`);
                    sectors[i] = sectors[i].replace(/\(\s*<div( +.*)*>/gim, match => `(\`${match.slice(1)}`);
                    sectors[i] = sectors[i].replace(/return\s*<div( +.*)*>/gim, match => `return\`${match.slice(6)}`);
                    sectors[i] = sectors[i].replace(/=>\s*<div( +.*)*>/gim, match => `=>\`${match.slice(2)}`);

                    sectors[i] = sectors[i].replace(/<\/div\s*>\s*;/gim, match => `${match.slice(0, -1)}\`;`);
                    sectors[i] = sectors[i].replace(/<\/div\s*>\s*\)/gim, match => `${match.slice(0, -1)}\`)`);
                    sectors[i] = sectors[i].replace(/<\/div\s*>\s*return/gim, match => `${match.slice(0, -6).trim()}\`\nreturn`);
                    sectors[i] = sectors[i].replace(/<\/div\s*>\s*}/gim, match => `${match.slice(0, -1)}\`}`);

                    // Singleline
                    sectors[i] = sectors[i].replace(/=\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)/gim, match => `=\`${match.slice(1)}\``);
                    sectors[i] = sectors[i].replace(/=>\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)/gim, match => `=>\`${match.slice(2)}\``);
                    sectors[i] = sectors[i].replace(/return\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)/gim, match => `return\`${match.slice(6)}\``);
                    sectors[i] = sectors[i].replace(/,\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*\)/gim, match => `,\`${match.slice(1, -1)}\`)`);
                    sectors[i] = sectors[i].replace(/:\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*}/gim, match => `:\`${match.slice(1, -1)}\`}`);
                    sectors[i] = sectors[i].replace(/:\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*,/gim, match => `:\`${match.slice(1)}\`,`);
                    sectors[i] = sectors[i].replace(/\(\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)/gim, match => `(\`${match.slice(1)}\``);

                    sectors[i] = sectors[i].replace(/\[\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*\]/gim, match => `[\`${match.slice(1, -1)}\`]`);
                    sectors[i] = sectors[i].replace(/\[\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*,/gim, match => `[\`${match.slice(1, -1)}\`,`);
                    sectors[i] = sectors[i].replace(/,\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*,/gim, match => `,\`${match.slice(1, -1)}\`,`);
                    sectors[i] = sectors[i].replace(/,\s*(<\w*( +.*)*>.*<\/\w*( +.*)*>|<\w*( +.*)*\/>)\s*\]/gim, match => `,\`${match.slice(1, -1)}\`]`);
                }
            }

            parsed = sectors.join(splitter);

            if (parsed.endsWith(">")) parsed += "\`";
            // parsed = `document.currentScript.remove();${parsed}`;

            return parsed;
        },

        fileWatcher() {
            if (DirectJs.data.loadedScripts == DirectJs.data.expectedScripts || DirectJs.data.expectedScripts.length == 0) {
                DirectJs.data.allScriptsLoaded = true;
            }
            else window.requestAnimationFrame(DirectJs.core.fileWatcher);
        }
    }
}

DirectJs.core.init();