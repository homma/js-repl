/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const sandbox = {};

jsrepl.sandbox = sandbox;

sandbox.init = repl => {

  // add objects to the sandbox iframe contentWindow (repl.sandbox);
  repl.sandbox.console = new console(repl); 
  repl.sandbox.load = function(path) { load(repl.sandbox, path) };

}

// sandbox console

const console = function(repl) {

  this.repl = repl;

};

console.prototype.log = function(content) {

  const text = "" + content;

  this.repl.currentLog.output(text);

}

// sandbox loader

const load = function(root, path) {

  jsrepl.nebug(root);

  const el = root.document.createElement('script');

  el.type = "text/javascript";
  el.src = path;

  root.document.head.appendChild(el);

}

} // namespace boundary

