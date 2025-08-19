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
    updateDisplayedLayer(getCurrentRisk(), getCurrentTime(), false);
  });

document.getElementById("theme-control").addEventListener("click", (event) => {
  if (event.target.classList.contains("dark")) switchColorTheme("dark");
  else switchColorTheme("light");
});

document
  .getElementById("imprint")
  .addEventListener("click", (element) =>
    ContentHandler.showSubframe(
      document.getElementById("interface"),
      element.target
    )
  );

document.addEventListener("DOMContentLoaded", function () {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    switchColorTheme("dark");
  else switchColorTheme("light");
  document
    .querySelector("div#risk-control button#Luftbelastung")
    .classList.add("current");
  document
    .querySelector("div#time-control button#past")
    .classList.add("current");
  updateDisplayedLayer("Luftbelastung", "past");
  languageHandler.setLanguage(languageHandler.getLanguage());
});

const languageHandler = new LanguageHandler(
  navigator.language === "de" ? "de" : "en"
);
