const btnStyle = {
  userSelect: "none",
  backgroundColor: "#4286f4",
  border: "none",
  padding: "5px 15px 3px 15px",
  borderRadius: "7px",
  outline: "none",
  fontSize: "20px",
  color: "#fff",
  boxShadow: "0 0 8px #777",
  margin: "15px"
};

let showSuccess = false;

function Button(text, callback) {
  return Modular.el("button", {
    onmouseover() {
      this.style.boxShadow = "0 0 4px #000";
    },
    onmouseout() {
      this.style.boxShadow = "0 0 8px #777";
    },
    onclick: callback,
    style: btnStyle
  }, text)
}

function Success() {
  return Modular.el("h2", {
    $bind: {
      style: "showSuccess"
    },
  }, "Success.");
}

function App() {
  return [
    Modular.el("h1", null, "Hello World!"),
    Button("Click this button for success in life!", () => {
      showSuccess = !showSuccess;
      Modular.setBinding("showSuccess", showSuccess ? "display: block" : "display: none");
    }),
    Button("This is another button.", () => console.log("Hey")),
    Button("Yet another button.", () => console.log("Hello")),
    Success
  ];
}

const t = performance.now();
Modular.render(
  App,
  document.querySelector("#root"),
);
console.log(performance.now() - t);

Modular.setBinding("showSuccess", "display: none");