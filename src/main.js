
function TestComp() {
    return [
        Modular.el("input", { $bind: "myBinding", placeholder: "Input", value: "test" }),
        Modular.el("h1", { $bind: "myBinding" })
    ];
}

const t = performance.now();
Modular.render(TestComp, "#root");
console.log(performance.now() - t);