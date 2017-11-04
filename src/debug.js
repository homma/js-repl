/*
 * @author Daisuke Homma
 */

{ // namespace boundary

const debug = function(str) {
  if(jsrepl.config.debug) {
    console.log(str);
  }
}

jsrepl.debug = debug;

} // namespace boundary
