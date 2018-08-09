let testBind = "Hello World";

function TestComp() {
    return [
        Modular.el("input", { placeholder: "Input", $bind: testBind }),
        Modular.el("h1", { $bind: testBind }, "Hello World")
    ];
}

const t = performance.now();
Modular.render(TestComp, "#root");
console.log(performance.now() - t);