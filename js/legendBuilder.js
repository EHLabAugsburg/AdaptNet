/**
 * Class for dynamic legend adjustements and document insertion.
 */
class LegendBuilder {
  static _COLORMAPS = {
    // color-codes in ascending order
    atTime: ["#FEF0D9", "#FDD49E", "#FDBB84", "#FC8D59", "#E34A33", "#B30000"],
    change: [
      "#4575b4",
      "#91bfdb",
      "#ffffb2",
      "#fecc5c",
      "#fd8d3c",
      "#f03b20",
      "#bd0026",
    ],
    hotspotsChange: ["#e0f3f8", "#fee090", "#d73027"],
  };
  static _LEGEND_HTML_ID = "legend";

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   */
  constructor(risk, time, languageHandler) {
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
    this._languageHandler = languageHandler;
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
    var htmlLegendInnerHtml = `<span id="title">${this._languageHandler.getLegendTitle(
      this._risk,
      this._time
    )}</span><div class="legend-classes"><div id="text">`;
    var htmlLegendColorRow = "<div id='symbol'>";
    var colormap;
    const classNames = this._languageHandler.getLegendClasses(
      this._risk,
      this._time,
      this._languageHandler.language()
    );
    colormap =
      this._time == "Veränderung" && this._risk == "HotSpots"
        ? LegendBuilder._COLORMAPS.hotspotsChange
        : this._time == "Veränderung"
        ? LegendBuilder._COLORMAPS.change
        : LegendBuilder._COLORMAPS.atTime;
    for (const [classNumber, classColor] of Object.entries(colormap)) {
      htmlLegendInnerHtml += `<span>${classNames[classNumber]}</span>`;
      htmlLegendColorRow += `<div class='symbol' style='background-color: ${classColor};'></div>`;
    }
    htmlLegendInnerHtml += "</div>";
    htmlLegendColorRow += "</div>";
    htmlLegendInnerHtml += htmlLegendColorRow;
    this._htmlLegendElement.innerHTML = htmlLegendInnerHtml;
  }
}
