const header = Modular.scan(
  `
  <h1 id="test-header">This is a test-header</h1>
  <p>Test</p>
  Text-node

  <div>
    Test
  </div>
`
);

function App() {
  return header;
}

Modular.render(App, "#root");