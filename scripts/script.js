"use strict";

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

let money,
    start = function () {
        money = getNumber('Ваш месячный доход?', 45000);
    };

start();

let appData = {
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  percentDeposit: 0,
  moneyDeposit: 0,
  mission: 50000,
  period: 3,
  budget: money,
  budgetDay : 0 ,
  budgetMonth: 0,
  expensesMonth:0,
  asking: function () {

    if (confirm('Есть ли у Вас дополнительный зароботок?')) {
      let itemIncom = getString ('Какой у Вас есть дополнительный зароботок?', 'Репетиторство');
      let cashIncome = getNumber('Сколько в месяц вы на этом зарабатываете ?', 10000);
      appData.income[itemIncom] = cashIncome;
    }

    let addExpenses = getString('Перечислите возможные расходы через запятую', 'Свет, гаЗ, вОда');
        appData.addExpenses = addExpenses.split(', ');
    for (let i = 0;  i < appData.addExpenses.length; i++){
      appData.addExpenses[i] = appData.addExpenses[i][0].toUpperCase() + appData.addExpenses[i].slice(1).toLowerCase();
    }

    appData.deposit = confirm('Есть ли у вас депозит в банке?');

    for (let i = 0; i < 2; i++){

      let response1 = getString('Введите обязательную статью расходов?', 'Pыбалка'),
          response2 = getNumber('Во сколько это обойдется?', 2000);
      
          appData.expenses[response1] = +response2;
    }
  },

  getExpensesMonth: function () {
    for (let key in appData.expenses) {
      appData.expensesMonth += +appData.expenses[key];
    }
  },

  getBudget: function () {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },

  getTargetMonth: function () {

    let missionPeriod = Math.ceil(appData.mission / appData.budgetMonth);

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
  
  calcSavedMoney: function () {
    return appData.budgetMonth * appData.period;
  }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log( 'Расходы за месяц ' + appData.expensesMonth);
console.log(appData.getTargetMonth());
console.log(appData.getStatusIncome());
console.log('Возможные расходы: ', appData.addExpenses);
console.log('addExpenses - строка с большой буквы, слова разделены запятой и пробелом ',
  appData.addExpenses.join(', '));

for (let key in appData) {
  console.log("Наша программа включает в себя данные: ", key + ' :' + appData[key]);
}