// Jonas Karg 2018
"use strict";

const Modular = {
    data: {
        bindings: {},
        renderedEvent: new Event("mRendered"),
        onRender: new Event("mOnRender"),
        ERRORS: {
            0: ["Info",
                "You are using the development build of Modular-2. Make sure to use the production build when deploying this app."],

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

            4: ["Invalid or missing Input",
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
                "( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) or [Function] (which returns any of the mentioned) )",
                "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
                "Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.",
                "render"],

            8: ["Invalid Input",
                "Unable to render",
                "Modular.render() recieved an invalid container-element.",
                "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
                "Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.",
                "render"]
        }
    },

    core: {
        // Creates an error-string with modular-format
        err(i) {
            let args = Modular.data.ERRORS[i];
            let type = `[${args[0]}]`;
            args.shift();

            const position = (args.length > 1) ? `\n@ Modular.${args.pop()}()` : "";
            const error = args.map(arg => `\n--> ${arg}\n`).join("");

            return `🚨 (Modular-2): ${type}\n${error}\n${position}\n`;
        },

        // Transforms "impure" objects into something modular can work with
        getAttr(attributes) {
            const obj = {};

            Array.from(attributes).map(attribute => {
                obj[attribute.name] = attribute.value;
            });

            return obj;
        },

        // Transforming given values into DOM-elements
        getHtml(value) {
            value = value || "";

            if (value instanceof Element) return value;
            else if (value.constructor === Function) return Modular.core.getHtml(value());
            else if (value.constructor === Array) {
                if (!value.length) return Modular.core.getHtml("");
                const el = document.createElement("div");
                value.map(arrEl => el.appendChild(Modular.core.getHtml(arrEl)));
                return el;
            } else if (value.constructor === String || value.constructor === Number) return document.createTextNode(value);
            else if (value.constructor === Object) {
                if (value.__config__ && value.__config__.type !== "modular-element") throw Modular.core.err(2);
                return value.__config__.render();
            } else throw Modular.core.err(3);
        },

        // Transforms different types of style into inline
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

        // Creates DOM-elements
        makeEl(tagName, attributes, content) {
            const element = document.createElement(tagName);

            if (attributes && attributes.style) attributes.style = Modular.core.getStyle(attributes.style);
            Object.assign(element, attributes);

            if (content) element.appendChild(content);
            return element;
        }
    },

    // Creates a modular-element
    el() {
        // Getting data.
        let args = Array.from(arguments);
        const tag = args[0].toLowerCase();
        const attributes = args[1] || {};
        args.splice(0, 2);
        if (args.length === 1) args = args[0];

        // Checking if all mandatory tags are availabile
        if (typeof tag !== "string") throw new Error(Modular.core.err(5));
        if (attributes.__config__ !== undefined) throw Error(Modular.core.err(1));

        // Setting up the configuration
        attributes.__config__ = {
            type: "modular-element",
            tag: tag,
            content: args,
            bindings: attributes.$bind,
            element: null
        };

        // "renders" the current modular-element and returns it
        attributes.__config__.render = () => {
            // "Cleaning" the attributes of configuration-propertys
            const cleanAttr = {};
            Object.assign(cleanAttr, attributes || {});
            delete cleanAttr.__config__;
            delete cleanAttr.$bind;

            // Creating a DOM-element
            attributes.__config__.element = Modular.core.makeEl(
                attributes.__config__.tag,
                cleanAttr,
                Modular.core.getHtml(attributes.__config__.content)
            );

            // Only add the binding logic if there was a binding-object passed in
            if (typeof attributes.__config__.bindings === "object") {
                Object.entries(attributes.__config__.bindings).map(entry => {
                    // Sreating a binding if not already existing
                    if (!Modular.data.bindings[entry[1]]) {
                        Modular.data.bindings[entry[1]] = {
                            elements: [],
                            value: undefined
                        };
                    }

                    // Adding a reference of the current element to the binding
                    // so that we can update it's propertys when a change occurs.
                    Modular.data.bindings[entry[1]].elements.push({
                        element: attributes.__config__.element, // The element
                        value: entry[0] // The attribute that has to change
                    });
                });

                attributes.__config__.change = () => {
                    // Updating all of the element's bindings
                    Object.entries(attributes.__config__.bindings).map(entry => {
                        Modular.data.bindings[entry[1]].value = attributes.__config__.element[entry[0]];
                        Modular.data.bindings[entry[1]].elements.map(element => {
                            switch (Modular.data.bindings[entry[1]].value) {
                                case "true":
                                case "on":
                                    element.element[element.value] = true;
                                    break;

                                case "false":
                                case "off":
                                    element.element[element.value] = false;
                                    break;                                    

                                default:
                                    element.element[element.value] = Modular.data.bindings[entry[1]].value;
                                    break;
                            }
                        });
                    });
                };

                // Adding all relevant eventlisteners to the before created DOM-element
                attributes.__config__.element.addEventListener("click", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("change", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("hover", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("keyup", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("keydown", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("scroll", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("mouseover", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("mouseout", e => attributes.__config__.change(e));
                attributes.__config__.element.addEventListener("contextmenu", e => attributes.__config__.change(e));
                attributes.__config__.change();
            }

            // Returning the rendered element
            return attributes.__config__.element;
        }

        // Returning the modular element
        return attributes;
    },

    // Converts a (html) string into a Modular-element
    scan(val) {
        if (typeof val !== "string") throw new Error(Modular.data.ERRORS[4]);
        let wrapper = document.createElement("div");
        wrapper.innerHTML = val.trim();

        const res = Array.from(wrapper.childNodes).map(node => {
            if (node instanceof Element) {
                isOnlyText = false;
                return Modular.el(node.tagName, Modular.core.getAttr(node.attributes), Modular.scan(node.innerHTML));
            } else return node.textContent;
        });

        return res;
    },

    // The entry-point for rednering stuff
    render(element, _container) {
        window.dispatchEvent(Modular.data.onRender);
        if (!element || !_container) throw new Error(Modular.core.err(7));
        let container;

        if (typeof _container === "string") {
            container = document.querySelector(_container);
        } else container = _container;

        if (!(container instanceof Element)) throw Modular.core.err(8);
        container.innerHTML = "";
        container.appendChild(Modular.core.getHtml(element));
        window.dispatchEvent(Modular.data.renderedEvent);
    }
};

// Development-build warning
console.warn(Modular.core.err(0));