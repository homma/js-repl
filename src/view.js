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
    if(code != null) {

      jsrepl.debug(0, code);
      this.editArea.innerHTML = code;
      this.setCaretAtEnd();

    }
}

repl.prototype.setEditAreaNext = function() {

    const code = this.history.next();
    this.editArea.innerHTML = code;

}

repl.prototype.setCaret = function(pos) {

  const elem = this.editArea;
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStart(elem.firstChild, pos);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);

}

repl.prototype.resetCaret = function() {

  const pos = 0;

  this.setCaret(pos);

}

repl.prototype.setCaretAtEnd = function() {

  const pos = this.editArea.innerHTML.length;

  this.setCaret(pos);

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
