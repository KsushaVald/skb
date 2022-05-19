import {createNote, deleteNote, clientsArray, dataRequest, changeNote} from '/js/dataManagment.js';
import {sortClients} from '/js/sort.js';
import {searchRequest} from '/js/filters.js';
import Inputmask from "/js/inputmask/dist/inputmask.es6.js";

let clientsOnServer = clientsArray;

function createDate(noteDate){
  let transformDate = new Date(noteDate);
  let day = String(transformDate.getDate()).length<2 ? '0'+transformDate.getDate():transformDate.getDate();
  let month =  String(transformDate.getMonth()).length<2 ? '0'+transformDate.getMonth():transformDate.getMonth();
  let year = String(transformDate.getFullYear()).length<2 ? '0'+transformDate.getFullYear():transformDate.getFullYear();
  let hours = String(transformDate.getHours()).length<2 ? '0'+transformDate.getHours():transformDate.getHours();
  let minutes = String(transformDate.getMinutes()).length<2 ? '0'+transformDate.getMinutes():transformDate.getMinutes();
  transformDate =`${day}.${month}.${year}`;
  let transformTime = `${hours}:${minutes}`;
  return {
      'date': transformDate,
      'time' :transformTime
  }
}

function createContactsList(contacts) {
  const svgVK = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></g></svg>`;
  const svgFacebook = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>`;
  const svgPhone = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>`;
  const svgEmail = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></svg>`;
  const svgOther = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></svg>`;

  let ul = document.createElement('ul');
  ul.classList.add('section-client___contact-list');
  contacts.forEach(function (contact) {
    let li = document.createElement('li');
    let aImg = document.createElement('a');
    let div = document.createElement('div');
    let p = document.createElement('p');
    let aTooltip = document.createElement('a');

    li.classList.add('section-client___list-item');
    aImg.classList.add('section-client__contact-link');
    div.classList.add('section-client__tooltip');
    p.classList.add('section-client__tooltip-text');
    aTooltip.classList.add('section-client__tooltip-link');
    switch (contact.type) {
      case 'Vk':{
        p.textContent = `${contact.type}: `;
        aTooltip.textContent = '@'+contact.value.slice(contact.value.lastIndexOf('/')+1);
        aTooltip.href = contact.value;
        p.append(aTooltip);
        aImg.href = contact.value;
        aImg.innerHTML = svgVK;
      } break;
      case 'Телефон': {
        p.textContent = `${contact.type}: ${contact.value.slice(0,2)} (${contact.value.slice(2,5)}) ${contact.value.slice(5,8)}-${contact.value.slice(8,10)}-${contact.value.slice(10)}`;
        aImg.href = `tel: ${contact.value}`;
        aImg.innerHTML = svgPhone;
      } break;
      case 'Доп. телефон': {
        p.textContent = `${contact.type}: ${contact.value.slice(0,2)} (${contact.value.slice(2,5)}) ${contact.value.slice(5,8)}-${contact.value.slice(8,10)}-${contact.value.slice(10)}`;
        aImg.href = `tel: ${contact.value}`;
        aImg.innerHTML = svgPhone;
      } break;
      case 'Facebook': {
        p.textContent = `${contact.type}: `;
        aTooltip.textContent = '@'+contact.value.slice(contact.value.lastIndexOf('/')+1);
        aTooltip.href = contact.value;
        p.append(aTooltip);
        aImg.href = contact.value;
        aImg.innerHTML = svgFacebook;
      } break;
      case 'Email': {
        p.textContent = `${contact.type}: ${contact.value}`;
        aImg.href = `mailto:${contact.value}`;
        aImg.innerHTML = svgEmail;
      } break;
      case 'Twitter': {
        p.textContent = `${contact.type}: `;
        aTooltip.textContent = '@'+contact.value.slice(contact.value.lastIndexOf('/')+1);
        aTooltip.href = contact.value;
        p.append(aTooltip);
        aImg.href = contact.value;
        aImg.innerHTML = svgOther;
      } break;
      default: {
        p.textContent = `${contact.type}: ${contact.value}`;
        aImg.href = contact.value;
        aImg.innerHTML = svgOther;
      }
    };
    div.append(p);
    li.append(div);
    li.append(aImg);
    ul.append(li);
  });
  return ul;
}


function createTable(data = clientsOnServer) {
  let tbody = document.querySelector('.section-client__tbody');
  document.querySelector('.section-client__if-nodata').classList.remove('open');
  tbody.innerHTML ='';
  if(!data.length) {
    document.querySelector('.section-client__preloader').classList.add('close');
    document.querySelector('.section-client__btn').classList.remove('close');
    document.querySelector('.section-client__if-nodata').classList.add('open');
  }
  data.forEach(function(note) {
    let tr = document.createElement('tr');
    tr.classList.add('section-client__tbody-row');
    let tdId = document.createElement('td');
    tdId.classList.add('section-client___tbody-cell');
    tdId.classList.add('section-client__first-cell');
    tdId.textContent = note.id;
    tr.append(tdId);

    let tdName = document.createElement('td');
    tdName.classList.add('section-client___tbody-cell');
    tdName.textContent = `${note.surname} ${note.name} ${note.lastName}`
    tr.append(tdName);

    let tdCreateDate =  document.createElement('td');
    tdCreateDate.classList.add('section-client___tbody-cell');
    let transformDate = createDate(note.createdAt);
    tdCreateDate.textContent = transformDate.date;
    let spanCreateDate = document.createElement('span');
    spanCreateDate.classList.add('section-client__time');
    spanCreateDate.textContent = transformDate.time;
    tdCreateDate.append(spanCreateDate);
    tr.append(tdCreateDate);

    let tdUpdateDate =  document.createElement('td');
    tdUpdateDate.classList.add('section-client___tbody-cell');
    transformDate = createDate(note.updatedAt);
    tdUpdateDate.textContent = transformDate.date;
    let spanUpdateDate = document.createElement('span');
    spanUpdateDate.classList.add('section-client__time');
    spanUpdateDate.textContent = transformDate.time;
    tdUpdateDate.append(spanUpdateDate);
    tr.append(tdUpdateDate);

    let tdContacts = document.createElement('td');
    tdContacts.classList.add('section-client___tbody-cell');
    let list = createContactsList(note.contacts);
    tdContacts.append(list);
    tr.append(tdContacts);

    let tdBtn = document.createElement('td');
    tdBtn.classList.add('section-client___tbody-cell');
    let btnChange = document.createElement('button');
    let btnDelete = document.createElement('button');
    btnChange.classList.add('section-client__table-btn');
    btnChange.classList.add('section-client__btn-change');
    btnChange.classList.add('btn');
    btnDelete.classList.add('section-client__table-btn');
    btnDelete.classList.add('section-client__btn-delete');
    btnDelete.classList.add('btn');

    btnChange.dataset.id = note.id;
    btnDelete.dataset.id = note.id;

    btnChange.textContent = 'Изменить';
    btnDelete.textContent = 'Удалить';
    tdBtn.append(btnChange);
    tdBtn.append(btnDelete);

    tr.append(tdBtn);

    document.querySelector('.section-client__preloader').classList.add('close');
    document.querySelector('.section-client__btn').classList.remove('close');

    tbody.append(tr);
  });
  deleteDevelopment();
  changeDevelopment();
}

function prepareData(contactsList, name,  surname, lastname, id) {
  let contacts = [];
  contactsList.forEach(function(item){
    let contactType = item.querySelector('.choices__item').textContent;
    let value = item.childNodes[1].value;
    if (contactType==='Телефон' || contactType==='Доп. телефон') {
      value = Inputmask.unmask(value, { mask: "*{2} (999)-999-99-99", definitions:  {
          '*': {
            validator: "[+7]",
            casing: "lower"
          }
        }
      });
    }
    contacts.push({'type':contactType, 'value':value})
  });

  let response;
  let url;
  let note;

  if (id) {
    note = {
      name: name,
      surname: surname,
      lastName: lastname,
      contacts: contacts
    }
    console.log(id)
    url = `http://localhost:3000/api/clients/${id}`;
    response = changeNote(url, note);
  }
  else {
    note = {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: name,
      surname: surname,
      lastName: lastname,
      contacts: contacts
    }
    url = 'http://localhost:3000/api/clients';
    response = createNote(url, note);
  }

  let pError =  document.querySelector('.form-block__alarm-text');
  response.then(function (data) {
    if (!data.ok && data.status > 399){
      return data.json()
    }
    else {
      pError.textContent = '';
      closeAddForm();
      updateData();
      return {};
    }
  }).then(function(object){
    if (Object.keys(object).length) {
      let errorsText = 'Ошибка: ';
      object.errors.forEach(function(error){
        errorsText = errorsText+' '+error.message+'. ';
      });
      if(errorsText === 'Ошибка: ') {
        errorsText= 'Что-то пошло не так...'
      }
      pError.textContent = errorsText;
    }
  }).catch(function(err){
    console.log(err);
    pError.textContent = 'Что-то пошло не так...'
  })
}

