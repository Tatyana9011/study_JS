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
  periodAmount = document.querySelector('.period-amount');
let range = periodAmount.textContent;
let error = 0;
  
const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
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
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
  //показываем значения на странице
  showResult: function () {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = appData.budgetDay;
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = appData.getTargetMonth();
    incomePeriodValue.value = appData.calcPeriod();

    periodSelect.addEventListener('input', function () {
      range = periodSelect.value;
    });
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
      
      if (!itemExpenses && itemExpenses !== isNaN) {
       return  ++error;
      }
        appData.expenses[itemExpenses] = cashExpenses;
    });
  },
  //получаем дополнительные доходы
  getIncome: function () {
    incomeItems.forEach((item) => {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;

      if (itemIncome !== '' && cashIncome !== '') {
        appData.income[itemIncome] = cashIncome;
      }
    });
    for (let key in appData.income) {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function () {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(item => {
      item = item.trim();
      if (item !== '') {
        appData.addExpenses.push(item);
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
  asking: function () {
    for (let i = 0; i < appData.addExpenses.length; i++) {
      appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1).toLowerCase();
    }
    appData.deposit = confirm('Есть ли у вас депозит в банке?');

  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budget = +salaryAmount.value;
    appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {
    let missionPeriod = Math.ceil(targetAmount.value / appData.budgetMonth);

    if (missionPeriod < 0) {
      return ('Цель не будет достигнута');
    }
    return (`Цель будет достигнута через:  ${missionPeriod} мес`);
  },

  getStatusIncome: function () {
    if (appData.budgetMonth > 1200) {
      return ('У вас высокий уровень дохода');
    } else if (appData.budgetMonth > 600) {
      return ('У вас средний уровень дохода');
    } else if (appData.budgetMonth > 0) {
      return ('К сожалению у вас уровень дохода ниже среднего');
    } else {
      return ('Что то пошло не так');
    }
  },

  getInfoDeposit: function () {
    /*  if (appData.deposit) {
       appData.percentDeposit = getNumber('Какой годовой процент депозита?', '9');
       appData.moneyDeposit = getNumber('Какой сумма заложена?',10000);
     } */
  },

  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

function startBudget() {
    start.addEventListener('click', function (event) {
    if (salaryAmount.value === '') {
      event.preventDefault();
      return;
    }
    appData.start();
    start.disabled = "true";
  });
}
startBudget();

let data = document.querySelector('.data');
let input = data.querySelectorAll('input');
input.forEach(item => {
  item.addEventListener('change', event => {
    let target = event.target;
    if (target.getAttribute('placeholder') === 'Наименование' ||
      target.getAttribute('placeholder') === 'название') {
      target.setAttribute('onblur', `if(!/^[А-Я][а-я]*/.test(this.value))
                              {alert('Неверная формат ввода. Используйте: ru и toUpperCase() '); this.value='';}`);
    }
  });
})


expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  periodAmount.textContent = periodSelect.value;
  incomePeriodValue.value = appData.calcPeriod();
});
