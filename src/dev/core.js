// Creates an error-string with modular-format
function err(i) {
    let args = Modular.data.errors[i];
    let type = `[${args[0]}]`;
    args.shift();

    const position = (args.length > 1) ? `\n@ Modular.${args.pop()}()\n` : "";
    const error = args.map(arg => `\n--> ${arg}\n`).join("");

    return `🚨 (Modular-2): ${type}\n${error}${position}`;
}

// Transforms "impure" objects into something modular can work with
function getAttr(attributes) {
    const obj = {};

    Array.from(attributes).map(attribute => {
        obj[attribute.name] = attribute.value;
    });

    return obj;
}

// Transforming given values into DOM-elements
function getHtml(value) {
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
}

// Transforms different types of style into inline
function getStyle(val) {
    let style = val;
    if (typeof style === "function") style = style();
    if (typeof style === "object") {
        const wrapper = document.createElement("div");
        Object.assign(wrapper.style, style);
        style = wrapper.getAttribute("style");
    }

    if (typeof style !== "string") throw new Error(Modular.core.err(6));
    return style;
}

// Creates DOM-elements
function makeEl(tagName, attributes, content) {
    const element = document.createElement(tagName);

    if (attributes && attributes.style) attributes.style = Modular.core.getStyle(attributes.style);
    Object.assign(element, attributes);

    if (content) element.appendChild(content);
    return element;
}

export {
    err,
    getAttr,
    getHtml,
    getStyle,
    makeEl
};