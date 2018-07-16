let p = performance.now()

function myComp(props) {
    let elements = "";

    for (let i = 0; i < props.amount; i++) {
        elements += tag("div", true, i + 1);
    }

    return elements;
}

function render() {
    Modular.render(
        tag("myComp", {amount: 100}, true),
        document.querySelector("#root"),
    );
}

render();

console.log(performance.now() - p);

// window.addEventListener("click", render);
window.addEventListener("resize", render);