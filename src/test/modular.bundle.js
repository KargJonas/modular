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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/modular.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./dev/core.js":
/*!*********************!*\
  !*** ./dev/core.js ***!
  \*********************/
/*! exports provided: err, getAttr, getHtml, getStyle, makeEl */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"err\", function() { return err; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAttr\", function() { return getAttr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHtml\", function() { return getHtml; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStyle\", function() { return getStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeEl\", function() { return makeEl; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./dev/data.js\");\n\r\n\r\n// Creates an error-string with modular-format\r\nfunction err( i ) {\r\n  if ( !_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].errors ) return \"🚨 (Modular): \";\r\n\r\n  let args = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].errors[i],\r\n    type = `[${ args[0] }]`,\r\n    position = \"\",\r\n    information,\r\n    error;\r\n\r\n  // Removing error type\r\n  args.shift();\r\n\r\n  // Don't show error-origin if only one argument present.\r\n  if ( args.length > 1 ) {\r\n    position = `\\n@ ${ args.pop() }()\\n`;\r\n  }\r\n\r\n  // Formatting the error information\r\n  information = args.map( arg => `\\n--> ${ arg }` ).join( \"\\n\" );\r\n  error = `🚨 (Modular): ${ [type, information, position].join( \"\\n\" ) }`;\r\n\r\n  return error;\r\n}\r\n\r\n// Transforms \"impure\" objects into something modular can work with\r\nfunction getAttr( attributes ) {\r\n  const obj = {};\r\n\r\n  Array.from( attributes ).map( attribute => {\r\n    obj[attribute.name] = attribute.value;\r\n  } );\r\n\r\n  return obj;\r\n}\r\n\r\n// Transforming given values into DOM-elements\r\nfunction getHtml( value ) {\r\n  value = value || \"\";\r\n\r\n  // No action required if the value is an element\r\n  if ( value instanceof Element ) {\r\n    return value;\r\n  }\r\n\r\n  if ( value instanceof Function ) {\r\n    return getHtml( value() );\r\n  }\r\n\r\n  if ( value instanceof Array ) {\r\n    // Return empty element if array is empty\r\n    if ( !value.length ) {\r\n      return getHtml();\r\n    }\r\n\r\n    // Appending each element to wrapper\r\n    const el = document.createElement( \"div\" );\r\n    value.map( arrEl => el.appendChild( getHtml( arrEl ) ) );\r\n\r\n    return el;\r\n  }\r\n\r\n  // Create a textnode if content is string\r\n  if ( value.constructor === String || value.constructor === Number ) {\r\n    return document.createTextNode( value );\r\n  }\r\n\r\n  // Render modular elements\r\n  if ( value instanceof Object ) {\r\n    if ( value.__config__ && value.__config__.type !== \"modular-element\" ) {\r\n      throw err( 2 );\r\n    }\r\n\r\n    return value.__config__.render();\r\n  }\r\n\r\n  throw err( 3 );\r\n}\r\n\r\n// Transforms a style object into style that only applies to a single element\r\nfunction makeStyle( obj, id ) {\r\n  let style = \"\";\r\n  const declarations = Object.entries( obj ),\r\n    pseudos = [];\r\n\r\n  declarations.map( declaration => {\r\n    // If a css-decalaration starts with a colon, create a pseudo class\r\n    if ( declaration[0][1] === \":\" && id !== undefined ) {\r\n      pseudos.push( `[data-modular-id=\"${ id }\"]${ declaration[0] }{${ makeStyle( declaration[1] ) }}` );\r\n\r\n    } else {\r\n      style += `${ declaration[0] }:${ declaration[1] };`;\r\n    }\r\n  } );\r\n\r\n  if ( id ) {\r\n    style = `[data-modular-id=\"${ id }\"]{${ style }}${ pseudos.join( \"\" ) }`;\r\n  }\r\n\r\n  return style;\r\n}\r\n\r\n// Transforms different types of style into global style\r\nfunction getStyle( val, id ) {\r\n  let style = val;\r\n\r\n  // Strings\r\n  if ( style.constructor === String ) {\r\n    return `[data-modular-id=\"${ id }\"]{${ style }}`;\r\n  }\r\n\r\n  // Functions\r\n  if ( style instanceof Function ) style = style();\r\n\r\n  // Style-objects\r\n  if ( style instanceof Object ) {\r\n    const rules = Object.entries( style );\r\n\r\n    if ( !rules.length ) {\r\n      console.warn( err( 6 ) );\r\n      return \"\";\r\n    }\r\n\r\n    // If style-object contains css rules:\r\n    if ( rules[0][1] instanceof Object ) {\r\n      style = \"\";\r\n\r\n      rules.map( rule => {\r\n        style += `[data-modular-id=\"${ id }\"]>${ rule[0] }{${ makeStyle( rule[1] ) }}`;\r\n      } );\r\n\r\n    } else {\r\n      style = makeStyle( style, id );\r\n    }\r\n  }\r\n\r\n  // Return if style is valid\r\n  if ( style.constructor === String ) {\r\n    return style;\r\n  }\r\n\r\n  // Warn about invalid style\r\n  console.warn( err( 6 ) );\r\n  return;\r\n}\r\n\r\n// Creates DOM-elements\r\nfunction makeEl( tagName, attributes, content ) {\r\n  const element = document.createElement( tagName );\r\n\r\n  // Generate global style if style found\r\n  if ( attributes && attributes.style ) {\r\n    _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempElCount++;\r\n    _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempStyle += getStyle( attributes.style, _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempElCount );\r\n    attributes[\"data-modular-id\"] = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempElCount;\r\n\r\n    delete attributes.style;\r\n  }\r\n\r\n  // Setting element-attributes\r\n  Object.entries( attributes ).map( attribute => {\r\n    element.setAttribute(attribute[0], attribute[1]);\r\n  });\r\n\r\n  // Set the element's content, if provided\r\n  if ( content ) {\r\n    element.appendChild( content );\r\n  }\r\n\r\n  return element;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./dev/core.js?");

