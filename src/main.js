let testBind = "Hello World";

function TestComp() {
    return [
        Modular.el("input", { $bind: testBind, placeholder: "Input" }),
        Modular.el("h1", { $bind: testBind })
    ];
}

const t = performance.now();
Modular.render(TestComp, "#root");
console.log(performance.now() - t);