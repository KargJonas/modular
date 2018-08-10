let users = ["Bill", "Hopper", "Mark", "Linus"];

function MyComponent() {
    return users.map(user => [
        Modular.el("li", { $bind: user }),
        Modular.el("input", { $bind: user, type: "text", value: user })
    ]);
}

Modular.render(
    MyComponent,
    document.querySelector("#root"),
);