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
/******/ 	return __webpack_require__(__webpack_require__.s = "./dev/modular-2.js");
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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"err\", function() { return err; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getAttr\", function() { return getAttr; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getHtml\", function() { return getHtml; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getStyle\", function() { return getStyle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"makeEl\", function() { return makeEl; });\n// Creates an error-string with modular-format\r\nfunction err(i) {\r\n    let args = Modular.data.errors[i];\r\n    let type = `[${args[0]}]`;\r\n    args.shift();\r\n\r\n    const position = (args.length > 1) ? `\\n@ Modular.${args.pop()}()\\n` : \"\";\r\n    const error = args.map(arg => `\\n--> ${arg}\\n`).join(\"\");\r\n\r\n    return `🚨 (Modular-2): ${type}\\n${error}${position}`;\r\n}\r\n\r\n// Transforms \"impure\" objects into something modular can work with\r\nfunction getAttr(attributes) {\r\n    const obj = {};\r\n\r\n    Array.from(attributes).map(attribute => {\r\n        obj[attribute.name] = attribute.value;\r\n    });\r\n\r\n    return obj;\r\n}\r\n\r\n// Transforming given values into DOM-elements\r\nfunction getHtml(value) {\r\n    value = value || \"\";\r\n\r\n    if (value instanceof Element) return value;\r\n    else if (value.constructor === Function) return Modular.core.getHtml(value());\r\n    else if (value.constructor === Array) {\r\n        if (!value.length) return Modular.core.getHtml(\"\");\r\n        const el = document.createElement(\"div\");\r\n        value.map(arrEl => el.appendChild(Modular.core.getHtml(arrEl)));\r\n        return el;\r\n    } else if (value.constructor === String || value.constructor === Number) return document.createTextNode(value);\r\n    else if (value.constructor === Object) {\r\n        if (value.__config__ && value.__config__.type !== \"modular-element\") throw Modular.core.err(2);\r\n        return value.__config__.render();\r\n    } else throw Modular.core.err(3);\r\n}\r\n\r\n// Transforms different types of style into inline\r\nfunction getStyle(val) {\r\n    let style = val;\r\n    if (typeof style === \"function\") style = style();\r\n    if (typeof style === \"object\") {\r\n        const wrapper = document.createElement(\"div\");\r\n        Object.assign(wrapper.style, style);\r\n        style = wrapper.getAttribute(\"style\");\r\n    }\r\n\r\n    if (typeof style !== \"string\") throw new Error(Modular.core.err(6));\r\n    return style;\r\n}\r\n\r\n// Creates DOM-elements\r\nfunction makeEl(tagName, attributes, content) {\r\n    const element = document.createElement(tagName);\r\n\r\n    if (attributes && attributes.style) attributes.style = Modular.core.getStyle(attributes.style);\r\n    Object.assign(element, attributes);\r\n\r\n    if (content) element.appendChild(content);\r\n    return element;\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./dev/core.js?");

/***/ }),

/***/ "./dev/direct-methods.js":
/*!*******************************!*\
  !*** ./dev/direct-methods.js ***!
  \*******************************/
