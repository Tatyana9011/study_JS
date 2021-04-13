const book = document.querySelectorAll('.book');
const books = document.querySelector('.books');
const headings = document.querySelectorAll('a');
const adv = document.querySelector('.adv');
const elemBook2 = book[0].querySelectorAll('li');
const elemBook5 = book[5].querySelectorAll('li');
const elemBook6 = book[2].querySelectorAll('li');

//Восстановить порядок книг
book[1].after(book[0]);
book[4].after(book[3]);
books.append(book[2]);

//Заменить картинку заднего фона на другую из папки image
document.body.style.backgroundImage = "url('./../image/fon2.jpg')";

//Исправить заголовок в книге 3
headings[4].innerHTML = "Книга 3. this и Прототипы Объектов";

//Удалить рекламу со страницы
adv.remove();

//Восстановить порядок глав во второй и пятой книге
elemBook2[10].before(elemBook2[2]);
elemBook2[6].before(elemBook2[8]);
elemBook2[7].before(elemBook2[5]);
elemBook2[5].before(elemBook2[4]);
elemBook2[8].before(elemBook2[6]);
elemBook5[1].after(elemBook5[9])
elemBook5[9].after(elemBook5[3])
elemBook5[3].after(elemBook5[4])
elemBook5[7].after(elemBook5[5])

//в шестой книге добавить главу “Глава 8: За пределами ES6”
elemBook6[8].insertAdjacentHTML('afterend', '<li>Глава 8: За пределами ES6</li>')
