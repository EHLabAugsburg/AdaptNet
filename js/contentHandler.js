/**
 * Class to ensure the dynamically display of correct information in popups, tooltips and subpages.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
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
  static _METHODS = `
  <div id="methods-content" class="subpage">
    Will be available after publication.<br />
    <button></button>
  </div>`;
  static _POPUP_CONTENT_INFO = {
    Luftqualität: {
      Gegenwart: {
        headers: {
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
      },
      Zukunft: {
        headers: {
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
      },
    },
    Allergene: {
      Gegenwart: {
        headers: {
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
      },
      Zukunft: {
        headers: {
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
      },
    },
    Überschwemmung: {
      Gegenwart: {
        headers: {
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
      },
      Zukunft: {
        headers: {
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
      },
    },
    Waldbrand: {
      Gegenwart: {
        headers: {
          "Faktor 1 (FWI)": {
            gering: 1,
            niedrig: 2,
            mittel: 3,
            hoch: 4,
            kritisch: 5,
          },
          Summe: { Maximum: 5 },
        },
      },
      Zukunft: {
        headers: {
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
      },
    },
    Hitze: {
      Gegenwart: {
        headers: {
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
      },
      Zukunft: {
        headers: {
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
      },
    },
    Vektoren: {
      Gegenwart: {
        headers: {
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
      },
      Zukunft: {
        headers: {
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

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   */
  constructor(risk, time) {
    this._risk = risk;
    this._time =
      time == "current"
        ? "Gegenwart"
        : time == "future"
        ? "Zukunft"
        : "Veränderung";
  }

  /**
   * Get the class of the provided value regards the classification based on the provided risk, time and optional detailed risk.
   * @param {*} value The value to classify.
   * @param {*} risk The risk the classification is based on.
   * @param {*} time The time the classification is based on.
   * @param {*} detailedRisk The detail-factor the classification is based on. Per default undefined.
   * @returns The class as an array: The class-name at index 0, the upper bound of the class interval at index 1.
   */
  _getClassForValue(value, risk, time, detailedRisk = undefined) {
    const classMap = detailedRisk
      ? ContentHandler._FACTOR_CLASSIFICATIONS[risk][time].headers[detailedRisk]
      : risk == "HotSpots" && time == "Veränderung"
      ? ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung.headers
      : time == "Veränderung"
      ? ContentHandler._LAYER_CLASSIFICATIONS.Veränderung.headers
      : ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt.headers;
    return Array.from(Object.entries(classMap)).filter((currentClass) => {
      return currentClass[1] >= value;
    })[0];
  }

  /**
   * Get a html-parsed string which displays the deatiled feature's property information.
   * @param {*} county The feature to compute the detailed information for.
   * @returns A html-parsed string with the detailed information.
   */
  _getDetailedPopupInformation(county) {
    let classForValue;
    var detailedHtml = '</div><div id="detailed">';
    detailedHtml += `<div id="${this._risk}-${this._time}" class="explanation">`;
    if (this._risk == "HotSpots" && this._time != "Veränderung") {
      let riskPropertiesToDisplay = [];
      for (const [riskPropertyName, _] of Object.entries(
        county.feature.properties
      )) {
        if (riskPropertyName.endsWith(this._time)) {
          riskPropertiesToDisplay.push(riskPropertyName);
        }
      }
      for (const riskPropertyName of riskPropertiesToDisplay) {
        classForValue = this._getClassForValue(
          county.feature.properties[riskPropertyName],
          this._risk,
          this._time
        );
        detailedHtml += `<span class='${this._risk}-${this._time}-detailed'><b>${riskPropertyName}:</b> ${classForValue[0]}</span><br>`;
      }
    } else if (this._time == "Veränderung") {
      var riskScoreToday = Number(
        county.feature.properties[`${this._risk} Gegenwart`]
      );
      var riskScoreFuture = Number(
        county.feature.properties[`${this._risk} Zukunft`]
      );
      const classToday = this._getClassForValue(riskScoreToday, this._risk);
      const classFuture = this._getClassForValue(riskScoreFuture, this._risk);
      detailedHtml += `<span class='${this._risk}-${this._time}-detailed'><b>${this._risk} Gegenwart :</b> ${classToday[0]}</span><br><span class='${this._risk}-${this._time}-detailed'><b>${this._risk} Zukunft :</b> ${classFuture[0]}</span><br>`;
    } else {
      for (const [riskName, _] of Object.entries(
        ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time].headers
      )) {
        let detailedRiskValue =
          county.feature.properties[`${this._risk} ${this._time} ${riskName}`];
          if (riskName == "Summe") {
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed'><b>${riskName}:</b> ${detailedRiskValue} von ${
            ContentHandler._FACTOR_CLASSIFICATIONS[this._risk][this._time]
              .headers[riskName].Maximum
          }</span><br>`;
        } else {
          classForValue = this._getClassForValue(
            detailedRiskValue,
            this._risk,
            this._time,
            riskName
          );
          detailedHtml += `<span class='${this._risk}-${
            this._time
          }-detailed'><b>${riskName.substring(
            riskName.indexOf("(") + 1,
            riskName.indexOf(")")
          )}:</b> ${classForValue[0]}</span><br>`;
        }
      }
    }
    return (detailedHtml += "</div></div>");
  }

  /**
   * Remove the subpage HTML-Element from DOM and update the interface-appearance.
   * @param {*} subpageHtmlContainer The parent-node of the subpage HTML-element.
   */
  static closeCurrentSubpage(subpageHtmlContainer) {
    for (const button of document.querySelectorAll("#metadata button")) {
      button.classList.remove("current");
    }
    for (const subpage of document.querySelectorAll(".subpage")) {
      subpageHtmlContainer.removeChild(subpage);
    }
  }

  /**
   * Get the HTML-Element for the imprint subpage.
   * @returns The HTML-parsed string representing the imprint-subpage.
   */
  static getImprint() {
    return ContentHandler._IMPRINT;
  }

  /**
   * Get the HTML-Element for the methods subpage.
   * @returns The HTML-parsed string representing the methods-subpage.
   */
  static getMethods() {
    return ContentHandler._METHODS;
  }

  /**
   * Show the corresponding subpage to the clicked button.
   * @param {*} subpageHtmlContainer The parent-node of the subpage HTML-element. Latter gets inserted here.
   * @param {*} clickedButton The button that was clicked and led to subpage request.
   */
  static showSubpage(subpageHtmlContainer, clickedButton) {
    ContentHandler.closeCurrentSubpage(subpageHtmlContainer);
    var subPageHtml =
      clickedButton.id == "imprint"
        ? ContentHandler.getImprint()
        : ContentHandler.getMethods();
    subpageHtmlContainer.insertAdjacentHTML("afterbegin", subPageHtml);
    clickedButton.classList.add("current");
    document.querySelector(".subpage button").onclick = () =>
      ContentHandler.closeCurrentSubpage(subpageHtmlContainer);
  }

  /**
   * Get a html-parsed string which displays the feature-specific popup.
   * @param {*} county The feature to compute the popup for.
   * @returns A html-parsed string representing the popup for the provided county.
   */
  getPopupContent(county) {
    var popupContentHtml = `<h4>${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</h4>`;
    var countyClassName;
    var classMap =
      this._time == "Veränderung" && this._risk == "HotSpots"
        ? ContentHandler._LAYER_CLASSIFICATIONS.HotSpotsVeränderung.headers
        : this._time == "Veränderung"
        ? ContentHandler._LAYER_CLASSIFICATIONS.Veränderung.headers
        : ContentHandler._LAYER_CLASSIFICATIONS.Zeitpunkt.headers;
    for (const [className, upperBound] of Object.entries(classMap)) {
      if (
        county.feature.properties[`${this._risk} ${this._time}`] <= upperBound
      ) {
        countyClassName = className;
        break;
      }
    }
    popupContentHtml += `<span id="${this._risk}-${this._time}-result"><b>${
      this._time == "Veränderung"
        ? `${this._risk}-Veränderung: `
        : `${this._risk}-Risiko: `
    }</b>${countyClassName}</span>`;
    var valueToDisplay =
      county.feature.properties[`${this._risk} ${this._time}`];
    let left_property, classes;
    if (this._risk == "HotSpots" && this._time == "Veränderung") {
      popupContentHtml += '<div id="hotspot-change" class="score-bar">';
      left_property = Math.min(40 * valueToDisplay + 8, 188); // 8px from left end to middle of first bar, then +40px for each class
      classes = 3;
    } else if (this._risk == "HotSpots") {
      popupContentHtml += '<div id="timed" class="score-bar">';
      left_property = Math.min(2 * valueToDisplay - 12, 228); // 2px represent one score-point, minus offset 12px
      classes = 6;
    } else if (this._time == "Veränderung") {
      popupContentHtml += '<div id="change" class="score-bar">';
      left_property =
        valueToDisplay <= 0
          ? Math.max(4 * valueToDisplay + 68, -12)
          : Math.min(4 * valueToDisplay + 68, 268); // 4px represent one score-point, 68px represents zero score-points
      classes = 7;
    } else {
      popupContentHtml += '<div id="timed" class="score-bar">';
      left_property = Math.min(2 * valueToDisplay - 12, 228); // 2px represent one score-point, minus offset 12px
      classes = 6;
    }

    for (let i = 1; i <= classes; i++) {
      if (i == 1) {
        valueToDisplay =
          this._time == "Veränderung" && valueToDisplay >= 0.5
            ? `+${Number(valueToDisplay.toFixed())}`
            : `${Number(valueToDisplay.toFixed())}`;

        popupContentHtml += `
        <div class="class-${i}">
          <div id="value-pointer" style="left:${left_property}px;">
            <span id="pointer"></span>
            <span id="value">${valueToDisplay}</span>
          </div>
        </div>`;
      } else {
        popupContentHtml += `<div class="class-${i}"></div>`;
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
    var tooltipContentHtml = `<span class="tooltip-title">${
      county.feature.properties[ContentHandler._COUNTY_NAME_PROPERTY_NAME]
    }</span><br><span class="value" style="color: ${StyleManager.getHexColor(
      symbolizingValue,
      this._risk,
      this._time
    )}">${
      symbolizingValue > 0 && this._time == "Veränderung" ? "+" : ""
    }${Number(symbolizingValue).toFixed(1)}</span>`;
    return tooltipContentHtml;
  }
}
