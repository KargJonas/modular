let users = ["Bill", "Hopper", "Mark", "Linus"];

function MyComponent() {
    return users.map(user => [
        Modular.el("li"),
        Modular.el("input", { type: "text", value: user })
    ]);    
}

const t = performance.now();
Modular.render(
    MyComponent,
    document.querySelector("#root"),
);
console.log(performance.now() - t);