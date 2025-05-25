document.querySelectorAll("div#risk-control button").forEach((button) => {
  button.addEventListener("click", function () {
    let buttons = document.querySelectorAll("div#risk-control button");
    for (let i = 0; i < buttons.length; i++) {
      if (button[i] != button) {
        buttons[i].classList.remove("current");
      }
    }
    button.classList.add("current");
    currentTime = document.querySelector("div#time-control .current")
      ? document.querySelector("div#time-control .current").id
      : null;
    if (currentTime) {
      updateDisplayedLayer(button.id, currentTime);
    }
  });
});

document.querySelectorAll("#time-control button").forEach((button) => {
  button.addEventListener("click", function () {
    let timeButtons = document.querySelectorAll("#time-control button");
    for (let i = 0; i < timeButtons.length; i++) {
      timeButtons[i].classList.remove("current");
    }
    button.classList.add("current");
    currentRisk = document.querySelector("div#risk-control .current")
      ? document.querySelector("div#risk-control .current").id
      : null;
    if (currentRisk) {
      updateDisplayedLayer(currentRisk, button.id);
    }
  });
});

/**
 * Update the map ui with the current user's selected layer and it's information to display.
 * @param {*} risk the risk of the layer to display
 * @param {*} time the time of the layer to display
 */
function updateDisplayedLayer(risk, time) {
  const styleManager = new StyleManager(risk, time);
  const contentHandler = new ContentHandler(risk, time);
  const legendBuilder = new LegendBuilder(risk, time);
  legendBuilder.build();
  geo_json_counties.eachLayer(function (county) {
    styleManager.style(county);
    county.bindPopup(contentHandler.getPopupContent(county));
  });
}
