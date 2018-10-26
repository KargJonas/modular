const data = require("./data");
const core = require("./core");

// Set the value of a binding
function setBinding( binding, value ) {
  if ( !data.bindings[binding] ) {
    data.bindings[binding] = {
      elements: [],
      lastValue: undefined,
      value: undefined,
      listeners: []
    };
  }

  data.bindings[binding].lastValue = data.bindings[binding].value;
  data.bindings[binding].value = value;
  data.bindings[binding].elements.map( element => {
    element.element[element.value] = data.bindings[binding].value;
  } );
}

// Get the value of a binding
function getBinding( binding ) {
  if ( !data.bindings[binding] ) return undefined;
  return data.bindings[binding].value;
}

// Add a listener to a binding
function listenBinding( binding, func ) {
  if ( !data.bindings[binding] ) setBinding( binding, undefined );
  data.bindings[binding].listeners.push( func );
}

// The method for rendering stuff
function render( element, _container ) {
  // Resetting temporary values
  data.tempStyle.push( "" );
  data.tempElCount.push( 0 );

  // Dispatching the prerender event
  window.dispatchEvent( data.preRender );

  if ( !element || !_container ) throw new Error( core.err( 7 ) );
  let container;

  // Handling container selector-string
  if ( _container.constructor === String ) {
    container = document.querySelector( _container );
  } else container = _container;

  // Validating container
  if ( !( container instanceof Element ) ) {
    throw core.err( 8 );
  }

  // Adding the rendered content
  container.innerHTML = "";
  container.appendChild( core.getHtml( element ) );

  // Adding the style
  if (!document.querySelector("style[type='-modular-style-']")) {
    document.head.appendChild(data.styleElement);
  }

  data.styleElement.innerHTML = data.tempStyle[data.tempStyle.length - 1];
  data.tempStyle.pop();
  data.tempElCount.pop();

  // Dispatching the postrender event
  window.dispatchEvent( data.postRender );
}

module.exports = {
  getBinding: getBinding,
  setBinding: setBinding,
  listenBinding: listenBinding,
  render: render
};