function Button( text, func, _size ) {
  const size = _size || 1;

  return Modular.el(
    "button",
    {
      onclick: func,

      style: {
        border: `${ size }px solid #5cb85c`,
        padding: `${ size * 5 }px ${ size * 12 }px`,
        borderRadius: `${ size * 3 }px`,
        fontSize: `${ size * 14 }px`,
        backgroundColor: "#fff",
        color: "#3a963a",
        outline: "none",

        ":hover": {
          borderColor: "#3a963a",
          color: "#eee",
          backgroundColor: "#5cb85c"
        }
      }
    },
    text || "[No Text]"
  );
}