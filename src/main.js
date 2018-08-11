let style = {
    display: "inline-flex",
    margin: 0
};

function MyComponent() {
    return [
        Modular.el("input", {
            type: "text",
            style: style,
            $bind: {
                value: "textboxBinding",
            }
        }),

        Modular.el("input", {
            type: "checkbox",
            style: style,
            $bind: {
                checked: "textboxBinding",
            }
        }),
    ];
}

const t = performance.now();
Modular.render(
    MyComponent,
    document.querySelector("#root"),
);
console.log(performance.now() - t);

Modular.listenBinding("textboxBinding", val => console.log(val));