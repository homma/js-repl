/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const history = function() {

  this.history = [];
  this.current = 0;

}

jsrepl.history = history;

history.prototype.push = function(code) {

  jsrepl.debug("history: push code ", code);

  this.history.push(code);
  this.current = this.history.length;

}

history.prototype.previous = function() {

  jsrepl.debug("history: previous.");

  if(this.current == 0) {

    return null; 

  }

  this.current--;
  jsrepl.debug("history: ", this.history[this.current]);

  return this.history[this.current];

}

history.prototype.next = function() {

  jsrepl.debug("history: next.");

  if(this.current == this.history.length) {

    return null; 

  }

  this.current++;
  jsrepl.debug("history: ", this.history[this.current]);

  return this.history[this.current];

}

} // namespace boundary
