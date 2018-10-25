const el = Modular.el(
  "div",
  null,

  Button("This is a test", () => console.log('lol - the btn was clicked..'), 1)
);

const p = performance.now();
Modular.render([el, el, el], "#root");
console.log(performance.now() - p);