/**
 * Class to ensure the dynamically display of correct information in popups and tooltips.
 */
class ContentHandler {
  static _COUNTY_NAME_PROPERTY_NAME = "gen";
  static _POPUP_CONTENT_INFO = {
    Luftqualität: {
      Gegenwart: {
        headers: {
          "Faktor 1 (PM2.5)": {
            hoch: 2,
            mittel: 1,
            gering: 0,
          },
          "Faktor 1 (PM10)": {
            hoch: 2,
            mittel: 1,
            gering: 0,
          },
          "Faktor 1 (NO2)": {
            hoch: 2,
            mittel: 1,
            gering: 0,
          },
          "Faktor 1 (O3)": {
            hoch: 2,
            mittel: 1,
            gering: 0,
          },
          "Faktor 2 (Hitze)": {
            kritisch: 2,
            hoch: 1.5,
            mittel: 1,
            niedrig: 0.5,
            gering: 0,
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
            "stark zunehmend": 1,
            "eher zunehmend": 0.5,
            stagnierend: 0,
            "eher abnehmend": -0.5,
            "stark abnehmend": -1,
          },
          "Faktor 3 (Hitze)": {
            stagnierend: 0,
            "leicht zunehmend": 1,
            zunehmend: 2,
            "stark zunehmend": 3,
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
            "sehr hoch": 1,
            hoch: 0.75,
            mittel: 0.5,
            gering: 0.25,
            "nicht relevant": 0,
          },
          "Faktor 3 (Pollen)": { hoch: 2 },
          "Faktor 4 (Luftqualität)": {
            kritisch: 2,
            hoch: 1.5,
            mittel: 1,
            niedrig: 0.5,
            gering: 0,
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        headers: {
          "Faktor 1 (Prozessionsspinner)": {
            zunehmend: 0.5,
            stagnierend: 0,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark zunehmend": 0.5,
            "eher zunehmend": 0.25,
            stagnierend: 0,
            "eher abnehmend": -0.25,
            "stark abnehmend": -0.5,
          },
          "Faktor 3 (Temperatur)": {
            zunehmend: 1,
            stagnierend: 0,
          },
          "Faktor 4 (Luftqualtät)": {
            zunehmend: 0.5,
            stagnierend: 0,
            abnehmend: -0.5,
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    Überschwemmung: {
      Gegenwart: {
        headers: {
          "Faktor 1 (Starkniederschlag)": {
            hoch: 2,
            mittel: 1,
            gering: 0,
          },
          "Faktor 2 (Hochwassergefahr)": {
            "sehr hoch": 2,
            hoch: 1.5,
            mittel: 1,
            gering: 0.5,
            "nicht relevant": 0,
          },
          "Faktor 3 (Kreistyp)": {
            hoch: 1,
            mittel: 0.5,
            gering: 0.25,
            "nicht relevant": 0,
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            hoch: 1,
            mittel: 0.5,
            gering: 0,
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        headers: {
          "Faktor 1 (Starkniederschlag)": {
            zunehmend: 1,
            abnehmend: -1,
            stagnierend: 0,
          },
          "Faktor 2 (Hochwassergefahr)": {
            unbekannt: 0,
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            "stark zunehmend": 0.5,
            "eher zunehmend": 0.25,
            stagnierend: 0,
            "eher abnehmend": -0.25,
            "stark abnehmend": -0.5,
          },
          "Faktor 4 (Siedlungs-und Verkehrsfläche)": {
            zunehmend: 0.5,
            stagnierend: 0,
            abnehmend: -0.5,
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    Waldbrand: {
      Gegenwart: {
        headers: {
          "Faktor 1 (FWI)": {
            kritisch: 5,
            hoch: 4,
            mittel: 3,
            niedrig: 2,
            gering: 1,
          },
          Summe: { Maximum: 5 },
        },
      },
      Zukunft: {
        headers: {
          "Faktor 1 (FWI)": {
            "stark zunehmend": 1.67,
            zunehmend: 0.83,
            stagnierend: 0,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark zunehmend": 0.83,
            "eher zunehmend": 0.42,
            stagnierend: 0,
            "eher abnehmend": -0.42,
            "stark abnehmend": -0.83,
          },
          Summe: { Maximum: 5 },
        },
      },
    },
    Hitze: {
      Gegenwart: {
        headers: {
          "Faktor 1 (Region)": {
            hoch: 3,
            mittel: 2,
            gering: 1,
          },
          "Faktor 1 (Trop.Nächte)": {
            relevant: 3,
            "nicht relevant": 0,
          },
          "Faktor 2 (Kreistyp)": {
            hoch: 1.5,
            mittel: 1,
            gering: 0.5,
            "nicht relevant": 0,
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            hoch: 1.5,
            mittel: 0.75,
            "nicht relevant": 0,
          },
          Summe: { Maximum: 9 },
        },
      },
      Zukunft: {
        headers: {
          "Faktor 1 (Heiße Tage)": {
            zunehmend: 2,
            stagnierend: 0,
          },
          "Faktor 1 (Trop.Nächte)": {
            zunehmend: 2,
            stagnierend: 0,
          },
          "Faktor 2 (Bevölkerungsprognose)": {
            "stark zunehmend": 1,
            "eher zunehmend": 0.5,
            stagnierend: 0,
            "eher abnehmend": -0.5,
            "stark abnehmend": -1,
          },
          "Faktor 3 (Siedlungs-und Verkehrsfläche)": {
            "stark zunehmend": 1,
            "moderat zunehmend": 0,
            abnehmend: -1,
          },
          Summe: { Maximum: 9 },
        },
      },
    },
    Vektoren: {
      Gegenwart: {
        headers: {
          "Faktor 1 (FSME)": {
            relevant: 1.33,
            "nicht relevant": 0,
          },
          "Faktor 2 (Aedes albopictus)": {
            relevant: 1.33,
            "nicht relevant": 0,
          },
          "Faktor 2 (West-Nil-Virus)": {
            relevant: 1.33,
            "nicht relevant": 0,
          },
          "Faktor 3 (Zug)": {
            relevant: 0.67,
            "nicht relevant": 0,
          },
          "Faktor 3 (Flughafen)": {
            relevant: 0.67,
            "nicht relevant": 0,
          },
          "Faktor 3 (Schiff)": {
            relevant: 0.67,
            "nicht relevant": 0,
          },
          Summe: { Maximum: 6 },
        },
      },
      Zukunft: {
        headers: {
          "Faktor 1 (Zecken)": { zunehmend: 0.67 },
          "Faktor 2 (Aedes albopictus)": {
            zunehmend: 0.67,
            stagnierend: 0,
          },
          "Faktor 2 (West-Nil-Virus)": {
            zunehmend: 0.67,
            stagnierend: 0,
          },
          "Faktor 3 (Bevölkerungsprognose)": {
            "stark zunehmend": 1,
            "eher zunehmend": 0.5,
            stagnierend: 0,
            "eher abnehmend": -0.5,
            "stark abnehmend": -1,
          },
          Summe: { Maximum: 6 },
        },
      },
    },
    HotSpots: {},
    Veränderung: {
      headers: {
        abnehmend: -10,
        "leicht abnehmend": 0,
        "leicht zunehmend": 10,
        zunehmend: 20,
        "stark zunehmend": 30,
        "kritisch zunehmend": 40,
        "extrem zunehmend": 100,
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

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   */
  constructor(risk, time) {
    this._risk = risk;
    this._time =
      time == "today"
        ? "Gegenwart"
        : time == "future"
        ? "Zukunft"
        : "Veränderung";
  }

  /**
   * Get a html-parsed string which displays the deatiled feature's property information.
   * @param {*} county The feature to compute the detailed information for.
   * @returns A html-parsed string with the detailed information.
   */
  _getDetailedInformationAsHtml(county) {
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
        for (const [riskClass, upperBound] of Object.entries(
          ContentHandler._POPUP_CONTENT_INFO.Zeitpunkt.headers
        )) {
          if (county.feature.properties[riskPropertyName] <= upperBound) {
            detailedHtml += `<span class='${this._risk}-${this._time}-detailed'><b>${riskPropertyName}:</b> ${riskClass}</span><br>`;
            break;
          }
        }
      }
    } else if (this._time == "Veränderung") {
      var riskScoreToday = county.feature.properties[`${this._risk} Gegenwart`];
      var riskScoreFuture = county.feature.properties[`${this._risk} Zukunft`];
      for (const riskScore of [riskScoreToday, riskScoreFuture]) {
        for (const [riskClass, upperBound] of Object.entries(
          ContentHandler._POPUP_CONTENT_INFO.Zeitpunkt.headers
        )) {
          if (riskScore <= upperBound) {
            detailedHtml += `<span class='${this._risk}-${
              this._time
            }-detailed'><b>${this._risk} ${
              riskScore === riskScoreToday ? "Gegenwart" : "Zukunft"
            }:</b> ${riskClass}</span><br>`;
            break;
          }
        }
      }
    } else {
      for (const [riskName, riskClasses] of Object.entries(
        ContentHandler._POPUP_CONTENT_INFO[this._risk][this._time].headers
      )) {
        let detailedRiskValue =
          county.feature.properties[`${this._risk} ${this._time} ${riskName}`];
        for (const [riskClass, upperBound] of Object.entries(riskClasses)) {
          if (riskName == "Summe") {
            detailedHtml += `<span class='${this._risk}-${this._time}-detailed'><b>${riskName}:</b> ${detailedRiskValue} von ${upperBound}</span><br>`;
          } else if (detailedRiskValue <= upperBound) {
            detailedHtml += `<span class='${this._risk}-${this._time}-detailed'><b>${riskName}:</b> ${riskClass}</span><br>`;
            break;
          }
        }
      }
    }
    return (detailedHtml += "</div></div>");
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
      this._time == "Veränderung"
        ? ContentHandler._POPUP_CONTENT_INFO.Veränderung.headers
        : ContentHandler._POPUP_CONTENT_INFO.Zeitpunkt.headers;
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
            ? `+${Number(valueToDisplay.toFixed(1))}`
            : `${Number(valueToDisplay.toFixed(1))}`;

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
    popupContentHtml += this._getDetailedInformationAsHtml(county);
    return popupContentHtml;
  }
}
