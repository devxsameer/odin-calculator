const miniScreen = document.querySelector(".mini-screen");
const mainScreen = document.querySelector(".main-screen");
const buttons = document.querySelectorAll(".button");
const colorButtons = document.querySelectorAll(".color-mode i");
const rootElement = document.querySelector(":root");

let firstOperand = "";
let secondOperand = "";
let operator = "";
let mainScreenContent = "";
let miniScreenContent = "";
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
    return add(+op1, +op2);
  } else if (operator == "-") {
    return subtract(+op1, +op2);
  } else if (operator == "*") {
    return multiply(+op1, +op2);
  } else {
    return divide(+op1, +op2);
  }
};
const clearScreenContent = function () {
  mainScreenContent = "";
  miniScreenContent = "";
  mainScreen.innerHTML = "";
  miniScreen.innerHTML = "";
};
const clearMainScreenContent = function () {
  mainScreenContent = "";
  mainScreen.innerHTML = "";
};
const clearMiniScreenContent = function () {
  miniScreenContent = "";
  miniScreen.innerHTML - "";
};
const setScreenContent = function (content, screen) {
  screen.innerHTML = content;
};
const clearOperationValues = function () {
  firstOperand = "";
  secondOperand = "";
  operator = "";
};
const checkOperationValues = () => firstOperand && secondOperand && operator;
const removeLastLetter = function (str) {
  return str.slice(0, str.length - 1);
};
const handleInput = function (inputValue) {
  const operatorsList = "+-*/";
  if (inputValue === "ac") {
    clearScreenContent();
    clearOperationValues();
  } else if (inputValue == "c") {
    mainScreenContent = removeLastLetter(mainScreenContent);
    if (secondOperand) {
      secondOperand = removeLastLetter(secondOperand);
    } else if (firstOperand) {
      firstOperand = removeLastLetter(firstOperand);
    }
    miniScreenContent = mainScreenContent;
    setScreenContent(mainScreenContent, mainScreen);
  } else if (operatorsList.includes(inputValue)) {
    if (checkOperationValues()) {
      miniScreenContent = operate(firstOperand, secondOperand, operator);
      clearOperationValues();
      firstOperand = miniScreenContent;
      operator = inputValue;
      miniScreenContent += inputValue;
      setScreenContent(miniScreenContent, miniScreen);
      clearMainScreenContent();
    } else if (!secondOperand && operator) {
    } else {
      operator = inputValue;
      miniScreenContent += inputValue;
      setScreenContent(miniScreenContent, miniScreen);
      clearMainScreenContent();
    }
  } else if (inputValue === "=") {
    if (checkOperationValues()) {
      setScreenContent(miniScreenContent, miniScreen);
      mainScreenContent = operate(firstOperand, secondOperand, operator);
      //   firstOperand = mainScreenContent;
      setScreenContent(mainScreenContent, mainScreen);
    }
  } else if (inputValue === ".") {
    if (firstOperand) {
      if (firstOperand && operator) {
        secondOperand += inputValue;
      } else {
        firstOperand += inputValue;
      }
      mainScreenContent += inputValue;
      miniScreenContent += inputValue;
      setScreenContent(mainScreenContent, mainScreen);
    }
  } else {
    if (firstOperand && operator) {
      secondOperand += inputValue;
    } else {
      firstOperand += inputValue;
    }
    mainScreenContent += inputValue;
    miniScreenContent += inputValue;
    setScreenContent(mainScreenContent, mainScreen);
  }
};

// Add Event Listener For Each Btn
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    handleInput(e.target.id);
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
    e.target.classList.add("fa-beat")
  });
});
