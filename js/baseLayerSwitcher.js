"use strict";

/**
 * Class for switching the base-layer based on the user's selected theme.
 */
class BaseLayerSwitcher {
  static _BASE_LAYER_URL = {
    light:
      "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
    dark: "https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png",
  };

  static setBaseLayer(theme) {
    map_adaptNet.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        layer.setUrl(BaseLayerSwitcher._BASE_LAYER_URL[theme]);
      }
    });
  }
}
