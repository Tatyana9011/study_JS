"use strict";
let money = parseInt(prompt('Ваш месячный доход?', 40000)),
  income = 'Фриланс',
  addExpenses = [],
  deposit = confirm('Есть ли у вас депозит в банке?'),
  mission = 1000000,
  expenses1 = prompt('Введите обязательную статью расходов?', 'садик'),
  amount1 = +prompt('Во сколько это обойдется?', 1200),
  expenses2 = prompt('Введите обязательную статью расходов?','квартира'),
  amount2 = +prompt('Во сколько это обойдется?',4000),
  lowerHeister = addExpenses;

addExpenses[0] = expenses1.toLowerCase();
addExpenses[1] = expenses2.toLowerCase();

let showTypeOf = function (data) {
  console.log(data, typeof (data));
};

let getStatusIncome = function (budgetDay) {
  if (budgetDay > 1200) {
    return ('У вас высокий уровень дохода');
  } else if (budgetDay > 600) {
    return ('У вас средний уровень дохода');
  } else if (budgetDay > 0) {
    return ('К сожалению у вас уровень дохода ниже среднего');
  } else {
    return ('Что то пошло не так');
  }
};

function getExpensesMonth(amount1, amount2) {
  return amount1 + amount2;
}

function getAccumulatedMonth (incomeAll, expenses) {
  return incomeAll - expenses;
}

function getTargetMonth(dream, budgetMonth) {
 return Math.ceil(dream / budgetMonth)
}

let expensesMonth = getExpensesMonth(amount1, amount2);
let accumulatedMonth = getAccumulatedMonth(money, expensesMonth);
let budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log('Общие расходы за месяц: ', expensesMonth);
console.log('список расходов:',addExpenses);
console.log('Цель будет достигнута через: ', getTargetMonth(mission, accumulatedMonth) + " мес");
console.log('Бюджет на день', Math.floor(budgetDay));
console.log(getStatusIncome(budgetDay));

