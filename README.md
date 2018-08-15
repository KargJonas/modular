## Modular-2 is a tool for dynamic, component-based UI-generation.<br>
#### " It's a little (more than a) temlating system. "
<hr>

## Modular.el():
Returns a `Modular-element`, that can be transformed into a `DOM-element` with `Modular.render()`.

## Usage:
```js
Modular.el(TAGNAME, ATTRIBUTES, CONTENT, CONTENT, ...);
```

- <b>TAGNAME</b> <i>(String)</i>:<br>The element's `tagName`.<br>( e.g.: `h1`, `div`, `p`, `myCustomTagName`, ... ).

- <b>ATTRIBUTES</b> <i>(Object | Null)</i>:<br>The attributes of the element. <br>There are some special attributes such as [style](#Style), [$bind](#Bindings) and [\_\_config\_\_](#__config__).

- <b>CONTENT</b> <i>[ String | Number | Array | Object (Modlar-element) | Function | Element (html) | Null ]</i>:<br>The content of the element. You can use basically anything as content.

## Example:
```js
let myElement = Modular.el("div",
    { style: "background-color: #9ff" },
    "Hello World"
);

// Turns into this when rendered:
// <div style="background-color: #9ff">Hello World</div>
```
or
```js
let myOtherElement = Modular.el("input", {
    type: "text",
    style: {
        outline: "none",
        border: "none",
        backgroundColor: "#bfbfc9"
    }
});

// Turns into this when rendered:
// <input type="text" style="outline:none;border:none;background-color:#bfbfc9">
```
<hr>

## Modular.render()
Converts a value into a DOM-Element and inserts it into another element.

## Usage:
```js
Modular.render(VALUE, ELEMENT/SELECTOR);
```
- VALUE <i>[ String | Number | Array | Object (Modlar-element) | Function | Element (html) | Null ]</i>:<br>The element that will be "rendered"
- ELEMENT/SELECTOR <i>(Element | String)</i>: The parent/container-element or it's selector.

## Example:
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    document.getElementById("root");
);
```
or
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    "#root"
);
```
<hr>

## Components:
A component could be a method, an element, an array of methods, strings, arrays, ... whatever. It's your choice.

A good practice however would be to put major parts of your page into functions. For example, you could put the topbar of a page into a Function:
```js
// This is your topbar
function Topbar() {
    return Modular.el(...);
}

// Rendering the topbar
Modular.render(Topbar, "#rootElement");
```

Also, it's a good idea to put elements, that you commonly use into a function and use arguments to customize the element's properties.
```js
// This is just some style.
let myButtonStyle = {
    outline: "none"
}

// This is your Button-component
function Button(text, callback) {
    return Modular.el("button", {
        style: myButtonStyle,
        onclick: callback
    }, text);
}
```
This has the benefit of reducing code. Now you can have a million buttons if you like and you will still know, what is gong on.
```js
Modular.render(
    // This is an array with some buttons
    [
        Button("This is my first button.",
        () => console.log("Button 1 was pressed.")),

        Button("This is my second button.",
        () => console.log("Button 2 was pressed.")),
    ],
    "#rootElement"
);
```

<hr>

## Style
Modular has some stuff to offer that might help you with dynamic styles:
- If you want, you can use style-objects. Style objects will be transformed into inline-style, when the element is rendered.
  
- You can use functions as style. This might seem silly but it makes your code more readable.<br><i>Remember: Style functions must return either a string or an Object.</i>

## Bindings
Bindings are a way to "tie" an element's properties to a value. You could even tie an element's properties to the ones of another element.<br>

To define a Modular-element's bindings, you can use the `$bind`-attribute. The attribute's value must be an object. Each key in the object correnponds to a property of the DOM-element, that is created from Modular.el() and each value is the name of a binding, the property will be bound to.<br>

Every time any changes occur in either in the binding or any of the elements, everything is updated (<b>But not re-rendered!</b>).
### Example
```js
// An input, that is bound to "myBinding"
let myInput = Modular.el("input", {
    type: "text",
    style: "outline: none",

    // This is where the magic happens
    $bind: {
        value: "myBinding"
    }
});

// A paragraph that is also bound to "myBinding"
let myParagraph = Modular.el("p", {
    $bind: {
        innerHTML: "myBinding"
    }
}, "This is just a placeholder!");

// Rendering everything
Modular.render(
    [myInput, myParagraph],
    "#myContainerElement" // This in in your HTML
);
```

## Modular.getBinding()
Allows you to get the current value of a binding.
### Example
```js
let myVariable = Modular.getBinding("myFirstBinding");
```

## Modular.setBinding()
Allows you to set the current value of a binding.
### Example
```js
Modular.setBinding("mySecondBinding", "This is the binding's new content.");
```

## Modular.listenBinding()
Runs the given function every time a change occurs in the specified binding. (You can have as many of these as you want.)
### Example
```js
Modular.listenBinding("myOtherBinding", (newValue, event) => {
    console.log("myOtherBinding just changed to " + newValue);
});
```

## \_\_config\_\_
Every modular element is an object, which contains all attributes of the corresponding DOM-element and a spaecial `__config__` attribute. `__config__` contains the `tagName` and the `content` of the element but also some other stuff such as the type of the Modular-element, the render method, the element's bindings, the DOM-element and the element's render-method itself.

### But why is this useful?
This allows you to create dynamic website content and to reuse parts of your page (components) without major modification.<br>
### Example use-case:
You have an array of 1000 users. You want to display every user in a list and you want to be able to delete and add users in that list dynamically. Also you want that all premium users have a shared tag.