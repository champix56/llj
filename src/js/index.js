let router = new Router();

function domInit() {
    router.wrapper=document.querySelector('#wrapper')
  router.loadPageByPath(location.pathname);
  document.querySelector("#navbar").addEventListener("click", function (evt) {
    if (evt.target.nodeName !== "A") return;
    console.log(evt.target, evt.currentTarget);
    evt.currentTarget
      .querySelectorAll("#navbar .active")
      .forEach(function (element) {
        element.classList.remove("active");
      });
    evt.target.parentNode.classList.add("active");
  });
  document.querySelectorAll("#navbar a").forEach(function (a) {
    router.fixLinksForRouter(a);
  });
}
document.addEventListener('DOMContentLoaded',()=>{domInit()})