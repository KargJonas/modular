const header = Modular.scan(
   `<h1 id="test-header">This is a test-header</h1>` 
);

function App() {
    return header;
}

Modular.render(App, "#root");