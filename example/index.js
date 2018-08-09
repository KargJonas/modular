// Here are our users stored
let users = ["Bill", "Hopper", "Mark", "Linus"];

// A regular function that acts as our component
function MyComponent () {
    return users.map(user => Modular.el("li", null, user));
}

// Rendering everything
Modular.render(
    MyComponent,
    document.querySelector("#root"),
);