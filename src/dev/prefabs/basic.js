function MdlBtn(text, callback, props) {
    return Modular.el(
        "button",
        Object.assign({
            onclick: callback,
            style: {
                padding: "10px",
                border: "none",
                borderRadius: "13px",
            }
        }, props || {}),
        text
    )
}

export { MdlBtn };