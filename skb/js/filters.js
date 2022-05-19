import {dataRequest, } from '/js/dataManagment.js';

async function searchRequest (searchObject) {
  let url = `http://localhost:3000/api/clients/?search=${searchObject}`
  let response = await dataRequest(url);
  return response;
}

export {
  searchRequest,
}
