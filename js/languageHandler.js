"use strict";
/**
 * Class for handling of user selected language.
 */
class LanguageHandler {
  static _BUTTON_TITLES = {
    imprint: { de: "Impressum", en: "imprint" },
    language: { de: "Übersetzen", en: "Translate" },
    websiteLink: { de: "Methodik und Quellen", en: "methods and sources" },
    current: { de: "Gegenwart", en: "present" },
    future: { de: "Zukunft", en: "future" },
    change: { de: "Veränderungen", en: "change" },
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
  setLanguage(language) {
    this._language = language;
    const languageControlButton = document.getElementById("language-control");
    languageControlButton.setAttribute(
      "value",
      this._language === "de" ? "en" : "de"
    );
    languageControlButton.title =
      LanguageHandler._BUTTON_TITLES.language[this.getLanguage()];
    document.querySelectorAll("[lang]").forEach((element) => {
      element.style.display = "none";
      if (element.getAttribute("lang") === this.getLanguage())
        element.style.display = "inline";
    });
    document.querySelectorAll("div#risk-control button").forEach((button) => {
      button.title = DataProvider.getRiskName(button.id)[this.getLanguage()];
    });
    document
      .querySelectorAll("#current, #future, #change")
      .forEach((button) => {
        button.title =
          LanguageHandler._BUTTON_TITLES[button.id][this.getLanguage()];
      });
    const websiteLink = document.getElementById("website-link");
    websiteLink.title =
      LanguageHandler._BUTTON_TITLES.websiteLink[this.getLanguage()];
    websiteLink.onclick = () => {
      window.location.href = DataProvider.getLinkPageUrl(this.getLanguage());
    };
    document.getElementById("imprint").title =
      LanguageHandler._BUTTON_TITLES.imprint[this.getLanguage()];
    document.querySelector(".leaflet-control-search input").placeholder =
      LanguageHandler._SEARCH_TEXT_PLACEHOLDER[this.getLanguage()];
    document.querySelector("a.search-button").title =
      LanguageHandler._SEARCH_TEXT_PLACEHOLDER[this.getLanguage()];
    if (document.querySelector("div.leaflet-popup-content")) {
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
