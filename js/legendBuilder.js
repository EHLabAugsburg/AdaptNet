"use strict";
/**
 * Class for dynamic legend adjustements and document insertion.
 */
class LegendBuilder {
  static _COLORMAPS = {
    // color-codes with labeling-color and class-intervals in ascending order
    atTime: [
      ["#FEF0D9", "black", "&lt;20"],
      ["#FDD49E", "black", "20 - &lt;40"],
      ["#FDBB84", "black", "40 - &lt;60"],
      ["#FC8D59", "black", "60 - &lt;80"],
      ["#E34A33", "black", "80 - &lt;100"],
      ["#B30000", "white", "&ge;100"],
    ],
    change: [
      ["#4575b4", "white", "&lt;-10"],
      ["#91bfdb", "black", "-10 - &lt;0"],
      ["#ffffb2", "black", "0 - &lt;10"],
      ["#fecc5c", "black", "10 - &lt;20"],
      ["#fd8d3c", "black", "20 - &lt;30"],
      ["#f03b20", "black", "30 - &lt;40"],
      ["#bd0026", "white", "&ge;40"],
    ],
    hotspotsChange: [
      ["#ffeda0", "black", "0"],
      ["#feb24c", "black", "+1"],
      ["#f03b20", "white", "+2"],
    ],
  };
  static _LEGEND_HTML_ID = "legend";

  /**
   *
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   */
  constructor(risk, time, languageHandler) {
    this._risk = risk;
    this._time = time;
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
    let htmlLegendInnerHtml = `<span id="title">${ContentHandler.getLegendTitle(
      this._risk,
      this._time,
      this._languageHandler.getLanguage()
    )}</span><div class="legend-classes"><div id="text">`;
    let htmlLegendColorRow = "<div id='symbol'>";
    const colormap =
      this._time === "change" && this._risk === "HotSpots"
        ? LegendBuilder._COLORMAPS.hotspotsChange
        : this._time === "change"
        ? LegendBuilder._COLORMAPS.change
        : LegendBuilder._COLORMAPS.atTime;
    const classNames = ContentHandler.getLegendClasses(
      this._risk,
      this._time,
      this._languageHandler.getLanguage()
    );
    for (const [classNumber, classProperties] of Object.entries(colormap)) {
      htmlLegendInnerHtml += `<span>${classNames[classNumber]}</span>`;
      htmlLegendColorRow += `<div class='symbol' style='background-color:${classProperties[0]};color:${classProperties[1]};'>${classProperties[2]}</div>`;
    }
    htmlLegendInnerHtml += "</div>";
    htmlLegendColorRow += "</div>";
    htmlLegendInnerHtml += htmlLegendColorRow;
    this._htmlLegendElement.innerHTML = htmlLegendInnerHtml;
  }
}
