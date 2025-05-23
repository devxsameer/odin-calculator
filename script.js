const miniScreen = document.querySelector(".mini-screen");
const mainScreen = document.querySelector(".main-screen");
const buttons = document.querySelectorAll(".button");
const colorButtons = document.querySelectorAll(".color-mode i");
const rootElement = document.querySelector(":root");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let mainScreenContent = "";
// Functions
const add = (num1, num2) => {
  return num1 + num2;
};
const subtract = (num1, num2) => {
  return num1 - num2;
};
const multiply = (num1, num2) => {
  return num1 * num2;
};
const divide = (num1, num2) => {
  return num1 / num2;
};
const operate = function (op1, op2, operator) {
  if (operator == "+") {
    return add(op1, op2);
  } else if (operator == "-") {
    return subtract(op1, op2);
  } else if (operator == "*") {
    return multiply(op1, op2);
  } else {
    return divide(op1, op2);
  }
};
const setMainOutput = function (out) {
  mainScreen.innerText = out;
};
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    targetId = e.target.id;
    let operatorsList = "+-*/";
    if (targetId == "=") {
      console.log("equals");
    } else if (operatorsList.includes(targetId)) {
      if (mainScreenContent !== "") {
        operator = targetId;
        mainScreenContent += operator;
        setMainOutput(mainScreenContent);
      }
    } else {
      firstOperand += targetId;
      mainScreenContent = firstOperand;
      setMainOutput(mainScreenContent);
    }
  });
});
// Setting Color Mode

const setCurrentColorTheme = function (theme) {
  if (theme == "light") {
    rootElement.classList.add("light");
  } else {
    rootElement.classList.remove("light");
  }
};
colorButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    setCurrentColorTheme(e.target.id);
    const activeThemeElement = document.querySelector(".color-mode .fa-beat");
    activeThemeElement.classList.remove("fa-beat");
    console.log(e.target.classList.add("fa-beat"));
  });
});
