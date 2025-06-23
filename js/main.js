"use strict";
document.querySelectorAll("div#risk-control button").forEach((button) => {
  button.addEventListener("click", function () {
    document
      .querySelectorAll("div#risk-control button")
      .forEach((riskButton) => {
        if (riskButton !== button) riskButton.classList.remove("current");
      });
    button.classList.add("current");
    let currentTime = getCurrentTime();
    if (currentTime) updateDisplayedLayer(button.id, currentTime);
    if (document.querySelector("div.leaflet-popup-content"))
      // if a popup is opened curently, update its content
      languageHandler.setLanguage(languageHandler.getLanguage());
  });
});

document.querySelectorAll("#time-control button").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelectorAll("#time-control button").forEach((timeButton) => {
      timeButton.classList.remove("current");
    });
    button.classList.add("current");
    let currentRisk = getCurrentRisk();
    if (currentRisk) updateDisplayedLayer(currentRisk, button.id);
    if (document.querySelector("div.leaflet-popup-content"))
      // if a popup is opened curently, update its content
      languageHandler.setLanguage(languageHandler.getLanguage());
  });
});

document
  .getElementById("language-control")
  .addEventListener("click", function (event) {
    languageHandler.setLanguage(event.target.value);
    const legendBuilder = new LegendBuilder(
      getCurrentRisk(),
      getCurrentTime(),
      languageHandler
    );
    legendBuilder.build();
  });

document
  .getElementById("imprint")
  .addEventListener("click", (element) =>
    ContentHandler.showSubframe(
      document.getElementById("interface"),
      element.target
    )
  );

document
  .getElementById("methods")
  .addEventListener("click", (element) =>
    ContentHandler.showSubframe(
      document.getElementById("interface"),
      element.target
    )
  );

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("div#risk-control button#Luftqualität")
    .classList.add("current");
  document
    .querySelector("div#time-control button#current")
    .classList.add("current");
  updateDisplayedLayer("Luftqualität", "current");
  languageHandler.setLanguage(languageHandler.getLanguage());
});

const languageHandler = new LanguageHandler("de");
