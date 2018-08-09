let users = ["Bill", "Hopper", "Mark", "Linus"];

function MyComponent() {
    return users.map(user => Modular.el("li", null, user));
}

Modular.render(
    MyComponent,
    document.querySelector("#root"),
);