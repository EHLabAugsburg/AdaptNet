/**
 * Class for dynamic legend adjustements and document insertion.
 */
class LegendBuilder {
  static _COLORMAPS = {
    timed: {
      "geringes Risiko": "#FEF0D9",
      "niedriges Risiko": "#FDD49E",
      "mittleres Risiko": "#FDBB84",
      "hohes Risiko": "#FC8D59",
      "kritisches Risiko": "#E34A33",
      "extremes Risiko": "#B30000",
    },
    changed: {
      abnehmend: "#4575b4",
      "leicht abnehmend": "#91bfdb",
      "leicht zunehmend": "#ffffb2",
      zunehmend: "#fecc5c",
      "stark zunehmend": "#fd8d3c",
      "kritisch zunehmend": "#f03b20",
      "extrem zunehmend": "#bd0026",
    },
    hotspotsChanged: {
      stagnierend: "#e0f3f8",
      zunehmend: "#fee090",
      "stark zunehmend": "#d73027",
    },
  };
  static _LEGEND_HTML_ID = "legend";

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
    this._htmlLegendElement = document.getElementById(
      LegendBuilder._LEGEND_HTML_ID
    );
    for (const elementClass of this._htmlLegendElement.classList) {
      this._htmlLegendElement.classList.remove(elementClass);
    }
    this._htmlLegendElement.style.visibility = "visible";
  }

  /**
   * Build a legend as a html-parsed string and insert it into the HTMLElement-container.
   */
  build() {
    this._htmlLegendElement.classList.add(`${this._risk}-${this._time}`);
    var htmlLegendInnerHtml = `<span id="title">${this._risk} ${this._time}</span><div class="legend-classes"><div id="text">`;
    let i = 0;
    var htmlLegendColorRow = "<div id='symbol'>";
    var colormap;
    if (this._time == "Veränderung") {
      colormap =
        this._risk == "HotSpots"
          ? LegendBuilder._COLORMAPS.hotspotsChanged
          : LegendBuilder._COLORMAPS.changed;
    } else {
      colormap = LegendBuilder._COLORMAPS.timed;
    }
    for (const [className, classColor] of Object.entries(colormap)) {
      htmlLegendInnerHtml += `<span class='class-${i}'>${className}</span>`;
      htmlLegendColorRow += `<div class='class-${i} symbol' style='background-color: ${classColor};'></div>`;
    }
    htmlLegendInnerHtml += "</div>";
    htmlLegendColorRow += "</div>";
    htmlLegendInnerHtml += htmlLegendColorRow;
    this._htmlLegendElement.innerHTML = htmlLegendInnerHtml;
  }
}
