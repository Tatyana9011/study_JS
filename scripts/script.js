"use strict";

let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
    start = function () {
      do {
        money = +prompt('Ваш месячный доход?');
      }
      while (!isNumber(money));
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay : 0 ,
  budgetMonth: 0,
  expensesMonth:0,
  asking: function () {
    let addExpenses = prompt('Перечислите возможные расходы через запятую');
        appData.addExpenses = addExpenses.toLowerCase().split(',');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++){
     let response1 = prompt('Введите обязательную статью расходов?');
     let response2 = prompt(`Сколько будет стоить расходы ?`);
      while (!isNumber(response2)) {
         response2 = prompt('Это не число! Сколько будет стоить расходы, напишите цифрами?');
      }
      appData.expenses[response1] = +response2;
    }
  },
  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },
  getBudget: function () {
    appData.budgetMonth = parseInt(appData.budget) - parseInt(appData.expensesMonth);
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
  getTargetMonth: function () {
    let period = Math.ceil(appData.mission/ appData.budgetMonth);
    appData.period = period;
      if (period < 0) {
        return ('Цель не будет достигнута');
      }
    return (`Цель будет достигнута через:  ${period} мес`);
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
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log( 'Расходы за месяц', appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());

for (let key in appData) {
  console.log("Наша программа включает в себя данные: ", key + ' :' + appData[key]);
}

