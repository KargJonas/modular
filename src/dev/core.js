// Creates an error-string with modular-format
function err(i) {
    if (!Modular.data.errors) return "Error";
    let args = Modular.data.errors[i];
    let type = `[${args[0]}]`;
    args.shift();

    const position = (args.length > 1) ? `\n@ Modular.${args.pop()}()\n` : "";
    const error = args.map(arg => `\n--> ${arg}\n`).join("");

    return `🚨 (Modular): ${type}\n${error}${position}`;
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

// Transforms a style object into style that only styles only a single element
function makeStyle(obj, id) {
    const declarations = Object.entries(obj);
    let style = "";
    let pseudos = [];

    declarations.map(declaration => {
        if (declaration[0][0] === ":" && id !== undefined) {
            pseudos.push(`[data-modular-id="${id}"]${declaration[0]}{${makeStyle(declaration[1])}}`);
        } else style += `${declaration[0]}:${declaration[1]};`
    });

    if (id) return `[data-modular-id="${id}"]{${style}}${pseudos.join("")}`;
    return style;
}

// Transforms different types of style into global style
function getStyle(val, id) {
    let style = val;

    if (typeof style === "function") style = style();
    if (typeof style === "object") {
        const rules = Object.entries(style);

        if (!rules.length) {
            console.warn(Modular.core.err(6));
            return "";
        }

        // If style-object contains css rules ("css-rules"):
        if (typeof rules[0][1] === "object") {
            style = "";

            if (rules.length === 0) {
                console.warn(Modular.core.err(6));
                return;
            }

            rules.map(rule => {
                style += `[data-modular-id="${id}"]>${rule[0]}{${makeStyle(rule[1])}}`;
            });

            // If no sub-selectors/rules detected, apply the style directly to the element:
        } else style = makeStyle(style, id);
    }

    if (typeof style !== "string") console.warn(Modular.core.err(6));
    return style;
}

// Creates DOM-elements
function makeEl(tagName, attributes, content) {
    const element = document.createElement(tagName);

    if (attributes && attributes.style) {
        Modular.data.elCount++;
        Modular.data.tempStyle += Modular.core.getStyle(attributes.style, Modular.data.elCount);
        delete attributes.style;
    }

    Object.assign(element, attributes);
    element.setAttribute("data-modular-id", Modular.data.elCount);

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