function createMask(value, input) {
  var phonemask = new Inputmask("+7 (999)-999-99-99");
  var emailmask = new Inputmask({
    mask: "*{1,20}@*{1,20}.*{2,5}",
    greedy: false,
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
        casing: "lower"
      }
    }
  });
  var vkmask = new Inputmask(
    {
      mask: "https://vk.com/a*{1,20}",
      definitions: {
        '*': {
          validator: "[0-9A-Za-z!#$&?_-]",

        }
      }
    });
  var facebookmask = new Inputmask({
    mask: "https://f\\acebook.com/a*{1,20}",
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$&?_-]",
      }
    }
  });
  var twittermask = new Inputmask({
    mask:"https://twitter.com/a*{1,20}",
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$&?_-]",
      }
    }
  });
  switch(value) {
    case 'Телефон':{
      input.type="tel";
      input.pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
      phonemask.mask(input);
    } break;
    case 'Доп. телефон': {
      input.type="tel";
      input.pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
      phonemask.mask(input);
    } break;
    case 'Email': {
      input.type="url";
      input.pattern="([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})";
      emailmask.mask(input);
    } break;
    case 'Vk': {
      input.type="url";
      input.pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
      vkmask.mask(input);
    } break;
    case 'Facebook': {
      input.type="url";
      input.pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
      facebookmask.mask(input);
    } break
    case 'Twitter': {
      input.type="url";
      input.pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}";
      twittermask.mask(input);
    }break;
    default: {
      break;
    }
  }
}

