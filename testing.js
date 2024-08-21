//map method in js
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 10);
console.log(doubled);

//filter method
const word = ['spray', 'limit', 'elite', 'exuberant'];
const longWords = word.filter(opoor => opoor.length < 6);
console.log(longWords);

//reduce() methode
const numbers1 = [1, 2, 3, 4];
const sum = numbers1.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum);

//find() methode
const users = [
    {id: 1, name: 'John'},
    {id: 2, name: 'Jane'},
    {id: 3, name: 'Doe'}
];
const user = users.find(user => user.id === 3);
console.log(user);

//some() method
const hasEven = numbers.some(num => num % 2 === 0);
console.log(hasEven);

//every() method
const allEven = numbers.every(num => num % 2 === 0);
console.log(allEven);