// Jonas Karg 2018

const Cssx = {
    data: {
        insertElement: undefined,
        bundeled: undefined,
    },

    core: {
        insert(d1, d2, context, insertFunc) {
            let occurs, result;
            occurs = context.split(d1);
            result = occurs.shift();

            for (let part of occurs) {
                let [key, rest, overflow] = part.split(d2);
                let temp = insertFunc(key);
                if (temp) result += insertFunc(key) + rest;
                else result += `${d1}${key}${d2}${rest}`;
            }

            return result;
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

        addStyle(style) {
            Cssx.data.insertElement.innerHTML += `${style}\n`;
        },

        init() {
            Cssx.data.initElement = document.currentScript;
            let linkElements = Array.from(document.getElementsByTagName("link"));
            let styleElements = Array.from(document.getElementsByTagName("style"));

            Cssx.data.bundeled = "";
            Cssx.data.insertElement = document.createElement("style");
            document.head.appendChild(Cssx.data.insertElement);

            linkElements.map(tag => {
                if (tag.getAttribute("type") != "cssx") return;
                let href = tag.getAttribute("href");
                if (href) Cssx.core.loadData(href, style => Cssx.data.bundeled += style);
                else console.warn(`(Parser): Found a "useless" <link type="cssx">-tag!`);
                tag.remove();
            });

            styleElements.map(tag => {
                if (tag.getAttribute("type") != "cssx") return;
                let style = tag.innerHTML;
                if (style) Cssx.core.addStyle(Cssx.data.bundeled += style);
                else console.warn(`(Parser): Found a "useless" <style type="cssx">-tag!`);
                tag.remove();
            });

            Cssx.core.updater();
        },

        parse(style) {
            let parsed = Cssx.core.insert("js(", ")", style, key => eval(key));
            parsed = `\n${parsed}\n`;

            return parsed;
        },

        updater() {
            Cssx.data.insertElement.innerHTML = Cssx.core.parse(Cssx.data.bundeled);
            window.requestAnimationFrame(Cssx.core.updater);
        },

        fileWatcher() {
            if (!DirectJs.data.allScriptsLoaded) window.requestAnimationFrame(Cssx.core.fileWatcher);
            else Cssx.core.init();
        }
    }
}

if (typeof DirectJs == "object") Cssx.core.fileWatcher();
else Cssx.core.init();