console.log("Test");


function MyComponent(props) {
    let arr = [];

    for (let i = 0; i < props.amount; i++) {
        let element = Modular.el(
            "h1",
            null,
            `${props.greeting} ${i + 1}`,
        );

        arr.push(element);
    }

    return Modular.el("div", null, arr);
}

Modular.render(
    Modular.el("MyComponent", { amount: 50, greeting: "Hello" }),
    document.querySelector("#root"),
);