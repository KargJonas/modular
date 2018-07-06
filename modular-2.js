/* Jonas Karg 2018 */

// Regex to match html tags' start-tag: <\s*\w.*?>

const Modular = {
    data: {
        wrapper: document.createElement("div"),
        ERRORS: {
            00: "Unknown Error",
            01: "Syntax Error",
            10: "Invalid/Missing configuration",
            11: "Invalid insert",
            12: "Invalid conponent",
            13: "Invalid instance"
        }
    },

    core: {
        err() {
            let args = Array.from(arguments);
            let type = "";
            let position = "";
            let error;

            if (args[0].constructor === Number) {
                type = ` [${Modular.data.ERRORS[args[0]]}]`;
                args.shift();
            }

            if (args.length > 1) {
                position = `\n--> @ Modular.${args.pop()}()`;
            }

            error = args.map(arg => {
                return `\n--> ${arg}`;
            });

            return new Error(`(Modular)${type}:${error}${position}\n`);
        },

        info() {
            let args = Array.from(arguments);
            let inf = "Info: (Modular):\n";

            for (let i = 0; i < arguments.length - 1; i++) inf += `--> ${args[i]}\n`;
            inf += `\n--> @ ${args[args.length - 1]}()`;

            return inf;
        },

        isElement(obj) {
            try { return obj instanceof HTMLElement }
            catch (e) {
                return (typeof obj === "object") &&
                    (obj.nodeType === 1) && (typeof obj.style === "object") &&
                    (typeof obj.ownerDocument === "object");
            }
        },

        getProps(arr) {
            let obj = {};

            arr.map(el => {
                let temp = el.split("=");
                let key = temp[0];
                let val = temp[1];
                if (val[0] == "\"" || val[0] == "'") val = val.substring(1, val.length - 1);
                else if (val[0] == "{") val = eval(val.substring(1, val.length - 1));
                obj[key] = val;
            });

            return obj;
        },

        insert(d1, d2, context, insertFunc) {
            let occurs, result;

            occurs = context.split(d1);
            result = occurs.shift();

            if ((context.match(d2) || []).length <= 0) return context;

            for (let part of occurs) {
                let [key, rest, overflow] = part.split(d2);

                if (!key || rest === undefined || overflow) {
                    result += `${d1}${part}`;

                } else {
                    let temp = insertFunc(key);
                    if (temp) result += insertFunc(key) + rest;
                    else result += `${d1}${key}${d2}${rest}`;
                }

            } return result;
        },

        toHtml(el) {
            Modular.data.wrapper.innerHTML = null;
            Modular.data.wrapper.appendChild(el);
            return Modular.data.wrapper.innerHTML;
        },

        renderContext(context) {
            return Modular.core.insert("<", "/>", context, key => {
                let parts = key.replace(/\s\s+/g, " ").trim().split(" ");
                let tag = parts[0];
                let props = (parts.length > 1 ? Modular.core.getProps(parts.slice(1)) : {});
                let rendered;

                if (!window.hasOwnProperty(tag)) return false;

                if (Modular.core.isElement(window[tag])) {
                    rendered = Modular.core.toHtml(window[tag]);

                } else if (window[tag].constructor === Function) {
                    window[tag].props = props;
                    rendered = window[tag](props);

                    // !!
                    if (rendered.constructor === Array && rendered[0].startsWith("<") && rendered[rendered.length - 1].endsWith(">")) {
                        rendered = rendered.join("");
                    };

                    if (!(rendered.constructor === String || rendered.constructor === Number || Modular.core.isElement(rendered))) throw Modular.core.err(
                        11, "A Component -function must return a value of type [String], [Number] or [HTML-element]!",
                        "Arrays containing elements will be joined.",
                        "Modular.core.renderContext");

                } else if (window[tag].constructor === String || window[tag].constructor === Number) {
                    rendered = window[tag];

                } else throw Modular.core.err(
                    12, "Inserted elements must be of type [Function], [String], [Number] or [HTML-element]!",
                    `core.${arguments.callee.name}`);

                rendered = rendered.toString().replace("~{", "__modular_curved_bracket_open__")
                    .replace("~}", "__modular_curved_bracket_close__");

                rendered = Modular.core.insert("{", "}", rendered, key => eval(key));
                rendered = rendered.replace("__modular_curved_bracket_open__", "{")
                    .replace("__modular_curved_bracket_close__", "}");

                return Modular.core.renderContext(rendered);
            });
        }
    },

    render() {
        let args = Array.from(arguments);
        let elements;
        let container;

        if (arguments.length === 0) throw Modular.core.err(
            10, "Empty render.", "render");

        if (args.length === 1 && args[0].constructor === Object) {
            let conf = arguments[0];
            elements = conf.elements;
            container = arguments[0].container;

        } else {
            container = arguments[arguments.length - 1];
            args.pop();
            elements = args;
        }

        if (!elements || !container) throw Modular.core.err(
            10, "Missing elements or container.", "render");

        if (container.constructor === String) container = document.querySelector(container)
        container.innerHTML += Modular.core.renderContext(elements.join(""));
    }
};