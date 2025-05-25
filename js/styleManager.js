/**
 * Class for managing the correct feature's appearance.
 */
class StyleManager {
  static STYLES = {
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
   * Style the provided feature regarding the current dislayed layer.
   * @param {*} county The feature to apply the style to.
   */
  style(county) {
    if (this._time == "Veränderung" && this._risk == "HotSpots") {
      var symbolizingValue =
        county.feature.properties[`${this._risk} ${this._time}`];
      for (const [color, upperBound] of Object.entries(
        StyleManager.STYLES.hotspotsChanged
      )) {
        if (upperBound <= symbolizingValue) {
          county.setStyle({ fillColor: color, fillOpacity: 1 });
          break;
        }
      }
    } else if (this._time == "Veränderung") {
      var symbolizingValue =
        county.feature.properties[`${this._risk} ${this._time}`];
      for (const [color, upperBound] of Object.entries(
        StyleManager.STYLES.changed
      )) {
        if (upperBound <= symbolizingValue) {
          county.setStyle({ fillColor: color, fillOpacity: 1 });
          break;
        }
      }
    } else {
      var symbolizingValue =
        county.feature.properties[`${this._risk} ${this._time}`];
      for (const [color, upperBound] of Object.entries(
        StyleManager.STYLES.timed
      )) {
        if (upperBound <= symbolizingValue) {
          county.setStyle({ fillColor: color, fillOpacity: 1 });
          break;
        }
      }
    }
  }
}
