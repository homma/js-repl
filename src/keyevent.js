/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const repl = jsrepl.repl;

repl.prototype.onEditAreaKeyDown = function(e) {

  if(jsrepl.config.debug) {
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

  if(jsrepl.config.debug) {
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

    /* will not handle error. just ignoring it for now.
    if(e.description == "Unexpected token ILLEGAL") {
      console.log(e);
      this.handleIllegalCodeError();
    }
    */

    return;
  }

  this.processCode(code);

}

} // namespace boundary
