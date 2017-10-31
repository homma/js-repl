/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const repl = global.repl;

repl.prototype.onEditAreaKeyDown = function(e) {

  if(0) {
    console.log(e);
    console.log(e.keyCode);
    console.log(e.key);
  }

  if( e.key == "l" ) {

    if(e.ctrlKey) {
      this.clearScreen();
    }

  }
}

repl.prototype.onEditAreaKeyPress = function(e) {

  if(0) {
    console.log(e);
    console.log(e.keyCode);
    console.log(e.key);
  }

  if( e.key == "Enter" ) {

    this.handleEnterKey();

  } else if( e.key == "c" ) {

    if(e.ctrlKey) {
      this.handleCancel();
    }

  }

}

repl.prototype.handleEnterKey = function() {

  const code = this.editArea.innerText;

  try {
    esprima.parseScript(code);
  } catch(e) {
    return;
  }

  const log = new global.log(this);
  this.currentLog = log;

  const result = this.evalCode(code);

  log.code(code);
  log.result(result);
  log.display();

  this.resetEditArea();
 
}

} // namespace boundary
