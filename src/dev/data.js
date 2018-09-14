import errors from "./errors";

const data = {
    bindings: {},
    preRender: new Event("prerender"),
    postRender: new Event("postrender"),
    errors: errors,
    tempStyle: "",
    elCount: 0
};

export { data };