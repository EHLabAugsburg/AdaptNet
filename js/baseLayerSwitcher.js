"use strict";

/**
 * Class for switching the base-layer based on the user's selected theme.
 */
class BaseLayerSwitcher {
  static _BASE_LAYER_URL = {
    light:
      "https://{s}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}{r}.png?key=cb1_3muf_1_e9354f73c1e3ce5762a507cd",
    dark:
      "https://{s}.basemaps.cartocdn.com/rastertiles/dark_nolabels/{z}/{x}/{y}{r}.png?key=cb1_3muf_1_e9354f73c1e3ce5762a507cd",
  };

  static setBaseLayer(theme) {
    map_adaptNet.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl(BaseLayerSwitcher._BASE_LAYER_URL[theme]);
      }
    });
  }
}
