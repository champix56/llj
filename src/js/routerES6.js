class Router {
  wrapper = undefined;
  #config = {};
  #routesNames = [];
  #currentRoute = {};
  constructor(wrapper = document.querySelector("#wrapper"), config = routes) {
    this.wrapper = wrapper;
    this.#config = config;
    this.#routesNames = Object.getOwnPropertyNames(config);
  }
  /**
   * fix an internal link if start by /
   * @param {HTMLLinkElement} a
   */
  fixLinksForRouter(a) {
    const href = a.attributes.getNamedItem("href").value;
    if (!href.startsWith("/")) return;
    a.removeEventListener("click");
    a.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.loadPageByPath(href);
    });
  }
  #loadError(status, statusText, url) {
    this.wrapper.innerHTML =
      '<div id="error"><h1>' +
      status +
      ":" +
      statusText +
      "</h1>malheuresement la page charger :" +
      url +
      " n'a pas pu etre chargée</div>";
  }
  loadPageByPath(path) {
  }
  #fetchPageContent(pageUrl){

  }
}

const routes = {
  editor: {
    href: "/pages/editor/editor.html",
    path: "/editor",
    js: "/pages/editor/editor.js",
    loader: editorLoaded(),
  },
  home: {
    href: "/pages/home/home.html",
    path: "/",
  },
  thumbnail: {
    href: "/pages/thumbnail/thumbnail.html",
    path: "/thumbnail",
  },
};
