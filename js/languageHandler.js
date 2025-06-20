"use strict";
/**
 * Class for handling of user selected language.
 */
class LanguageHandler {
  static _BUTTON_TITLES = {
    methods: { de: "Methodik", en: "methods" },
    sources: { de: "Quellen", en: "sources" },
    imprint: { de: "Impressum", en: "imprint" },
  };
  static _SEARCH_TEXT_PLACEHOLDER = {
    de: "Kreis suchen...",
    en: "Search county...",
  };

  constructor(language) {
    this._language = language;
  }

  /**
   * Get the current selected language.
   * @returns The current user-selected language.
   */
  getLanguage() {
    return this._language;
  }

  /**
   * Set the used language and apply the language.
   * @param {*} language The language of the applications DOM-elements.
   */
  applyLanguage(language) {
    this._language = language;
    document.querySelectorAll("[lang]").forEach((element) => {
      element.style.display = "none";
      if (element.getAttribute("lang") === this.getLanguage())
        element.style.display = "inline";
    });
    document.querySelector("button#methods").title =
      LanguageHandler._BUTTON_TITLES.methods[this.getLanguage()];
    document.querySelector("button#sources").title =
      LanguageHandler._BUTTON_TITLES.sources[this.getLanguage()];
    document.querySelector("button#imprint").title =
      LanguageHandler._BUTTON_TITLES.imprint[this.getLanguage()];
    document.querySelector("input#searchtext15").placeholder =
      LanguageHandler._SEARCH_TEXT_PLACEHOLDER[this.getLanguage()];
    document.querySelector("a.search-button").title =
      LanguageHandler._SEARCH_TEXT_PLACEHOLDER[this.getLanguage()];
    if (popupExists()) {
      document
        .querySelectorAll("div.leaflet-popup-content span[lang]")
        .forEach((element) => {
          element.style.display = "none";
          if (element.getAttribute("lang") === this.getLanguage())
            element.style.display = "inline";
        });
    }
  }
}
