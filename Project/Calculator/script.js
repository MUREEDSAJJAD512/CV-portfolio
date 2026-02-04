// Target input field
const display = document.getElementById("display");

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear full display
function clearDisplay() {
  display.value = "";
}

// Delete last character
function deleteLast() {
  display.value = display.value.slice(0, -1);
}

// Calculate final result
function calculate() {
  try {
    let expression = display.value
      .replace(/π/g, "Math.PI")
      .replace(/e/g, "Math.E")
      .replace(/sin/g, "Math.sin")
      .replace(/cos/g, "Math.cos")
      .replace(/tan/g, "Math.tan")
      .replace(/log/g, "Math.log10")
      .replace(/ln/g, "Math.log")
      .replace(/EXP/g, "Math.exp")
      .replace(/Ans/g, "Ans") // optional
      .replace(/÷/g, "/")
      .replace(/×/g, "*")
      .replace(/−/g, "-")
      .replace(/\^/g, "**");

    let result = eval(expression);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Auto-bind for all buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "=") {
      calculate();
    } else if (value === "AC") {
      clearDisplay();
    } else if (value === "DEL") {
      deleteLast();
    } else {
      appendValue(value);
    }
  });
});
