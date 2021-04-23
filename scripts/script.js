"use strict";

const storageItemName = "savedAppData";
//Init components vars
const startBtn = document.getElementById("start"),
  btnPlus = document.getElementsByTagName("button"),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.getElementById("deposit-check"),
  depositBank = document.querySelector(".deposit-bank"),
  depositAmount = document.querySelector(".deposit-amount"),
  depositPercent = document.querySelector(".deposit-percent"),
  additionalExpensesItem = document.querySelector(".additional_expenses-item"),
  budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
  budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
  expensesMonthValue = document.getElementsByClassName("expenses_month-value")[0],
  additionalIncomeValue = document.getElementsByClassName("additional_income-value")[0],
  additionalExpensesValue = document.getElementsByClassName("additional_expenses-value")[0],
  incomePeriodValue = document.getElementsByClassName("income_period-value")[0],
  targetMonthValue = document.getElementsByClassName("target_month-value")[0],
  salaryAmount = document.querySelector(".salary-amount"),
  incomeTitle = document.querySelector(".income-title"),
  additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
  expensesTitle = document.querySelector(".expenses-title"),
  additionalExpenses = document.querySelector(".additional_expenses"),
  targetAmount = document.querySelector(".target-amount"),
  periodSelect = document.querySelector(".period-select"),
  periodAmount = document.querySelector(".period-amount"),
  cancel = document.querySelector("#cancel"),
  range = periodAmount.textContent,
  data = document.querySelector(".data"),
  input = document.querySelectorAll("input");

let incomeItems = document.getElementsByClassName("income-items");
let expensesItems = document.getElementsByClassName("expenses-items");

class AppData {
  constructor() {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
  }
}
class ValidationManager {
  static isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  static checkNumber(value) {
    if (value === null) {
      return null;
    }
    if (this.isNumber(value)) {
      return value;
    }
  }
  static checkString(value) {
    let str = /([А-Яа-я]\w*)/.test(value);
    return str;
  }

  static validateSalaryAmount() {
    if (salaryAmount.value === "") {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено');
      return false;
    }
    if (!this.isNumber(salaryAmount.value)) {
      alert('Введите "Месячный доход" числами');
      return false;
    }
    return true;
  }

  static addValidators(inputAll) {
    inputAll.forEach((item) => {
      item.addEventListener("input", (event) => {
        let target = event.target;

        let placeHolderVar = target.getAttribute("placeholder");
        switch (placeHolderVar) {
          case "Сумма":
            if (this.checkNumber(target.value)) {
              return target.value;
            } else {
              target.value = "";
              alert("Кажется вы ввели не число! Попробуйте еще раз!");
            }
            break;
          case "Процент":
            if (
              target.value < 1 ||
              target.value > 100 ||
              target.value === "" ||
              !this.checkNumber(target.value)
            ) {
              target.value = "";
              startBtn.setAttribute("disabled", "true");
              alert("Введите корректное значение в поле проценты");
            } else {
              startBtn.removeAttribute("disabled", "true");
              return target.value;
            }
            break;
          case "Наименование":
          case "название":
            if (this.checkString(target.value) && target.value) {
              return target.value;
            } else {
              target.value = "";
              alert("Нужно ввести дополнительные затраты рускими буквами !");
            }
            break;
        }
      });
    });
  }
}

class LocalStorageManager {
  //Storage methods
  static saveCookie(dataObject) {
    let cookieStr;
    for (let key in dataObject) {
      cookieStr = encodeURI(key) + "=" + encodeURI(dataObject[key]);
      const expires = new Date(2021, 5, 25);
      cookieStr += '; expires=' + expires.toGMTString();
      document.cookie = cookieStr;
    }
    document.cookie = 'isLoad=true';
  }

