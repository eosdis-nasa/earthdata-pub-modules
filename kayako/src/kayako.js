const fs = require('fs');
const Kayako = require('./kayako-util.js');

function getInterface() {
  return fs.readFileSync(`${__dirname}/ui.html`).toString();
}

const operations = {
  ui: getInterface,
  getTestAPI : Kayako.getTestAPI,
  getAllEDPubTickets : Kayako.getAllEDPubTickets,
  getTicketById : Kayako.getTicketById,
  createTicket : Kayako.createTicket,
  deleteTicket : Kayako.deleteTicket,
  getAllPostsForTicket : Kayako.getAllPostsForTicket,
  getPostById : Kayako.getPostById,
  createPost : Kayako.createPost,
  deletePost : Kayako.deletePost
}

async function handler(event) {
  const operation = operations[event.operation];
  const response = await operation(event.params || {});
  return response;
}

module.exports.handler = handler;