/*! exports provided: getBinding, setBinding, listenBinding, scan, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getBinding\", function() { return getBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setBinding\", function() { return setBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"listenBinding\", function() { return listenBinding; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"scan\", function() { return scan; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n// Get the value of a binding\r\nfunction getBinding(binding) {\r\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(10);\r\n    return Modular.data.bindings[binding].value;\r\n}\r\n\r\n// Set the value of a binding\r\nfunction setBinding(binding, value) {\r\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(9);\r\n    Modular.data.bindings[binding].lastValue = Modular.data.bindings[binding].value;\r\n    Modular.data.bindings[binding].value = value;\r\n    Modular.data.bindings[binding].elements.map(element => {\r\n        element.element[element.value] = Modular.data.bindings[binding].value;\r\n    });\r\n}\r\n\r\n// Add a listener to a binding\r\nfunction listenBinding(binding, func) {\r\n    if (!Modular.data.bindings[binding]) throw Modular.core.err(11);\r\n    Modular.data.bindings[binding].listeners.push(func);\r\n}\r\n\r\n// Converts a (html) string into a Modular-element\r\nfunction scan(val) {\r\n    if (typeof val !== \"string\") throw new Error(Modular.core.err(4));\r\n    let wrapper = document.createElement(\"div\");\r\n    wrapper.innerHTML = val.trim();\r\n\r\n    const res = Array.from(wrapper.childNodes).map(node => {\r\n        if (node instanceof Element) {\r\n            isOnlyText = false;\r\n            return Modular.el(node.tagName, Modular.core.getAttr(node.attributes), Modular.scan(node.innerHTML));\r\n        } else return node.textContent;\r\n    });\r\n\r\n    return res;\r\n}\r\n\r\n// The entry-point for rendering stuff\r\nfunction render(element, _container) {\r\n    window.dispatchEvent(Modular.data.onRender);\r\n    if (!element || !_container) throw new Error(Modular.core.err(7));\r\n    let container;\r\n\r\n    if (typeof _container === \"string\") {\r\n        container = document.querySelector(_container);\r\n    } else container = _container;\r\n\r\n    if (!(container instanceof Element)) throw Modular.core.err(8);\r\n    container.innerHTML = \"\";\r\n    container.appendChild(Modular.core.getHtml(element));\r\n    window.dispatchEvent(Modular.data.renderedEvent);\r\n}\r\n\r\n\n\n//# sourceURL=webpack:///./dev/direct-methods.js?");

/***/ }),

/***/ "./dev/el.js":
/*!*******************!*\
  !*** ./dev/el.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// Creates a modular-element\r\nfunction el() {\r\n    // Getting data.\r\n    let args = Array.from(arguments);\r\n    const tag = args[0].toLowerCase();\r\n    const attributes = args[1] || {};\r\n    args.splice(0, 2);\r\n    if (args.length === 1) args = args[0];\r\n\r\n    // Checking if all mandatory tags are availabile\r\n    if (typeof tag !== \"string\") throw new Error(Modular.core.err(5));\r\n    if (attributes.__config__ !== undefined) throw Error(Modular.core.err(1));\r\n\r\n    // Setting up the configuration\r\n    attributes.__config__ = {\r\n        type: \"modular-element\",\r\n        tag: tag,\r\n        content: args,\r\n        bindings: attributes.$bind,\r\n        element: null\r\n    };\r\n\r\n    // \"renders\" the current modular-element and returns it\r\n    attributes.__config__.render = () => {\r\n        // \"Cleaning\" the attributes of configuration-propertys\r\n        const cleanAttr = {};\r\n        Object.assign(cleanAttr, attributes || {});\r\n        delete cleanAttr.__config__;\r\n        delete cleanAttr.$bind;\r\n\r\n        // Creating a DOM-element\r\n        attributes.__config__.element = Modular.core.makeEl(\r\n            attributes.__config__.tag,\r\n            cleanAttr,\r\n            Modular.core.getHtml(attributes.__config__.content)\r\n        );\r\n\r\n        // Only add the binding logic if there was a binding-object passed in\r\n        if (typeof attributes.__config__.bindings === \"object\") {\r\n            attributes.__config__.change = () => {\r\n                // Updating all of the element's bindings\r\n                Object.entries(attributes.__config__.bindings).map(entry => {\r\n                    let newVal = attributes.__config__.element[entry[0]];\r\n                    if (newVal == \"true\") newVal = true;\r\n                    else if (newVal == \"false\") newVal = false;\r\n\r\n                    Modular.setBinding(entry[1], newVal);\r\n                    // Checking if there actually were changes\r\n                    if (Modular.data.bindings[entry[1]].value !== Modular.data.bindings[entry[1]].lastValue || typeof Modular.data.bindings[entry[1]].value === \"object\" || typeof Modular.data.bindings[entry[1]].value === \"array\") {\r\n                        // Running all listeners\r\n                        Modular.data.bindings[entry[1]].listeners.map(listener => {\r\n                            listener(Modular.getBinding(entry[1]))\r\n                        });\r\n                    }\r\n                });\r\n            };\r\n\r\n            Object.entries(attributes.__config__.bindings).map(entry => {\r\n                // Creating a binding if the binding-name doesn't exist\r\n                if (!Modular.data.bindings[entry[1]]) {\r\n                    Modular.data.bindings[entry[1]] = {\r\n                        elements: [], // The elements bound to the binding\r\n                        lastValue: undefined,\r\n                        value: undefined, // The value of the binding\r\n                        listeners: [] // The functions that will run be run when the binding changes\r\n                    };\r\n                }\r\n\r\n                // Adding a reference of the current element to the binding\r\n                // so that we can update it's propertys when a change occurs.\r\n                Modular.data.bindings[entry[1]].elements.push({\r\n                    element: attributes.__config__.element, // The element\r\n                    value: entry[0] // The attribute that has to change\r\n                });\r\n            });\r\n\r\n            // Adding all relevant eventlisteners to the before created DOM-element\r\n            attributes.__config__.element.addEventListener(\"mouseover\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"mouseout\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"click\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"change\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"keyup\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"keydown\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"scroll\", e => attributes.__config__.change(e));\r\n            attributes.__config__.element.addEventListener(\"contextmenu\", e => attributes.__config__.change(e));\r\n            attributes.__config__.change();\r\n        }\r\n\r\n        // Returning the rendered element\r\n        return attributes.__config__.element;\r\n    }\r\n\r\n    // Returning the modular element\r\n    return attributes;\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (el);\n\n//# sourceURL=webpack:///./dev/el.js?");

/***/ }),

