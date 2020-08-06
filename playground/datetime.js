const d1 = new Date(Date.parse('08-08-2020' + ' 08:00'))
console.log(d1)

const d2 = new Date(d1.toString())
console.log(d2)

const d3 = new Date('Sat Aug 08 2020 08:00:00 GMT+0530 (India Standard Time)')
console.log(d3.valueOf())

const d4 = new Date(1596853800000)
const myTime = (d4.toLocaleDateString() + ' ' + d4.toLocaleTimeString())
console.log(myTime.toString())

const d5 = new Date(myTime)
console.log(d5.toString())
