// Set the value of a binding
function setBinding(binding, value) {
    if (!Modular.data.bindings[binding]) {
        Modular.data.bindings[binding] = {
            elements: [],
            lastValue: undefined,
            value: undefined,
            listeners: []
        };
    }
    
    Modular.data.bindings[binding].lastValue = Modular.data.bindings[binding].value;
    Modular.data.bindings[binding].value = value;
    Modular.data.bindings[binding].elements.map(element => {
        element.element[element.value] = Modular.data.bindings[binding].value;
    });
}

// Get the value of a binding
function getBinding(binding) {
    if (!Modular.data.bindings[binding]) return undefined;
    return Modular.data.bindings[binding].value;
}

// Add a listener to a binding
function listenBinding(binding, func) {
    if (!Modular.data.bindings[binding]) Modular.setBinding(binding, undefined);
    Modular.data.bindings[binding].listeners.push(func);
}

// Converts a (html) string into a Modular-element
function scan(val) {
    if (typeof val !== "string") throw new Error(Modular.core.err(4));
    let wrapper = document.createElement("div");
    wrapper.innerHTML = val.trim();

    const res = Array.from(wrapper.childNodes).map(node => {
        if (node instanceof Element) {
            return Modular.el(node.tagName, Modular.core.getAttr(node.attributes), Modular.scan(node.innerHTML));
        } else return node.textContent;
    });

    return res;
}

// The entry-point for rendering stuff
function render(element, _container) {
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

export {
    getBinding,
    setBinding,
    listenBinding,
    scan,
    render
};