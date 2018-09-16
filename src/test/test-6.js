const myEl = Modular.el(
  "div",
  { style: "color:red" },
  "Test"
);

Modular.router.routes = {
  "/test": "Hey",
  "/src/test/index.html": myEl
};

window.addEventListener( "click", () => Modular.router.navigate( "/test" ) );

window.addEventListener( "newroute", () => {
  Modular.render(
    Modular.router.page,
    "#root"
  );
} );

Modular.router.init();