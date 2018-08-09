function TestComp() {
    return [
        Modular.el("h1", { $bind: "myBinding" }),
        Modular.el("input", { $bind: "myBinding", placeholder: "Input", value: "Test" })
    ];
}

const t = performance.now();
Modular.render(TestComp, "#root");
console.log(performance.now() - t);