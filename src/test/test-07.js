const m = new Modular();

const myEl = m.el(
  "h1",
  { style: "color:red" },
  "Test"
);

m.render(myEl, "#root");