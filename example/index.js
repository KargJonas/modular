let users = ["Bill", "Hopper", "Mark", "Linus"];
let userStyle = {
    borderBottom: "2px solid #333333",
    paddingRight: "5px",
    width: "max-content"
};

function User(name) {
    return Modular.el(
        "li",
        { style: userStyle },
        name
    );
}

function List() {
    return users.map(user => User(user));
}

Modular.render(List, "#root");