/***/ "./dev/errors.js":
/*!***********************!*\
  !*** ./dev/errors.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nconst errors = {\r\n    0: [\"Info\",\r\n        \"You are using the development build of Modular-2. Make sure to use the production build when deploying this app.\"],\r\n\r\n    1: [\"Invalid Attribute\",\r\n        \"Unable to create Modular element.\",\r\n        \"Invalid attribute.\",\r\n        `The attribute \"__config__\" is reserved for Modular.`,\r\n        \"el\"],\r\n\r\n    2: [\"Invalid Input\",\r\n        \"An object, which is not a Modular-element, was passed into Modular.core.getHtml().\",\r\n        \"( Modular.core.getHtml() was called by Modular.render() )\",\r\n        \"Modular does not know how how to handle this.\",\r\n        \"core.getHtml\"],\r\n\r\n    3: [\"Invalid Input\",\r\n        \"A value, which is not a [String], [Number], [Element] (html), [Function], [Object] or [Array], was passed into Modular.core.getHtml().\",\r\n        \"( Modular.core.getHtml() was called by Modular.render() )\",\r\n        \"This error might be caused by a invalid child-element in Modular.render() or Modular.el().\",\r\n        \"Modular does not know how how to handle this.\",\r\n        \"core.getHtml\"],\r\n\r\n    4: [\"Invalid or Missing Input\",\r\n        \"Unable to scan.\",\r\n        \"A invalid value was passed into Modular.scan().\",\r\n        \"Modular.scan() expects a [String].\",\r\n        \"scan\"],\r\n\r\n    5: [\"Missing TagName\",\r\n        \"Unable to create Modular element.\",\r\n        \"Missing tag.\",\r\n        \"( The tag of a Modular-element is the first attribute of Modular.el() )\",\r\n        \"el\"],\r\n\r\n    6: [\"Invalid Style\",\r\n        \"Unable to convert given value to inline style.\",\r\n        \"A value passed into Modular.core.getStyle() could not be converted into inline style.\",\r\n        \"Modular.core.getStyle() expects a [String] (already containing inline style), an [Object] (containing valid style) or a [Funtion] (returning an object that contains valid style)\",\r\n        \"core.getStyle\",\r\n        \"el\"],\r\n\r\n    7: [\"Invalid Input\",\r\n        \"Unable to render.\",\r\n        \"Modular.render() is missing a root-element or a container-element\",\r\n        \"( A root-element can be: a [Modular-element], [String], [Number], [Element] (html), [Array] (which conatins any of the mentioned) or [Function] (which returns any of the mentioned) )\",\r\n        \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\",\r\n        \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\",\r\n        \"render\"],\r\n\r\n    8: [\"Invalid Render-Container\",\r\n        \"Unable to render\",\r\n        \"Modular.render() recieved an invalid container-element.\",\r\n        \"A container-element has to be an html-element or a valid CSS-selector ( [String] ).\",\r\n        \"Keep in mind - if the container-element is not a child of the page, you propably won't be able to see much.\",\r\n        \"render\"],\r\n\r\n    9: [\"Unknown Binding-Name\",\r\n        \"Unable to set binding.\",\r\n        \"Modular.setBinding() recieved an unknown binding-name.\",\r\n        \"Bindings are created during render - maybe you should try setting the binding after Modular.render() is called.\",\r\n        `The \"mRendered\" event might help with timing.`,\r\n        \"setBinding\"],\r\n\r\n    10: [\"Unknown Binding-Name\",\r\n        \"Could not find binding.\",\r\n        \"Modular.getBinding() recieved an unknown binding-name.\",\r\n        \"Bindings are created during render - maybe you should try getting the binding after Modular.render() is called.\",\r\n        `The \"mRendered\" event might help with timing.`,\r\n        \"getBinding\"],\r\n\r\n    11: [\"Unknown Binding-Name\",\r\n        \"Could not find binding.\",\r\n        \"Modular.listenBinding() recieved an unknown binding-name.\",\r\n        \"Bindings are created during render - maybe you should try listening the binding after Modular.render() is called.\",\r\n        `The \"mRendered\" event might help with timing.`,\r\n        \"listenBinding\"]\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (errors);\n\n//# sourceURL=webpack:///./dev/errors.js?");

/***/ }),

