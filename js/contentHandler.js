"use strict";
/**
 * Class to ensure the dynamically display of correct information in popups, tooltips and subpages.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
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
  static _METHODS = `
  <div id="methods-content" class="subframe">
    Will be available after publication.<br />
    <button></button>
  </div>`;

  static _TEXT_CONTENTS = {
    changeTimeTitle: {
      de: "Veränderung des Risikos durch",
      en: "Change in risk through",
    },
    pastTimeTitle: {
      de: "in der jüngeren Vergangenheit",
      en: "in the recent past",
    },
    futureTimeTitle: {
      de: "Künftiges Risiko durch",
      en: "Projected risk through",
    },
    hotSpotsLegendDescriber: {
      de: "Gesundheits&shy;gefahren",
      en: "health hazards",
    },
    risk: { de: "Risiko", en: "risk" },
    riskControlHint: {
      de: "Wählen Sie eine Gefahr:",
      en: "Please choose a hazard:",
    },
    searchPlaceHolder: {
      de: "Kreis suchen...",
      en: "Search county...",
    },
    timeControlHint: {
      de: "Wählen Sie einen Zeitraum",
      en: "Please choose a time period:",
    },
  };

  /**
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   * @param {*} languageHandler The global LanguageHandler-instance.
   */
  constructor(risk, time, languageHandler) {
    this._risk = risk;
    this._time = time;
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
      const upperBound = Math.min(
        ...classMap.bounds.filter((bound) => {
          if (classMap === DataProvider.getClassification("HotSpots", "change"))
            return bound >= value; //using greater than in this case because values are discrete
          return bound > value;
        })
      );
      const upperBoundIndex = classMap.bounds.indexOf(upperBound);
      const classNameDe = classMap.classLabels.de[upperBoundIndex];
      const classNameEn = classMap.classLabels.en[upperBoundIndex];
      return [classNameDe, classNameEn, upperBound];
    } else {
      for (const [classNameDe, classValue] of Object.entries(classMap)) {
        if (value === classValue) {
          const factorClasses = DataProvider.getFactorClasses(
            this._risk,
            this._time,
            detailedRisk
          );
          return [
            classNameDe,
            factorClasses.en[factorClasses.de.indexOf(classNameDe)],
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
    if (this._risk === "HotSpots" && this._time !== "change") {
      const riskPropertiesToDisplay = Object.keys(
        county.feature.properties
      ).filter((property) => {
        return (
          property.endsWith(DataProvider.getTimeDescriptor(this._time)) &&
          !property.startsWith("HotSpots")
        );
      });
      for (const riskPropertyName of riskPropertiesToDisplay) {
        let classForValue = this._getClassForValue(
          county.feature.properties[riskPropertyName],
          DataProvider.getClassification(this._risk, this._time)
        );
        detailedHtml += `
        <span class='${this._risk}-${
          this._time
        }-detailed' lang="de"><b>${riskPropertyName}:</b> ${
          classForValue[0]
        }<br></span>
        <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
          DataProvider.getRiskName(riskPropertyName.split(" ")[0]).en
        } ${this._time}:</b> ${classForValue[1]}<br></span>`;
      }
    } else if (this._time === "change") {
      const riskScoreToday =
        county.feature.properties[`${this._risk} Vergangenheit`];
      const riskScoreFuture =
        county.feature.properties[`${this._risk} Zukunft`];
      const classToday = this._getClassForValue(
        riskScoreToday,
        DataProvider.getClassification(this._risk, "past")
      );
      const classFuture = this._getClassForValue(
        riskScoreFuture,
        DataProvider.getClassification(this._risk, "future")
      );
      detailedHtml += `
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Vergangenheit :</b> ${classToday[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="de"><b>${
        this._risk
      } Zukunft :</b> ${classFuture[0]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        DataProvider.getRiskName(this._risk).en
      } past :</b> ${classToday[1]}<br></span>
      <span class='${this._risk}-${this._time}-detailed' lang="en"><b>${
        DataProvider.getRiskName(this._risk).en
      } in future :</b> ${classFuture[1]}<br></span>`;
    } else {
      Object.entries(
        DataProvider.getRiskFactors(this._risk, this._time)
      ).forEach(([riskName, riskClasses]) => {
        if (riskName === "Summe") {
          const riskFactorValue = DataProvider.getFactorClasses(
            this._risk,
            this._time,
            riskName
          ).Maximum;
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed' lang="de"><b>${riskName}:</b> ${county.feature.properties[
            `${this._risk} ${DataProvider.getTimeDescriptor(this._time)} Summe`
          ].toFixed(2)} von ${riskFactorValue}<br></span>
          <span class='${this._risk}-${
            this._time
          }-detailed' lang="en"><b>sum:</b> ${county.feature.properties[
            `${this._risk} ${DataProvider.getTimeDescriptor(this._time)} Summe`
          ].toFixed(2)} out of ${riskFactorValue}<br></span>`;
        } else {
          const factorName = DataProvider.getFactorNames(
            this._risk,
            this._time,
            riskName
          );
          let detailedRiskValue =
            county.feature.properties[
              `${this._risk} ${DataProvider.getTimeDescriptor(
                this._time
              )} ${riskName}`
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
          }-detailed' lang="en"><b>${factorName.substring(
            factorName.indexOf("(") + 1,
            factorName.indexOf(")")
          )}:</b> ${classForValue[1]}<br></span>`;
        }
      });
    }
    return (detailedHtml += "</div></div>");
  }

  /**
   * Show the corresponding subframe to the clicked button.
   * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element. Latter gets inserted here.
   * @param {*} clickedButton The button that was clicked and led to subframe request.
   */
  static showSubframe(subframeHtmlContainer, clickedButton) {
    closeCurrentSubframe(subframeHtmlContainer);
    const subframeHtml =
      clickedButton.id === "imprint"
        ? ContentHandler._IMPRINT
        : ContentHandler._METHODS;
    subframeHtmlContainer.insertAdjacentHTML("afterbegin", subframeHtml);
    clickedButton.classList.add("current");
    document.querySelector(".subframe button").onclick = () =>
      closeCurrentSubframe(subframeHtmlContainer);
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
    if (time === "past")
      return `${
        language === "de" ? "Risiko durch" : "risk through"
      } ${legendRisk} ${ContentHandler._TEXT_CONTENTS.pastTimeTitle[language]}`;
    else if (time === "change")
      return `${ContentHandler._TEXT_CONTENTS.changeTimeTitle[language]} ${legendRisk}`;
    else
      return `${ContentHandler._TEXT_CONTENTS.futureTimeTitle[language]} ${legendRisk}`;
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
        ? `Health risks through ${DataProvider.getRiskName(risk)[language]}`
        : "Hotspots of Climate-Related Health Hazards";
    }
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
    const classMap = DataProvider.getClassification(this._risk, this._time);
    let index = new Array(
      classMap.bounds.sort(
        (number1, number2) =>
          classMap.bounds[number1] - classMap.bounds[number2]
      )
    )[0];
    countyClass = this._getClassForValue(
      county.feature.properties[
        `${this._risk} ${DataProvider.getTimeDescriptor(this._time)}`
      ],
      classMap
    );
    const riskClassText = // alter risk-description for exact value 0 on change-layers
      county.feature.properties[
        `${this._risk} ${DataProvider.getTimeDescriptor(this._time)}`
      ] === 0 && this._time === "change"
        ? ["gleichbleibend", "constant"]
        : [countyClass[0], countyClass[1]];
    popupContentHtml += `<span class="${this._risk}-${
      this._time
    }-result" lang="de"><b>${
      this._time === "change"
        ? "Risiko-Trend: "
        : `${this._time === "past" ? "vergangenes" : "projiziertes"} Risiko: `
    }</b>${riskClassText[0]}</span>
    <span class="${this._risk}-${this._time}-result" lang="en"><b>${
      this._time === "change"
        ? "risk trend: "
        : `${this._time === "past" ? this._time : "projected"} risk: `
    }</b>${riskClassText[1]}</span>`;
    let valueToDisplay =
      county.feature.properties[
        `${this._risk} ${DataProvider.getTimeDescriptor(this._time)}`
      ];
    let left_property;
    if (this._risk === "HotSpots" && this._time === "change") {
      classSeperatorsAmount = 3;
      popupContentHtml += '<div id="hotspot-change" class="score-bar">';
      left_property = Math.min(40 * valueToDisplay + 8, 188); // 8px from left end to middle of first bar, then +40px for each class
    } else if (this._time === "change") {
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
          this._time === "change" && valueToDisplay >= 0.5
            ? `+${Number(valueToDisplay.toFixed())}`
            : `${Number(valueToDisplay.toFixed())}`;

        popupContentHtml += `
        <div class="class-${i}">
          <div class="interval-border" ${
            this._risk === "HotSpots" && this._time === "change"
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
            this._risk === "HotSpots" && this._time === "change"
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
      county.feature.properties[
        `${this._risk} ${DataProvider.getTimeDescriptor(this._time)}`
      ];
    return `<span class="tooltip-title">${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</span><br><span class="value" style="color: ${StyleManager.getHexColor(
      symbolizingValue,
      this._risk,
      this._time
    )}">${symbolizingValue > 0 && this._time === "change" ? "+" : ""}${Number(
      symbolizingValue
    ).toFixed()}</span>`;
  }
}