/***/ }),

/***/ "./dev/data.js":
/*!*********************!*\
  !*** ./dev/data.js ***!
  \*********************/
/*! exports provided: data */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"data\", function() { return data; });\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ \"./dev/errors.js\");\n\r\n\r\nconst data = {\r\n  // All bindings (their names) and the associated elements\r\n  bindings: {},\r\n\r\n  // The render events\r\n  preRender: new Event( \"prerender\" ),\r\n  postRender: new Event( \"postrender\" ),\r\n\r\n  // The error object containing all errors\r\n  errors: _errors__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\r\n\r\n  // A variable to temporarly store style\r\n  // so multiple functions can access it\r\n  tempStyle: \"\",\r\n\r\n  // A counter used to generate element-IDs\r\n  tempElCount: 0\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./dev/data.js?");

/***/ }),

/***/ "./dev/el.js":
/*!*******************!*\
  !*** ./dev/el.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./dev/data.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ \"./dev/core.js\");\n/* harmony import */ var _methods__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./methods */ \"./dev/methods.js\");\n\r\n\r\n\r\n\r\n// Creates a modular-element\r\nfunction el() {\r\n\r\n  // Extracting tag and attributes from the arguments\r\n  let args = Array.from( arguments ),\r\n    tag = args[0].toLowerCase(),\r\n    attributes = args[1] || {};\r\n\r\n  // Remove everyting unnecessary from the arguments array\r\n  args.splice( 0, 2 );\r\n  if ( args.length === 1 ) args = args[0];\r\n\r\n  // Checking if all mandatory tags are availabile\r\n  if ( typeof tag !== \"string\" ) throw new Error( Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"err\"])( 5 ) );\r\n  if ( attributes.__config__ !== undefined ) throw Error( Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"err\"])( 1 ) );\r\n\r\n  // Setting up the configuration\r\n  attributes.__config__ = {\r\n    type: \"modular-element\",\r\n    tag: tag,\r\n    content: args,\r\n    bindings: attributes.$bind,\r\n    element: null\r\n  };\r\n\r\n  // \"renders\" the current modular-element and returns it\r\n  attributes.__config__.render = () => {\r\n    const cleanAttr = {};\r\n\r\n    // \"Cleaning\" the attributes of configuration-properties\r\n    Object.assign( cleanAttr, attributes || {} );\r\n    delete cleanAttr.__config__;\r\n    delete cleanAttr.$bind;\r\n\r\n    // Creating a DOM-element\r\n    attributes.__config__.element = Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"makeEl\"])(\r\n      attributes.__config__.tag,\r\n      cleanAttr,\r\n      Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"getHtml\"])( attributes.__config__.content )\r\n    );\r\n\r\n    // Only add the binding logic if there was a binding-object passed in\r\n    if ( attributes.__config__.bindings instanceof Object ) {\r\n      attributes.__config__.change = () => {\r\n\r\n        // Updating all of the element's bindings\r\n        Object.entries( attributes.__config__.bindings ).map( entry => {\r\n          let newVal = attributes.__config__.element[entry[0]];\r\n\r\n          if ( newVal == \"true\" ) {\r\n            newVal = true;\r\n          }\r\n\r\n          else if ( newVal == \"false\" ) {\r\n            newVal = false;\r\n          }\r\n\r\n          Object(_methods__WEBPACK_IMPORTED_MODULE_2__[\"setBinding\"])( entry[1], newVal );\r\n\r\n          // Checking if there actually were changes\r\n          if ( _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].value !== _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].lastValue || _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].value instanceof Object || _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].value instanceof Array ) {\r\n\r\n            // Running all listeners\r\n            _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].listeners.map( listener => {\r\n              listener( Object(_methods__WEBPACK_IMPORTED_MODULE_2__[\"getBinding\"])( entry[1] ) )\r\n            } );\r\n          }\r\n        } );\r\n      };\r\n\r\n      // Mapping through all of the element's bindings\r\n      Object.entries( attributes.__config__.bindings ).map( entry => {\r\n\r\n        // Creating a binding if the binding-name doesn't exist\r\n        if ( !_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]] ) {\r\n          _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]] = {\r\n\r\n            // The elements bound to the binding\r\n            elements: [],\r\n            lastValue: undefined,\r\n\r\n            // The value of the binding\r\n            value: undefined,\r\n\r\n            // The functions that will run be run when the binding changes\r\n            listeners: []\r\n          };\r\n        }\r\n\r\n        // Adding a reference of the current element to the binding\r\n        // so that we can update it's propertys when a change occurs.\r\n        _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[entry[1]].elements.push( {\r\n\r\n          // The element\r\n          element: attributes.__config__.element,\r\n\r\n          // The attribute that has to change\r\n          value: entry[0]\r\n        } );\r\n      } );\r\n\r\n      // Adding all relevant event-listeners to the before created DOM-element\r\n      attributes.__config__.element.addEventListener( \"mouseover\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"mouseout\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"click\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"change\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"keyup\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"keydown\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.element.addEventListener( \"contextmenu\", e => attributes.__config__.change( e ) );\r\n      attributes.__config__.change();\r\n    }\r\n\r\n    // Returning the rendered element\r\n    return attributes.__config__.element;\r\n  }\r\n\r\n  // Returning the modular element\r\n  return attributes;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (el);\n\n//# sourceURL=webpack:///./dev/el.js?");

