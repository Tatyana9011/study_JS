let money = 12000;
let income = '2500';
let addExpenses = 'Интернет, такси, коммуналка';
let deposit = true;
let mission = 1000000;
let period = 12;

let lowerHeister = addExpenses.toLowerCase();


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period +" месяцев");
console.log("Цель заработать " + mission + " рублей/долларов/гривен/юани");
console.log(addExpenses.toLowerCase().split(", "));
let budgetDay = money / 30;
console.log('budgetDay: ', budgetDay);
