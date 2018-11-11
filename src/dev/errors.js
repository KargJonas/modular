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

// console.warn("🚨 (Modular): [Info]\n\n--> You are using the development build of Modular. Make sure to use the production build when deploying this app.");

export { errors };