/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const repl = jsrepl.repl;

repl.prototype.resetEditArea = function() {

  this.resetCaret();
  this.editArea.innerHTML = "";
  // this.editArea.textContent = "";

  jsrepl.debug(0, this.editArea.innerText);

}

repl.prototype.setEditAreaPrevious = function() {

    const code = this.history.previous();
    if(typeof code != null) {

      this.editArea.innerHTML = code;

    }
}

repl.prototype.setEditAreaNext = function() {

    const code = this.history.next();
    if(typeof code != null) {

      this.editArea.innerHTML = code;

    }
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

  jsrepl.debug(0, this.editArea.innerText);

}

repl.prototype.clearScreen = function() {

  const h = this.height - this.editArea.offsetHeight;
  this.paddingArea.style.height = h + "px";
  document.body.scrollTop = 1000;

  // this.view.scrollTop = this.view.scrollHeight;
  // this.view.scrollTop = 100;
  // this.paddingArea.scrollIntoView();

  // this.editArea.scrollIntoView(true);

  jsrepl.debug(0, "clear screen");
  jsrepl.debug(0, this.height);
  jsrepl.debug(0, this.view.clientHeight);
  jsrepl.debug(0, this.view.offsetHeight);
  jsrepl.debug(0, this.view.scrollHeight);
  jsrepl.debug(0, this.view.scrollTop);
  jsrepl.debug(0, this.editArea.clientHeight);
  jsrepl.debug(0, this.editArea.offsetHeight);
  jsrepl.debug(0, this.paddingArea.clientHeight);

}

repl.prototype.handleCancel = function() {

  const log = new jsrepl.log(this);
  this.currentLog = log;

  const code = this.editArea.innerText;

  this.history.push(code);
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
