let names = ["Felix", "Tobias", "Lukas", "Simon", "Samuel", "Julian", "Mischa"];
var js_variable = "#cdc";

let obj = {
    el1: <h1>Test</h1>
};

let welcome = (props) => {
    let nameElement = props.names.map(name => {
        return <h2 onClick="console.log('Test');">Hey, ${name}</h2>
    });

    return nameElement;
}

Modular.render({
    elements: [
        <welcome names={names} />,
        <welcome names={names} />
    ],
    container: document.querySelector("#root")
});