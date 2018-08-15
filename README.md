# This documentation is uncomplete.

## Modular-2 is a little tool for dynamic, component-based UI-generation.<br>
#### " It's a little (more than a) temlating system. "
<hr>

## Modular.el():
`Modular.el()` returns a Modular-element, that can be transformed into HTML with `Modular.render()`.

## Usage:
```js
Modular.el(TAGNAME, ATTRIBUTES, CONTENT, CONTENT, ...);
```
- <b>TAGNAME</b> <i style="color:#4286f4">(String)</i>: The tag for your HTML-element ( e.g.: `h1`, `div`, `p`, `myCustomTagName`, ... ).

- <b>ATTRIBUTES</b> <i>(Object | Null)</i>: The attributes of the element. Has to be an `object` or `null`. You can use an object for style, it will automatically be transformed into inline style. Or you could just use a string. ( e.g.: `{ id: "test-el", style: { color: "#f00" } }` ).<br>There are some special attributes such as `$bind` or `__config__`. (See: [Bindings](#Bindings) and [__config__](#config)).

- <b>CONTENT</b> <i>(Null | Undefined | String | Number | Array | Object | Function)</i>: The content of your element. Can be a string, number, Modular.el(...), function or an array containing any of the before mentioned. ( `e.g.: ["Hello", Modular.el("Doe"), 9, ["Test1", "Test2"], "Test", MyFunction, myVariableString]` ).

## Example:
```js
let myElement = Modular.el("div", { style: "background-color: #9ff" }, "Hello World");
```
<hr>

## Modular.render()
Inserts the rendered content of a value (String, modular element, array, number, function, ...) into a DOM-element.
### Usage:
```js
Modular.render(
    VALUE,
    ELEMENT/SELECTOR
);
```
- VALUE: A single modular element (created by Modular.el) or a function.
- DOM_ELEMENT: The element, the modular element will be inserted into.

### Example:
```js
Modular.render(
    Modular.el("h1", null, "Test"),
    document.getElementById("root");
);
```
<hr>

## Components:
When a function's name is written in uppercase, (e.g. `function MyFunc () {}`) it qualifies as a "modular-function". If a modular element has the tagname of such a function, the elements content will be the functions returned value. There will be an object passed into the function, when it is called. The object contains all of the arguments of the modular element. If a function is directly passed as content into `Modular.el` the function will be called without arguments.
### Usage:
```js
function FUNCTION_NAME(ELEMENT_ARGUMENTS) {
    ...
    return CONTENT;
}

Modular.el(FUNCTION_NAME, ELEMENT_ARGUMENTS);
// or
FUNCTION_NAME
```

### Example:
```js
function MyElement(props) {
    return Modular.el("h1", null, props.value);
}

Modular.render(
    Modular.el("MyElement", { value: "My name is bob." }),
    document.getElemenById("root");
);
```
<hr>

## Bindings
Bindings are a way to "tie" an eelement's properties to a value. You could even bind an element's preperties to the ones of another element.

## __config__
Every modular element is an object, which contains all attributes of the corresponding DOM-element and a spaecial `__config__` attribute. `__config__` contains the `tagName` and the `content` of the element but also some other stuff such as the type of the Modular-element, the render method, the element's bindings, the DOM-element and the element's redner-method itself.

### But why is this useful?
This allows you to create dynamic website content and to reuse parts of your code somewhere else without major modification.<br>
### Example use-case:
You have an array of 1000 users. You want to display every user in a list and you want to be able to delete and add users to that list dynamically. Also you want that all premium users have a shared tag.
<br>
This can be done with something like PHP but it is very resource intensive for the server if this has to be done every single time someone looks at the page - why not do this work on the users computer?<br>
> A similar example can be found in /example.