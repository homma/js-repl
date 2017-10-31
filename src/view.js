/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const repl = global.repl;

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

  console.log("clear screen");
  // to be implemented

}

repl.prototype.handleCancel = function() {

  const log = new global.log(this);
  this.currentLog = log;

  const code = this.editArea.innerText;
  log.code(code);

  log.display();

  this.resetEditArea();

}

repl.prototype.handleIllegalCodeError = function() {

  const log = new global.log(this);
  this.currentLog = log;

  const code = this.editArea.innerText;

  log.code(code);
  log.result("Error: Unexpected token ILLEGAL");

  log.display();

  this.resetEditArea();

}

} // namespace boundary
