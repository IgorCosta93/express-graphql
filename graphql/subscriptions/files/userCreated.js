//Get Socket
const socket = require('../../socket')
const UserType = require('../../types/users');

module.exports = {
  type: UserType,
  //Define channel
  subscribe: () => socket.asyncIterator('USER_CREATED')
}