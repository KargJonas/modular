// Jonas Karg 2018
"use strict";

const Modular = {
    data: {
        bindings: {},
        renderedEvent: new Event("mRendered"),
        onRender: new Event("mOnRender")
    },

    getBinding(_binding) {
        const binding = Modular.data.bindings[_binding];
        if (binding) return binding.value;

        return undefined;
    },

    setBinding(_binding, value) {
        if (!Modular.data.bindings[_binding]) {
            Modular.data.bindings[_binding] = {
                value: undefined,
                elements: [],
                listeners: [],
                change(e) {
                    Modular.data.bindings[_binding].listeners.map(listener => {
                        listener(Modular.data.bindings[_binding].value, e);
                    });
                }
            };
        }

        Modular.data.bindings[_binding].value = value;
        Modular.data.bindings[_binding].change();
    },

    listenBinding(binding, listener) {
        if (!Modular.data.bindings[binding]) Modular.setBinding(binding, undefined);
        Modular.data.bindings[binding].listeners.push(listener);
    },

    core: {
        getAttr(attributes) {
            const obj = {};

            Array.from(attributes).map(attribute => {
                obj[attribute.name] = attribute.value;
            });

            return obj;
        },

        getHtml(value, parent) {
            if (!value) return null;
            let el;
            if (value instanceof Element) el = value;
            else if (value.constructor === Function) el = Modular.core.getHtml(value());
            else if (value.constructor === Array) {
                el = document.createElement("div");
                value.map(arrEl => {
                    el.appendChild(Modular.core.getHtml(arrEl));
                });
            } else if (value.constructor === String || value.constructor === Number) el = document.createTextNode(value);
            else if (value.constructor === Object) {
                if (value.__config__ && value.__config__.type === "modular-element") {
                    el = value.__config__.element;
                } else throw Modular.core.err(2);
            } else throw Modular.core.err(3);

            if (!parent) return el;
            parent.appendChild(el);
        },

        getStyle(val) {
            let style = val;
            if (typeof style === "function") style = style();
            if (typeof style === "object") {
                const wrapper = document.createElement("div");
                Object.assign(wrapper.style, style);
                style = wrapper.getAttribute("style");
            }

            return style;
        },

        makeEl(tagName, _attributes, content) {
            const element = document.createElement(tagName);
            const attributes = {};
            Object.assign(attributes, _attributes || {});

            delete attributes.__config__;
            if (attributes && attributes.style) attributes.style = Modular.core.getStyle(attributes.style);
            Object.assign(element, attributes);

            if (content) element.appendChild(content);
            return element;
        }
    },

    el() {
        let args = Array.from(arguments);
        const tag = args[0];
        const attributes = args[1] || {};
        args.splice(0, 2);
        if (args.length === 1) args = args[0];

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

            Modular.setBinding(binding, attributes.__config__.value);
            Modular.listenBinding(binding, value => {
                Modular.data.bindings[binding].elements.map(element => {
                    if (element.tagName == "INPUT") element.value = value;
                    else element.innerHTML = value;
                });
            });

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

    render(element, _container) {
        window.dispatchEvent(Modular.data.onRender);
        let container;

        if (typeof _container === "string") {
            container = document.querySelector(_container);
        } else container = _container;

        if (!(container instanceof Element)) throw Modular.core.err(8);
        Modular.core.getHtml(element, container);
        window.dispatchEvent(Modular.data.renderedEvent);
    }
};