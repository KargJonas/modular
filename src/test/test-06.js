const m = new Modular();

const myEl = m.el(
  "h1",
  { style: "color:red" },
  "Test"
);

const myEl2 = m.el(
  "h1",
  { style: "color:green" },
  "Test"
);

m.router.routes = {
  "/test": myEl,
  "/src/test/index.html": myEl2
};

window.addEventListener( "click", () => m.router.navigate( "/test" ) );

window.addEventListener( "newroute", () => {
  m.render(
    m.router.page,
    "#root"
  );
} );

m.router.init();