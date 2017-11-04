/*
 * @author Daisuke Homma
 */

const jsrepl = {};
jsrepl.config = {};

{ // namespace boundary

const config = jsrepl.config;

config.rootElementId = "js-repl";
config.prompt = ">";
config.resultPrompt = "=>";

config.debug = true;

} // namespace boundary
/*
 * @author Daisuke Homma
 */

{ // namespace boundary

jsrepl.hyperscript = function(tag, ...args) {

  const elem = handleTag(tag);
  handleArgs(elem, args);

  return elem;

}

// utility functions
const isNull = val => val == null;
const isString = val => typeof val === "string";
const isNumber = val => typeof val === "number";
const isDate = val => val instanceof Date;
const isBoolean = val => typeof val === "boolean";
const isHTMLElement = val => ( (val instanceof Node) ||
                               (val instanceof HTMLElement) );
const isObject = val => typeof val === "object";
const toCamel = str => str.replace(/-([a-z])/g,
                                   (match, p1) => p1.toUpperCase());

const handleTag = tag => {

  if(!isString(tag)) { console.error("tag should be a string") }

  const [t1, id] = tag.split("#");
  const [t2, ...cls] = t1.split(".");
  const klass = cls.join(" ");

  const t3 = t2 || "div";

  const elem = document.createElement(t3);
  elem.id = id;
  elem.class = klass;

  return elem;

}

const handleArgs = (elem, args) => {

  const handleStyle = style => {
    for(var prop in style) {

      elem.style[toCamel(prop)] = style[prop];

    }
  }

  const handle = val => {

    if(isNull(val)) { // children - null

      // do nothing

    } else if(isString(val)) { // children - string

      elem.innerText = val;

    } else if( isNumber(val) || isDate(val) || isBoolean(val) ) {
               // children - other data

      elem.innerText = val.toString();

    } else if(isHTMLElement(val)) { // children - HTMLElement

      elem.appendChild(val);

    } else if(Array.isArray(val)) { // children - Array

      val.forEach(v => elem.appendChild(v));

    } else if(isObject(val)) { // Attribute

      for(var prop in val) {

        if(prop == "style") {
          handleStyle(val[prop]);
        } else {
          elem[prop] = val[prop];
        }

      }
    } else {

      console.log("unknown value found: ", val);

    }
  }

  args.forEach(handle);

}

} // namespace boundary
/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const debug = function(flag, ...str) {
  if(flag) {
    console.log(str);
  }
}

jsrepl.debug = debug;

} // namespace boundary
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

  jsrepl.debug(0, "history: push", this.current, code);

  this.history.push(code);
  this.current = this.history.length - 1;

}

history.prototype.previous = function() {

  jsrepl.debug(0, "history: prev.", this.current);

  if(this.current < 0) {

    return null; 

  }

  const ret = this.history[this.current];
  jsrepl.debug(0, "history: prev", this.current, this.history[this.current]);

  if(this.current != 0) {
    this.current--;
  }

  return ret;

}

history.prototype.next = function() {

  jsrepl.debug(0, "history: next", this.current);

  if(this.current == this.history.length - 1) {

    return null; 

  }

  this.current++;
  jsrepl.debug(0, "history: next", this.current, this.history[this.current]);

  return this.history[this.current];

}

} // namespace boundary
/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const h = jsrepl.hyperscript;

const repl = function(root) {

  this.root = root;
  this.width = root.clientWidth;
  this.height = root.clientHeight;

  this.view = null;
  this.logArea = null;
  this.currentArea = null;
  this.prompt = null;
  this.editArea = null;
  this.paddingArea = null;
  this.sandbox = null;

  this.currentLog = null;

  this.history = null;

  this.init();

};

jsrepl.repl = repl;

repl.prototype.init = function() {

  this.createView();

  this.view = document.getElementById("view");
  this.logArea = document.getElementById("logArea");
  this.currentArea = document.getElementById("currentArea");
  this.prompt = document.getElementById("prompt");
  this.editArea = document.getElementById("editArea");
  this.paddingArea = document.getElementById("paddingArea");
  this.sandbox = document.getElementById("sandboxFrame").contentWindow;

  this.history = new jsrepl.history();

  this.createSandbox();

  this.editArea.focus();
  // this.resetEditArea();

}

repl.prototype.createView = function() {

  // HyperScript Notation
  const html = h(
    "div#view",
    {style: {"width": this.width,
             "height": this.height,
             // "overflow-x": "visible",
             // "overflow-y": "auto"},
             },
     ontouchstart: e => this.onViewTouchStart(e)},
    h("div#logArea",
      {style: {"width": this.width}}),
    h("div#currentArea",
      {style: {"width": this.width}},
      h("div#prompt",
        jsrepl.config.prompt,
        {style: {"color": "black",
                 "background-color": "white",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "margin-right": "8px",
                 "font-family": "monospace"}}),
      h("div#editArea",
        {contentEditable: true,
         style: {"color": "black",
                 "display": "inline-block",
                 "vertical-align": "top",
                 "font-family": "monospace"},
         onkeypress: e => this.onEditAreaKeyPress(e),
         onkeydown: e => this.onEditAreaKeyDown(e)
        })),
    h("div#paddingArea",
      {style: {"display": "block"}}),
    h("iframe#sandboxFrame",
      {style: {display: "none"}})
    )   

  this.root.appendChild(html);

}

