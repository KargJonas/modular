const style = {
    "h1": {
        color: "red"
    },

    "h1:hover": {
        color: "green"
    }
};

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