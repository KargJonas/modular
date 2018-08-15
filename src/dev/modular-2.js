import { err, getAttr, getHtml, getStyle, makeEl } from "./core.js";
import { getBinding, setBinding, listenBinding, scan, render } from "./direct-methods";
import errors from "./errors";
import el from "./el";

const Modular = {
    // Events, bindings and error-messages
    data: {
        bindings: {},
        renderedEvent: new Event("mRendered"),
        onRender: new Event("mOnRender"),
        errors: errors
    },

    // Declaration up here because the core relys on it
    getBinding: getBinding,
    setBinding: setBinding,
    listenBinding: listenBinding,

    // The core
    core: {
        err: err,
        getAttr: getAttr,
        getHtml: getHtml,
        getStyle: getStyle,
        makeEl: makeEl
    },

    scan: scan,
    el: el,
    render: render
};

// Making Modular global.
Object.defineProperty(window, "Modular", {
    value: Modular,
    writable: false,
    enumerable: true,
    configurable: false
});

// Development-build warning
if (Modular.data.errors) console.warn(Modular.core.err(0));