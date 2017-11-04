/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const repl = jsrepl.repl;

repl.prototype.onViewTouchStart = function(e) {

  this.editArea.focus();

}

repl.prototype.onEditAreaKeyDown = function(e) {

  jsrepl.debug(0, e);
  jsrepl.debug(0, e.keyCode);
  jsrepl.debug(0, e.key);


  // when ctrl key is pressed.
  if(e.ctrlKey) {

    if( e.key == "l" ) {

      this.clearScreen();

    } else if ( e.key == "p" ) {

      // History back
      this.setEditAreaPrevious();

    } else if ( e.key == "n" ) {

      // History forward
      this.setEditAreaNext();

    }

  } else {

    if ( e.key == "ArrowUp" ) {

      // History back
      this.setEditAreaPrevious();

    } else if ( e.key == "ArrowDown" ) {

      // History forward
      this.setEditAreaNext();

    }

  }

}

repl.prototype.onEditAreaKeyPress = function(e) {

  jsrepl.debug(0, e);
  jsrepl.debug(0, e.keyCode);
  jsrepl.debug(0, e.key);

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
