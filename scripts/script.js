"use strict";
let start = document.getElementById("start"),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus= btnPlus[0],
    expensesPlus = btnPlus[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
     //const accumulatedMonthValue = document.getElementsByClassName('')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    //incomeAmount = document.querySelector('.income-amount'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    expensesTitle= document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses'),
// depositAmount = document.querySelector('.deposit-amount'),
// depositPercent= document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodAmount = document.querySelector('.period-amount');
let range = periodAmount.textContent;

const isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const getNumber = function (...str) {
  const numUser = prompt(str[0],str[1]);

  if (numUser === null) {
    return null;
  }
  if (isNumber(numUser)) {
    return +numUser;
  }
  alert('Кажется вы ввели не число! Попробуйте еще раз!');
  getNumber(...str);
};

const getString = function (...str) {
  const strUser = prompt(str[0], str[1]);

  if (strUser.trim() === '' || !isNaN(strUser)) {
    alert('Нужно ввести дополнительные затраты буквами!');
    getString(...str);
  } else {
    return strUser;
  }
};

let appData = {
  income: {},
  incomeMonth:0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay : 0 ,
  budgetMonth: 0,
  expensesMonth: 0,
  start: function () {
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddExpenses();
    appData.getAddIncome();
    appData.getBudget();
    appData.showResult();
  },
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
  addExpensesBlock: function () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
    }
  },
  addIncomeBlock: function () {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
    }
  },
  getExpenses: function () {
    expensesItems.forEach((item) => {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  
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
    additionalIncomeItem.forEach(function(item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
        appData.addIncome.push(itemValue);
      }
    });

  },
  asking: function () {
    for (let i = 0;  i < appData.addExpenses.length; i++){
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
    if (appData.deposit) {
      appData.percentDeposit =getNumber('Какой годовой процент депозита?', '9');
      appData.moneyDeposit = getNumber('Какой сумма заложена?',10000);
    }
  },
  
  calcPeriod: function () {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', function (event) {
  if (salaryAmount.value === '') {
    event.preventDefault();
    return;
  }
    appData.start();
});

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', function () {
  
  periodAmount.textContent = periodSelect.value;
  incomePeriodValue.value = appData.calcPeriod();
});