  static deleteCookie() {
    let cookies = decodeURI(document.cookie).split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      let eqPos = cookie.indexOf("=");
      let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
      document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  static getCookie() {
    let cookies = decodeURI(document.cookie).split(";");
    let cookiesLength = cookies.length;
    let storageDataObject = JSON.parse(localStorage.getItem(storageItemName));
    let dataObjectLength = Object.keys(storageDataObject).length;

    if (cookiesLength !== dataObjectLength + 1) {
      this.deleteDataJSON();
      this.deleteCookie();
    }
  }

  static saveDataJSON(dataObject) {
    localStorage.setItem(storageItemName, JSON.stringify(dataObject));
  }

  static deleteDataJSON() {
    localStorage.removeItem(storageItemName);
  }

  static isDataItemExists() {
    let dataObjectItem = localStorage.getItem(storageItemName);
    return dataObjectItem !== null;
  }

  static loadDataJSON(targetObject) {
    let dataObjectItem = localStorage.getItem(storageItemName);
    let dataObjectJSON = JSON.parse(dataObjectItem);
    Object.assign(targetObject, dataObjectJSON);
  }
}

class RootManager {
  addEventListeners(dataObject) {
    startBtn.addEventListener(
      "click",
      this.processOnClick.bind(this, dataObject)
    );
    cancel.addEventListener("click", this.reset.bind(this, dataObject));
    depositCheck.addEventListener(
      "change",
      this.depositHandler.bind(this, dataObject)
    );
    expensesPlus.addEventListener("click", this.addCloneIncExp);
    incomePlus.addEventListener("click", this.addCloneIncExp);
    periodSelect.addEventListener(
      "input",
      this.calcPeriod.bind(this, dataObject)
    );
  }

  blockBtns() {
    startBtn.style.display = "none";
    cancel.style.display = "inline-block";
    incomePlus.style.display = "none";
    expensesPlus.style.display = "none";
    data.querySelectorAll("input").forEach((item) => {
      if (item.getAttribute("type") !== "range") {
        item.setAttribute("disabled", "true");
      }
    });
  }

  unBlockBtns() {
    periodSelect.value = "0";
    periodAmount.innerHTML = periodSelect.value;
    startBtn.style.display = "inline-block";
    cancel.style.display = "none";
    incomePlus.style.display = "inline-block";
    expensesPlus.style.display = "inline-block";
    data.querySelectorAll("input").forEach((item) => {
      if (item.getAttribute("type") !== "range") {
        item.value = "";
        item.removeAttribute("disabled");
      }
    });
  }

  //Data methods
  processOnClick(dataObject) {
    if (ValidationManager.validateSalaryAmount()) {
      this.blockBtns();
      this.calculateAndSave(dataObject);
    }
  }

  calculateAndSave(dataObject) {
    this.getExpInc(dataObject);
    this.getExpensesMonth(dataObject);
    this.getAddIncExp(dataObject);
    this.getInfoDeposit(dataObject);
    this.getBudget(dataObject);
    this.showResult(dataObject);

    LocalStorageManager.saveDataJSON(dataObject);
    LocalStorageManager.saveCookie(dataObject);
  }

  showResult(dataObject) {
    //выводим результат на страницу
    budgetMonthValue.value = dataObject.budgetMonth;
    budgetDayValue.value = dataObject.budgetDay;
    expensesMonthValue.value = dataObject.expensesMonth;
    additionalExpensesValue.value = dataObject.addExpenses.join(", ");
    additionalIncomeValue.value = dataObject.addIncome.join(", ");
    targetMonthValue.value = this.getTargetMonth(dataObject);

    this.calcPeriod(dataObject);
  }

