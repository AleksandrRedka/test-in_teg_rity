const needFilter = {
  // fullName: { surname: true, firstName: true, middleName: false }
  fullName: {
    surname: true,
    firstName: true,
    middleName: false,
    boom: { xxx: { yyy: true } }
  }
}
const locationArray = {
  'fullName.surname': 'Прізвище',
  'fullName.middleName': 'По-батькові',
  'fullName.boom': 'Yooo'
}

// const obj = [
//   { fullName: { surname: 'xxx', firstName: 'yyy', middleName: 'zzz' } },
//   { fullName: { surname: 'XXX', firstName: 'YYY', middleName: 'ZZZ' } },
//   { fullName: { surname: 'Чехов', firstName: 'Антон', middleName: 'zzz' } },
//   {
//     fullName: { surname: 'Пушкин', firstName: 'Александр', middleName: 'ZZZ' }
//   },
//   { fullName: { surname: 'Лермонтов', firstName: true, middleName: 'ZZZ' } },
//   { fullName: { surname: 'Гоголь', firstName: false, middleName: 'ZZZ' } }
// ]

// forInObj(needFilter)

const obj = [
  {
    fullName: {
      surname: 'xxx',
      firstName: 'yyy',
      middleName: 'zzz',
      boom: { xxx: { yyy: true } }
    }
  },
  {
    fullName: {
      surname: 'XXX',
      firstName: 'YYY',
      middleName: 'ZZZ',
      boom: { xxx: { yyy: true } }
    }
  },
  {
    fullName: {
      surname: 'Чехов',
      firstName: 'Антон',
      middleName: 'zzz',
      boom: { xxx: { yyy: true } }
    }
  },
  {
    fullName: {
      surname: 'Пушкин',
      firstName: 'Александр',
      middleName: 'ZZZ',
      boom: { xxx: { yyy: true } }
    }
  },
  {
    fullName: {
      surname: 'Лермонтов',
      firstName: true,
      middleName: 'ZZZ',
      boom: { xxx: { yyy: false } }
    }
  },
  {
    fullName: {
      surname: 'Гоголь',
      firstName: false,
      middleName: 'ZZZ',
      boom: { xxx: { yyy: true } }
    }
  }
]

function forInObj (obj) {
  if (typeof obj !== 'object') {
    return obj
  } else {
    for (p in obj) {
      return forInObj(obj[p])
    }
  }
}

function typeValue (g) {
  if (typeof g !== 'object') {
    let typeValue = typeof g
    // count++
    if (typeValue === 'string') {
      return g
    }
    if (typeValue === 'boolean') {
      return g ? 'Так' : 'Ні'
    }
  } else {
    for (l in g) {
      return typeValue(g[l])
    }
  }
}

const result = []

for (k in needFilter) {
  let innerObject = needFilter[k] // перебор объкта needFilter
  for (i in innerObject) {
    let value = innerObject[i]
    //  перебор внутренего обьекта fullName
    if (typeof value === 'object') {
      value = forInObj(value)
    }
    if (value) {
      // если значение true  то ищем данные
      let testObj = {}
      let count = 0
      console.log(`${`${k}.${i}`}`)
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
              count++
              testObj[`value${count}`] = typeValue(s[c])
              // if (typeValue === 'object') {
              //   testObj[`value${count}`] = typeValue(s[c])
              // }
            }
          }
        }
      }
      result.push(testObj) // пушим объект в массив результатов
    }
  }
}
console.log(result)

// function forInObj (object, patch) {
//   for (k in object) {
//     patch += `.${k}`
//     typeof object[k] !== 'object'
//       ? console.log(`${patch}:${object[k]}`)
//       : forInObj(object[k], patch)
//   }
// }

// function fn (o) {
//   for (key in o) {
//     const obj = o[key]
//     for (k in obj) {
//       let patch = `${key}.${k}`
//       if (typeof obj[k] === 'object') {
//         forInObj(obj[k], patch)
//       } else {
//         console.log(`${patch}: ${obj[k]}`)
//       }
//     }
//   }
// }

// fn(needFilter)
