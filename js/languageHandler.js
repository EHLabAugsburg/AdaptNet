class LanguageHandler {
  static _TEXT_ELEMENTS = {
    riskControlHint: {
      de: "Wählen Sie eine Gefahr:",
      en: "Please choose a hazard:",
    },
    timeControlHint: {
      de: "Wählen Sie einen Zeitraum",
      en: "Please choose a time period:",
    },
    airQualityTitle: {
      de: "Luftqualität",
      en: "air quality",
    },
    heatTitle: {
      de: "Hitze",
      en: "heat",
    },
    vectorsTitle: {
      de: "Vektoren",
      en: "vectors",
    },
    floodingsTitle: {
      de: "Überschwemmung",
      en: "flooding",
    },
    hotspotsTitle: {
      de: "HotSpots",
      en: "HotSpots",
    },
    allergensTitle: {
      de: "Allergene",
      en: "allergens",
    },
    forestFireTitle: {
      de: "Waldbrand",
      en: "forest fire",
    },
    currentTimeTitle: {
      de: "Gegenwart",
      en: "currently",
    },
    futureTimeTitle: {
      de: "Zukunft (um 2050)",
      en: "future (about 2050)",
    },
    changeTimeTitle: {
      de: "Veränderung",
      en: "change",
    },
    methodsButtonTitle: {
      de: "Methodik",
      en: "methods",
    },
    sourcesButtonTitle: {
      de: "Quellen",
      en: "sources",
    },
    imprintButtonTitle: {
      de: "Impressum",
      en: "imprint",
    },
    searchPlaceHolder: {
      de: "Kreis suchen...",
      en: "Search county...",
    },
    risk: { de: "Risiko", en: "risk" },
    change: { de: "Veränderung", en: "change" },
    // class-names in ascending order
    riskAtTimePeriodLegend: {
      de: [
        "geringes Risiko",
        "niedriges Risiko",
        "mittleres Risiko",
        "hohes Risiko",
        "kritisches Risiko",
        "extremes Risiko",
      ],
      en: [
        "lower risk",
        "low risk",
        "medium risk",
        "high risk",
        "critical risk",
        "extreme risk",
      ],
    },
    riskChangeLegend: {
      de: [
        "abnehmend",
        "leicht abnehmend",
        "leicht zunehmend",
        "zunehmend",
        "stark zunehmend",
        "kritisch zunehmend",
        "extrem zunehmend",
      ],
      en: [
        "decreasing",
        "slightly decreasing",
        "slightly increasing",
        "increasing",
        "strongly increasing",
        "ciritically increasing",
        "extremely increasing",
      ],
    },
    hotspotsChangesLegend: {
      de: ["stagnierend", "zunehmend", "stark zunehmend"],
      en: ["stable", "increasing", "strongly increasing"],
    },
  };

  constructor(language) {
    this._language = language;
  }

  language() {
    return this._language;
  }

  setLanguage(language) {
    this._language = language;
    this._translate(this.language());
  }

  getLegendClasses(risk, time, language) {
    if (time == "Veränderung" && risk == "HotSpots") {
      return LanguageHandler._TEXT_ELEMENTS.hotspotsChangesLegend[language];
    } else if (time == "Veränderung") {
      return LanguageHandler._TEXT_ELEMENTS.riskChangeLegend[language];
    } else {
      return LanguageHandler._TEXT_ELEMENTS.riskAtTimePeriodLegend[language];
    }
  }

  getLegendTitle(risk, time) {
    var title;
    switch (risk) {
      case "Luftqualität":
        title = LanguageHandler._TEXT_ELEMENTS.airQualityTitle[this.language()];
        break;
      case "Allergene":
        title = LanguageHandler._TEXT_ELEMENTS.allergensTitle[this.language()];
        break;
      case "Überschwemmung":
        title = LanguageHandler._TEXT_ELEMENTS.floodingsTitle[this.language()];
        break;
      case "Waldbrand":
        title = LanguageHandler._TEXT_ELEMENTS.forestFireTitle[this.language()];
        break;
      case "Hitze":
        title = LanguageHandler._TEXT_ELEMENTS.heatTitle[this.language()];
        break;
      case "Vektoren":
        title = LanguageHandler._TEXT_ELEMENTS.vectorsTitle[this.language()];
        break;
      case "HotSpots":
        title = LanguageHandler._TEXT_ELEMENTS.hotspotsTitle[this.language()];
    }
    title +=
      time == "Veränderung"
        ? ` ${LanguageHandler._TEXT_ELEMENTS.changeTimeTitle[this.language()]}`
        : time == "Gegenwart"
        ? ` ${LanguageHandler._TEXT_ELEMENTS.currentTimeTitle[this.language()]}`
        : ` ${LanguageHandler._TEXT_ELEMENTS.futureTimeTitle[this.language()]}`;
    return title;
  }

  translatePopup(risk, time) {
    var generalDescription = document
      .querySelector("div.leaflet-popup-content span[id]")
      .textContent.split(": ");
    var legendDictionary = {};
    if (risk == "HotSpots" && time == "Veränderung") {
      for (const legendClass of LanguageHandler._TEXT_ELEMENTS
        .hotspotsChangesLegend.de) {
        legendDictionary[legendClass] =
          LanguageHandler._TEXT_ELEMENTS.hotspotsChangesLegend.en[
            LanguageHandler._TEXT_ELEMENTS.hotspotsChangesLegend.de.indexOf(
              legendClass
            )
          ];
      }
    } else if (time == "Veränderung") {
      for (const legendClass of LanguageHandler._TEXT_ELEMENTS.riskChangeLegend
        .de) {
        legendDictionary[legendClass] =
          LanguageHandler._TEXT_ELEMENTS.riskChangeLegend.en[
            LanguageHandler._TEXT_ELEMENTS.riskChangeLegend.de.indexOf(
              legendClass
            )
          ];
      }
    } else {
      for (const legendClass of LanguageHandler._TEXT_ELEMENTS
        .riskAtTimePeriodLegend.de) {
        legendDictionary[legendClass] =
          LanguageHandler._TEXT_ELEMENTS.riskAtTimePeriodLegend.en[
            LanguageHandler._TEXT_ELEMENTS.riskAtTimePeriodLegend.de.indexOf(
              legendClass
            )
          ];
      }
    }
    for (const [german, english] of Object.entries(legendDictionary)) {
      if (generalDescription[1] == german) {
        generalDescription[1] = english;
        break;
      } else if (generalDescription[1] == english) {
        generalDescription[1] = german;
        break;
      }
    }
    document.querySelector(
      "div.leaflet-popup-content span[id]"
    ).innerHTML = `<b>${
      this.getLegendTitle(risk, time).split(
        / currently| future| change| Gegenwart| Zukunft| Veränderung/
      )[0]
    }-${
      time == "Veränderung"
        ? LanguageHandler._TEXT_ELEMENTS.change[this._language]
        : LanguageHandler._TEXT_ELEMENTS.risk[this._language]
    }</b>: ${generalDescription[1]}`;
    // TODO: korreltes Beibehalten des Übersetzens bei wechel des Kreises
    // TODO: Fehlende Übersetzung bei Veränderungslayern
  }

  _translate(outputLanguage) {
    var riskControlHtml = document.querySelector("div#risk-control");
    var timeControlHtml = document.querySelector("div#time-control");
    var metadataControlHtml = document.querySelector("div#metadata");
    var searchBarInputHtml = document.querySelector("input#searchtext15");
    riskControlHtml.childNodes[0].textContent =
      outputLanguage == "de"
        ? LanguageHandler._TEXT_ELEMENTS.riskControlHint.de
        : LanguageHandler._TEXT_ELEMENTS.riskControlHint.en;
    timeControlHtml.childNodes[0].textContent =
      outputLanguage == "de"
        ? LanguageHandler._TEXT_ELEMENTS.timeControlHint.de
        : LanguageHandler._TEXT_ELEMENTS.timeControlHint.en;
    for (let i = 1; i < riskControlHtml.children.length; ++i) {
      switch (riskControlHtml.children[i].id) {
        case "Luftqualität":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.airQualityTitle.de
              : LanguageHandler._TEXT_ELEMENTS.airQualityTitle.en;
          break;
        case "Allergene":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.allergensTitle.de
              : LanguageHandler._TEXT_ELEMENTS.allergensTitle.en;
          break;
        case "Überschwemmung":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.floodingsTitle.de
              : LanguageHandler._TEXT_ELEMENTS.floodingsTitle.en;

          break;
        case "Waldbrand":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.forestFireTitle.de
              : LanguageHandler._TEXT_ELEMENTS.forestFireTitle.en;

          break;
        case "Hitze":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.heatTitle.de
              : LanguageHandler._TEXT_ELEMENTS.heatTitle.en;

          break;
        case "Vektoren":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.vectorsTitle.de
              : LanguageHandler._TEXT_ELEMENTS.vectorsTitle.en;

          break;
        case "HotSpots":
          riskControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.hotspotsTitle.de
              : LanguageHandler._TEXT_ELEMENTS.hotspotsTitle.en;
      }
    }
    for (let i = 1; i < timeControlHtml.children.length; ++i) {
      switch (timeControlHtml.children[i].id) {
        case "current":
          timeControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.currentTimeTitle.de
              : LanguageHandler._TEXT_ELEMENTS.currentTimeTitle.en;
          break;
        case "future":
          timeControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.futureTimeTitle.de
              : LanguageHandler._TEXT_ELEMENTS.futureTimeTitle.en;
          break;
        case "change":
          timeControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.changeTimeTitle.de
              : LanguageHandler._TEXT_ELEMENTS.changeTimeTitle.en;
      }
    }
    for (let i = 1; i < metadataControlHtml.children.length; ++i) {
      switch (metadataControlHtml.children[i].id) {
        case "methods":
          metadataControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.methodsButtonTitle.de
              : LanguageHandler._TEXT_ELEMENTS.methodsButtonTitle.en;
          break;
        case "sources":
          metadataControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.sourcesButtonTitle.de
              : LanguageHandler._TEXT_ELEMENTS.sourcesButtonTitle.en;
          break;
        case "imprint":
          metadataControlHtml.children[i].title =
            outputLanguage == "de"
              ? LanguageHandler._TEXT_ELEMENTS.imprintButtonTitle.de
              : LanguageHandler._TEXT_ELEMENTS.imprintButtonTitle.en;
      }
    }
    searchBarInputHtml.placeholder =
      outputLanguage == "de"
        ? LanguageHandler._TEXT_ELEMENTS.searchPlaceHolder.de
        : LanguageHandler._TEXT_ELEMENTS.searchPlaceHolder.en;
  }
}
