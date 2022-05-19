
async function createNote(url, note) {
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(note),
  });
}

let notes = [
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Денис',
    surname: 'Скворцов',
    lastName: 'Юрьевич',
    contacts: [
      {
        type: 'Телефон',
        value: '+71234567890'
      },
      {
        type: 'Email',
        value: 'abc@xyz.com'
      },
      {
        type: 'Facebook',
        value: 'https://facebook.com/den-skvortsov'
      },
      {
        type: 'VK',
        value: 'https://vk.com/den-skvortsov'
      }
    ]
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Арсений',
    surname: 'Куприянов',
    lastName: 'Валерьевич',
    contacts: [
      {
        type: 'Телефон',
        value: '+72134567890'
      },
      {
        type: 'Email',
        value: 'abc-abc@xyz.com'
      },
    ]
  },
  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Людмила',
    surname: ' Константинопольская',
    lastName: 'Александровна',
    contacts: [
      {
        type: 'Телефон',
        value: '+71239367890'
      },
      {
        type: 'Email',
        value: 'qwerty@xyz.com'
      },
      {
        type: 'Facebook',
        value: 'https://facebook.com/lkonstantenopol'
      },
    ]
  },

  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: ' Олег',
    surname: 'Дмитриевский',
    lastName: 'Алексеевич',
    contacts: [
      {
        type: 'Телефон',
        value: '+71239377891'
      },
    ]
  },

  {
    createdAt: new Date(),
    updatedAt: new Date(),
    name: 'Татьяна',
    surname: 'Александрова',
    lastName: 'Павловна',
    contacts: [
      {
        type: 'VK',
        value: 'https://vk.com/tanya-aleksandrova'
      },
      {
        type: 'Телефон',
        value: '+71239367891'
      },
      {
        type: 'Email',
        value: '123@xyz.com'
      },
    ]
  },
]

document.querySelector('.header__link-logo').addEventListener('click', function(){
  let url = 'http://localhost:3000/api/clients';
  let note =  {
    createdAt: new Date(),
    updatedAt: new Date(),
    Myname: 'Илья',
    surname: 'Иванов',
    lastName: 'Александрович',
    contacts: [
      {
        type: 'VK',
        value: 'https://vk.com/pivanov'
      },
      {
        type: 'Телефон',
        value: '+71239367855'
      },
    ]
  }
let request = createNote(url, note);
})

function test() {
  document.querySelector('.header__link-logo').addEventListener('click', function(){
    let url = 'http://localhost:3000/api/clients/1635321732312';
    let request = deleteNote(url);
  })
}
