import { data } from "./data";
import el from "./el";

import {
  err,
  getAttr,
  getHtml
} from "./core";

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

// Converts a (html) string into a Modular-element
function scan( val ) {
  // Validating input
  if ( val.constructor !== String ) {
    throw new Error( err( 4 ) );
  }

  // Creating a wrapper
  let wrapper = document.createElement( "div" );
  wrapper.innerHTML = val.trim();

  // Mapping all nodes in the wrapper
  const res = Array.from( wrapper.childNodes ).map( node => {
    if ( node instanceof Element ) {
      return el( node.tagName, getAttr( node.attributes ), scan( node.innerHTML ) );
    } else return node.textContent;
  } );

  return res;
}

// The method for rendering stuff
function render( element, _container ) {
  // Resetting temporary values
  data.tempStyle.push( "" );
  data.tempElCount.push( 0 );

  // Dispatching the prerender event
  window.dispatchEvent( data.preRender );

  if ( !element || !_container ) throw new Error( err( 7 ) );
  let container;

  // Handling container selector-string
  if ( _container.constructor === String ) {
    container = document.querySelector( _container );
  } else container = _container;

  // Validating container
  if ( !( container instanceof Element ) ) {
    throw err( 8 );
  }

  // Adding the rendered content
  container.innerHTML = "";
  container.appendChild( getHtml( element ) );

  // Adding the style
  data.styleElement.innerHTML = data.tempStyle[data.tempStyle.length - 1];
  data.tempStyle.pop();
  data.tempElCount.pop();

  // Dispatching the postrender event
  window.dispatchEvent( data.postRender );
}

export {
  getBinding,
  setBinding,
  listenBinding,
  scan,
  render
};