/* Jonas Karg 2018 */

const Modular = {
    data: {
        wrapper: document.createElement("div"),
        ERRORS: {
            00: "Unknown Error",
            01: "Syntax Error",
            10: "Invalid/Missing configuration",
            11: "Invalid insert",
            12: "Invalid component",
            13: "Invalid component-instance",
            14: "Invalid element-content",
            15: "Invalid passed-in value"
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

            return new Error(`(Modular)${type}:${error}\n${position}\n`);
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

        toHtml(el) {
            Modular.data.wrapper.innerHTML = null;
            Modular.data.wrapper.appendChild(el);
            return Modular.data.wrapper.innerHTML;
        },

        getVariable(name) {
            if (!/[^0-9]\w*/.test(name)) return undefined;
            let value = window[name];

            // fallback for let and const variables (sadly no other way)
            if (!value) {
                try {
                    value = eval(name);
                } catch (e) {
                    return undefined;
                }
            }

            return value;
        },

        getValue(value) {
            if (value.constructor === String || value.constructor === Number) return value;
            if (value.constructor === Object) {
                if (value.type === "modular-element") return Modular.core.renderElement(value);
                else throw Modular.core.err(15, "core.getValue");
            }
            throw Modular.core.err(15, "Value must be of type String, Number or Object", "core.getValue");
        },

        renderElement(context) {
            if (!context.constructor === Object || context.type !== "modular-element") throw Modular.core.err(
                10, "Invalid element.", "Must be of type Object.", "Create with Modular.el()", "core.renderElement");

            let rendered;
            let tagVal;

            if (context.tag[0] == context.tag[0].toUpperCase()) {
                tagVal = Modular.core.getVariable(context.tag);
            }

            if (tagVal) {
                if (tagVal.constructor === Function) {
                    rendered = Modular.core.getValue(tagVal(context.attributes || {}));
                    if (!rendered) throw Modular.core.err(12, "Component-functions must return a value.", "core.renderElement");
                } else rendered = Modular.core.getValue(tagVal);

            } else {
                if (context.innerHTML) {
                    rendered = context.innerHTML.map(el => {
                        return Modular.core.tag(context.tag, Modular.core.getValue(el), context.attributes);
                    }).join("");
                } else rendered = "";
            }

            return rendered;
        },

        tag(elementTag, elementInnerHTML, elementArguments) {
            let elArgsConverted = "";
            if (elementArguments) elArgsConverted = " " + Object.entries(elementArguments).map(entry => `${entry[0]}="${entry[1]}"`).join(" ");
            element = `<${elementTag}${elArgsConverted}>${elementInnerHTML}</${elementTag}>`;
    
            return element;
        }
    },

    el() {
        let func_args = Array.from(arguments);
        if (func_args <= 0) throw Modular.core.err(10, "Missing arguments.", "el");
        if (func_args[0].constructor !== String) throw Modular.core.err(10, "Invalid tag-name", "el");
        if (/[^\w]+/g.test(func_args[0])) throw Modular.core.err(10, "Invalid tag-name", "el");

        let elementTag = func_args[0];
        let elementAttributes;
        let elementInnerHTML;

        func_args.shift();
        func_args.map(arg => {
            if (arg.constructor === Array) elementInnerHTML = arg;
            else if (arg.constructor === String || arg.constructor === Number) elementInnerHTML = [arg];
            else if (arg.constructor === Object) elementAttributes = arg;
            else throw Modular.core.err(10, "Invalid argument.", `Type: ${typeof arg}`, `Value: ${arg}`, "el");
        });

        return {
            type: "modular-element",
            tag: elementTag,
            attributes: elementAttributes,
            innerHTML: elementInnerHTML
        };
    },

    render(element, container) {
        if (!element || !container) throw Modular.core.err(
            10, "Missing element or container.", "render");

        if (!Modular.core.isElement(container)) throw Modular.core.err(
            10, "Invalid container",
            "Container must be an HTML-element.",
            "render");

        if (!element.constructor === Object || element.type !== "modular-element") throw Modular.core.err(
            10, "Invalid element.", "Must be of type Object.", "Create with Modular.el()", "render");

        container.innerHTML = Modular.core.renderElement(element);
    }
};