import {sortClients} from '/js/sort.js'

async function dataRequest(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function createNote(url, note) {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(note),
  });
  return response;
}

async function deleteNote(url) {
  await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(''),
  });
}

async function changeNote(url, note){
  const response = await fetch(url, {
    method: 'PATCH',
    body: JSON.stringify(note)
  });
  console.log(response)
  return response;
}

let clientsArray = await dataRequest('http://localhost:3000/api/clients');
clientsArray = sortClients(true, 'id', clientsArray);

export {  createNote,
          deleteNote,
          clientsArray,
          dataRequest,
          changeNote
        }
