// Creates a modular-element
function el() {
    // Getting data.
    let args = Array.from(arguments);
    const tag = args[0].toLowerCase();
    const attributes = args[1] || {};
    args.splice(0, 2);
    if (args.length === 1) args = args[0];

    // Checking if all mandatory tags are availabile
    if (typeof tag !== "string") throw new Error(Modular.core.err(5));
    if (attributes.__config__ !== undefined) throw Error(Modular.core.err(1));

    // Setting up the configuration
    attributes.__config__ = {
        type: "modular-element",
        tag: tag,
        content: args,
        bindings: attributes.$bind,
        element: null
    };

    // "renders" the current modular-element and returns it
    attributes.__config__.render = () => {
        // "Cleaning" the attributes of configuration-propertys
        const cleanAttr = {};
        Object.assign(cleanAttr, attributes || {});
        delete cleanAttr.__config__;
        delete cleanAttr.$bind;

        // Creating a DOM-element
        attributes.__config__.element = Modular.core.makeEl(
            attributes.__config__.tag,
            cleanAttr,
            Modular.core.getHtml(attributes.__config__.content)
        );

        // Only add the binding logic if there was a binding-object passed in
        if (typeof attributes.__config__.bindings === "object") {
            attributes.__config__.change = () => {
                // Updating all of the element's bindings
                Object.entries(attributes.__config__.bindings).map(entry => {
                    let newVal = attributes.__config__.element[entry[0]];
                    if (newVal == "true") newVal = true;
                    else if (newVal == "false") newVal = false;

                    Modular.setBinding(entry[1], newVal);
                    // Checking if there actually were changes
                    if (Modular.data.bindings[entry[1]].value !== Modular.data.bindings[entry[1]].lastValue || typeof Modular.data.bindings[entry[1]].value === "object" || typeof Modular.data.bindings[entry[1]].value === "array") {
                        // Running all listeners
                        Modular.data.bindings[entry[1]].listeners.map(listener => {
                            listener(Modular.getBinding(entry[1]))
                        });
                    }
                });
            };

            Object.entries(attributes.__config__.bindings).map(entry => {
                // Creating a binding if the binding-name doesn't exist
                if (!Modular.data.bindings[entry[1]]) {
                    Modular.data.bindings[entry[1]] = {
                        elements: [], // The elements bound to the binding
                        lastValue: undefined,
                        value: undefined, // The value of the binding
                        listeners: [] // The functions that will run be run when the binding changes
                    };
                }

                // Adding a reference of the current element to the binding
                // so that we can update it's propertys when a change occurs.
                Modular.data.bindings[entry[1]].elements.push({
                    element: attributes.__config__.element, // The element
                    value: entry[0] // The attribute that has to change
                });
            });

            // Adding all relevant eventlisteners to the before created DOM-element
            attributes.__config__.element.addEventListener("mouseover", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("mouseout", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("click", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("change", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("keyup", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("keydown", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("scroll", e => attributes.__config__.change(e));
            attributes.__config__.element.addEventListener("contextmenu", e => attributes.__config__.change(e));
            attributes.__config__.change();
        }

        // Returning the rendered element
        return attributes.__config__.element;
    }

    // Returning the modular element
    return attributes;
}

export default el;