let currentExpression = "";
let resultsList = [];

function appendToDisplay(value) {
  currentExpression += value;
  document.getElementById("display").value = currentExpression;
}

function clearDisplay() {
  currentExpression = "";
  document.getElementById("display").value = "";
}

function calculate() {
  try {
    const result = evaluateExpression(currentExpression);
    if (result !== undefined) {
      document.getElementById("display").value = result;
      resultsList.push(`${currentExpression} = ${result}`);
      updateResultsList();
      currentExpression = "";
      document.getElementById("clear-list").style.display = "block";
    } else {
      document.getElementById("display").value = "";
    }
  } catch (error) {
    document.getElementById("display").value = "";
  }
}

// Function to clear the list
function clearList() {
  // Clear the resultsList array
  resultsList = [];
  // Update the displayed results list
  updateResultsList();
  // Hide the "clear-list" button again
  document.getElementById("clear-list").style.display = "none";
}

// Add click event listener to the clear-list button
document.getElementById("clear-list").addEventListener("click", clearList);

function updateResultsList() {
  const resultsListElement = document.getElementById("results-list");
  resultsListElement.innerHTML = "";

  for (const result of resultsList) {
    const resultItem = document.createElement("li");
    resultItem.classList.add("result-item");
    resultItem.innerText = result;
    resultsListElement.appendChild(resultItem);
  }
}

function evaluateExpression(expression) {
  // Use a safer way to evaluate expressions
  return Function('"use strict";return (' + expression + ")")();
}
