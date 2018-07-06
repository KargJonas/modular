// Jonas Karg 2018

const DirectJs = {
    data: {
        initElement: undefined,
        insertElement: undefined,
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
            var xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    callback(this.responseText);
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
            DirectJs.data.initElement = document.currentScript;
            let scriptElements = Array.from(document.getElementsByTagName("script"));
            DirectJs.data.insertElement = document.createElement("script");
            DirectJs.data.insertElement.setAttribute("type", "application/javascript");

            scriptElements.map(tag => {
                if (tag == DirectJs.data.initElement || tag.getAttribute("type") != "direct-js") return;
                let src = tag.getAttribute("src");
                if (src) DirectJs.core.loadData(src, code => DirectJs.core.addScript(DirectJs.core.parse(code)));
                else if (tag.innerText) DirectJs.core.addScript(DirectJs.core.parse(tag.innerText));
                else console.warn(`(Parser): Found a "useless" <script type="direct-js">-tag!`);
                tag.remove();
            });
        },

        parse(code) {
            let parsed = code;

            parsed = parsed.replace(/"(<\w.*>\n*.*\n*<\/\s*\w.*>|<\w.*\w*\/>)"/gim, `$1`);
            parsed = parsed.replace(/'(<\w.*>\n*.*\n*<\/\s*\w.*>|<\w.*\w*\/>)'/gim, `$1`);
            parsed = parsed.replace(/`(<\w.*>\n*.*\n*<\/\s*\w.*>|<\w.*\w*\/>)`/gim, `$1`);
            parsed = parsed.replace(/(<\w.*>\n*.*\n*<\/\s*\w.*>|<\w.*\w*\/>)/gim, `\`$1\``);

            return parsed;
        }
    }
}

DirectJs.core.init();