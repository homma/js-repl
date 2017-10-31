/*
 * @author Daisuke Homma
 */

{ // namespace boundary


const main = () => {

  const root = document.getElementById(config.rootElementId);
  console.log(root);
  const app = new global.repl(root);

}

window.onload = main;

} // namespace boundary