  addCloneIncExp(event) {
    //клонирование елементов дополнительного дохода и расхода
    const target = event.target;
    const itemStr = target.className.split(" ")[1].split("_")[0];
    let elementItem = document.querySelectorAll(`.${itemStr}-items`);
    const cloneItem = elementItem[0].cloneNode(true);

    elementItem[0].parentNode.insertBefore(cloneItem, target);
    //Получаем есе имруты после клонирования
    let elementAll = document.querySelectorAll(`.${itemStr}-items`);
    //добавляем валидацию клонированных импутов
    ValidationManager.addValidators(elementAll);
    //при добавлении 3 шт убираем кнопку с екрана и очищаем поля
    if (elementAll.length === 3) {
      target.style.display = "none";
    }
    cloneItem.childNodes.forEach((item) => {
      item.value = "";
    });
  }
  getExpInc(dataObject) {
    //считаем дополнит доходы и обязательные расходы и записываем в {}
    const count = (item) => {
      const startStr = item.className.split("-")[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== "" && itemAmount !== "") {
        dataObject[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItems = document.querySelectorAll(`.income-items`);
    expensesItems = document.querySelectorAll(`.expenses-items`);
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    for (let key in dataObject.income) {
      dataObject.incomeMonth += +dataObject.income[key];
    }
  }
  getAddIncExp(dataObject) {
    //записываем в масив дополнителдьные затрааты и доп доходы
    function itemPush(arr) {
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== "") {
          newArr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
        }
      }
      return newArr;
    }

    let expenses = additionalExpensesItem.value.split(", ");
    let incomeInput = [];
    additionalIncomeItem.forEach((item) => {
      incomeInput.push(item.value);
    });

    dataObject.addExpenses = itemPush(expenses);
    dataObject.addIncome = itemPush(incomeInput);
  }
  getExpensesMonth(dataObject) {
    //общие затраты за месяц
    for (let key in dataObject.expenses) {
      dataObject.expensesMonth += +dataObject.expenses[key];
    }
  }
  getBudget(dataObject) {
    const monthDeposit =
      dataObject.moneyDeposit * (dataObject.percentDeposit / 100);
    dataObject.budget = +salaryAmount.value;
    dataObject.budgetMonth =
      dataObject.budget +
      dataObject.incomeMonth +
      monthDeposit -
      dataObject.expensesMonth;
    dataObject.budgetDay = Math.floor(dataObject.budgetMonth / 30);
  }
  getTargetMonth(dataObject) {
    let missionPeriod = Math.ceil(targetAmount.value / dataObject.budgetMonth);

    if (missionPeriod < 0) {
      return "Цель не будет достигнута";
    }
    return `Цель будет достигнута через:  ${missionPeriod} мес`;
  }
  getStatusIncome(dataObject) {
    if (dataObject.budgetMonth > 1200) {
      return "У вас высокий уровень дохода";
    } else if (dataObject.budgetMonth > 600) {
      return "У вас средний уровень дохода";
    } else if (dataObject.budgetMonth > 0) {
      return "К сожалению у вас уровень дохода ниже среднего";
    } else {
      return "Что то пошло не так";
    }
  }
  calcPeriod(dataObject) {
    //расчет накопления за месяц рендж
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = Math.floor(
      dataObject.budgetMonth * periodSelect.value
    );
  }

  changePercent(event) {
    const valueSelect = event.target.value;
    if (valueSelect === "other") {
      depositPercent.value = "";
      depositPercent.style.display = "inline-block";
    } else {
      depositPercent.value = "";
      depositPercent.style.display = "none";
      depositPercent.value = valueSelect;
    }
  }
  depositHandler(dataObject) {
    if (depositCheck.checked) {
      depositBank.style.display = "inline-block";
      depositAmount.style.display = "inline-block";
      dataObject.deposit = true;
      depositBank.addEventListener("change", this.changePercent);
    } else {
      depositBank.style.display = "none";
      depositAmount.style.display = "none";
      depositPercent.style.display = "none";
      depositBank.value = "";
      depositAmount.value = "";
      depositPercent.value = "";
      dataObject.deposit = false;
      depositBank.removeEventListener("change", this.changePercent);
    }
  }
  reset(dataObject) {
    this.unBlockBtns();
    depositBank.style.display = "none";
    depositAmount.style.display = "none";
    depositPercent.style.display = "none";
    depositBank.value = "";
    depositCheck.checked = false;
    depositCheck.removeAttribute("disabled");

    for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].remove();
    }
    for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].remove();
    }

    expensesPlus.style.display = "block";
    incomePlus.style.display = "block";

    let newObject = new AppData();
    Object.assign(dataObject, newObject);

    this.showResult(dataObject);

    targetMonthValue.value = "";
    incomePeriodValue.value = "";

    LocalStorageManager.deleteDataJSON();
    LocalStorageManager.deleteCookie();
  }

  getInfoDeposit(dataObject) {
    if (dataObject.deposit) {
      dataObject.percentDeposit = depositPercent.value;
      dataObject.moneyDeposit = depositAmount.value;
    }
  }
}

//Run program
ValidationManager.addValidators(input);
let dataObject1 = new AppData();
let manager = new RootManager();

window.addEventListener("load", (event) => {
  let dataObjectOnLoad = new AppData();
  if (LocalStorageManager.isDataItemExists()) {
    LocalStorageManager.loadDataJSON(dataObjectOnLoad);
    manager.showResult(dataObjectOnLoad);
    manager.blockBtns();
  } else {
    manager.unBlockBtns();
  }
  manager.addEventListeners(dataObjectOnLoad);
});

if (LocalStorageManager.isDataItemExists()) {
  LocalStorageManager.getCookie();
}


console.log(dataObject1);
//6) Если пользователь удаляет хотя бы одну из кук или она не
//соответствует тому, что храниться в localStorage(кука name должна равняться свойству 
//name в локальном хранилище), тогда принудительно удаляем наши куки и локальное 
//хранилище и программа запускается ПОЛНОСТЬЮ заново. (очищается объект от данных)
