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
