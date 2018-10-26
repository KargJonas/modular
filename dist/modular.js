/** @license Modular V2.8.9
 * Copyright (c) 2018 Jonas Karg
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./dev/errors.js
const errors = {
  0: ["Info",
    "You are using the development build of Modular. Make sure to use the production build when deploying this app."],

  1: ["Invalid Attribute",
    "Unable to create Modular element.",
    "Invalid attribute.",
    `The attribute "__config__" is reserved for Modular.`,
    "el"],

  2: ["Invalid Input",
    "An object, which is not a Modular-element, was passed into Modular.core.getHtml().",
    "( Modular.core.getHtml() was called by Modular.render() )",
    "Modular does not know how how to handle this.",
    "core.getHtml"],

  3: ["Invalid Input",
    "A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().",
    "( Modular.core.getHtml() was called by Modular.render() )",
    "This error might be caused by a invalid child-element in Modular.render() or Modular.el().",
    "Modular does not know how how to handle this.",
    "core.getHtml"],

  4: ["Invalid or Missing Input",
    "Unable to scan.",
    "A invalid value was passed into Modular.scan().",
    "Modular.scan() expects a [String].",
    "scan"],

  5: ["Missing TagName",
    "Unable to create Modular element.",
    "Missing tag.",
    "( The tag of a Modular-element is the first attribute of Modular.el() )",
    "el"],

  6: ["Invalid Style",
    "Unable to convert given value to CSS.",
    "An invalid value passed into Modular.core.getStyle().",
    "Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Function] (returning an object that contains valid style)",
    "Empty or invalid styles should be avoided.",
    "core.getStyle"],

  7: ["Invalid Input",
    "Unable to render.",
    "Modular.render() is missing a root-element or a container-element",
    "( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which contains any of the mentioned) or [Function] (which returns any of the mentioned) )",
    "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
    "Keep in mind - if the container-element is not a child of the page, you probably won't be able to see much.",
    "render"],

  8: ["Invalid Render-Container",
    "Unable to render",
    "Modular.render() received an invalid container-element.",
    "A container-element has to be an html-element or a valid CSS-selector ( [String] ).",
    "Keep in mind - if the container-element is not a child of the page, you probably won't be able to see much.",
    "render"],

  9: ["Invalid configuration",
    "Could not get route.",
    "Modular.router.routes must be an object or null.",
    `The routes-object should be structured like this this:\nModular.router.routes = {\n  "path/of/the/page": MyElement,\n  "path/of/the/other/page": MyOtherElement\n}`,
    "router.routeChange"]
}

console.warn("🚨 (Modular): [Info]\n\n--> You are using the development build of Modular. Make sure to use the production build when deploying this app.");


// CONCATENATED MODULE: ./dev/data.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "data", function() { return data; });


// document.head.appendChild(Modular.data.styleElement);

const styleElement = document.createElement("style");
styleElement.setAttribute("type", "-modular-style-");

const data = {
  // All bindings (their names) and the associated elements
  bindings: {},

  // The render events
  preRender: new Event("prerender"),
  postRender: new Event("postrender"),

  // The error object containing all errors
  errors: errors,

  // A variable to temporarily store style
  // so multiple functions can access it
  tempStyle: [],

  // An element that is used to add the style
  styleElement: styleElement,

  // A counter used to generate element-IDs
  tempElCount: []
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "err", function() { return err; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAttr", function() { return getAttr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHtml", function() { return getHtml; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStyle", function() { return getStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeEl", function() { return makeEl; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);


// Creates an error-string with modular-format
function err( i ) {
  if ( !_data__WEBPACK_IMPORTED_MODULE_0__["data"].errors ) return "🚨 (Modular): ";

  let args = _data__WEBPACK_IMPORTED_MODULE_0__["data"].errors[i],
    type = `[${ args[0] }]`,
    position = "",
    information,
    error;

  // Removing error type
  args.shift();

  // Don't show error-origin if only one argument present.
  if ( args.length > 1 ) {
    position = `\n@ ${ args.pop() }()\n`;
  }

  // Formatting the error information
  information = args.map( arg => `\n--> ${ arg }` ).join( "\n" );
  error = `🚨 (Modular): ${ [type, information, position].join( "\n" ) }`;

  return error;
}

// Transforms "impure" objects into something modular can work with
function getAttr( attributes ) {
  const obj = {};

  Array.from( attributes ).map( attribute => {
    obj[attribute.name] = attribute.value;
  } );

  return obj;
}

// Transforming given values into DOM-elements
function getHtml( value ) {
  value = value || "";

  // No action required if the value is an element
  if ( value instanceof Element ) {
    return value;
  }

  if ( value instanceof Function ) {
    return getHtml( value() );
  }

  if ( value instanceof Array ) {
    // Return empty element if array is empty
    if ( !value.length ) {
      return getHtml();
    }

    // Appending each element to wrapper
    const el = document.createElement( "div" );
    value.map( arrEl => el.appendChild( getHtml( arrEl ) ) );

    return el;
  }

  // Create a text-node if content is string
  if ( value.constructor === String || value.constructor === Number ) {
    return document.createTextNode( value );
  }

  // Render modular elements
  if ( value instanceof Object ) {
    if ( value.__config__ && value.__config__.type !== "modular-element" ) {
      throw err( 2 );
    }

    return value.__config__.render();
  }

  throw err( 3 );
}

function camelToKebab( input ) {
  let out = "";

  for ( let i = 0; i < input.length; i++ ) {
    if ( i > 1 && isUpper( input[i] ) && /[a-zA-Z]/.test( input[i] ) ) {
      out += "-";
      out += input[i].toLowerCase();
    } else {
      out += input[i];
    }
  }

  return out;
}

function isUpper( input ) {
  return ( input == input.toUpperCase() );
}

// Transforms a style object into style that only applies to a single element
function makeStyle( obj, id ) {
  let style = "";
  const declarations = Object.entries( obj ),
    pseudos = [];

  declarations.map( declaration => {
    const key = declaration[0];
    const value = declaration[1];

    // If a css-declaration starts with a colon, create a pseudo class
    if ( key[0] === ":" && id !== undefined ) {
      let pseudoStyle;
      if ( value.constructor === String ) {
        pseudoStyle = value;
      } else {
        pseudoStyle = makeStyle( value );
      }

      pseudos.push( `[data-modular-id="${ id }"]${ key }{${ pseudoStyle } }` );
    } else {
      style += `${ camelToKebab( declaration[0] ) }:${ value };`;
    }
  } );

  if ( id ) {
    style = `[data-modular-id="${ id }"]{${ style }}${ pseudos.join( "" ) }`;
  }

  return style;
}

// Transforms different types of style into global style
function getStyle( val, id ) {
  let style = val;

  // Strings
  if ( style.constructor === String ) {
    return `[data-modular-id="${ id }"]{${ style }}`;
  }

  // Functions
  if ( style instanceof Function ) style = style();

  // Style-objects
  if ( style instanceof Object ) {
    const rules = Object.entries( style );

    if ( !rules.length ) {
      console.warn( err( 6 ) );
      return "";
    }

    // If style-object contains css rules:
    if ( rules[0][1] instanceof Object ) {
      style = "";

      rules.map( rule => {
        style += `[data-modular-id="${ id }"] ${ rule[0] }{${ makeStyle( rule[1] ) }}`;
      } );

    } else {
      style = makeStyle( style, id );
    }
  }

  // Return if style is valid
  if ( style.constructor === String ) {
    return style;
  }

  // Warn about invalid style
  console.warn( err( 6 ) );
  return;
}

// Creates DOM-elements
function makeEl( tagName, attributes, content ) {
  const element = document.createElement( tagName );

  // Generate global style if style found
  if ( attributes && attributes.style ) {
    _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount[_data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount.length - 1]++;
    _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle[_data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle.length - 1] += getStyle(
      attributes.style,
      _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount[_data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount.length - 1]
    );
    attributes["data-modular-id"] = _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount[_data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount.length - 1];

    delete attributes.style;
  }

  // Setting element-attributes
  Object.entries( attributes ).map( attribute => {
    element.setAttribute( attribute[0], attribute[1] );
  } );

  Object.assign( element, attributes );

  // Set the element's content, if provided
  if ( content ) {
    element.appendChild( content );
  }

  return element;
}



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getBinding", function() { return getBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBinding", function() { return setBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "listenBinding", function() { return listenBinding; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scan", function() { return scan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _el__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);





// Set the value of a binding
function setBinding(binding, value) {
  if (!_data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding]) {
    _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding] = {
      elements: [],
      lastValue: undefined,
      value: undefined,
      listeners: []
    };
  }

  _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].lastValue = _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].value;
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].value = value;
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].elements.map(element => {
    element.element[element.value] = _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].value;
  });
}

// Get the value of a binding
function getBinding(binding) {
  if (!_data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding]) return undefined;
  return _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].value;
}

// Add a listener to a binding
function listenBinding(binding, func) {
  if (!_data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding]) setBinding(binding, undefined);
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[binding].listeners.push(func);
}

// Converts a (html) string into a Modular-element
function scan(val) {
  // Validating input
  if (val.constructor !== String) {
    throw new Error(Object(_core__WEBPACK_IMPORTED_MODULE_2__["err"])(4));
  }

  // Creating a wrapper
  let wrapper = document.createElement("div");
  wrapper.innerHTML = val.trim();

  // Mapping all nodes in the wrapper
  const res = Array.from(wrapper.childNodes).map(node => {
    if (node instanceof Element) {
      return Object(_el__WEBPACK_IMPORTED_MODULE_1__["el"])(node.tagName, Object(_core__WEBPACK_IMPORTED_MODULE_2__["getAttr"])(node.attributes), scan(node.innerHTML));
    } else return node.textContent;
  });

  return res;
}

// The method for rendering stuff
function render(element, _container) {
  // Resetting temporary values
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle.push("");
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount.push(0);

  // Dispatching the prerender event
  window.dispatchEvent(_data__WEBPACK_IMPORTED_MODULE_0__["data"].preRender);

  if (!element || !_container) throw new Error(Object(_core__WEBPACK_IMPORTED_MODULE_2__["err"])(7));
  let container;

  // Handling container selector-string
  if (_container.constructor === String) {
    container = document.querySelector(_container);
  } else container = _container;

  // Validating container
  if (!(container instanceof Element)) {
    throw Object(_core__WEBPACK_IMPORTED_MODULE_2__["err"])(8);
  }

  // Adding the rendered content
  container.innerHTML = "";
  container.appendChild(Object(_core__WEBPACK_IMPORTED_MODULE_2__["getHtml"])(element));

  // Adding the style
  if (!document.querySelector("style[type='-modular-style-']")) {
    document.head.appendChild(_data__WEBPACK_IMPORTED_MODULE_0__["data"].styleElement);
  }

  _data__WEBPACK_IMPORTED_MODULE_0__["data"].styleElement.innerHTML = _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle[_data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle.length - 1];
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempStyle.pop();
  _data__WEBPACK_IMPORTED_MODULE_0__["data"].tempElCount.pop();

  // Dispatching the postrender event
  window.dispatchEvent(_data__WEBPACK_IMPORTED_MODULE_0__["data"].postRender);
}



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "el", function() { return el; });
/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var _methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);




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
  if (typeof tag !== "string") throw new Error(Object(_core__WEBPACK_IMPORTED_MODULE_1__["err"])(5));
  if (attributes.__config__ !== undefined) throw Error(Object(_core__WEBPACK_IMPORTED_MODULE_1__["err"])(1));

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
    attributes.__config__.element = Object(_core__WEBPACK_IMPORTED_MODULE_1__["makeEl"])(
      attributes.__config__.tag,
      cleanAttr,
      Object(_core__WEBPACK_IMPORTED_MODULE_1__["getHtml"])(attributes.__config__.content)
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

          Object(_methods__WEBPACK_IMPORTED_MODULE_2__["setBinding"])(entry[1], newVal);

          // Checking if there actually were changes
          if (_data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].value !== _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].lastValue || _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].value instanceof Object || _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].value instanceof Array) {

            // Running all listeners
            _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].listeners.map(listener => {
              listener(Object(_methods__WEBPACK_IMPORTED_MODULE_2__["getBinding"])(entry[1]))
            });
          }
        });
      };

      // Mapping through all of the element's bindings
      Object.entries(attributes.__config__.bindings).map(entry => {

        // Creating a binding if the binding-name doesn't exist
        if (!_data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]]) {
          _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]] = {

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
        _data__WEBPACK_IMPORTED_MODULE_0__["data"].bindings[entry[1]].elements.push({

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



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const core = __webpack_require__(1);
const methods = __webpack_require__(2);
const data = __webpack_require__(0);
const el = __webpack_require__(3);
const router = __webpack_require__(5);

const Modular = {
  // Events, bindings and error-messages
  data: data,

  // The core
  core: core,

  // Methods
  getBinding: methods.getBinding,
  setBinding: methods.setBinding,
  listenBinding: methods.listenBinding,
  scan: methods.scan,
  render: methods.render,
  el: el,
  router: router
};

module.exports = Modular;

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


const router = {
  // Event for route changes
  newRouteEvent: new Event("newroute"),

  // Configuration
  routes: undefined,

  // The rendered page
  page: undefined,

  // Transforming a path-string into an array
  getRoute(_path) {
    let path = _path;

    path = path.replace(/(^\/+|\/+$)/g, "");
    path = path.split("/");

    return path;
  },

  // Updating content according to the routes-object
  routeChange() {

    // Validating the routes object
    if (!router.routes) return;
    if (router.routes.constructor !== Object) throw Object(_core__WEBPACK_IMPORTED_MODULE_0__["err"])(9);

    const route = router.getRoute(window.location.pathname);
    const entries = Object.entries(router.routes);

    // Looping through all routes in the routes-object
    for (let i = 0; i < entries.length; i++) {
      const entryRoute = router.getRoute(entries[i][0]);
      let match = true;

      // Checking if the current URL matches the route
      for (let a = 0; a < entryRoute.length; a++) {
        if (route[a] === undefined || (entryRoute[a] !== "**" && entryRoute[i] !== route[i])) {
          match = false;
          break;
        }
      }

      // Change content if match was found
      if (match) {
        router.page = entries[i][1];
        window.dispatchEvent(router.newRouteEvent);
        return;
      }
    }

  },

  // Initializing the router
  init() {
    window.addEventListener("popstate", router.routeChange);
    router.routeChange();
  },

  // Navigate to a route
  navigate(path) {
    window.history.pushState(null, path, path);
    router.routeChange();
  }
};

// Initial route change in main file


/***/ })
/******/ ]);