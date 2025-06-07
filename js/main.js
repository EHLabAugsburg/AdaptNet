document.querySelectorAll("div#risk-control button").forEach((button) => {
  button.addEventListener("click", function () {
    let buttons = document.querySelectorAll("div#risk-control button");
    for (let i = 0; i < buttons.length; i++) {
      if (button[i] != button) {
        buttons[i].classList.remove("current");
      }
    }
    button.classList.add("current");
    currentTime = getCurrentTime();
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
    currentRisk = getCurrentRisk();
    if (currentRisk) {
      updateDisplayedLayer(currentRisk, button.id);
    }
  });
});

document.querySelectorAll("select option").forEach((option) => {
  option.addEventListener("click", function (event) {
    languageHandler.setLanguage(event.target.text.toLowerCase());
    updateDisplayedLayer(getCurrentRisk(), getCurrentTime());
    });
  });

document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelector("div#risk-control button#Luftqualität")
    .classList.add("current");
  document
    .querySelector("div#time-control button#current")
    .classList.add("current");
  updateDisplayedLayer("Luftqualität", "current");
});
