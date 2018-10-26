function el(i) {
  return Modular.el(
    "h1",
    {
      style: {
        color: "red",

        ":hover": {
          color: "blue"
        }
      }
    },
    `Test ${ i }`
  )
}

function Page() {
  const res = [];

  for (let i = 0; i <= 20; i++) {
    res.push(el(i));
  }

  return res;
}

const p = performance.now();
Modular.render(Page, "#root");
console.log(performance.now() - p);