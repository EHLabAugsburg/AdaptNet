/**
 * Class for managing the correct feature's appearance.
 */
class StyleManager {
  static _STYLES = {
    hotspotsChanged: { "#d73027": 2, "#fee090": 1, "#e0f3f8": 0 },
    changed: {
      "#bd0026": 40,
      "#f03b20": 30,
      "#fd8d3c": 20,
      "#fecc5c": 10,
      "#ffffb2": 0,
      "#91bfdb": -10,
      "#4575b4": -100,
    },
    timed: {
      "#B30000": 100,
      "#E34A33": 80,
      "#FC8D59": 60,
      "#FDBB84": 40,
      "#FDD49E": 20,
      "#FEF0D9": 0,
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
   * Get the color-code for the provided value with regards to the displayed layer.
   * @param {*} value The feature's property value.
   * @param {*} risk The risk of the layer to display.
   * @param {*} time The time of the layer to display.
   * @returns
   */
  static getHexColor(value, risk, time) {
    const colormap =
      time == "Veränderung" && risk == "HotSpots"
        ? StyleManager._STYLES.hotspotsChanged
        : time == "Veränderung"
        ? StyleManager._STYLES.changed
        : StyleManager._STYLES.timed;
    for (const [color, upperBound] of Object.entries(colormap)) {
      if (upperBound <= value) {
        return color;
      }
    }
  }

  /**
   * Style the provided feature regarding the current dislayed layer.
   * @param {*} county The feature to apply the style to.
   */
  style(county) {
    county.setStyle({
      fillColor: StyleManager.getHexColor(
        county.feature.properties[`${this._risk} ${this._time}`],
        this._risk,
        this._time
      ),
      fillOpacity: 1,
    });
  }
}
