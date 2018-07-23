// Here are our users stored
let users = ["Bill", "Hopper", "Mark", "Linus"];

// A regular function that acts as our component
function MyComponent(props) {
    // Cloning the users array so that it wont be changed
    let userElements = users.slice();

    // Creating Modular-elements
    userElements = userElements.map(user => Modular.el(
        "h1", null, `${props.greeting}, ${user}`
    ));

    // Returning a div with all user elements inside.
    return Modular.el("div", null, userElements);
}

// Running MyComponents and inserting it into <div id="root">
Modular.render(
    Modular.el("MyComponent", { greeting: "Hey" }),
    document.querySelector("#root"),
);