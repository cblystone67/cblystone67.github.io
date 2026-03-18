//Corrections to Connections Reentry Checklist Tracker

//Items need for the page
const checklistItems = document.querySelectorAll("#checklist li");
const progressFill = document.getElementById("progress-fill");
const progressText = document.getElementById("progress-text");
const resetBtn = document.getElementById("reset-btn");

//Total number of items in the checklist
const totalItems = checklistItems.length;

// Load saved state
//Need to check the local storage for any saved progress
//restore checked items so progress isn't lost on refress.

function loadSavedState() {
  checklistItems.forEach((item) => {
    const id = item.getAttribute("data-id");
    if (localStorage.getItem("check-" + id) === "true") {
      item.classList.add("checked");
    }
  });
  updateProgress();
}

//Update the progress bar
//Count the items being checked
//update progress bar width and text label.

function updateProgress() {
  const checked = document.querySelectorAll("#checklist li.checked").length;
  const percent = (checked / totalItems) * 100;

  progressFill.style.width = percent + "%";
  progressText.textContent = checked + " of" + totalItems + " completed";
}

//Toggle the items
//When user checks the item toggle the checked state
//save the results to localStorage, and update the progress bar

checklistItems.forEach((item) => {
  item.addEventListener("click", function () {
    const id = this.getAttribute("data-id");

    if (this.classList.contains("checked")) {
      this.classList.remove("checked");
      localStorage.setItem("check-" + id, "false");
    } else {
      this.classList.add("checked");
      localStorage.setItem("check-" + id, "true");
    }

    updateProgress();
  });
});

//Reset the checklist
//When reset button is clicked uncheck everything
//clear all saved data from local storage
resetBtn.addEventListener("click", function () {
  checklistItems.forEach((item) => {
    const id = item.getAttribute("data-id");
    item.classList.remove("checked");
    localStorage.removeItem("check-" + id);
  });
  updateProgress();
});

loadSavedState();