/***/ "./dev/modular-2.js":
/*!**************************!*\
  !*** ./dev/modular-2.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ \"./dev/errors.js\");\n/* harmony import */ var _el__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./el */ \"./dev/el.js\");\n/* harmony import */ var _core_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./core.js */ \"./dev/core.js\");\n/* harmony import */ var _direct_methods__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./direct-methods */ \"./dev/direct-methods.js\");\n\r\n\r\n\r\n\r\n\r\nconst Modular = {\r\n    data: {\r\n        bindings: {},\r\n        renderedEvent: new Event(\"mRendered\"),\r\n        onRender: new Event(\"mOnRender\"),\r\n        errors: _errors__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\r\n    },\r\n\r\n    getBinding: _direct_methods__WEBPACK_IMPORTED_MODULE_3__[\"getBinding\"],\r\n    setBinding: _direct_methods__WEBPACK_IMPORTED_MODULE_3__[\"setBinding\"],\r\n    listenBinding: _direct_methods__WEBPACK_IMPORTED_MODULE_3__[\"listenBinding\"],\r\n\r\n    core: {\r\n        err: _core_js__WEBPACK_IMPORTED_MODULE_2__[\"err\"],\r\n        getAttr: _core_js__WEBPACK_IMPORTED_MODULE_2__[\"getAttr\"],\r\n        getHtml: _core_js__WEBPACK_IMPORTED_MODULE_2__[\"getHtml\"],\r\n        getStyle: _core_js__WEBPACK_IMPORTED_MODULE_2__[\"getStyle\"],\r\n        makeEl: _core_js__WEBPACK_IMPORTED_MODULE_2__[\"makeEl\"]\r\n    },\r\n\r\n    scan: _direct_methods__WEBPACK_IMPORTED_MODULE_3__[\"scan\"],\r\n    el: _el__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\r\n    render: _direct_methods__WEBPACK_IMPORTED_MODULE_3__[\"render\"]\r\n};\r\n\r\nObject.defineProperty(window, \"Modular\", {\r\n    value: Modular,\r\n    writable: false,\r\n    enumerable: true,\r\n    configurable: false\r\n});\r\n\r\n// Development-build warning\r\nconsole.warn(Modular.core.err(0));\n\n//# sourceURL=webpack:///./dev/modular-2.js?");

/***/ })

/******/ });