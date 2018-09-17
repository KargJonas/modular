const myEl = Modular.el("h1", {style: {color: "red"}}, "Test 1");

const myOtherEl = Modular.el(
  "h1",
  { style: "color:green" },
  "This is another test"
);

Modular.render( [myEl, myOtherEl], "#root" );