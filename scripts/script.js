"use strict";
let isNumber = function (n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

let money,
  income = 'Фриланс',
  addExpenses = [],
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  lowerHeister = addExpenses;

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

let start = function () {
  do {
    money = +prompt('Ваш месячный доход?');
  } while (!isNumber(money));
};

function getExpenses() {
 let expenses = prompt(`Сколько будет стоить расходы ?`);

  if (!isNumber(expenses)) {
   return getExpenses();
  }
  return +expenses;
}

function getExpensesMonth() {
  let sum = 0;

  for (let i = 0; i < 2; i++){
    addExpenses[i] = prompt('Введите обязательную статью расходов?' );
    sum += getExpenses();
  }
  return sum;
}

function getAccumulatedMonth (incomeAll, expenses) {
  return incomeAll - expenses;
}

function getTargetMonth(dream, budgetMonth) {
  let period = Math.ceil(dream / budgetMonth);
  if (period < 0) {
     return ('Цель не будет достигнута');
   }
  return (`Цель будет достигнута через:  ${period} мес`);
}

let getStatusIncome = function (budget) {
  if (budget > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budget > 600) {
    return ('У вас средний уровень дохода');
  } else if (budget > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

start();
let expensesAmount = getExpensesMonth();
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);
let budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Общие расходы за месяц: ', expensesAmount);
console.log('список расходов:', addExpenses);
console.log('Расходы в месяц: ', getExpensesMonth());
console.log(getTargetMonth(mission, accumulatedMonth));
console.log('Бюджет на день', Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));

