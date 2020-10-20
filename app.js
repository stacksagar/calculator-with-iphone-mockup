const numberButtons = document.querySelectorAll(".dataNumber");
const actionButtons = document.querySelectorAll(".dataAction");
const allClearButton = document.querySelector(".dataAllClear");
const deleteButton = document.querySelector(".dataDelete");
const equalButton = document.querySelector(".dataEqual");
const dataPrevious = document.querySelector(".dataPrevious");
const dataCurrent = document.querySelector(".dataCurrent");

class myCalculator {
  constructor() {
    this.dataPrevious = dataPrevious;
    this.dataCurrent = dataCurrent;
    this.clear();
  }

  clear() {
    this.previousValue = "";
    this.currentValue = "";
    this.action = undefined;
  }

  output(value) {
    if (value === "." && this.currentValue.includes(".")) return;
    this.currentValue = this.currentValue + value;
  }

  actionValue(value) {
    if (this.currentValue === "") return;
    if (this.previousValue !== "") {
      this.calculation();
    }
    this.previousValue = this.currentValue + " " + value;
    this.action = value;
    this.currentValue = "";
  }

  calculation() {
    let result;
    const previous = parseFloat(this.previousValue);
    const current = parseFloat(this.currentValue);
    if (isNaN(previous) || isNaN(current)) return;
    switch (this.action) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "÷":
        result = previous / current;
        break;
      case "%":
        result = previous % current;
        break;
      default:
        return;
    }

    this.currentValue = result;
    this.previousValue = "";
  }

  deleteNumber() {
    this.currentValue = this.currentValue.slice(0, -1);
  }

  // getDisplayNumber(number) {
  //   const stringNumber = number.toString();
  //   const integerDigits = parseFloat(stringNumber.split("."));
  //   const decimalDigits = stringNumber.split(".")[1];
  //   let integerDisplay;

  //   if (isNaN(integerDigits)) {
  //     integerDisplay = "sss";
  //   } else {
  //     integerDisplay = integerDigits.toLocaleString();
  //   }

  //   if (decimalDigits != null) {
  //     return `${integerDisplay}.${decimalDigits}`;
  //   } else {
  //     return integerDisplay;
  //   }

  // }

  // getOutput() {
  //   this.dataCurrent.innerText = this.getDisplayNumber(this.currentValue);
  //   if (this.action != null) {
  //     this.dataPrevious.innerText = this.getDisplayNumber(this.previousValue);
  //   } else {
  //     this.dataPrevious.innerText = "";
  //   }
  // }

  // updateOutput(value) {
  //   const getString = value.toString();
  //   const integerDigits = parseFloat(getString.split("."));

  //   if (!isNaN(integerDigits)) {
  //    return integerDigits.toLocaleString();
  //   }else{
  //     return ''
  //   }
  // }

  // updateOutput() {

  //   const integerDigits = parseFloat(this.currentValue.toString().split("."));
  //   if (!isNaN(integerDigits)) {
  //    return integerDigits.toLocaleString();
  //   }else{
  //     return ''
  //   }

  // }

  updateOutput(val) {
    const integerDigits = parseFloat(val.toString().split("."));
    if (isNaN(integerDigits)) {
      return "";
    } else {
      return integerDigits.toLocaleString();
    }
  }

  getOutput() {
    this.dataCurrent.innerText = this.updateOutput(this.currentValue);
    this.dataPrevious.innerText = this.previousValue;
  }
}
// End Class function

const calculator = new myCalculator(dataPrevious, dataCurrent);

numberButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.output(this.innerText);
    calculator.getOutput();
  });
});

actionButtons.forEach((button) => {
  button.addEventListener("click", function () {
    calculator.actionValue(this.innerText);
    calculator.getOutput();
  });
});
equalButton.addEventListener("click", () => {
  calculator.calculation();
  calculator.getOutput();
});
allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.getOutput();
});

deleteButton.addEventListener("click", () => {
  calculator.deleteNumber();
  calculator.getOutput();
});
