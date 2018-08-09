// Jonas Karg 2018
"use strict";

const Modular = {
    data: {
        bindings: {},
        renderedEvent: new Event("mRendered"),
        onRender: new Event("mOnRender"),
        ERRORS: {
            0: ["Info",
                "You are using the development build of Modular 2. Make sure to use the production build when deploying this app."],

            1: ["Invalid Attribute",
                "Unable to create Modular element.",
                "Invalid attribute.",
                `The attribute "__config__" is reserved for Modular.`,
                `The invalid caller might look something like this: Modular.el("[...]", { __config__: [...] }, [...]);`,
                "el"],

            2: ["Invalid Input",
                "An object, which is not a Modular-element, was passed into Modular.core.getHtml().",
                "( Modular.core.getHtml() was called by Modular.render() )",
                "Modular does not know how how to handle this.",
                "core.getHtml"],

            3: ["Invalid Input",
                "A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().",
                "( Modular.core.getHtml() was called by Modular.render() )",
                "This error might be caused by a invalid child-element in Modular.render() or Modular.el().",
                "Modular does not know how how to handle this.",
                "core.getHtml"],

            4: ["Invalid Input",
                "Unable to scan.",
                "A value, which is not a [String] was passed into Modular.scan().",
                "Modular.scan() expects a [String].",
                "scan"],

            5: ["Missing Input",
                "Unable to create Modular element.",
                "Missing tag.",
                "( The tag of a Modular-element is the first attribute of Modular.el() )",
                "el"],

            6: ["Invalid Input",
                "Unable to convert given value to inline style.",
                "A value passed into Modular.core.getStyle() could not be converted into inline style.",
                "Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Funtion] (returning an object that contains valid style)",
                "core.getStyle",
                "el"],

            7: ["Invalid Input",
                "Unable to render.",
                "Modular.render() is missing a root-element or a container-element",
                "( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) [Function] (which returns any of the mentioned) )",
                "A container-element has to be a valid DOM-element, which can be found in your HTML-Document or a [String] containing a valid CSS-selector",
                "render"],

            8: ["Invalid Input",
                "Unable to render",
                "Modular.render() recieved an invalid container-element.",
                "A container-element has to be a DOM-element, or a [String], containing a valid CSS-selector.",
                "render"]
        }
    },

    core: {
        err(i) {
            let args = Modular.data.ERRORS[i];
            let type = `[${args[0]}]`;
            args.shift();

            const position = (args.length > 1) ? `\n@ Modular.${args.pop()}()` : "";
            const error = args.map(arg => `\n--> ${arg}\n`).join("");

            return `🚨 (Modular): ${type}\n${error}\n${position}\n`;
        },

        isElement(obj) {
            try { return obj instanceof HTMLElement }
            catch (e) {
                return (typeof obj === "object") && (obj.nodeType === 1) && (typeof obj.style === "object") && (typeof obj.ownerDocument === "object");
            }
        },

        getAttr(attributes) {
            const obj = {};

            Array.from(attributes).map(attribute => {
                obj[attribute.name] = attribute.value;
            });

            return obj;
        },

        getVariable(name) {
            if (!/[^0-9]\w*/.test(name)) return undefined;
            let value = window[name];

            if (!value) {
                try { value = eval(name) }
                catch (e) { return undefined }
            }

            return value;
        },

        getHtml(value, parent) {
            if (!value) return null;
            else if (value instanceof Element) parent.appendChild(value);
            else if (value.constructor === Function) Modular.core.getHtml(value(), parent);
            else if (value.constructor === Array) value.map(arrEl => Modular.core.getHtml(arrEl, parent));
            else if (value.constructor === String || value.constructor === Number) {
                parent.appendChild(document.createTextNode(value));
            }
            else if (value.constructor === Object) {
                if (value.__config__ && value.__config__.type === "modular-element") {
                    parent.appendChild(value.__config__.element);
                } else throw Modular.core.err(2);
            } else throw Modular.core.err(3);
        },

        getStyle(val) {
            let style = val;
            if (typeof style === "function") style = style();
            if (typeof style === "object") {
                const wrapper = document.createElement("div");
                Object.assign(wrapper.style, style);
                style = wrapper.getAttribute("style");
            }

            if (typeof style !== "string") throw new Error(Modular.core.err(6));
            return style;
        },

        makeEl(tagName, _attributes, content) {
            const element = document.createElement(tagName);
            const attributes = {};
            Object.assign(attributes, _attributes || {});
            delete attributes.__config__;

            if (attributes && attributes.style) {
                attributes.style = Modular.core.getStyle(attributes.style);
            }

            Object.assign(element, attributes);
            element.innerHTML = content || "";
            return element;
        }
    },

    el() {
        const args = Array.from(arguments);
        const tag = args[0];
        const attributes = args[1] || {};
        args.splice(0, 2);

        if (typeof tag !== "string") throw new Error(Modular.core.err(5));
        if (attributes.__config__ !== undefined) throw Error(Modular.core.err(1));

        attributes.__config__ = {
            type: "modular-element",
            tag: tag,
            content: args,
            binding: attributes.$bind,
            value: attributes.value || args,
            element: undefined
        };

        delete attributes.$bind;
        const binding = attributes.__config__.binding;
        attributes.__config__.element = Modular.core.makeEl(attributes.__config__.tag, attributes, Modular.core.getHtml(attributes.__config__.content));
        
        if (binding) {
            attributes.__config__.element.addEventListener("click", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("change", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("hover", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("keyup", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("keydown", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("scroll", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("mouseover", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("mouseout", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("contextmenu", e => attributes.__config__.change(e));
        }

        if (binding) {
            if (!Modular.data.bindings[binding]) {
                Modular.data.bindings[binding] = {
                    value: attributes.__config__.value,
                    elements: [],
                    listeners: [],
                    change(e) {
                        const val = Modular.data.bindings[binding].value;
                        Modular.data.bindings[binding].listeners.map(listener => {
                            listener(value, e);
                        });

                        Modular.data.bindings[binding].elements.map(element => {
                            if (element.tagName == "INPUT") element.value = val;
                            else element.innerHTML = val;
                        });
                    }
                };
            }

            attributes.__config__.change = (e) => {
                attributes.__config__.value = attributes.__config__.element.value || attributes.__config__.element.innerHTML;
                Modular.data.bindings[binding].value = attributes.__config__.value;
                Modular.data.bindings[binding].change();
            }

            Modular.data.bindings[binding].elements.push(attributes.__config__.element);
            Modular.data.bindings[binding].change();
        }

        return attributes;
    },

    scan(val) {
        if (typeof val !== "string") throw new Error(Modular.data.ERRORS[4]);
        let isOnlyText = true;
        let wrapper = document.createElement("div");
        wrapper.innerHTML = val;

        const res = Array.from(wrapper.childNodes).map(node => {
            if (node instanceof Element) {
                isOnlyText = false;
                return Modular.el(node.tagName, Modular.core.getAttr(node.attributes), Modular.scan(node.innerHTML));
            } else return node.textContent;
        });

        if (!res.length) return null;
        if (res.length === 1) return res[0];
        if (isOnlyText) return res.join("");
        return res;
    },

    render(element, _container) {
        window.dispatchEvent(Modular.data.onRender);
        if (!element || !_container) throw new Error(Modular.core.err(7));
        let container;

        if (typeof _container === "string") {
            container = document.querySelector(_container);
        } else container = _container;

        if (!Modular.core.isElement(container)) throw Modular.core.err(8);
        Modular.core.getHtml(element, container);
        window.dispatchEvent(Modular.data.renderedEvent);
    },

    getBinding(binding) {
        return Modular.data.bindings[binding].value;
    },

    setBinding(binding, value) {
        Modular.data.bindings[binding].value = value;
        Modular.data.bindings[binding].change();
    },

    listenBinding(binding, listener) {
        Modular.data.bindings[binding].listeners.push(listener);
    }
};

console.warn(Modular.core.err(0));