import el from "./el";
import router from "./router";
import {
  getBinding,
  setBinding,
  listenBinding,
  scan,
  render
} from "./methods";

const Modular = {
  getBinding,
  setBinding,
  listenBinding,
  scan,
  render,
  el,
  router
};

export default Modular;