document.querySelector("#navbar").addEventListener("click", function (evt) {
  if (evt.target.nodeName !== "A") return;
  console.log(evt.target, evt.currentTarget);
  evt.currentTarget
    .querySelectorAll("#navbar .active")
    .forEach(function (element) {
      element.classList.remove("active");
    });
  evt.target.parentNode.classList.add("active");
  loadContentPageByUrl(evt.target.attributes["href"].value);
});

document.querySelectorAll("#navbar a").forEach(function (a) {
  a.addEventListener("click", function (evt) {
    evt.preventDefault();
    history.pushState(null, null, evt.target.href);
  });
});
function loadDOMHome() {
  commonPageLoader("/pages/home/home.html");
}
function loadDOMEditor() {
  commonPageLoader("/pages/editor/editor.html");
}
function loadDOMThumbnail() {
  commonPageLoader("/pages/thumbnail/thumbnail.html");
}
/**
 * common loader html for wrapper
 * @param {string} pageUrl url of page to load
 */
function commonPageLoader(pageUrl) {
  var key = pageUrl;
  var content = sessionStorage.getItem(key);
  if (content) {
    loadInWrapper(content);
    return;
  }
  var xhr = new XMLHttpRequest();
  xhr.open("GET", pageUrl);
  xhr.onreadystatechange = function (evt) {
    if (evt.target.readyState < XMLHttpRequest.DONE) return;
    if (evt.target.status !== 200) {
        loadDOMErrorInWrapper(
        evt.target.status ,
        evt.target.statusText ,
        evt.target.responseURL );
      return;
    }
    sessionStorage.setItem(key, evt.target.responseText);
    //document.querySelector("#wrapper").innerHTML = evt.target.responseText;
    loadInWrapper(evt.target.responseText);
  };
  xhr.send();
}
/**
 * load text as html in wrapper
 * @param {HTMLElement} wrapper
 * @param {string} contentText
 */
function loadInWrapper(
  contentText,
  wrapper = document.querySelector("#wrapper"),
) {
  wrapper.innerHTML = contentText;
}

document.addEventListener("DOMContentLoaded", function () {
    loadContentPageByUrl(location.pathname)
});
/**
 * start loading wrapper process by url
 * @param {string} pageUrl
 */
function loadContentPageByUrl(pageUrl) {
  switch (pageUrl) {
    case "/editor":
      console.log("editor");
      loadDOMEditor();
      break;
    case "/thumbnail":
      console.log("editor");
      loadDOMThumbnail();
      break;
    case "/":
      console.log("home");
      loadDOMHome();
      break;
      default:
        loadDOMErrorInWrapper(404,'NOT FOUND',location.pathname)
      break;
  }
}
/**
 * SET HTTP error in wrapper
 * @param {number} status
 * @param {string} statusText
 * @param {string} url
 * @param {HTMLElement} wrapper
 */
function loadDOMErrorInWrapper(status,statusText,url,wrapper=document.querySelector('#wrapper')){
     wrapper.innerHTML =
        '<div id="error"><h1>' +
        status +
        ":" +
        statusText +
        "</h1>malheuresement la page charger :" +
        url +
        " n'a pas pu etre chargée</div>";
}