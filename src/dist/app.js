let style = {
    display: "inline-flex",
    margin: 0
};

function MyComponent() {
    return [
        Modular.el("input", {
            type: "checkbox",
            style: style,
            $bind: {
                checked: "textboxBinding",
            }
        }),

        Modular.el("p", {
            style: style,
            $bind: {
                innerHTML: "textboxBinding",
            }
        }, "false")
    ];
}

const t = performance.now();
Modular.render(
    MyComponent,
    document.querySelector("#root"),
);
console.log(performance.now() - t);