class Router {
  wrapper = undefined;
  #config = {};
  #routesNames = [];
  #currentRoute = {};
  constructor(config = routes) {
    this.wrapper = undefined;
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
    a.removeEventListener("click", this.#onlinkclicked);
    a.addEventListener("click", this.#onlinkclicked);
  }
  #onlinkclicked = (evt) => {
    evt.preventDefault();
    this.loadPageByPath(evt.target.attributes.getNamedItem("href").value);
  };
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
    history.pushState("", null, path);
    if (!this.#getCurrentRoute(path)) {
      return this.#loadError();
    }
    this.#fetchPageContent();
  }
  #getCurrentRoute(path) {
    const currentRouteName = this.#routesNames.find((r) => {
      return this.#config[r].path === path;
    });
    this.#currentRoute = this.#config[currentRouteName];
    return this.#currentRoute;
  }
  #fetchPageContent() {
    if (this.#currentRoute.cacheHTML) {
      this.#loadContentInwrapper(this.#currentRoute.cacheHTML);
      return;
    }
    fetch(this.#currentRoute.href)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response;
        }
      })
      .then((content) => {
        if (typeof content === "string") {
          this.#currentRoute.cacheHTML = content;
          this.#loadContentInwrapper();
        } else {
          this.#loadError(content.status, content.statusText, content.url);
        }
      });
  }
  #loadContentInwrapper() {
    this.wrapper.innerHTML = this.#currentRoute.cacheHTML;
  }
}

const routes = {
  editor: {
    href: "/pages/editor/editor.html",
    path: "/editor",
    js: "/pages/editor/editor.js",
    loader: () => editorLoaded(),
    cacheHTML: undefined,
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
const router =new Router()
export default router