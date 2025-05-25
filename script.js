const miniScreen = document.querySelector(".mini-screen");
const mainScreen = document.querySelector(".main-screen");
const buttons = document.querySelectorAll(".button");
const colorButtons = document.querySelectorAll(".color-mode i");
const rootElement = document.querySelector(":root");

let firstOperand = "";
let secondOperand = "";
let operator = "";

// Calculation Functions

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
  if (num2 == 0) {
    return 0;
  } else {
    return num1 / num2;
  }
};
const operate = function (op1, op2, operator) {
  if (operator == "+") {
    return add(+op1, +op2);
  } else if (operator == "-") {
    return subtract(+op1, +op2);
  } else if (operator == "*") {
    return multiply(+op1, +op2);
  } else if (operator == "/") {
    return divide(+op1, +op2);
  }
};

// Handling Remove

const removeLastLetter = function (str) {
  if (str != "" && str != undefined && str) {
    return str.substring(0, str.length - 1);
  } else {
    return "";
  }
};

const handleRemove = function () {
  if (secondOperand) {
    secondOperand = removeLastLetter(secondOperand);
  } else if (firstOperand) {
    firstOperand = removeLastLetter(firstOperand);
  }
  setScreenContent(removeLastLetter(getScreenContent(mainScreen)), mainScreen);
};

// Handling Operations

const checkOperationValues = () =>
  firstOperand !== "" && secondOperand !== "" && operator !== "";

const handleOperations = function (inputValue) {
  if (checkOperationValues()) {
    let result = operate(firstOperand, secondOperand, operator);
    clearOperationValues();
    firstOperand = result;
    operator = inputValue;
    result += inputValue;
    setScreenContent(result, miniScreen);
    clearMainScreenContent();
  } else if (secondOperand == "" && operator) {
  } else {
    operator = inputValue;
    setScreenContent(getScreenContent(mainScreen) + inputValue, miniScreen);
    clearMainScreenContent();
  }
};

// Handling Result

const handleResult = function () {
  if (checkOperationValues()) {
    setScreenContent(
      getScreenContent(miniScreen) + getScreenContent(mainScreen),
      miniScreen
    );
    setScreenContent(
      operate(firstOperand, secondOperand, operator),
      mainScreen
    );
  }
};

// Handling Points

const checkOperandEndsWithDot = (operand) => {
  return operand.includes(".");
};

const handlePoint = function (inputValue) {
  if (!checkOperandEndsWithDot(getScreenContent(mainScreen))) {
    if (firstOperand && operator) {
      secondOperand += inputValue;
    } else {
      firstOperand += inputValue;
    }
    setScreenContent(getScreenContent(mainScreen) + inputValue, mainScreen);
  }
};

// Handling Numbers

const handleNumbers = function (inputValue) {
  if (firstOperand !== "" && operator) {
    secondOperand += inputValue;
  } else {
    firstOperand += inputValue;
  }
  setScreenContent(getScreenContent(mainScreen) + inputValue, mainScreen);
};
// General Functions

const handleClearAll = function () {
  clearScreenContent();
  clearOperationValues();
};

const clearMainScreenContent = function () {
  mainScreen.innerHTML = "";
};
const clearMiniScreenContent = function () {
  miniScreen.innerHTML - "";
};
const getScreenContent = function (screen) {
  return screen.innerText;
};
const setScreenContent = function (content, screen) {
  screen.innerHTML = content;
};
const clearScreenContent = function () {
  mainScreen.innerHTML = "";
  miniScreen.innerHTML = "";
};
const clearOperationValues = function () {
  firstOperand = "";
  secondOperand = "";
  operator = "";
};
// Event Listeners

// Add Event Listener For Each Btn
buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => handleEvent(e.target.id));
});

// Main Function
const handleEvent = function (inputValue) {
  switch (inputValue) {
    case "ac":
      handleClearAll(inputValue);
      break;
    case "c":
      handleRemove(inputValue);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      handleOperations(inputValue);
      break;
    case "=":
      handleResult(inputValue);
      break;
    case ".":
      handlePoint(inputValue);
      break;
    default:
      handleNumbers(inputValue);
  }
};

// Adding Keyboard Support

window.addEventListener("keydown", handleKeyboardInput);
function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) handleNumbers(e.key);
  if (e.key === ".") handlePoint(e.key);
  if (e.key === "=" || e.key === "Enter") handleResult(e.key);
  if (e.key === "Backspace") handleRemove(e.key);
  if (e.key === "Escape" || e.key === "Delete") handleClearAll(e.key);
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    handleOperations(e.key);
}
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
    e.target.classList.add("fa-beat");
  });
});
