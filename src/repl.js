/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const h = jsutils.hyperscript;

const repl = function(root) {

  this.root = root;
  this.width = root.clientWidth;
  this.height = root.clientHeight;

  this.view = null;
  this.logArea = null;
  this.currentArea = null;
  this.prompt = null;
  this.editArea = null;
  this.paddingArea = null;
  this.sandbox = null;

  this.currentLog = null;

  this.init();

};

global.repl = repl;

repl.prototype.init = function() {

  this.createView();

  this.view = document.getElementById("view");
  this.logArea = document.getElementById("logArea");
  this.currentArea = document.getElementById("currentArea");
  this.prompt = document.getElementById("prompt");
  this.editArea = document.getElementById("editArea");
  this.paddingArea = document.getElementById("paddingArea");
  this.sandbox = document.getElementById("sandboxFrame").contentWindow;

  this.createSandbox();

  this.editArea.focus();

}

repl.prototype.createView = function() {

  // HyperScript Notation
  const html = h(
    "div#view",
    {style: {"width": this.width,
             "height": this.height,
             "overflow-x": "visible",
             "overflow-y": "auto"}},
    h("div#logArea",
      {style: {"width": this.width}}),
    h("div#currentArea",
      {style: {"width": this.width}},
      h("div#prompt",
        config.prompt,
        {style: {"color": "black",
                 "background-color": "white",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "margin-right": "8px",
                 "font-family": "monospace"}}),
      h("div#editArea",
        {contentEditable: true,
         style: {"color": "black",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "font-family": "monospace"},
         onkeypress: e => this.onEditAreaKeyPress(e),
         onkeydown: e => this.onEditAreaKeyDown(e)
        })),
    h("div#paddingArea"),
    h("iframe#sandboxFrame",
      {style: {display: "none"}})
    )   

  this.root.appendChild(html);

}

repl.prototype.createSandbox = function() {

  global.sandbox.init(this);

}

repl.prototype.processCode = function(code) {

  const log = new global.log(this);
  this.currentLog = log;

  const result = this.evalCode(code);

  log.code(code);
  log.result(result);
  log.display();

  this.resetEditArea();

}

repl.prototype.evalCode = function(code) {

  let result = "";

  try {

    result += this.sandbox.eval(code);

  } catch(e) {

    result += e;

  }

  return result;

}

} // namespace boundary