function createContactItem(selected) {
  let ul = document.querySelector('.form-block__contacts-list');
  let contactsBlock = document.querySelector('.form-block__contacts');
  if (contactsBlock.classList.contains('form-block__contacts--close')) {
    contactsBlock.classList.remove('form-block__contacts--close');
  }
  let svg = `<svg class='btn-svg' width="16" height="16"  fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#B0B0B0"/></svg>`
  let li = document.createElement('li');
  let select = document.createElement('select');
  let options = ['Телефон', 'Доп. телефон', 'Email', 'Vk', 'Facebook', 'Twitter'];
  let input = document.createElement('input');
  let button = document.createElement('button');
  let errorBlock = document.createElement('div');
  errorBlock.classList.add('error-block');
  errorBlock.classList.add('error-block-contact');
  button.classList.add('form-block__contact-btn-del');
  button.innerHTML = svg;
  if (selected.type === 'click') {
    selected = 'Телефон';
    button.classList.add('close');
  }



  select.classList.add('form-block__contacts-select');
  options.forEach(function(value){
    let option = document.createElement('option');
    option.value = value;
    option.textContent = value;
    option.classList.add('form-block__contacts-select-option');
    if(value === selected) {
      option.selected = true;
    }
    select.append(option);
  });

  input.classList.add('form-block__contact-input');

  createMask(selected, input);

  input.name = 'contact';
  input.placeholder = 'Введите данные контакта';

  li.classList.add('form-block__contact');
  li.append(select);
  li.append(input);
  li.append(button);
  ul.append(li);
  ul.append(errorBlock);

  input.addEventListener('input', function(){
    if (input.value) {
      button.classList.remove('close');
    }
    else {
      button.classList.add('close');
    }
  });
  button.addEventListener('click', function(){
    button.parentNode.nextSibling.remove();
    button.parentNode.parentNode.removeChild(button.parentNode);
    document.querySelector('.form-block__contact-btn-add').classList.remove('close');
  });

  if (ul.children.length===20) {
    document.querySelector('.form-block__contact-btn-add').classList.add('close');
  }

  select.addEventListener('change', function(){
    let value = select.childNodes[0].value;
    Inputmask.remove(input)
    createMask(value, input);
  });

  return {
    select,
    input
  }
}

