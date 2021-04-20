"use strict";
const start = document.getElementById("start"),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.getElementById('deposit-check'),
  depositBank = document.querySelector('.deposit-bank'),
  depositAmount = document.querySelector('.deposit-amount'),
  depositPercent = document.querySelector('.deposit-percent'),
  additionalExpensesItem = document.querySelector('.additional_expenses-item'),
  budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
  budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
  expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
  additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
  additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
  incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
  targetMonthValue = document.getElementsByClassName('target_month-value')[0],
  salaryAmount = document.querySelector('.salary-amount'),
  incomeTitle = document.querySelector('.income-title'),
  additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
  expensesTitle = document.querySelector('.expenses-title'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  periodAmount = document.querySelector('.period-amount'),
  cancel = document.querySelector('#cancel'),
  range = periodAmount.textContent,
  data = document.querySelector('.data'),
  input = document.querySelectorAll('input');

let incomeItems = document.getElementsByClassName('income-items');
let expensesItems = document.getElementsByClassName('expenses-items');

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
  isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  getNumber(value) {
    if (value === null) {
      return null;
    }
    if (this.isNumber(value)) {
      return value;
    }
  }
  getString(value) {
    let str = /([А-Яа-я]\w*)/.test(value);
    return str;
  }
  start() { //Заносим функции в прототип
    if (salaryAmount.value === '') {
      alert('Ошибка, поле "Месячный доход" должно быть заполнено');
      return;
    }
    if (!this.isNumber(salaryAmount.value)) {
      alert('Введите "Месячный доход" числами');
      return;
    }
    start.style.display = 'none';
    cancel.style.display = 'inline-block';
    incomePlus.style.display = 'none';
    expensesPlus.style.display = 'none';
   // depositCheck.removeAttribute('checked');
    data.querySelectorAll('input').forEach(item => {
      if (item.getAttribute('type') !== "range") {
        item.setAttribute('disabled', 'true');
      }
    });
    
    this.getExpInc();
    this.getExpensesMonth();
    this.getAddIncExp();
    this.getInfoDeposit();
    this.getBudget();
    this.showResult();
    this.calcPeriod();
  }
  showResult() { //выводим результат на страницу
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();
  }
  addCloneIncExp(event) {  //клонирование елементов дополнительного дохода и расхода
    const target = event.target;
    const itemStr = target.className.split(' ')[1].split('_')[0];
    let elementItem = document.querySelectorAll(`.${itemStr}-items`);
    const cloneItem = elementItem[0].cloneNode(true);

    elementItem[0].parentNode.insertBefore(cloneItem, target);
    //Получаем есе имруты после клонирования
    let elementAll = document.querySelectorAll(`.${itemStr}-items`);
    //добавляем валидацию клонированных импутов
    this.valueValidate(elementAll);
    //при добавлении 3 шт убираем кнопку с екрана и очищаем поля
    if (elementAll.length === 3) {
      target.style.display = 'none';
    }
    cloneItem.childNodes.forEach(item => {
      item.value = '';
    });
  }
  getExpInc() {//считаем дополнит доходы и обязательные расходы и записываем в {}
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== '') {
        this[startStr][itemTitle] = itemAmount;
      }
    };
    
    incomeItems = document.querySelectorAll(`.income-items`);
    expensesItems = document.querySelectorAll(`.expenses-items`);
    incomeItems.forEach(count);
    expensesItems.forEach(count);
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  }
  getAddIncExp() { //записываем в масив дополнителдьные затрааты и доп доходы
    function itemPush(arr) {
      let newArr=[];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== '') {
          newArr[i] = arr[i][0].toUpperCase() + arr[i].slice(1).toLowerCase();
        }
      }
      return newArr;
    }
  
    let expenses = additionalExpensesItem.value.split(', ');
    let incomeInput = [];
    additionalIncomeItem.forEach(item => {
      incomeInput.push(item.value);
    });

    this.addExpenses = itemPush(expenses);
    this.addIncome =itemPush(incomeInput);
  }
  getExpensesMonth () {//общие затраты за месяц
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  }
  getBudget() {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit/100);
    this.budget = +salaryAmount.value;
    this.budgetMonth = this.budget + this.incomeMonth + monthDeposit- this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  }
  getTargetMonth () {
    let missionPeriod = Math.ceil(targetAmount.value / this.budgetMonth);

    if (missionPeriod < 0) {
      return ('Цель не будет достигнута');
    }
    return (`Цель будет достигнута через:  ${missionPeriod} мес`);
  }
  getStatusIncome () {
    if (this.budgetMonth > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetMonth > 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetMonth > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  }
  calcPeriod () { //расчет накопления за месяц рендж
    periodAmount.textContent = periodSelect.value;
    incomePeriodValue.value = Math.floor(this.budgetMonth * periodSelect.value);
  }
  valueValidate(inputAll) {
    inputAll.forEach(item => {
      item.addEventListener('input', event => {
        let target = event.target;

        if (target.getAttribute('placeholder') === 'Сумма') {
          if (this.getNumber(target.value)) {
            return target.value;
          } else{
            target.value = '';
            alert('Кажется вы ввели не число! Попробуйте еще раз!');
          }
        }
        if (target.getAttribute('placeholder') === 'Процент') {
          if (target.value < 1 || target.value > 100 || target.value === ''|| !this.getNumber(target.value)) {
            target.value = '';
            start.setAttribute('disabled', 'true');
            alert("Введите корректное значение в поле проценты");
          } else {
            start.removeAttribute('disabled', 'true');
            return target.value;
          }
        }
        if (target.getAttribute('placeholder') === 'Наименование' ||
        target.getAttribute('placeholder') === 'название') {
          if (this.getString(target.value)&&target.value) {
            return target.value;
          } else {
            target.value = '';
            alert('Нужно ввести дополнительные затраты рускими буквами !');
          }
        }
      });
    }); 
  }
  changePercent() {
    const valueSelect = this.value;
    if (valueSelect === 'other') {
      depositPercent.style.display = 'inline-block';
      depositPercent.value = '';
    } else {
      depositPercent.value = '';
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }
  depositHandler() {
    if (depositCheck.checked) {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    } else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositPercent.style.display = 'none';
      depositBank.value='';
      depositAmount.value = '';
      depositPercent.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }
  reset() {
    let inputTextData = document.querySelectorAll('.data input[type = text]');
    
    cancel.style.display = 'none';
    start.style.display = 'inline-block';
    incomePlus.style.display = 'inline-block';
    expensesPlus.style.display = 'inline-block';
    depositBank.style.display = 'none';
    depositAmount.style.display = 'none';
    depositPercent.style.display = 'none';
    depositCheck.checked = false;
    depositCheck.removeAttribute('disabled');

    inputTextData.forEach(item => {
      item.value = '';
      item.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });

    for (let i = 1; i < incomeItems.length; i++){
      incomeItems[i].remove();
    }
    for (let i = 1; i < expensesItems.length; i++){
      expensesItems[i].remove();
    }

    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';

    this.budget = 0;
    this.budgetDay = 0;
    this.income =  {};
    this.incomeMonth =  0;
    this.addIncome =  [];
    this.expenses =  {};
    this.addExpenses =  [];
    this.deposit =  false;
    this.percentDeposit =  0;
    this.moneyDeposit =  0;
    this.budgetMonth =  0;
    this.expensesMonth = 0;
    this.showResult();
    targetMonthValue.value = '';
    incomePeriodValue.value = '';
  }
  eventListener() {
    start.addEventListener('click',  this.start.bind(this));
    cancel.addEventListener('click', this.reset.bind(this));
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
    expensesPlus.addEventListener('click', this.addCloneIncExp.bind(this));
    incomePlus.addEventListener('click',  this.addCloneIncExp.bind(this));
    periodSelect.addEventListener('input',  this.calcPeriod.bind(this));
  }
  getInfoDeposit () {
      if (this.deposit) {
       this.percentDeposit = depositPercent.value;
       this.moneyDeposit = depositAmount.value;
     } 
  }
}

const appData1 = new AppData();
appData1.valueValidate(input);
appData1.eventListener();

console.log(appData1);