"use strict";
/**
 * Class for managing the correct feature's appearance.
 */
class StyleManager {
  /**
   * @param {*} risk The risk of the current displayed layer.
   * @param {*} time The time of the current displayed layer.
   */
  constructor(risk, time) {
    this._risk = risk;
    this._time = time;
  }

  /**
   * Get the color-code for the provided value with regards to the displayed layer.
   * @param {*} value The feature's property value.
   * @param {*} risk The risk of the layer to display.
   * @param {*} time The time of the layer to display.
   * @returns The HEX-encoded color-code.
   */
  static getHexColor(value, risk, time) {
    const classification = DataProvider.getClassification(risk, time);
    const upperBound = Math.min(
      ...classification.bounds.filter((bound) => {
        if (risk === "HotSpots" && time === "change") return bound >= value;
        else return bound > value;
      })
    );
    return classification.colors[classification.bounds.indexOf(upperBound)];
  }

  /**
   * Style the provided feature regarding the current dislayed layer.
   * @param {*} county The feature to apply the style to.
   */
  style(county) {
    county.setStyle({
      fillColor: StyleManager.getHexColor(
        county.feature.properties[
          `${this._risk} ${DataProvider.getTimeDescriptor(this._time)}`
        ].toFixed(),
        this._risk,
        this._time
      ),
      fillOpacity: 1,
    });
  }
}
