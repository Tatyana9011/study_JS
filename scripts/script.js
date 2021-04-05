"use strict";
let expenses1 = '';
let expenses2 = '';
let amount1 = 0;
let amount2 = 0;

function getExpenses(x, y) {
  x = prompt('Введите обязательную статью расходов?');
  y = +prompt('Во сколько это обойдется?');
}

let money = parseInt(prompt('Ваш месячный доход?'));
let income = '2500';
getExpenses(expenses1, amount1);
getExpenses(expenses2, amount2);
let budgetMonth = money - (amount1 + amount2 + income);
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 1000000;
let period = mission / budgetMonth;
let lowerHeister = addExpenses.toLowerCase();
let budgetDay = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log('budgetDay', Math.floor(budgetDay));
console.log('addExpenses.length', addExpenses.length);
console.log("Период равен " + Math.ceil(period) +" месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");
console.log(addExpenses.toLowerCase().split(", "));




