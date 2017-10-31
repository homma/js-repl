/*
 * @aurthor Daisuke Homma
 */

{ // namespace boundary

const h = jsutils.hyperscript;

const log = function(repl) {

  this.repl = repl;
  this.width = repl.width;

  this.codeElem = null;
  this.resultElem = null;
  this.outputElem = null;

}

global.log = log;

log.prototype.display = function() {

  const elem = h(
    "div.log",
    this.codeElem,
    this.resultElem,
    this.outputElem
  )
    
  this.repl.logArea.appendChild(elem);

}

log.prototype.code = function(code) {

  this.codeElem = this.createCodeElem(code);

}

log.prototype.result = function(result) {

  this.resultElem = this.createResultElem(result);

}

log.prototype.output = function(output) {

  this.outputElem = this.createOutputElem(output);

}

log.prototype.createCodeElem = function(code) {

  const elem = h(
    "div.code",
    {style: {"width": this.width}},
    h("div.codePrompt",
      config.prompt,
      {style: {"color": "black",
               "background-color": "white",
               // "float": "left",
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

log.prototype.createResultElem = function(result) {

  const elem = h(
    "div.log",
    {style: {"width": this.width}},
    h("div.resultPrompt",
      config.resultPrompt,
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
                "display": "inline-block",
                "vertical-align": "top",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

log.prototype.createOutputElem = function(content) {

  const elem = h(
    "div.log",
    {style: {"width": this.width}},
     h("div.output",
       content,
       {style: {"color": "black",
                "width": this.width,
                "display": "inline-block",
                "vertical-align": "top",
                "font-family": "monospace"}})
  )   

  return elem;
 
}

} // namespace boundary
