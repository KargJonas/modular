import { data } from "./data";
import { err, makeEl, getHtml } from "./core";
import { setBinding, getBinding } from "./methods";

// Creates a modular-element
function el() {

  // Extracting tag and attributes from the arguments
  let args = Array.from(arguments),
    tag = args[0].toLowerCase(),
    attributes = args[1] || {};

  // Remove everything unnecessary from the arguments array
  args.splice(0, 2);
  if (args.length === 1) args = args[0];

  // Checking if all mandatory tags are available
  if (typeof tag !== "string") throw new Error(err(5));
  if (attributes.__config__ !== undefined) throw Error(err(1));

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
    const cleanAttr = {};

    // "Cleaning" the attributes of configuration-properties
    Object.assign(cleanAttr, attributes || {});
    delete cleanAttr.__config__;
    delete cleanAttr.$bind;

    // Creating a DOM-element
    attributes.__config__.element = makeEl(
      attributes.__config__.tag,
      cleanAttr,
      getHtml(attributes.__config__.content)
    );

    // Only add the binding logic if there was a binding-object passed in
    if (attributes.__config__.bindings instanceof Object) {
      attributes.__config__.change = () => {

        // Updating all of the element's bindings
        Object.entries(attributes.__config__.bindings).map(entry => {
          let newVal = attributes.__config__.element[entry[0]];

          if (newVal == "true") {
            newVal = true;
          }

          else if (newVal == "false") {
            newVal = false;
          }

          setBinding(entry[1], newVal);

          // Checking if there actually were changes
          if (data.bindings[entry[1]].value !== data.bindings[entry[1]].lastValue || data.bindings[entry[1]].value instanceof Object || data.bindings[entry[1]].value instanceof Array) {

            // Running all listeners
            data.bindings[entry[1]].listeners.map(listener => {
              listener(getBinding(entry[1]))
            });
          }
        });
      };

      // Mapping through all of the element's bindings
      Object.entries(attributes.__config__.bindings).map(entry => {

        // Creating a binding if the binding-name doesn't exist
        if (!data.bindings[entry[1]]) {
          data.bindings[entry[1]] = {

            // The elements bound to the binding
            elements: [],
            lastValue: undefined,

            // The value of the binding
            value: undefined,

            // The functions that will run be run when the binding changes
            listeners: []
          };
        }

        // Adding a reference of the current element to the binding
        // so that we can update it's properties when a change occurs.
        data.bindings[entry[1]].elements.push({

          // The element
          element: attributes.__config__.element,

          // The attribute that has to change
          value: entry[0]
        });
      });

      // Adding all relevant event-listeners to the before created DOM-element
      attributes.__config__.element.addEventListener("mouseover", e => attributes.__config__.change(e));
      attributes.__config__.element.addEventListener("mouseout", e => attributes.__config__.change(e));
      attributes.__config__.element.addEventListener("click", e => attributes.__config__.change(e));
      attributes.__config__.element.addEventListener("change", e => attributes.__config__.change(e));
      attributes.__config__.element.addEventListener("keyup", e => attributes.__config__.change(e));
      attributes.__config__.element.addEventListener("keydown", e => attributes.__config__.change(e));
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