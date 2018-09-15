const style = "color: red";

const myEl = Modular.el(
    "div",
    { style: style },
    Modular.el(
        "h1",
        null,
        "Hello!"
    )
);

Modular.render(myEl, "#root");