"use strict";
/**
 * Class to ensure the dynamically display of correct information in popups, tooltips and subpages.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
  static _LINK_PAGE_BASE_URL = {
    de: "https://www.uni-augsburg.de/de/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
    en: "https://www.uni-augsburg.de/en/fakultaet/med/profs/klimawandel-gesundheit/forschung/adaptnet/risikokarten",
  };
  static _IMPRINT = `
  <div id="imprint-content" class="subframe">
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
      headers: {
        de: ["gleichbleibend", "zunehmend", "stark zunehmend"],
        en: ["constant", "increasing", "strongly increasing"],
      },
      upperBounds: [0, 1, 2],
    },
    Veränderung: {
      headers: {
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
          "critically increasing",
          "extremely increasing",
        ],
      },
      upperBounds: [-10, 0, 10, 20, 30, 40, 1000],
    },
    Zeitpunkt: {
      headers: {
        de: [
          "geringes Risiko",
          "niedriges Risiko",
          "mittleres Risiko",
          "hohes Risiko",
          "kritisches Risiko",
          "extremes Risiko",
        ],
        en: [
          "very low risk",
          "low risk",
          "medium risk",
          "high risk",
          "critical risk",
          "extreme risk",
        ],
      },
      upperBounds: [20, 40, 60, 80, 100, 1000],
    },
  };
  static _METHODS = `
  <div id="methods-content" class="subframe">
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
            classMap ===
            ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung
          )
            return bound >= value;
          return bound > value;
        })
        .sort((number1, number2) =>
          number1 > number2 ? 1 : number1 === number2 ? 0 : -1
        )[0];
      const upperBoundIndex = classMap.upperBounds.indexOf(upperBound);
      const classNameDe = classMap.headers.de[upperBoundIndex];
      const classNameEn = classMap.headers.en[upperBoundIndex];
      return [classNameDe, classNameEn, upperBound];
    } else {
      for (const [classNameDe, classValue] of Object.entries(classMap)) {
        if (value === classValue) {
          return [
            classNameDe,
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[detailedRisk].en[
              ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
                this._time
              ].headers[detailedRisk].de.indexOf(classNameDe)
            ],
            value,
          ];
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
          DataProvider.getRiskName(riskPropertyName.split(" ")[0]).en
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
        DataProvider.getRiskName(this._risk).en
      } currently :</b> ${classToday[1]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        DataProvider.getRiskName(this._risk).en
      } in future :</b> ${classFuture[1]}<br></span>`;
    } else {
      Object.entries(
        DataProvider.getRiskFactors(this._risk, this._time)
      ).forEach(([riskName, riskClasses]) => {
        if (riskName === "Summe") {
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed' lang="de"><b>${riskName}:</b> ${county.feature.properties[
            `${this._risk} ${this._time} Summe`
          ].toFixed()} von ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[riskName].Maximum
          }<br></span>
          <span class='${this._risk}-${
            this._time
          }-detailed' lang="en"><b>sum:</b> ${county.feature.properties[
            `${this._risk} ${this._time} Summe`
          ].toFixed()} out of ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[riskName].Maximum
          }<br></span>`;
        } else {
          let detailedRiskValue =
            county.feature.properties[
              `${this._risk} ${this._time} ${riskName}`
            ];
          let classForValue = this._getClassForValue(
            detailedRiskValue,
            Object.fromEntries(
              riskClasses.de.map((element, index) => [
                element,
                riskClasses.values[index],
              ])
            ),
            riskName
          );
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed' lang="de"><b>${riskName.substring(
            riskName.indexOf("(") + 1,
            riskName.indexOf(")")
          )}:</b> ${classForValue[0]}<br></span>
          <span class='${this._risk}-${
            this._time
          }-detailed' lang="en"><b>${ContentHandler._FACTOR_CLASSIFICATIONS[
            this._risk
          ][this._time].factorNameTranslations[riskName].substring(
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
              this._time
            ].factorNameTranslations[riskName].indexOf("(") + 1,
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][
              this._time
            ].factorNameTranslations[riskName].indexOf(")")
          )}:</b> ${classForValue[1]}<br></span>`;
        }
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

  /**
   * Get the title of the legend.
   * @param {*} risk The risk the map displays currently.
   * @param {*} time The time the map displays currently.
   * @param {*} language The langage of the legend-title.
   * @returns The appropriate legend-title as string.
   */
  static getLegendTitle(risk, time, language) {
    const legendRisk =
      risk === "HotSpots"
        ? ContentHandler._TEXT_CONTENTS.hotSpotsLegendDescriber[language]
        : DataProvider.getRiskName(risk)[language];
    const legendTime =
      time === "Gegenwart"
        ? ContentHandler._TEXT_CONTENTS.currentTimeTitle[language]
        : time === "Veränderung"
        ? ContentHandler._TEXT_CONTENTS.changeTimeTitle[language]
        : ContentHandler._TEXT_CONTENTS.futureTimeTitle[language];
    return `${legendRisk} ${legendTime}`;
  }

  /**
   * Get the title of the map.
   * @param {*} risk The risk the map displays currently.
   * @param {*} language The langage of the map-title.
   * @returns The appropriate map-title as string.
   */
  static getMapTitle(risk, language) {
    if (language === "de") {
      return risk !== "HotSpots"
        ? `Gesundheitliche Risiken durch ${risk}`
        : "HotSpots der Gesundheitsgefahren";
    } else {
      return risk !== "HotSpots"
        ? `health risks through ${DataProvider.getRiskName(risk)[language]}`
        : "Hotspots of Climate-Related Health Hazards";
    }
  }

  /**
   * Get a risk-explanation.
   * @param {*} risk The risk of the explanation
   * @param {*} language The language of the explanation.
   * @returns The explanation as string.
   */
  static getRiskExplanation(risk, language) {
    return ContentHandler._FACTOR_CLASSIFICATIONS[risk].explanation[language];
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
    const riskClassText = // alter risk-description for value 0 on change-layers
      county.feature.properties[`${this._risk} ${this._time}`] === 0 &&
      this._time === "Veränderung"
        ? ["gleichbleibend", "constant"]
        : [countyClass[0], countyClass[1]];
    popupContentHtml += `<span class="${this._risk}-${
      this._time
    }-result" lang="de"><b>${
      this._time === "Veränderung"
        ? `${this._risk}-Veränderung: `
        : `${this._risk}-Risiko: `
    }</b>${riskClassText[0]}</span>
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
    }</b>${riskClassText[1]}</span>`;
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
