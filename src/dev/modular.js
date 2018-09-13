import { err, getAttr, getHtml, getInlineStyle, makeEl } from "./core.js";
import { getBinding, setBinding, listenBinding, scan, render } from "./methods";
import errors from "./errors";
import el from "./el";
import router from "./router";

const Modular = {
    // Events, bindings and error-messages
    data: {
        bindings: {},
        preRender: new Event("prerender"),
        postRender: new Event("postrender"),
        errors: errors
    },

    // The core
    core: {
        err: err,
        getAttr: getAttr,
        getHtml: getHtml,
        getInlineStyle: getInlineStyle,
        makeEl: makeEl
    },

    // Methods
    getBinding: getBinding,
    setBinding: setBinding,
    listenBinding: listenBinding,
    scan: scan,
    el: el,
    render: render,
    router: router
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