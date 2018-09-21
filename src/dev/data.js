import errors from "./errors";

const data = {
  // All bindings (their names) and the associated elements
  bindings: {},

  // The render events
  preRender: new Event( "prerender" ),
  postRender: new Event( "postrender" ),

  // The error object containing all errors
  errors: errors,

  // A variable to temporarily store style
  // so multiple functions can access it
  tempStyle: [],

  // An element that is used to add the style
  styleElement: document.createElement( "style" ),

  // A counter used to generate element-IDs
  tempElCount: []
};

export { data };