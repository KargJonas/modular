# Modular 2
### Modular 2 is a very thin layer of automation in UI-creation.<br>
### It allows you to do many things that frameworks such as React allow you to do, just in a smaller form-factor.<br>
### Unlike Modular.js, Modular 2 does not require the explicit creation of components. Instead all a component is, is a function, that returns a value.

## Modular.el():
Modular.el() returns an object that can be transformed into an HTML-Sting by `Modular.render()`.<br>
It is used as a supplement to HTML in your code.
### usage:
```js
Modular.el(TAGNAME, ATTRIBUTES, CONTENT);
```
- TAGNAME: The tag for your HTML-element ( e.g.: `h1`, `div`, `p`, `my-component`, ... ).
- ATTRIBUTES: The attributes of the element. Has to be an object ( e.g.: `{ id: "test-el", style: "color: #fff" }` ).
- CONTENT: The innerHTML of your element. Can be a string, number, Modular.el(...) or an array containing any of the before mentioned. ( `e.g.: ["Hello", Modular.el("Haha"), 9, ["Test1", "Test2"]]` ).