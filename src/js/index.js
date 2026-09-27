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
      document.querySelector("#wrapper").innerHTML =
        '<div id="error"><h1>' +
        evt.target.status +
        ":" +
        evt.target.statusText +
        "</h1>malheuresement la page charger :" +
        evt.target.responseURL +
        " n'a pas pu etre chargée</div>";
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
    default:
      console.log("home");
      loadDOMHome();
      break;
  }
}