repl.prototype.createSandbox = function() {

  jsrepl.sandbox.init(this);

}

repl.prototype.processCode = function(code) {

  const log = new jsrepl.log(this);
  this.currentLog = log;

  const result = this.evalCode(code);

  this.history.push(code);

  log.code(code);
  log.result(result);
  log.display();

  this.resetEditArea();
  jsrepl.debug(0, this.editArea.innerHTML);

}

repl.prototype.evalCode = function(code) {

  let result = "";

  try {

    result += this.sandbox.eval(code);

  } catch(e) {

    result += e;

  }

  return result;

}

} // namespace boundary
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

  // It seems this doesn't work somehow.
  // this.setCaret(pos);

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
      e.preventDefault();

    } else if ( e.key == "n" ) {

      // History forward
      this.setEditAreaNext();
      e.preventDefault();

    }

  } else {

    if ( e.key == "ArrowUp" ) {

      // History back
      this.setEditAreaPrevious();
      e.preventDefault();

    } else if ( e.key == "ArrowDown" ) {

      // History forward
      this.setEditAreaNext();
      e.preventDefault();

    }

  }

}

repl.prototype.onEditAreaKeyPress = function(e) {

  jsrepl.debug(0, e);
  jsrepl.debug(0, e.keyCode);
  jsrepl.debug(0, e.key);

  if( e.key == "Enter" ) {

    this.handleEnterKey(e);

  } else if( e.key == "c" ) {

    if(e.ctrlKey) {
      this.handleCancel();
    }

  }

}

repl.prototype.handleEnterKey = function(event) {

  const code = this.editArea.innerText;

  try {
    esprima.parseScript(code);
  } catch(error) {

    /* will not handle error. just ignoring it for now.
    if(error.description == "Unexpected token ILLEGAL") {
      console.log(error);
      this.handleIllegalCodeError();
    }
    */

    return;
  }

  event.preventDefault();
  this.processCode(code);

}

} // namespace boundary
/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const h = jsrepl.hyperscript;

const log = function(repl) {

  this.repl = repl;
  this.width = repl.width;

  this.codeElem = null;
  this.outputElem = [];
  this.resultElem = null;

}

jsrepl.log = log;

log.prototype.display = function() {

  const elem = h(
    "div.log",
    this.codeElem,
    this.outputElem,
    this.resultElem
  )
    
  this.repl.logArea.appendChild(elem);

}

log.prototype.code = function(code) {

  this.codeElem = this.createCodeElem(code);

}

log.prototype.output = function(output) {

  this.outputElem.push(this.createOutputElem(output));

}

log.prototype.result = function(result) {

  this.resultElem = this.createResultElem(result);

}

log.prototype.createCodeElem = function(code) {

  const elem = h(
    "div.code",
    {style: {"width": this.width}},
    h("div.codePrompt",
      jsrepl.config.prompt,
      {style: {"color": "black",
               "background-color": "white",
               "display": "inline-block",
               "vertical-align": "top",
               "margin-right": "8px",
               "font-family": "monospace"}}),
     h("div.codeText",
       code,
       {style: {"color": "black",
                // "float": "right",
                "display": "inline-block",
                "vertical-align": "top",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

log.prototype.createOutputElem = function(content) {

  const elem = h(
    "div.output",
    {style: {"width": this.width}},
     h("div.output",
       content,
       {style: {"color": "black",
                "width": this.width,
                "vertical-align": "top",
                "word-wrap": "break-word",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

log.prototype.createResultElem = function(result) {

  const elem = h(
    "div.result",
    {style: {"width": this.width}},
    h("div.resultPrompt",
      jsrepl.config.resultPrompt,
      {style: {"color": "black",
               "background-color": "white",
               // "float": "left",
               "display": "inline-block",
               "vertical-align": "top",
               "margin-right": "8px",
               "font-family": "monospace"}}),
     h("div.resultText",
       result,
       {style: {"color": "black",
                // "float": "right",
                "display": "inline",
                "vertical-align": "top",
                "word-wrap": "break-word",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

} // namespace boundary
/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const sandbox = {};

jsrepl.sandbox = sandbox;

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

/*
 * @author Daisuke Homma
 */

{ // namespace boundary


const main = () => {

  const root = document.getElementById(jsrepl.config.rootElementId);
  const app = new jsrepl.repl(root);

}

window.onload = main;

} // namespace boundary
