/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const history = function() {

  this.history = [];
  this.current = -1;

}

jsrepl.history = history;

history.prototype.push = function(code) {

  jsrepl.debug(0, "history: push code.");

  if( (code == null) || (code == "") || (typeof code === "undefined") ) {
    return
  }

  jsrepl.debug(0, "history: code ", code);

  this.history.push(code);
  this.current = this.history.length - 1;

}

history.prototype.previous = function() {

  jsrepl.debug(0, "history: previous.");

  if(this.current < 0) {

    return null; 

  }

  const ret = this.history[this.current];
  this.current--;
  jsrepl.debug(0, "history: at ", this.current, this.history[this.current]);

  return ret;

}

history.prototype.next = function() {

  jsrepl.debug(0, "history: next.");

  if(this.current == this.history.length - 1) {

    return null; 

  }

  this.current++;
  jsrepl.debug(0, "history: at ", this.current, this.history[this.current]);

  return this.history[this.current];

}

} // namespace boundary
