/**
 * Class to ensure the dynamically display of correct information in popups, tooltips and subpages.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
  static _FACTOR_CLASSIFICATIONS = {
    Luftqualität: {
      riskName: { de: "Luftqualität", en: "air quality" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (PM2.5)": "factor 1 (PM2.5)",
          "Faktor 1 (PM10)": "factor 1 (PM10)",
          "Faktor 1 (NO2)": "factor 1 (NO2)",
          "Faktor 1 (O3)": "factor 1 (O3)",
          "Faktor 2 (Hitze)": "factosr 2 (heat)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (PM2.5)": {
            gering: 0,
            mittel: 1,
            hoch: 2,
          },
          "Faktor 1 (PM10)": {
            gering: 0,
            mittel: 1,
            hoch: 2,
          },
          "Faktor 1 (NO2)": {
            gering: 0,
            mittel: 1,
            hoch: 2,
          },
          "Faktor 1 (O3)": {
            gering: 0,
            mittel: 1,
            hoch: 2,
          },
          "Faktor 2 (Hitze)": {
            gering: 0,
            niedrig: 0.5,
            mittel: 1,
            hoch: 1.5,
            kritisch: 2,
          },
          Summe: { Maximum: 10 },
          },
          en: {
            "Faktor 1 (PM2.5)": {
              low: 0,
              medium: 1,
              high: 2,
            },
            "Faktor 1 (PM10)": {
              low: 0,
              medium: 1,
              high: 2,
            },
            "Faktor 1 (NO2)": {
              low: 0,
              medium: 1,
              high: 2,
            },
            "Faktor 1 (O3)": {
              low: 0,
              medium: 1,
              high: 2,
            },
            "Faktor 2 (Hitze)": {
              "very low": 0,
              low: 0.5,
              medium: 1,
              high: 1.5,
              critical: 2,
            },
            Summe: { Maximum: 10 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (PM2.5)": "factor 1 (PM2.5)",
          "Faktor 1 (PM10)": "factor 1 (PM10)",
          "Faktor 1 (NO2)": "factor 1 (NO2)",
          "Faktor 1 (O3)": "factor 1 (O3)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Hitze)": "factor 3 (heat)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (PM2.5)": { abnehmend: -0.5 },
          "Faktor 1 (PM10)": { abnehmend: -0.5 },
          "Faktor 1 (NO2)": { abnehmend: -0.5 },
          "Faktor 1 (O3)": { stagniernd: 0 },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark abnehmend": -1,
            "eher abnehmend": -0.5,
            stagnierend: 0,
            "eher zunehmend": 0.5,
            "stark zunehmend": 1,
          },
          "Faktor 3 (Hitze)": {
            stagnierend: 0,
            "leicht zunehmend": 1,
            zunehmend: 2,
            "stark zunehmend": 3,
            "kritisch zunehmend": 4,
          },
          Summe: { Maximum: 10 },
        },
          en: {
            "Faktor 1 (PM2.5)": { decreasing: -0.5 },
            "Faktor 1 (PM10)": { decreasing: -0.5 },
            "Faktor 1 (NO2)": { decreasing: -0.5 },
            "Faktor 1 (O3)": { stagnating: 0 },
            "Faktor 2 (Bevölkerungsprognose)": {
              "strongly decreasing": -1,
              "slightly decreasing": -0.5,
              stagnating: 0,
              "slightly increasing": 0.5,
              "strondly increasing": 1,
            },
            "Faktor 3 (Hitze)": {
              stagnating: 0,
              "slightly increasing": 1,
              increasing: 2,
              "strondly increasing": 3,
              "critically increasing": 4,
            },
            Summe: { Maximum: 10 },
          },
        },
      },
    },
    Allergene: {
      riskName: { de: "Allergene", en: "allergens" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Prozessionsspinner)": "factor 1 (processionary moth)",
          "Faktor 2 (Heuschnupfen)": "factor 2 (hay fever)",
          "Faktor 3 (Pollen)": "factor 3 (pollen)",
          "Faktor 4 (Luftqualität)": "factor 4 (air quality)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Prozessionsspinner)": {
            "nicht relevant": 0,
            relevant: 1,
          },
          "Faktor 2 (Heuschnupfen)": {
            "nicht relevant": 0,
            gering: 0.25,
            mittel: 0.5,
            hoch: 0.75,
            "sehr hoch": 1,
          },
          "Faktor 3 (Pollen)": { hoch: 2 },
          "Faktor 4 (Luftqualität)": {
            gering: 0,
            niedrig: 0.5,
            mittel: 1,
            hoch: 1.5,
            kritisch: 2,
          },
          Summe: { Maximum: 6 },
          },
          en: {
            "Faktor 1 (Prozessionsspinner)": {
              irrelevant: 0,
              relevant: 1,
            },
            "Faktor 2 (Heuschnupfen)": {
              irrelevant: 0,
              low: 0.25,
              medium: 0.5,
              high: 0.75,
              "very high": 1,
            },
            "Faktor 3 (Pollen)": { high: 2 },
            "Faktor 4 (Luftqualität)": {
              "very low": 0,
              low: 0.5,
              medium: 1,
              high: 1.5,
              critical: 2,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Prozessionsspinner)": "factor 1 (processionary moth)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Temperatur)": "factor 3 (temperature)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Prozessionsspinner)": {
            stagnierend: 0,
            zunehmend: 0.5,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark abnehmend": -0.5,
            "eher abnehmend": -0.25,
            stagnierend: 0,
            "eher zunehmend": 0.25,
            "stark zunehmend": 0.5,
          },
          "Faktor 3 (Temperatur)": {
            stagnierend: 0,
            zunehmend: 1,
          },
          Summe: { Maximum: 6 },
        },
          en: {
            "Faktor 1 (Prozessionsspinner)": {
              stagnating: 0,
              increasing: 0.5,
            },
            "Faktor 2 (Bevölkerungsprognose)": {
              "strongly decreasing": -0.5,
              "slighly decreasing": -0.25,
              stagnating: 0,
              "slightly increasing": 0.25,
              "strongly increasing": 0.5,
            },
            "Faktor 3 (Temperatur)": {
              stagnating: 0,
              increasing: 1,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
    },
    Überschwemmung: {
      riskName: { de: "Überschwemmung", en: "flooding" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Starkniederschlag)": "factor 1 (heavy precipitation)",
          "Faktor 2 (Hochwassergefahr)": "factor 2 (flooding risk)",
          "Faktor 3 (Kreistyp)": "factor 3 (county type)",
          "Faktor 4 (Siedlungs-und Verkehrsfläche)":
            "factor 4 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Starkniederschlag)": {
            gering: 0,
            mittel: 1,
            hoch: 2,
          },
          "Faktor 2 (Hochwassergefahr)": {
            "nicht relevant": 0,
            gering: 0.5,
            mittel: 1,
            hoch: 1.5,
            "sehr hoch": 2,
          },
          "Faktor 3 (Kreistyp)": {
            "nicht relevant": 0,
            gering: 0.25,
            mittel: 0.5,
            hoch: 1,
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            gering: 0,
            mittel: 0.5,
            hoch: 1,
          },
          Summe: { Maximum: 6 },
          },
          en: {
            "Faktor 1 (Starkniederschlag)": {
              low: 0,
              medium: 1,
              high: 2,
            },
            "Faktor 2 (Hochwassergefahr)": {
              "nicht relevant": 0,
              low: 0.5,
              medium: 1,
              high: 1.5,
              "very high": 2,
            },
            "Faktor 3 (Kreistyp)": {
              irrelevant: 0,
              low: 0.25,
              medium: 0.5,
              high: 1,
            },
            "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
              low: 0,
              medium: 0.5,
              high: 1,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Starkniederschlag)": "factor 1 (heavy precipitation)",
          "Faktor 2 (Hochwassergefahr)": "factor 2 (flooding risk)",
          "Faktor 3 (Bevölkerungsprognose)": "factor 3 (population forecast)",
          "Faktor 4 (Siedlungs-und Verkehrsfläche)":
            "factor 4 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Starkniederschlag)": {
            abnehmend: -1,
            stagnierend: 0,
            zunehmend: 1,
          },
          "Faktor 2 (Hochwassergefahr)": {
            unbekannt: 0,
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            "stark abnehmend": -0.5,
            "eher abnehmend": -0.25,
            stagnierend: 0,
            "eher zunehmend": 0.25,
            "stark zunehmend": 0.5,
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            abnehmend: -0.5,
            stagnierend: 0,
            zunehmend: 0.5,
          },
          Summe: { Maximum: 6 },
        },
          en: {
            "Faktor 1 (Starkniederschlag)": {
              decreasing: -1,
              stagnating: 0,
              increasing: 1,
            },
            "Faktor 2 (Hochwassergefahr)": {
              unknown: 0,
            },
            "Faktor 3 (Bevölkerungsprognose)": {
              "strongly decreasing": -0.5,
              "slightly decreasing": -0.25,
              stagnating: 0,
              "slightly increasing": 0.25,
              "strongly increasing": 0.5,
            },
            "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
              decreasing: -0.5,
              stagnating: 0,
              increasing: 0.5,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
    },
    Waldbrand: {
      riskName: { de: "Waldbrand", en: "forest fire" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (FWI)": "factor 1 (FWI)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (FWI)": {
            gering: 1,
            niedrig: 2,
            mittel: 3,
            hoch: 4,
            kritisch: 5,
          },
          Summe: { Maximum: 5 },
          },
          en: {
            "Faktor 1 (FWI)": {
              "very low": 1,
              low: 2,
              medium: 3,
              high: 4,
              critical: 5,
            },
            Summe: { Maximum: 5 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (FWI)": "factor 1 (FWI)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (popuation forecast)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (FWI)": {
            stagnierend: 0,
            zunehmend: 0.83,
            "stark zunehmend": 1.67,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark abnehmend": -0.83,
            "eher abnehmend": -0.42,
            stagnierend: 0,
            "eher zunehmend": 0.42,
            "stark zunehmend": 0.83,
          },
          Summe: { Maximum: 5 },
        },
          en: {
            "Faktor 1 (FWI)": {
              stagnating: 0,
              increasing: 0.83,
              "strongly increasing": 1.67,
            },
            "Faktor 2 (Bevölkerungsprognose)": {
              "strongly decreasing": -0.83,
              "slightly decreasing": -0.42,
              stagnating: 0,
              "slightly increasing": 0.42,
              "strongly increasing": 0.83,
            },
            Summe: { Maximum: 5 },
          },
        },
      },
    },
    Hitze: {
      riskName: { de: "Hitze", en: "heat" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (Region)": "factor 1 (region)",
          "Faktor 1 (Trop.Nächte)": "factor 1 (tropical nights)",
          "Faktor 2 (Kreistyp)": "factor 2 (county type)",
          "Faktor 3 (Siedlungs-und Verkehrsfläche)":
            "factor 3 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Region)": {
            gering: 1,
            mittel: 2,
            hoch: 3,
          },
          "Faktor 1 (Trop.Nächte)": {
            "nicht relevant": 0,
            relevant: 3,
          },
          "Faktor 2 (Kreistyp)": {
            "nicht relevant": 0,
            gering: 0.5,
            mittel: 1,
            hoch: 1.5,
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            "nicht relevant": 0,
            mittel: 0.75,
            hoch: 1.5,
          },
          Summe: { Maximum: 9 },
          },
          en: {
            "Faktor 1 (Region)": {
              low: 1,
              medium: 2,
              high: 3,
            },
            "Faktor 1 (Trop.Nächte)": {
              irrelevant: 0,
              relevant: 3,
            },
            "Faktor 2 (Kreistyp)": {
              irrelevant: 0,
              low: 0.5,
              medium: 1,
              high: 1.5,
            },
            "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
              irrelevant: 0,
              medium: 0.75,
              high: 1.5,
            },
            Summe: { Maximum: 9 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Heiße Tage)": "factor 1 (hot days)",
          "Faktor 1 (Trop.Nächte)": "factor 1 (tropical nights)",
          "Faktor 2 (Bevölkerungsprognose)": "factor 2 (population forecast)",
          "Faktor 3 (Siedlungs-und Verkehrsfläche)":
            "factor 3 (settlement and traffic area)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Heiße Tage)": {
            stagnierend: 0,
            zunehmend: 2,
          },
          "Faktor 1 (Trop.Nächte)": {
            stagnierend: 0,
            zunehmend: 2,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark abnehmend": -1,
            "eher abnehmend": -0.5,
            stagnierend: 0,
            "eher zunehmend": 0.5,
            "stark zunehmend": 1,
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            abnehmend: -1,
            "moderat zunehmend": 0,
            "stark zunehmend": 1,
          },
          Summe: { Maximum: 9 },
        },
          en: {
            "Faktor 1 (Heiße Tage)": {
              stagnating: 0,
              increasing: 2,
            },
            "Faktor 1 (Trop.Nächte)": {
              stagnating: 0,
              increasing: 2,
            },
            "Faktor 2 (Bevölkerungsprognose)": {
              "strongly decresaing": -1,
              "slightly decreasing": -0.5,
              stagnating: 0,
              "slightly increasing": 0.5,
              "strongly increasing": 1,
            },
            "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
              decreasing: -1,
              "slightly increasing": 0,
              "strongly increasing": 1,
            },
            Summe: { Maximum: 9 },
          },
        },
      },
    },
    Vektoren: {
      riskName: { de: "Vektoren", en: "vectors" },
      Gegenwart: {
        factorNameTranslations: {
          "Faktor 1 (FSME)": "factor 1 (FSME)",
          "Faktor 2 (Aedes albopictus)": "factor 2 (Aedes albopictus)",
          "Faktor 2 (West-Nil-Virus)": "factor 2 (western-nile virus)",
          "Faktor 3 (Zug)": "factor 3 (train)",
          "Faktor 3 (Flughafen)": "factor 3 (airport)",
          "Faktor 3 (Schiff)": "factor 3 (ship)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (FSME)": {
            "nicht relevant": 0,
            relevant: 1.33,
          },
          "Faktor 2 (Aedes albopictus)": {
            "nicht relevant": 0,
            relevant: 1.33,
          },
          "Faktor 2 (West-Nil-Virus)": {
            "nicht relevant": 0,
            relevant: 1.33,
          },
          "Faktor 3 (Zug)": {
            "nicht relevant": 0,
            relevant: 0.67,
          },
          "Faktor 3 (Flughafen)": {
            "nicht relevant": 0,
            relevant: 0.67,
          },
          "Faktor 3 (Schiff)": {
            "nicht relevant": 0,
            relevant: 0.67,
          },
          Summe: { Maximum: 6 },
          },
          en: {
            "Faktor 1 (FSME)": {
              irrelevant: 0,
              relevant: 1.33,
            },
            "Faktor 2 (Aedes albopictus)": {
              irrelevant: 0,
              relevant: 1.33,
            },
            "Faktor 2 (West-Nil-Virus)": {
              irrelevant: 0,
              relevant: 1.33,
            },
            "Faktor 3 (Zug)": {
              irrelevant: 0,
              relevant: 0.67,
            },
            "Faktor 3 (Flughafen)": {
              irrelevant: 0,
              relevant: 0.67,
            },
            "Faktor 3 (Schiff)": {
              irrelevant: 0,
              relevant: 0.67,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
      Zukunft: {
        factorNameTranslations: {
          "Faktor 1 (Zecken)": "factor 1 (ticks)",
          "Faktor 2 (Aedes albopictus)": "factor 2 (Aedes albopictus)",
          "Faktor 2 (West-Nil-Virus)": "factor 2 (western-nile virus)",
          "Faktor 3 (Bevölkerungsprognose)": "factor 3 (population forecast)",
          Summe: "sum",
        },
        headers: {
          de: {
          "Faktor 1 (Zecken)": { zunehmend: 0.67 },
          "Faktor 2 (Aedes albopictus)": {
            stagnierend: 0,
            zunehmend: 0.67,
          },
          "Faktor 2 (West-Nil-Virus)": {
            stagnierend: 0,
            zunehmend: 0.67,
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            "stark abnehmend": -1,
            "eher abnehmend": -0.5,
            stagnierend: 0,
            "eher zunehmend": 0.5,
            "stark zunehmend": 1,
          },
          Summe: { Maximum: 6 },
        },
          en: {
            "Faktor 1 (Zecken)": { increasing: 0.67 },
            "Faktor 2 (Aedes albopictus)": {
              stagnating: 0,
              increasing: 0.67,
            },
            "Faktor 2 (West-Nil-Virus)": {
              stagnating: 0,
              increasing: 0.67,
            },
            "Faktor 3 (Bevölkerungsprognose)": {
              "strongly decreasing": -1,
              "slightly decreasing": -0.5,
              stagnating: 0,
              "slightly increasing": 0.5,
              "strongly increasing": 1,
            },
            Summe: { Maximum: 6 },
          },
        },
      },
    },
  };
  static _IMPRINT = `
  <div id="imprint-content" class="subpage">
    <b>Impressum:</b> <br />
    Regional Climate Change and Health<br />
    Faculty of Medicine<br />
    University of Augsburg<br />
    Gutenbergstr. 7<br />
    86356 Neusäß<br />
    Contact: <a href="mailto:ehs@med.uni-augsburg.de"> ehs@med.uni-augsburg.de </a><br />
    <button></button>
  </div>`;
  static _LAYER_CLASSIFICATIONS = {
    // mapping of class descriptors to their upper bounds (exclusive)
    HotSpotsVeränderung: {
      headers: { gleichbleibend: 0, zunehmend: 1, "stark zunehmend": 2 },
    },
    Veränderung: {
      headers: {
        abnehmend: -10,
        "leicht abnehmend": -0.005, // TODO: find clean solution
        gleichbleibend: 0,
        "leicht zunehmend": 10,
        zunehmend: 20,
        "stark zunehmend": 30,
        "kritisch zunehmend": 40,
        "extrem zunehmend": 1000,
      },
    },
    Zeitpunkt: {
      headers: {
        "geringes Risiko": 20,
        "niedriges Risiko": 40,
        "mittleres Risiko": 60,
        "hohes Risiko": 80,
        "kritisches Risiko": 100,
        "extremes Risiko": 1000,
      },
    },
  };
  static _METHODS = `
  <div id="methods-content" class="subpage">
    Will be available after publication.<br />
    <button></button>
  </div>`;

  static _TEXT_CONTENTS = {
    riskControlHint: {
      de: "Wählen Sie eine Gefahr:",
      en: "Please choose a hazard:",
    },
    timeControlHint: {
      de: "Wählen Sie einen Zeitraum",
      en: "Please choose a time period:",
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
  };

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   * @param {*} languageHandler The global LanguageHandler-instance.
   */
  constructor(risk, time, languageHandler) {
    this._risk = risk;
    this._time =
      time === "current"
        ? "Gegenwart"
        : time === "future"
        ? "Zukunft"
        : "Veränderung";
    this._languageHandler = languageHandler;
  }

  /**
   * Get the class of the provided value regards the classification based on an optional detailed risk.
   * @param {*} value The value to classify.
   * @param {*} classMap The classification to use.
   * @param {*} detailedRisk The detail-factor the classification is based on. Per default undefined.
   * @returns The class as an array: The class-name in german at index 0, class-name in english at index 1 and the upper bound of the class interval at index 2.
   */
  _getClassForValue(value, classMap, detailedRisk = undefined) {
    if (!detailedRisk) {
      const upperBound = classMap.upperBounds
        .filter((bound) => {
          if (
            value === 0 &&
            classMap === ContentHandler._LAYER_CLASSIFICATIONS.Veränderung
          )
            return bound === 0; // ensure 0 stays an own class
          else if (
            classMap ===
            ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung
          ) {
          return bound >= value;
          }
          return bound > value;
        })
        .sort((number1, number2) =>
          number1 > number2 ? 1 : number1 === number2 ? 0 : -1
        )[0];
      const upperBoundIndex = classMap.upperBounds.indexOf(upperBound);
      const classNameDe =
        classMap === ContentHandler._LAYER_CLASSIFICATIONS.Veränderung &&
        value >= 0
          ? classMap.headers.de[upperBoundIndex + 1] // ensure 0 stays an own class
          : classMap.headers.de[upperBoundIndex];
      const classNameEn =
        classMap === ContentHandler._LAYER_CLASSIFICATIONS.Veränderung &&
        value >= 0
          ? classMap.headers.en[upperBoundIndex + 1] // ensure 0 stays an own class
          : classMap.headers.en[upperBoundIndex];
      return [classNameDe, classNameEn, upperBound];
    } else {
      for (const [classNameDe, valueDe] of Object.entries(classMap)) {
        if (value === valueDe) {
          for (const [classNameEn, valueEn] of Object.entries(
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers.en[detailedRisk]
          ))
            if (valueEn === value) {
              return [classNameDe, classNameEn, valueDe];
            }
        }
      }
    }
  }

  /**
   * Get a html-parsed string which displays the deatiled feature's property information.
   * @param {*} county The feature to compute the detailed information for.
   * @returns A html-parsed string with the detailed information.
   */
  _getDetailedPopupInformation(county) {
    let detailedHtml = '</div><div id="detailed">';
    detailedHtml += `<div id="${this._risk}-${this._time}" class="explanation">`;
    if (this._risk === "HotSpots" && this._time !== "Veränderung") {
      const riskPropertiesToDisplay = Object.keys(
        county.feature.properties
      ).filter((property) => {
        return (
          property.endsWith(this._time) && !property.startsWith("HotSpots")
        );
      });
      for (const riskPropertyName of riskPropertiesToDisplay) {
        let classForValue = this._getClassForValue(
          county.feature.properties[riskPropertyName],
          ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
        );
        detailedHtml += `
        <span class='${this._risk}-${
          this._time
        }-detailed' lang="de"><b>${riskPropertyName}:</b> ${
          classForValue[0]
        }<br></span>
        <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
          ContentHandler._FACTOR_CLASSIFICATIONS[riskPropertyName.split(" ")[0]]
            .riskName.en
        } ${
          this._time === "Veränderung"
            ? "change"
            : this._time === "Gegenwart"
            ? "currently"
            : "future"
        }:</b> ${classForValue[1]}<br></span>`;
      }
    } else if (this._time === "Veränderung") {
      const riskScoreToday =
        county.feature.properties[`${this._risk} Gegenwart`];
      const riskScoreFuture =
        county.feature.properties[`${this._risk} Zukunft`];
      const classToday = this._getClassForValue(
        riskScoreToday,
        ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
      );
      const classFuture = this._getClassForValue(
        riskScoreFuture,
        ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt
      );
      detailedHtml += `
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Gegenwart :</b> ${classToday[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Zukunft :</b> ${classFuture[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        this._risk === "HotSpots"
          ? "HotSpots"
          : ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
      } currently :</b> ${classToday[1]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        this._risk === "HotSpots"
          ? "HotSpots"
          : ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
      } in future :</b> ${classFuture[1]}<br></span>`;
    } else {
      Object.entries(
        ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time].headers
          .de
      ).forEach((risk) => {
        ["de", "en"].forEach((language) => {
          if (risk[0] === "Summe") {
          detailedHtml += `<span class='${this._risk}-${
            this._time
            }-detailed' lang="${language}"><b>${
              language === "de" ? risk[0] : "sum"
            }:</b> ${county.feature.properties[
              `${this._risk} ${this._time} Summe`
            ].toFixed()} ${language === "de" ? "von" : "out of"} ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
                .headers[language][risk[0]].Maximum
            }<br></span>`;
        } else {
            let detailedRiskValue =
              county.feature.properties[
                `${this._risk} ${this._time} ${risk[0]}`
              ];
          let classForValue = this._getClassForValue(
            detailedRiskValue,
              risk[1],
              risk[0]
          );
          detailedHtml += `<span class='${this._risk}-${
            this._time
            }-detailed' lang="${language}"><b>${
              language === "de"
                ? risk[0].substring(
                    risk[0].indexOf("(") + 1,
                    risk[0].indexOf(")")
                  )
                : ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
                    this._time
                  ].factorNameTranslations[risk[0]].substring(
                    ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
                      this._time
                    ].factorNameTranslations[risk[0]].indexOf("(") + 1,
                    ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
                      this._time
                    ].factorNameTranslations[risk[0]].indexOf(")")
                  )
            }:</b> ${
              language === "de" ? classForValue[0] : classForValue[1]
            }<br></span>`;
        }
        });
      });
    }
    return (detailedHtml += "</div></div>");
  }

  /**
   * Remove the subframe HTML-Element from DOM and update the interface-appearance.
   * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element.
   */
  static closeCurrentSubframe(subframeHtmlContainer) {
    for (const button of document.querySelectorAll("#metadata button")) {
      button.classList.remove("current");
    }
    for (const subframe of document.querySelectorAll(".subframe")) {
      subframeHtmlContainer.removeChild(subframe);
    }
  }

  /**
   * Show the corresponding subframe to the clicked button.
   * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element. Latter gets inserted here.
   * @param {*} clickedButton The button that was clicked and led to subframe request.
   */
  static showSubframe(subframeHtmlContainer, clickedButton) {
    ContentHandler.closeCurrentSubframe(subframeHtmlContainer);
    const subframeHtml =
      clickedButton.id === "imprint"
        ? ContentHandler._IMPRINT
        : ContentHandler._METHODS;
    subframeHtmlContainer.insertAdjacentHTML("afterbegin", subframeHtml);
    clickedButton.classList.add("current");
    document.querySelector(".subframe button").onclick = () =>
      ContentHandler.closeCurrentSubframe(subframeHtmlContainer);
  }

  static getLegendClasses(risk, time, language) {
    if (time === "Veränderung" && risk === "HotSpots") {
      return ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung.headers[
        language
      ];
    } else if (time === "Veränderung") {
      return ContentHandler._LAYER_CLASSIFICATIONS.Veränderung.headers[
        language
      ];
    } else {
      return ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt.headers[language];
    }
  }

  static getLegendTitle(risk, time, language) {
    const legendRisk =
      risk === "HotSpots"
        ? "HotSpots"
        : ContentHandler._FACTOR_CLASSIFICATIONS[risk].riskName[language];
    const legendTime =
      time === "Gegenwart"
        ? ContentHandler._TEXT_CONTENTS.currentTimeTitle[language]
        : time === "Veränderung"
        ? ContentHandler._TEXT_CONTENTS.changeTimeTitle[language]
        : ContentHandler._TEXT_CONTENTS.futureTimeTitle[language];
    return `${legendRisk} ${legendTime}`;
  }

  /**
   * Get a html-parsed string which displays the feature-specific popup.
   * @param {*} county The feature to compute the popup for.
   * @returns A html-parsed string representing the popup for the provided county.
   */
  getPopupContent(county) {
    let popupContentHtml = `<h4>${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</h4>`;
    let countyClass, classSeperatorsAmount;
    const classMap =
      this._time === "Veränderung" && this._risk === "HotSpots"
        ? ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung
        : this._time === "Veränderung"
        ? ContentHandler._LAYER_CLASSIFICATIONS.Veränderung
        : ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt;
    let index = new Array(
      classMap.upperBounds.sort(
        (number1, number2) =>
          classMap.upperBounds[number1] - classMap.upperBounds[number2]
      )
    )[0];
    countyClass = this._getClassForValue(
      county.feature.properties[`${this._risk} ${this._time}`],
      classMap
    );
    popupContentHtml += `<span class="${this._risk}-${
      this._time
    }-result" lang="de"><b>${
      this._time === "Veränderung"
        ? `${this._risk}-Veränderung: `
        : `${this._risk}-Risiko: `
    }</b>${countyClass[0]}</span>
    <span class="${this._risk}-${this._time}-result" lang="en"><b>${
      this._risk === "HotSpots" && this._time === "Veränderung"
        ? "HotSpots change: "
        : this._risk === "HotSpots"
        ? "HotSpots risk: "
        : this._time === "Veränderung"
        ? `${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
          } change: `
        : `${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk].riskName.en
          } risk: `
    }</b>${countyClass[1]}</span>`;
    let valueToDisplay =
      county.feature.properties[`${this._risk} ${this._time}`];
    let left_property;
    if (this._risk === "HotSpots" && this._time === "Veränderung") {
      classSeperatorsAmount = 3;
      popupContentHtml += '<div id="hotspot-change" class="score-bar">';
      left_property = Math.min(40 * valueToDisplay + 8, 188); // 8px from left end to middle of first bar, then +40px for each class
    } else if (this._time === "Veränderung") {
      classSeperatorsAmount = 6;
      popupContentHtml += '<div id="change" class="score-bar">';
      left_property =
        valueToDisplay <= 0
          ? Math.max(4 * valueToDisplay + 68, -12)
          : Math.min(4 * valueToDisplay + 68, 268); // 4px represent one score-point, 68px represents zero score-points
    } else {
      classSeperatorsAmount = 5;
      popupContentHtml += '<div id="at-time" class="score-bar">';
      left_property = Math.min(2 * valueToDisplay - 12, 228); // 2px represent one score-point, minus offset 12px
    }
    for (let i = 1; i <= index.length; i++) {
      if (i === 1) {
        valueToDisplay =
          this._time === "Veränderung" && valueToDisplay >= 0.5
            ? `+${Number(valueToDisplay.toFixed())}`
            : `${Number(valueToDisplay.toFixed())}`;

        popupContentHtml += `
        <div class="class-${i}">
          <div class="interval-border" ${
            this._risk === "HotSpots" && this._time === "Veränderung"
              ? "style=left:8px;"
              : ""
          }>
            <span class="interval-bound">${index[i - 1]}</span>
            <span class="interval-seperator">|</span>
          </div>
          <div id="value-pointer" style="left:${left_property}px;">
            <span id="pointer"></span>
            <span id="value">${valueToDisplay}</span>
          </div>
        </div>`;
      } else {
        popupContentHtml += `<div class="class-${i}">`;
        if (i <= classSeperatorsAmount) {
          popupContentHtml += `
          <div class="interval-border" ${
            this._risk === "HotSpots" && this._time === "Veränderung"
              ? "style=left:8px;"
              : ""
          }>
            <span class="interval-bound">${index[i - 1]}</span>
            <span class="interval-seperator">|</span>
          </div>
        </div>`;
        } else {
          popupContentHtml += "</div>";
          break;
        }
      }
    }
    popupContentHtml += this._getDetailedPopupInformation(county);
    return popupContentHtml;
  }

  /**
   * Get a html-parsed string which displays the feature-specific tooltip.
   * @param {*} county The feature to compute the tooltip for.
   * @returns A html-parsed string representing the tooltip for the provided county.
   */
  getTooltipContent(county) {
    const symbolizingValue =
      county.feature.properties[`${this._risk} ${this._time}`];
    return `<span class="tooltip-title">${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</span><br><span class="value" style="color: ${StyleManager.getHexColor(
      symbolizingValue,
      this._risk,
      this._time
    )}">${
      symbolizingValue > 0 && this._time === "Veränderung" ? "+" : ""
    }${Number(symbolizingValue).toFixed()}</span>`;
  }
}