/***/ }),

/***/ "./dev/errors.js":
/*!***********************!*\
  !*** ./dev/errors.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst errors = {\r\n    0: [\"Info\",\r\n        \"You are using the development build of Modular. Make sure to use the production build when deploying this app.\"],\r\n\r\n    1: [\"Invalid Attribute\",\r\n        \"Unable to create Modular element.\",\r\n        \"Invalid attribute.\",\r\n        `The attribute \"__config__\" is reserved for Modular.`,\r\n        \"el\"],\r\n\r\n    2: [\"Invalid Input\",\r\n        \"An object, which is not a Modular-element, was passed into Modular.core.getHtml().\",\r\n        \"( Modular.core.getHtml() was called by Modular.render() )\",\r\n        \"Modular does not know how how to handle this.\",\r\n        \"core.getHtml\"],\r\n\r\n    3: [\"Invalid Input\",\r\n        \"A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().\",\r\n        \"( Modular.core.getHtml() was called by Modular.render() )\",\r\n        \"This error might be caused by a invalid child-element in Modular.render() or Modular.el().\",\r\n        \"Modular does not know how how to handle this.\",\r\n        \"core.getHtml\"],\r\n\r\n    4: [\"Invalid or Missing Input\",\r\n        \"Unable to scan.\",\r\n        \"A invalid value was passed into Modular.scan().\",\r\n        \"Modular.scan() expects a [String].\",\r\n        \"scan\"],\r\n\r\n    5: [\"Missing TagName\",\r\n        \"Unable to create Modular element.\",\r\n        \"Missing tag.\",\r\n        \"( The tag of a Modular-element is the first attribute of Modular.el() )\",\r\n        \"el\"],\r\n\r\n    6: [\"Invalid Style\",\r\n        \"Unable to convert given value to CSS.\",\r\n        \"An invalid value passed into Modular.core.getStyle().\",\r\n        \"Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Funtion] (returning an object that contains valid style)\",\r\n        \"Empty or invalid styles should be avoided.\",\r\n        \"core.getStyle\"],\r\n\r\n    7: [\"Invalid Input\",\r\n        \"Unable to render.\",\r\n        \"Modular.render() is missing a root-element or a container-element\",\r\n        \"( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) or [Function] (which returns any of the mentioned) )\",\r\n        \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\",\r\n        \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\",\r\n        \"render\"],\r\n\r\n    8: [\"Invalid Render-Container\",\r\n        \"Unable to render\",\r\n        \"Modular.render() recieved an invalid container-element.\",\r\n        \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\",\r\n        \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\",\r\n        \"render\"],\r\n\r\n    9: [\"Invalid configuration\",\r\n        \"Could not get route.\",\r\n        \"Modular.router.routes must be an object or null.\",\r\n        `The routes-object should be structured like this this:\\nModular.router.routes = {\\n  \"path/of/the/page\": MyElement,\\n  \"path/of/the/other/page\": MyOtherElement\\n}`,\r\n        \"router.routeChange\"]\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (errors);\n\n//# sourceURL=webpack:///./dev/errors.js?");

/***/ }),

