function sortClients(ascending, column, clients) {
  if (column === 'id') {
    if (ascending) {
      clients.sort((a, b) =>a.id > b.id ? 1 : -1);
    }
    else {
      clients.sort((a, b) =>a.id < b.id ? 1 : -1);
    }
  }
  if (column === 'Name') {
    if (ascending) {
      clients.sort((a, b) =>(a.surname + a.name + a.lastName) > (b.surname + b.name + b.lastName)  ? 1 : -1);
    }
    else {
      clients.sort((a, b) =>(a.surname + a.name + a.lastName) < (b.surname + b.name + b.lastName)  ? 1 : -1);
    }
  }
  if (column === 'createDate') {
    if (ascending) {
      clients.sort((a, b) =>(a.createdAt) < (b.createdAt)  ? 1 : -1);
    }
    else {
      clients.sort((a, b) =>(a.createdAt) > (b.createdAt)  ? 1 : -1);
    }
  }
  if (column === 'changeDate') {
    if (ascending) {
      clients.sort((a, b) =>(a.updatedAt) < (b.updatedAt)  ? 1 : -1);
    }
    else {
      clients.sort((a, b) =>(a.updatedAt) > (b.updatedAt)  ? 1 : -1);
    }
  }
  return clients;
}

export {
  sortClients
}
