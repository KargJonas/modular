const el = require("./el");

// Converts a (html) string into a Modular-element
function scan( val ) {
  // Validating input
  if ( val.constructor !== String ) {
    throw new Error( core.err( 4 ) );
  }

  // Creating a wrapper
  let wrapper = document.createElement( "div" );
  wrapper.innerHTML = val.trim();

  // Mapping all nodes in the wrapper
  const res = Array.from( wrapper.childNodes ).map( node => {
    if ( node instanceof Element ) {
      return el( node.tagName, core.getAttr( node.attributes ), scan( node.innerHTML ) );
    } else return node.textContent;
  } );

  return res;
}

module.exports = scan;