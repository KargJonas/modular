function NotFound() {
    return Modular.el("div", {
        style: {
            position: "absolute",
            fontSize: "50px",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center"
        }
    },
        Modular.el("h1", {
            style: {
                fontSize: "150px",
                margin: 0,
                padding: 0
            }
        }, 404),

        Modular.el("h2", {
            style: {
                margin: 0,
                padding: 0
            }
        }, "Page not found")
    );
}

const mainPage = Modular.scan(`
    <h1 style='font-size:50px;text-align:center'>
        Hey!
    </h1>
    <h2 style='text-align:center'>
        This is a page.
    </h2>
`);

Modular.router.routes = {
    "/src/build/index.html": mainPage,
    "/src/build": mainPage,
    "**": NotFound
};

window.addEventListener("newroute", () => {
    Modular.render(
        Modular.router.page,
        "#root"
    );
});

Modular.router.init();

document.addEventListener("click", () => {
    Modular.router.navigate("/test");
});