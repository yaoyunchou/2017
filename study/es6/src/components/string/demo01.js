/**
 * Created by yaoyc on 2017/2/17.
 */
"use strict";

var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`;
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`;
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
console.log(`${obj.x + obj.y}`);
console.log(`${x} + ${y * 2} = ${x + y * 2}`);

// 3

const tmpl = addrs => `
<table>
${addrs.map(addr => `
<tr><td>${addr.first}</td></tr><tr><td>${addr.last}</td></tr>`
).join('')}</table>`;
const data = [
	{first: '<Jane>', last: 'Bond'},
	{first: 'Lars', last: '<Croft>'},
];

console.log(tmpl(data));


var template = `
<ul>
	<% for(var i=0; i < data.supplies.length; i++) { %>
	<li><%= data.supplies[i] %></li>
	<% } %>
</ul>
`;

console.log(`123`);