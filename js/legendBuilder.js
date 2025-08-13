"use strict";
/**
 * Class for dynamic legend adjustements and document insertion.
 */
class LegendBuilder {
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
    const classMap = DataProvider.getClassification(this._risk, this._time);
    for (let i = 0; i < classMap.colors.length; ++i) {
      htmlLegendInnerHtml += `<span>${
        classMap.classLabels[this._languageHandler.getLanguage()][i]
      }</span>`;
      htmlLegendColorRow += `<div class='symbol' style='background-color:${classMap.colors[i]};color:${classMap.legendFontColors[i]};'>${classMap.intervalLabels[i]}</div>`;
    }
    htmlLegendInnerHtml += "</div>";
    htmlLegendColorRow += "</div>";
    htmlLegendInnerHtml += htmlLegendColorRow;
    this._htmlLegendElement.innerHTML = htmlLegendInnerHtml;
  }
}
