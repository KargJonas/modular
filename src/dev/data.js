import errors from "./errors";

const data = {
  // All bindings (their names) and the associated elements
  bindings: {},

  // The render events
  preRender: new Event( "prerender" ),
  postRender: new Event( "postrender" ),

  // The error object containing all errors
  errors: errors,

  // A variable to temporarly store style
  // so multiple functions can access it
  tempStyle: "",

  // A counter used to generate element-IDs
  elCount: 0
};

export { data };