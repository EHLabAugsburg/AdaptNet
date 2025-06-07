/**
 * Get the current selected risk.
 * @returns The current selected risk if any selected. Else null.
 */
function getCurrentRisk() {
  return document.querySelector("div#risk-control .current")
    ? document.querySelector("div#risk-control .current").id
    : null;
}

/**
 * Get the current selected time.
 * @returns The current selected time if any selected. Else null.
 */
function getCurrentTime() {
  return document.querySelector("div#time-control .current")
    ? document.querySelector("div#time-control .current").id
    : null;
}

/**
 * Update the map ui with the current user's selected layer and it's information to display.
 * @param {*} risk The risk of the layer to display
 * @param {*} time The time of the layer to display
 */
function updateDisplayedLayer(risk, time) {
  if (risk && time) {
    const styleManager = new StyleManager(risk, time);
    const contentHandler = new ContentHandler(risk, time);
    const legendBuilder = new LegendBuilder(risk, time, languageHandler);
    legendBuilder.build();
    geo_json_counties.eachLayer(function (county) {
      styleManager.style(county);
      county.bindPopup(contentHandler.getPopupContent(county));
      county.bindTooltip(contentHandler.getTooltipContent(county), {
        sticky: true,
      });
    });
  }
}
