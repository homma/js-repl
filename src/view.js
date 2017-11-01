/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const repl = jsrepl.repl;

repl.prototype.resetEditArea = function() {

  this.editArea.innerHTML = "";
  // this.resetCaret();

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

repl.prototype.clearScreen = function() {

  const h = this.height - this.editArea.offsetHeight;
  this.paddingArea.style.height = h + "px";
  // this.view.scrollTop = this.view.scrollHeight;
  this.view.scrollTop = 100;

  if(jsrepl.config.debug) {
    console.log("clear screen");
    console.log(this.height);
    console.log(this.view.clientHeight);
    console.log(this.view.offsetHeight);
    console.log(this.view.scrollHeight);
    console.log(this.view.scrollTop);
    console.log(this.editArea.clientHeight);
    console.log(this.editArea.offsetHeight);
    console.log(this.paddingArea.clientHeight);
  }

}

repl.prototype.handleCancel = function() {

  const log = new jsrepl.log(this);
  this.currentLog = log;

  const code = this.editArea.innerText;
  log.code(code);

  log.display();

  this.resetEditArea();

}

repl.prototype.handleIllegalCodeError = function() {

  const log = new jsrepl.log(this);
  this.currentLog = log;

  const code = this.editArea.innerText;

  log.code(code);
  log.result("Error: Unexpected token ILLEGAL");

  log.display();

  this.resetEditArea();

}

} // namespace boundary
