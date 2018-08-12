import errors from "./errors";
import el from "./el";
import { err, getAttr, getHtml, getStyle, makeEl } from "./core.js";
import { getBinding, setBinding, listenBinding, scan, render } from "./direct-methods";

const Modular = {
    data: {
        bindings: {},
        renderedEvent: new Event("mRendered"),
        onRender: new Event("mOnRender"),
        errors: errors
    },

    getBinding: getBinding,
    setBinding: setBinding,
    listenBinding: listenBinding,

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

Object.defineProperty(window, "Modular", {
    value: Modular,
    writable: false,
    enumerable: true,
    configurable: false
});

// Development-build warning
console.warn(Modular.core.err(0));