/***/ "./dev/methods.js":
/*!************************!*\
  !*** ./dev/methods.js ***!
  \************************/
/*! exports provided: getBinding, setBinding, listenBinding, scan, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBinding\", function() { return getBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBinding\", function() { return setBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listenBinding\", function() { return listenBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scan\", function() { return scan; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data */ \"./dev/data.js\");\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core */ \"./dev/core.js\");\n\r\n\r\n\r\n// Set the value of a binding\r\nfunction setBinding( binding, value ) {\r\n  if ( !_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding] ) {\r\n    _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding] = {\r\n      elements: [],\r\n      lastValue: undefined,\r\n      value: undefined,\r\n      listeners: []\r\n    };\r\n  }\r\n\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].lastValue = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].value;\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].value = value;\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].elements.map( element => {\r\n    element.element[element.value] = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].value;\r\n  } );\r\n}\r\n\r\n// Get the value of a binding\r\nfunction getBinding( binding ) {\r\n  if ( !_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding] ) return undefined;\r\n  return _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].value;\r\n}\r\n\r\n// Add a listener to a binding\r\nfunction listenBinding( binding, func ) {\r\n  if ( !_data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding] ) setBinding( binding, undefined );\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].bindings[binding].listeners.push( func );\r\n}\r\n\r\n// Converts a (html) string into a Modular-element\r\nfunction scan( val ) {\r\n  // Validating input\r\n  if ( val.constructor !== String ) {\r\n    throw new Error( Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"err\"])( 4 ) );\r\n  }\r\n\r\n  let wrapper = document.createElement( \"div\" );\r\n  wrapper.innerHTML = val.trim();\r\n\r\n  const res = Array.from( wrapper.childNodes ).map( node => {\r\n    if ( node instanceof Element ) {\r\n      return el( node.tagName, Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"getAttr\"])( node.attributes ), scan( node.innerHTML ) );\r\n    } else return node.textContent;\r\n  } );\r\n\r\n  return res;\r\n}\r\n\r\n// The entry-point for rendering stuff\r\nfunction render( element, _container ) {\r\n  // Resetting temporary values\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempStyle = \"\";\r\n  _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempElCount = 0;\r\n\r\n  // Dispatching the prerender event\r\n  window.dispatchEvent( _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].preRender );\r\n\r\n  if ( !element || !_container ) throw new Error( Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"err\"])( 7 ) );\r\n  let container;\r\n\r\n  // Handling container selector-string\r\n  if ( _container.constructor === String ) {\r\n    container = document.querySelector( _container );\r\n  } else container = _container;\r\n\r\n  // Validating container\r\n  if ( !( container instanceof Element ) ) {\r\n    throw Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"err\"])( 8 );\r\n  }\r\n\r\n  // Adding the rendered content\r\n  container.innerHTML = \"\";\r\n  container.appendChild( Object(_core__WEBPACK_IMPORTED_MODULE_1__[\"getHtml\"])( element ) );\r\n\r\n  // Adding the style\r\n  const styleEl = document.createElement( \"style\" );\r\n  styleEl.innerHTML = _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].tempStyle;\r\n  document.head.appendChild( styleEl );\r\n\r\n  // DIspatching the postrender event\r\n  window.dispatchEvent( _data__WEBPACK_IMPORTED_MODULE_0__[\"data\"].postRender );\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./dev/methods.js?");

/***/ }),