function closeAddForm(){
  document.querySelector('.form-block__contact-btn-add').removeEventListener('click', createContactItem);
  document.querySelector('.form-block__form').innerHTML = '';
  document.querySelector('.form-block__contacts-list').innerHTML = '';
  document.querySelector('.form-block__alarm-text').textContent = '';
  document.querySelector('.forms-blocks').classList.add('close');
  document.querySelector('.form-block').classList.add('close');
  document.querySelector('.form-block__form').classList.add('close');
  document.querySelector('.form-block__contacts').classList.add('close');
  document.querySelector('.form-block__btn-action').removeEventListener('click', dataCheck);
  document.querySelector('.form-block__span').innerHTML = '';
  document.querySelector('.form-block__btn-cancel').removeEventListener('click', closeAddForm);
  document.querySelectorAll('.form-block__input-caption').forEach(function(caption){
    caption.classList.add('close');
  })
}

function createAddForm(headerText, btnActionText, btnCancelText) {
  let formBlock = document.querySelector('.forms-blocks');
  let addForm = document.querySelector('.form-block');
  let header = document.querySelector('.form-block__header');
  let form = document.querySelector('.form-block__form');
  let surnameLabel = document.createElement('label');
  let surnameInput = document.createElement('input');
  let surnamePlaceholder = document.createElement('div');
  let surnameSpan = document.createElement('span');
  let surnameError =  document.createElement('div');
  let surnameCaption = document.createElement('div');

  let nameLabel = document.createElement('label');
  let nameInput = document.createElement('input');
  let namePlaceholder = document.createElement('div');
  let nameSpan = document.createElement('span');
  let nameError =  document.createElement('div');
  let nameCaption = document.createElement('div');

  let lastnameLabel = document.createElement('label');
  let lastnameInput = document.createElement('input');
  let lastnameError =  document.createElement('div');
  let lastnameCaption = document.createElement('div');


  let contactsBlock = document.querySelector('.form-block__contacts');
  let btnAction = document.querySelector('.form-block__btn-action');
  let btnCancel = document.querySelector('.form-block__btn-cancel');
  let closeBtn = document.querySelector('.form-block__btn-close');

  let closeElements = [closeBtn, formBlock];
  let addContactBtn = document.querySelector('.form-block__contact-btn-add');


  formBlock.classList.remove('close');
  addForm.classList.remove('close');
  form.classList.remove('close');
  addContactBtn.classList.remove('close');
  contactsBlock.classList.remove('close');
  contactsBlock.classList.add('form-block__contacts--close');
  header.textContent = headerText;
  btnAction.textContent =  btnActionText;
  btnCancel.textContent =  btnCancelText;

  surnameLabel.classList.add('form-block___label');
  surnameInput.classList.add('form-block___input');
  surnameInput.type = 'text';
  surnameInput.id = 'surname';
  surnameInput.required = '1';
  surnamePlaceholder.classList.add('form-block___placeholder');
  surnameSpan.classList.add('form-block___placeholder-span');
  surnamePlaceholder.textContent = 'Фамилия';
  surnameSpan.textContent = '*';
  surnameCaption.classList.add('form-block__input-caption');
  surnameCaption.classList.add('close');
  surnameCaption.innerHTML = 'Фамилия<span class="form-block___placeholder-span">*</>'
  surnamePlaceholder.append(surnameSpan);
  surnameLabel.append(surnameCaption);
  surnameLabel.append(surnameInput);
  surnameLabel.append(surnamePlaceholder);
  surnameError.classList.add('error-block');

  nameLabel.classList.add('form-block___label');
  nameInput.classList.add('form-block___input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.required = '1';
  namePlaceholder.classList.add('form-block___placeholder');
  nameSpan.classList.add('form-block___placeholder-span');
  namePlaceholder.textContent = 'Имя';
  nameSpan.textContent = '*';
  nameCaption.classList.add('form-block__input-caption');
  nameCaption.classList.add('close');
  nameCaption.innerHTML = 'Имя<span class="form-block___placeholder-span">*</>'
  namePlaceholder.append(nameSpan);
  nameLabel.append(nameCaption);
  nameLabel.append(nameInput);
  nameLabel.append(namePlaceholder);
  nameError.classList.add('error-block');

  lastnameInput.classList.add('form-block___input');
  lastnameLabel.classList.add('form-block___label');
  lastnameInput.placeholder = 'Отчество';
  lastnameInput.type = 'text';
  lastnameInput.id = 'lastname';
  lastnameCaption.classList.add('form-block__input-caption');
  lastnameCaption.classList.add('close');
  lastnameCaption.innerHTML = 'Отчество'
  lastnameLabel.append(lastnameCaption);
  lastnameLabel.append(lastnameInput);
  lastnameError.classList.add('error-block');

  form.append(surnameLabel);
  form.append(surnameError);
  form.append(nameLabel);
  form.append(nameError);
  form.append(lastnameLabel);
  form.append(lastnameError);

  addContactBtn.addEventListener('click', createContactItem);
  nameInput.addEventListener('input', function() {
    nameInput.classList.remove('form-block___input--error');
  });
  surnameInput.addEventListener('input', function() {
    surnameInput.classList.remove('form-block___input--error');
  });

  closeElements.forEach(function(element){
   element.addEventListener('click', function(event){
     if((!event.target.closest('.form-block')&&(!event.target.classList.contains('form-block__contact-btn-del'))&&(!event.target.closest('.form-block__contact-btn-del'))
     || element.classList.contains('form-block__btn-cancel') || element.classList.contains('form-block__btn-close'))) {
      closeAddForm();
     }
    });
  });

  return {
    btnAction,
    btnCancel,
    surnameLabel,
    nameLabel,
    lastnameLabel,
    surnameInput,
    nameInput,
    lastnameInput,
    lastnameCaption,
    surnameCaption,
    nameCaption
  }
}


function deleteActions(){
  let btnAction = document.querySelector('.form-block__btn-action');
  let url = `http://localhost:3000/api/clients/${btnAction.dataset.id}`;
  let response = deleteNote(url);
  let pError =  document.querySelector('.form-block__alarm-text');
  response.then(function(data){
    closeDeleteForm();
    updateData();
  }).catch(function(err){
    console.log(err);
    pError.textContent = 'Что-то пошло не так...';
  });
}

function closeDeleteForm(){
  let btnAction = document.querySelector('.form-block__btn-action');
  let delBlock = document.querySelector('.form-block');
  let text = document.querySelector('.form-block__text');
  btnAction.removeEventListener('click', deleteActions);
  delete btnAction.dataset.id;
  delBlock.classList.add('close');
  delBlock.classList.remove('form-block__del');
  console.log(text)
  if (text) {
    text.remove();
  }
  document.querySelector('.form-block__btn-action').removeEventListener('click', deleteActions);
  document.querySelector('.form-block__form').innerHTML = '';
  document.querySelector('.form-block__contacts-list').innerHTML = '';
  document.querySelector('.form-block__alarm-text').textContent = '';
  document.querySelector('.forms-blocks').classList.add('close');
  document.querySelector('.form-block__alarm-text').textContent = '';
  document.querySelector('.form-block__header').classList.remove('header-del');
}

function createDeleteForm(id){
  let formBlock = document.querySelector('.forms-blocks');
  let delBlock = document.querySelector('.form-block');
  let header = document.querySelector('.form-block__header');
  let btnAction = document.querySelector('.form-block__btn-action');
  let btnCancel = document.querySelector('.form-block__btn-cancel');
  let closeBtn = document.querySelector('.form-block__btn-close');
  let text = document.createElement('p');
  let closeElements = [closeBtn, btnCancel, formBlock];

  formBlock.classList.remove('close');
  delBlock.classList.remove('close');
  delBlock.classList.add('form-block__del');

  text.classList.add('form-block__text');
  text.textContent = 'Вы действительно хотите удалить данного клиента?';
  header.parentNode.append(text);
  header.classList.add('header-del');

  header.textContent = 'Удалить клиента';
  btnAction.textContent = 'Удалить';
  btnCancel.textContent = 'Отмена';
  btnAction.dataset.id = id;

  btnAction.addEventListener('click', deleteActions);


  closeElements.forEach(function(element){
    element.addEventListener('click', function(event){
      if((!event.target.closest('.form-block')&&(!event.target.classList.contains('form-block__contact-btn-del'))&&(!event.target.closest('.form-block__contact-btn-del'))
      || element.classList.contains('form-block__btn-cancel') || element.classList.contains('form-block__btn-close'))) {
       closeDeleteForm();
      }
     });
  });
}

function createChangeForm(btn){
  let form = createAddForm('Изменить данные', 'Сохранить', 'Удалить клиента');
  let span = document.querySelector('.form-block__span');

  let clientInfo = btn.parentNode.parentNode.childNodes;
  let fullname =  clientInfo[1].textContent.split(' ');


  span.textContent = `ID: ${clientInfo[0].textContent}`;
  form.surnameCaption.classList.remove('close');
  form.nameCaption.classList.remove('close');
  form.lastnameCaption.classList.remove('close');

  form.surnameInput.value = fullname[0];
  form.nameInput.value = fullname[1];
  if(fullname.length === 3){
    form.lastnameInput.value = fullname[2];
  }

  let contacts = clientInfo[4].querySelectorAll('.section-client__tooltip-text');
  contacts.forEach(function(contact){
    let objectContact = contact.textContent.split(':');
    let contactForm = createContactItem(objectContact[0]);
    contactForm.input.value = objectContact[1];
  });

  form.btnAction.addEventListener('click', dataCheck);
  form.btnCancel.addEventListener('click', function(){
    closeAddForm();
    createDeleteForm(clientInfo[0].textContent);
  });
}


function highlightError(wrongElement, errorText){
  wrongElement.classList.add('form-block___input--error');
  let errorBlock = wrongElement.parentNode.nextSibling;
  errorBlock.textContent = errorText;
}

function dataCheck(){
  document.querySelectorAll('.error-block').forEach(function(element){
    element.textContent = '';
  });
  let span = document.querySelector('.form-block__span').textContent;
  let id = span.replace('ID: ', '');
  let contactsList = document.querySelectorAll('.form-block__contact');
  let nameInput = document.querySelector('#name');
  let surnameInput = document.querySelector('#surname');
  let lastnameInput = document.querySelector('#lastname');
  let ifError = false;
  if(nameInput.value && surnameInput.value) {
    if(!/^[А-ЯЁ][а-яё]*$/.test(nameInput.value)){
      highlightError(nameInput, 'Недопустимый формат');
      ifError = true;
    }
    if(!/^[А-ЯЁ][а-яё]*$/.test(surnameInput.value)){
      highlightError(surnameInput, 'Недопустимый формат');
      ifError = true;
    }
    contactsList.forEach(function(contact){
      let contactType = contact.querySelector('.choices__item').textContent;
      let value = contact.childNodes[1].value;
      switch(contactType) {
        case 'Телефон':{
          value = Inputmask.unmask(value, { mask: "+7 (999)-999-99-99"});
          if (value.length<10) {
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        } break;
        case 'Доп. телефон': {
          value = Inputmask.unmask(value, { mask: "+7 (999)-999-99-99"});
          if (value.length<10) {
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        } break;
        case 'Email': {
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!re.test(value)) {
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        } break;
        case 'Vk': {
          value = Inputmask.unmask(value, { mask: "https://vk.com/*{2,20}"});
          value = value.replace('https', '');
          console.log(value, value.length)
          if(value.length<2){
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        } break;
        case 'Facebook': {
          value = Inputmask.unmask(value, { mask: "https://f\\acebook.com/*{2,20}"});
          value = value.replace('https', '');
          console.log(value, value.length)
          if(value.length<2){
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        } break
        case 'Twitter': {
          value = Inputmask.unmask(value, { mask: "https://twitter.com/*{2,20}"});
          value = value.replace('https', '');
          console.log(value, value.length)
          if(value.length<2){
            highlightError(contact.childNodes[1], 'Недопустимый формат');
            ifError = true;
          }
        }break;
        default: {
          break;
        }
      }
    });
    if (!ifError){
      prepareData(contactsList, nameInput.value,  surnameInput.value, lastnameInput.value, id);
    }
  }
  else {
    if(!nameInput.value){
      highlightError(nameInput, 'Поле обязательно для заполнения');
    }
    if(!surnameInput.value) {
      highlightError(surnameInput, 'Поле обязательно для заполнения');
    }
  }
}

function prepareSearch(searchObject){
  if (searchObject.trim()) {
    let result=searchRequest(searchObject.trim());
    result.then(function(data){
      createTable(data);
    })
  }
  else {
    createTable();
  }
}

function updateData(){
  let result=dataRequest('http://localhost:3000/api/clients');
  result.then(function(data){
    clientsOnServer = data;
    createTable(clientsOnServer);
  });
}

function sortDevelopment(){
  let clients = clientsOnServer;
  let column = ''
  let cellHeader = document.querySelectorAll('.cell-sort')
  cellHeader.forEach(function (cell) {
    cell.addEventListener('click', function(event){
      if(event.target.dataset.column) {
        column = event.target.dataset.column;
        let ascending = event.target.classList.contains('sort-svg') ? false : true;
        cellHeader.forEach(function(header){
          header.classList.remove('sort');
          header.classList.remove('sort-svg');
        });
        document.querySelector(`[data-column="${column}"]`).classList.add('sort');
        if (ascending) {
          document.querySelector(`[data-column="${column}"]`).classList.add('sort-svg');
        }
        clients = sortClients(ascending, column, clients);
        createTable(clients);
      }
    });
  });
}

function addDevelopment() {
  let addBtn = document.querySelector('.section-client__btn');
  addBtn.addEventListener('click', function(){
    let actionBtns = createAddForm('Новый клиент', 'Сохранить', 'Отмена');
    actionBtns.btnAction.addEventListener('click', dataCheck);
    actionBtns.btnCancel.addEventListener('click', closeAddForm);
  });
}


function searchDevelopment() {
  let searchInput = document.querySelector('.header__input');
  let timeoutId = null;
  searchInput.addEventListener('input', function(){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(prepareSearch, 300, searchInput.value.trim())
  });
}

function deleteDevelopment() {
  let delBtn = document.querySelectorAll('.section-client__btn-delete');
  delBtn.forEach(function(btn){
    btn.addEventListener('click', function(){
      createDeleteForm(btn.dataset.id);
    });
  });
}

function changeDevelopment() {
  let chengeBtns = document.querySelectorAll('.section-client__btn-change');
  chengeBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      createChangeForm(btn);
    });
  });
}
export {
          createTable,
          sortDevelopment,
          addDevelopment,
          searchDevelopment,
        }
