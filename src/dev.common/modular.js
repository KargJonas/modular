const core = require("./core");
const methods = require("./methods");
const data = require("./data");
const el = require("./el");
const router = require("./router");
const scan = require("./scan");

const Modular = {
  // Events, bindings and error-messages
  data: data,

  // The core
  core: core,

  // Methods
  getBinding: methods.getBinding,
  setBinding: methods.setBinding,
  listenBinding: methods.listenBinding,
  render: methods.render,
  el: el,
  scan: scan,
  router: router
};

module.exports = Modular;