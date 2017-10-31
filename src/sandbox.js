/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const sandbox = {};

global.sandbox = sandbox;

sandbox.init = repl => {

  repl.sandbox.console = new console(repl); 

}

// sandbox console

const console = function(repl) {

  this.repl = repl;

};

console.prototype.log = function(content) {

  const text = "" + content;

  this.repl.currentLog.output(text);

}

} // namespace boundary

