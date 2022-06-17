export default class UsersServise {

  static async getAllUsers(url = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6') {
    const responseUsers = await fetch(url)
    return await responseUsers.json()
  }

  static async getRadioButton() {
    const responseRadio = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
    const { positions } = await responseRadio.json()
    return await positions
  }

  static async postUser(userData) {
    const responsToken = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
    const { token } = await responsToken.json()

    const responseUser = await fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users`, {
      method: 'POST',
      body: userData,
      headers: {
        'Token': token
      }
    })
    return await responseUser.json()
  }

} 