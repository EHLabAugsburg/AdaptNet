"use strict";

/**
 * Remove the subframe HTML-Element from DOM and update the interface-appearance.
 * @param {*} subframeHtmlContainer The parent-node of the subframe HTML-element.
 */
function closeCurrentSubframe(subframeHtmlContainer) {
  for (const button of document.querySelectorAll("#metadata button")) {
    button.classList.remove("current");
  }
  for (const subframe of document.querySelectorAll(".subframe")) {
    subframeHtmlContainer.removeChild(subframe);
  }
}

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
 * @param {*} switchedLayer True if the displayed layer was switched, else (e.g. just the language changed) false.
 */
function updateDisplayedLayer(risk, time, switchedLayer = true) {
  if (risk && time) {
    const styleManager = new StyleManager(risk, time);
    const contentHandler = new ContentHandler(risk, time, languageHandler);
    const legendBuilder = new LegendBuilder(risk, time, languageHandler);
    legendBuilder.build();
    if (switchedLayer)
      geo_json_counties.eachLayer(function (county) {
        styleManager.style(county);
        county.bindPopup(contentHandler.getPopupContent(county));
        county.bindTooltip(contentHandler.getTooltipContent(county), {
          sticky: true,
        });
        county.addEventListener("popupopen", () => {
          languageHandler.setLanguage(languageHandler.getLanguage());
        });
      });
    document.querySelector("#map-title").textContent =
      ContentHandler.getMapTitle(risk, languageHandler.getLanguage());
    document.querySelector("#risk-explanation").innerHTML =
      DataProvider.getRiskExplanation(risk, languageHandler.getLanguage());
  }
}
