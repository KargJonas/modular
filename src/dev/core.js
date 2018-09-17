import { data } from "./data";

// Creates an error-string with modular-format
function err( i ) {
  if ( !data.errors ) return "🚨 (Modular): ";

  let args = data.errors[i],
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
    if ( i > 1 && isUpper( input[i] ) && /[a-zA-Z]/.test(input[i]) ) {
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
        pseudoStyle = makeStyle(value);
      }

      pseudos.push( `[data-modular-id="${ id }"]${ key }{${pseudoStyle} }}` );
    } else {
      style += `${ camelToKebab(declaration[0]) }:${ value };`;
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
        style += `[data-modular-id="${ id }"]>${ rule[0] }{${ makeStyle( rule[1] ) }}`;
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
    data.tempElCount++;
    data.tempStyle += getStyle( attributes.style, data.tempElCount );
    attributes["data-modular-id"] = data.tempElCount;

    delete attributes.style;
  }

  // Setting element-attributes
  Object.entries( attributes ).map( attribute => {
    element.setAttribute( attribute[0], attribute[1] );
  } );

  // Set the element's content, if provided
  if ( content ) {
    element.appendChild( content );
  }

  return element;
}

export {
  err,
  getAttr,
  getHtml,
  getStyle,
  makeEl
};