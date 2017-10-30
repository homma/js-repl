/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const h = global.hyperscript;

function repl(root) {

  this.root = root;
  this.view = null;
  this.logArea = null;
  this.currentArea = null;
  this.prompt = null;
  this.editArea = null;
  this.paddingArea = null;
  this.sandbox = null;

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

  this.editArea.focus();

}

repl.prototype.createView = function() {

  // HyperScript Notation
  const html = h("div#view",
                 {style: {"width": this.root.clientWidth,
                          "height": this.root.clientHeight,
                          "overflow": "auto"}},
                 h("div#logArea"),
                 h("div#currentArea",
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
                      onkeypress: e => this.onEditAreaKeyPress(e)
                     })),
                 h("div#paddingArea"),
                 h("iframe#sandboxFrame",
                   {style: {display: "none"}})
               )

  this.root.appendChild(html);

}

repl.prototype.resetCaret = function() {

  const pos = 0;

  const range = document.createRange();
  // const node = this.editArea.firstChild;
  // const node = this.editArea.item(0);
  const node = this.editArea;
  // range.setStart(node, pos);
  // range.setEnd(node, pos);
  range.selectNode(node);
  range.collapse(true);

  // const sel = window.getSelection();
  // sel.removeAllRanges();
  // sel.addRange(range);

}

repl.prototype.onEditAreaKeyPress = function(e) {

  // console.log(e);

  if( e.keyCode == 13) { // Enter

    const code = this.editArea.innerText;

    const result = this.evalCode(code);

    this.appendLog(code);
    this.appendResult(result);

    this.editArea.innerHTML = "";
    // this.resetCaret();
  }

}

repl.prototype.evalCode = function(code) {

  let result = null;

  try {

    result = this.sandbox.eval(code);
    // console.log("result: ", result);

  } catch(e) {

    result = e;
    // console.log("error", e);

  }

  // const ret = toString.call(result) + ": " + result;
  const ret = "" + result;
  return ret;

}

repl.prototype.appendLog = function(code) {

  const elem = this.createLogElem(code);
  this.view.insertBefore(elem, this.currentArea);

}

repl.prototype.createLogElem = function(logText) {

  const html = h("div.log",
                 h("div.logPrompt",
                   config.prompt,
                   {style: {"color": "black",
                            "background-color": "white",
                            "display": "inline-block",
                            "vertical-align": "top",
                            "margin-right": "8px",
                            "font-family": "monospace"}}),
                  h("div.logText",
                    logText,
                    {style: {"color": "black",
                             "display": "inline-block",
                             "vertical-align": "top",
                             "font-family": "monospace"}})
               )

  return html;
 
}

repl.prototype.appendResult = function(result) {

  const elem = this.createResultElem(result);
  this.view.insertBefore(elem, this.currentArea);

}

repl.prototype.createResultElem = function(logText) {

  const html = h("div.log",
                 h("div.logPrompt",
                   config.resultPrompt,
                   {style: {"color": "black",
                            "background-color": "white",
                            "display": "inline-block",
                            "vertical-align": "top",
                            "margin-right": "8px",
                            "font-family": "monospace"}}),
                  h("div.logText",
                    logText,
                    {style: {"color": "black",
                             "display": "inline-block",
                             "vertical-align": "top",
                             "font-family": "monospace"}})
               )

  return html;
 
}

} // namespace boundary