/***/ "./dev/modular.js":
/*!************************!*\
  !*** ./dev/modular.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core.js */ \"./dev/core.js\");\n/* harmony import */ var _methods__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./methods */ \"./dev/methods.js\");\n/* harmony import */ var _data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data */ \"./dev/data.js\");\n/* harmony import */ var _el__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./el */ \"./dev/el.js\");\n/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ \"./dev/router.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst Modular = {\r\n    // Events, bindings and error-messages\r\n    data: _data__WEBPACK_IMPORTED_MODULE_2__[\"data\"],\r\n\r\n    // The core\r\n    core: {\r\n        err: _core_js__WEBPACK_IMPORTED_MODULE_0__[\"err\"],\r\n        getAttr: _core_js__WEBPACK_IMPORTED_MODULE_0__[\"getAttr\"],\r\n        getHtml: _core_js__WEBPACK_IMPORTED_MODULE_0__[\"getHtml\"],\r\n        getStyle: _core_js__WEBPACK_IMPORTED_MODULE_0__[\"getStyle\"],\r\n        makeEl: _core_js__WEBPACK_IMPORTED_MODULE_0__[\"makeEl\"]\r\n    },\r\n\r\n    // Methods\r\n    getBinding: _methods__WEBPACK_IMPORTED_MODULE_1__[\"getBinding\"],\r\n    setBinding: _methods__WEBPACK_IMPORTED_MODULE_1__[\"setBinding\"],\r\n    listenBinding: _methods__WEBPACK_IMPORTED_MODULE_1__[\"listenBinding\"],\r\n    scan: _methods__WEBPACK_IMPORTED_MODULE_1__[\"scan\"],\r\n    el: _el__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\r\n    render: _methods__WEBPACK_IMPORTED_MODULE_1__[\"render\"],\r\n    router: _router__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\r\n};\r\n\r\n// Making Modular a global constant\r\nObject.defineProperty( window, \"Modular\", {\r\n    value: Modular,\r\n    writable: false,\r\n    enumerable: true,\r\n    configurable: false\r\n} );\r\n\r\n// Development-build warning\r\nif ( Modular.data.errors ) console.warn( Modular.core.err( 0 ) );\n\n//# sourceURL=webpack:///./dev/modular.js?");

/***/ }),

/***/ "./dev/router.js":
/*!***********************!*\
  !*** ./dev/router.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core */ \"./dev/core.js\");\n\r\n\r\nconst router = {\r\n  // Event for route changes\r\n  newRouteEvent: new Event( \"newroute\" ),\r\n\r\n  // Configuration\r\n  routes: undefined,\r\n\r\n  // The rendered page\r\n  page: undefined,\r\n\r\n  // Transforming a path-string into an array\r\n  getRoute( _path ) {\r\n    let path = _path;\r\n\r\n    path = path.replace( /(^\\/+|\\/+$)/g, \"\" );\r\n    path = path.split( \"/\" );\r\n\r\n    return path;\r\n  },\r\n\r\n  // Updating the page-content according to the routes-object\r\n  routeChange() {\r\n\r\n    // Validating the routes object\r\n    if ( !router.routes ) return;\r\n    if ( router.routes.constructor !== Object ) throw Object(_core__WEBPACK_IMPORTED_MODULE_0__[\"err\"])( 9 );\r\n\r\n    const route = router.getRoute( window.location.pathname );\r\n    const entries = Object.entries( router.routes );\r\n\r\n    for ( let i = 0; i < entries.length; i++ ) {\r\n      const entryRoute = router.getRoute( entries[i][0] );\r\n      let match = true;\r\n\r\n      for ( let a = 0; a < entryRoute.length; a++ ) {\r\n        if ( route[a] === undefined || ( entryRoute[a] !== \"**\" && entryRoute[i] !== route[i] ) ) {\r\n          match = false;\r\n          break;\r\n        }\r\n      }\r\n\r\n      if ( match ) {\r\n        router.page = entries[i][1];\r\n        window.dispatchEvent( router.newRouteEvent );\r\n        return;\r\n      }\r\n    }\r\n\r\n  },\r\n\r\n  // Initializing the router\r\n  init() {\r\n    window.addEventListener( \"popstate\", router.routeChange );\r\n    router.routeChange();\r\n  },\r\n\r\n  // Navigate to a route\r\n  navigate( path ) {\r\n    window.history.pushState( null, path, path );\r\n    router.routeChange();\r\n  }\r\n};\r\n\r\n// Initial route change in main file\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (router);\n\n//# sourceURL=webpack:///./dev/router.js?");

/***/ })

/******/ });