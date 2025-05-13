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
      : 0;
    if (currentTime) {
      updateDisplayedLayer(button.id, currentTime, registry_risk_layers);
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
      : 0;
    if (currentRisk) {
      updateDisplayedLayer(currentRisk, button.id, registry_risk_layers);
    }
  });
});

/**
 * Update the map ui with the current user's selected layer and it's information to display.
 * @param {*} risk the risk of the layer to display
 * @param {*} time the time of the layeer to display
 * @param {*} layerRegistry a object, containing a mapping between layer-names and the actual objects
 */
function updateDisplayedLayer(risk, time, layerRegistry) {
  let featureGroups = layerRegistry.overlays;
  clearMap(featureGroups);
  if (risk && time) {
    featuresToAdd = featureGroups[`${risk} ${time}`].getLayers();
    for (const feature of featuresToAdd) {
      feature.addTo(map_adaptNet);
    }
    document.querySelector(`div#legend.${risk}-${time}`).style.display =
      "inline";
  }
}

/**
 * Remove all layers and their legends from map, excluded base-layers.
 * @param {*} featureGroups a collection of the maps L.featureGroup-instances
 */
function clearMap(featureGroups) {
  let legends = document.querySelectorAll("div#legend");
  for (let i = 0; i < legends.length; i++) {
    legends[i].style.display = "none";
  }
  for (const [featureGroup, _] of Object.entries(featureGroups)) {
    featureGroups[featureGroup].eachLayer(function (layer) {
      map_adaptNet.removeLayer(layer);
    });
  }
}
