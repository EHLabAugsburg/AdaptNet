"use strict";
/**
 * Class for managing the correct feature's appearance.
 */
class StyleManager {
  static _STYLES = {
    hotspotsChanged: {
      "#f03b20": [2, 2],
      "#feb24c": [1, 1],
      "#ffeda0": [0, 0],
    },
    changed: {
      "#bd0026": [40, 100],
      "#f03b20": [30, 39],
      "#fd8d3c": [20, 29],
      "#fecc5c": [10, 19],
      "#ffffb2": [0, 9],
      "#91bfdb": [-10, -1],
      "#4575b4": [-100, -11],
    },
    atTime: {
      "#B30000": [100, 1000],
      "#E34A33": [80, 99],
      "#FC8D59": [60, 79],
      "#FDBB84": [40, 59],
      "#FDD49E": [20, 39],
      "#FEF0D9": [0, 19],
    },
  };

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
    const colormap =
      time === "change" && risk === "HotSpots"
        ? StyleManager._STYLES.hotspotsChanged
        : time === "change"
        ? StyleManager._STYLES.changed
        : StyleManager._STYLES.atTime;
    for (const [color, interval] of Object.entries(colormap))
      if (value >= interval[0] && value <= interval[1]) return color;
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
