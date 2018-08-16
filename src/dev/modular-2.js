import { err, getAttr, getHtml, getStyle, makeEl } from "./core.js";
import { getBinding, setBinding, listenBinding, scan, render } from "./methods";
import errors from "./errors";
import el from "./el";

const Modular = {
    // Events, bindings and error-messages
    data: {
        bindings: {},
        renderedEvent: new Event("prerender"),
        onRender: new Event("postrender"),
        errors: errors || undefined
    },

    // The core
    core: {
        err: err,
        getAttr: getAttr,
        getHtml: getHtml,
        getStyle: getStyle,
        makeEl: makeEl
    },

    // Methods
    getBinding: getBinding,
    setBinding: setBinding,
    listenBinding: listenBinding,
    scan: scan,
    el: el,
    render: render
};

// Making Modular a global constant
Object.defineProperty(window, "Modular", {
    value: Modular,
    writable: false,
    enumerable: true,
    configurable: false
});

// Development-build warning
if (Modular.data.errors) console.warn(Modular.core.err(0));