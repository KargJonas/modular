class Comp {
  constructor() {
    Object.defineProperty(this, "__conf", {
      writable: false,
      value: {}
    });

    this.setState();
  }

  setState(newState = {}) {
    if (this.state) {
      Object.assign(this.state, newState);
      return;
    }

    // Called on state change
    function set(target, key, value) {
      console.log("The state has changed ...");

      if (value instanceof Object) {
        target[key] = proxify(value);
      } else {
        target[key] = value;
      }

      return value;
    }

    // Make proxy out of arrays or objects
    function proxify(object) {
      if (object instanceof Array) {
        return object.map(object => proxify(object));
      } else {
        return new Proxy(object, { set });
      }
    }

    // Defining the state
    Object.defineProperty(this, "state", {
      writable: false,
      value: proxify(newState)
    });
  }
}

export default Comp;