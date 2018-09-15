import { data } from "./data";

// Creates an error-string with modular-format
function err(i) {
    if (!data.errors) return "🚨 (Modular): ";
    let args = data.errors[i];
    let type = `[${args[0]}]`;
    args.shift();

    const position = (args.length > 1) ? `\n@ ${args.pop()}()\n` : "";
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
    else if (value instanceof Function) return getHtml(value());
    else if (value instanceof Array) {
        if (!value.length) return getHtml("");
        // if (value[0] instanceof Object && value[0].__config__.value[0].type === "modular-converted-array") {
        //     value.shift();
        //     return value;
        // } else {
        //     const res = value.map(arrEl => getHtml(arrEl));
        //     res.unshift({
        //         __config__: {
        //             type: "modular-converted-array"
        //         }
        //     });
        //     return res;
        // }
        const el = document.createElement("div");
        value.map(arrEl => el.appendChild(getHtml(arrEl)));
        return el;
    } else if (value.constructor === String || value.constructor === Number) return document.createTextNode(value);
    else if (value instanceof Object) {
        if (value.__config__ && value.__config__.type !== "modular-element") throw err(2);
        return value.__config__.render();
    } else throw err(3);
}

// Transforms a style object into style that only applies to a single element
function makeStyle(obj, id) {
    const declarations = Object.entries(obj);
    let style = "";
    let pseudos = [];

    declarations.map(declaration => {
        // If a css-decalaration starts with a colon, create a pseudo class
        if (declaration[0][1] === ":" && id !== undefined) {
            pseudos.push(`[data-modular-id="${id}"]${declaration[0]}{${makeStyle(declaration[1])}}`);
        } else style += `${declaration[0]}:${declaration[1]};`
    });

    if (id) return `[data-modular-id="${id}"]{${style}}${pseudos.join("")}`;
    return style;
}

// Transforms different types of style into global style
function getStyle(val, id) {
    let style = val;

    if (style.constructor === String) {
        return `[data-modular-id="${id}"]{${style}}`;
    }

    if (style instanceof Function) style = style();
    if (style instanceof Object) {
        const rules = Object.entries(style);

        if (!rules.length) {
            console.warn(err(6));
            return "";
        }

        // If style-object contains css rules:
        if (rules[0][1] instanceof Object) {
            style = "";

            if (rules.length === 0) {
                console.warn(err(6));
                return;
            }

            rules.map(rule => {
                style += `[data-modular-id="${id}"]>${rule[0]}{${makeStyle(rule[1])}}`;
            });

        } else style = makeStyle(style, id);
    }

    if (style.constructor === String) return style;
    console.warn(err(6));
    return;
}

// Creates DOM-elements
function makeEl(tagName, attributes, content) {
    const element = document.createElement(tagName);

    if (attributes && attributes.style) {
        data.elCount++;
        data.tempStyle += getStyle(attributes.style, data.elCount);
        delete attributes.style;
    }

    Object.assign(element, attributes);
    element.setAttribute("data-modular-id", data.elCount);

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