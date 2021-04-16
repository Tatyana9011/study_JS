"use strict";
let start = document.getElementById("start"),
  btnPlus = document.getElementsByTagName('button'),
  incomePlus = btnPlus[0],
  expensesPlus = btnPlus[1],
  depositCheck = document.querySelector('#deposit-check'),
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
  expensesItems = document.querySelectorAll('.expenses-items'),
  additionalExpenses = document.querySelector('.additional_expenses'),
  // depositAmount = document.querySelector('.deposit-amount'),
  // depositPercent= document.querySelector('.deposit-percent'),
  targetAmount = document.querySelector('.target-amount'),
  periodSelect = document.querySelector('.period-select'),
  incomeItems = document.querySelectorAll('.income-items'),
  periodAmount = document.querySelector('.period-amount'),
  cancel=document.querySelector('#cancel');
let range = periodAmount.textContent;

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getNumber = function (value) {
  if (value === null) {
    return null;
  }
  if (isNumber(value)) {
    return value;
  }
};

const getString = function (value) {
  let str = /([А-Яа-я]\w*)/.test(value)
  return str;
};

let appData = {
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  //вызываем расчет 
  start: function () {
    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();
    this.showResult();
  },
  reset: function () {
    let inputTextData = document.querySelectorAll('.data input[type = text]'),
        inputResultAll = document.querySelectorAll('.data input[type = text]');
    
    inputTextData.forEach(item => {
      item.value = '';
      item.removeAttribute('disabled');
      periodSelect.value = '0';
      periodAmount.innerHTML = periodSelect.value;
    });
    inputResultAll.forEach(item => item.value = '');
    for (let i = 1; i < incomeItems.length; i++){
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
    }
    for (let i = 1; i < expensesItems.length; i++){
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
    }
    
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
    targetMonthValue.value = "";
  },
   
  //показываем значения на странице
  showResult: function () {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    incomePeriodValue.value = this.calcPeriod();
    targetMonthValue.value = this.getTargetMonth();
  },
  //блок с расходами с пустыми импутами
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.childNodes.forEach(item => {
      item.value = '';
    });
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  //блок с доходами с пустыми импутами
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.childNodes.forEach(item => {
      item.value = '';
    });
    
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  //получаем обязательные затраты
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses =item.querySelector('.expenses-amount').value;
      this.expenses[itemExpenses] = cashExpenses;
    });
  },
  //получаем дополнительные доходы
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        this.income[itemIncome] = cashIncome;
      }
    });
    for (let key in this.income) {
      this.incomeMonth += +this.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        this.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function () {
    additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });
  },
  getExpensesMonth: function () {
    for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
    }
  },

  getBudget: function () {
    this.budget = +salaryAmount.value;
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.floor(this.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let missionPeriod = Math.ceil(targetAmount.value / this.budgetMonth);

    if (missionPeriod < 0) {
      return ('Цель не будет достигнута');
    }
    return (`Цель будет достигнута через:  ${missionPeriod} мес`);
  },

  getStatusIncome: function () {
    if (this.budgetMonth > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (this.budgetMonth > 600) {
      return ('У вас средний уровень дохода');
    } else if (this.budgetMonth > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },
  //расчет накопления за месяц рендж
  calcPeriod: function () {
    return this.budgetMonth * periodSelect.value;
  }
};

//Валидация значений формы
let data = document.querySelector('.data');
let input = data.querySelectorAll('input');
input.forEach(item => {
  item.addEventListener('change', event => {
    let target = event.target;
    
    if (target.getAttribute('placeholder') === 'Сумма') {
      if (getNumber(target.value)) {
      return target.value;
      } else {
        target.value = '';
        alert('Кажется вы ввели не число! Попробуйте еще раз!');
      }
      }

    if (target.getAttribute('placeholder') === 'Наименование' ||
      target.getAttribute('placeholder') === 'название') {
      if (getString(target.value)) {
      return target.value;
    } else {
      target.value = '';
      alert('Нужно ввести дополнительные затраты рускими буквами !');
    }
    }
  });
})

function startBudget() {
    start.addEventListener('click', function (event) {
      if (salaryAmount.value === '') {
        event.preventDefault();
        alert('Ошибка, поле "Месячный доход" должно быть заполнено')
        return;
      }
      if (!isNumber(salaryAmount.value)) {
        alert('Введите "Месячный доход" числами');
        return;
      }
      appData.start();
        start.style.display = 'none';
        cancel.style.display = 'inline';
        incomePlus.style.display = 'none';
        expensesPlus.style.display = 'none';
          data.querySelectorAll('input').forEach(item => {
            if (item.getAttribute('type') !== "range") {
                item.disabled = 'true';
            }
          });
    });
}
startBudget();

cancel.addEventListener('click', (event) => {
  event.preventDefault();
  cancel.style.display = 'none';
  start.style.display = 'inline';
  incomePlus.style.display = 'inline';
  expensesPlus.style.display = 'inline';
  appData.reset();
})

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
  incomePeriodValue.value = appData.calcPeriod();
});
