const needFilter = {
  fullName: { surname: true, firstName: true, middleName: false }
}
const locationArray = {
  'fullName.surname': 'Прізвище',
  'fullName.middleName': 'По-батькові'
}

const obj = [
  { fullName: { surname: 'Чехов', firstName: 'Антон', middleName: 'zzz' } },
  {
    fullName: { surname: 'Пушкин', firstName: 'Александр', middleName: 'ZZZ' }
  },
  { fullName: { surname: 'Лермонтов', firstName: true, middleName: 'ZZZ' } },
  { fullName: { surname: 'Гоголь', firstName: false, middleName: 'ZZZ' } }
]

const result = []

for (k in needFilter) {
  let innerObject = needFilter[k] // перебор объкта needFilter
  for (i in innerObject) {
    //  перебор внутренего обьекта fullName
    if (innerObject[i]) {
      // если значение true  то ищем данные
      let testObj = {}
      let count = 0
      locationArray[`${k}.${i}`]
        ? (testObj.name = locationArray[`${k}.${i}`]) // присваемаем значание  c  объекта location
        : (testObj.name = i) // присваем значение ключа в случае отсуцтвия значения в объекте location
      for (a of obj) {
        // после создания оболочек и имен ключей переходим к поиску значений в входном обьекте и присвоении новым ключам и перебераем массив
        for (b in a) {
          let s = a[b]

          // перебор верхнего обьекта
          for (c in s) {
            // перебор второго уровня
            if (c === i) {
              let typeValue = typeof s[c]
              count++
              testObj[`value${count}`] = s[c]
              if (typeValue === 'boolean') {
                s[c]
                  ? (testObj[`value${count}`] = 'Так')
                  : (testObj[`value${count}`] = 'Ні')
              }
              if (typeValue === 'object') {
                console.log('вывожу дату')
              }
            }
          }
        }
      }
      result.push(testObj) // пушим объект в массив результатов
    }
  }
}
console.log(result)
