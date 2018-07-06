let names = ["Felix", "Tobias", "Lukas", "Simon", "Samuel", "Julian", "Mischa"];
var js_variable = "#cdc";

function welcome(props) {
    let nameElement = props.names.map(name => {
        let myEl = <h2 onClick="console.log('Test');">Hey, ${name}</h2>;
        return myEl;
    });

    return nameElement;
}

Modular.render({
    elements: [<welcome names={names} />],
    container: document.querySelector("#root")
});