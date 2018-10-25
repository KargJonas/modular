const el = Modular.el(
  "div",
  null,

  Button("This is a test", () => console.log('lol - the btn was clicked..'), 1)
);

function render() {
  Modular.render([el, el, el], "#root");
}

Modular.render(render, "#root");