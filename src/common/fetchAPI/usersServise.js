export default class UsersServise {
  
  static allUserUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
  static positionsUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
  static tokenUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'
  static postUserUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users`
  
  static async getAllUsers(url = this.allUserUrl) {
    const responseUsers = await fetch(url)
    return responseUsers.json()
  }

  static async getPositions() {
    const responseRadio = await fetch(this.positionsUrl)
    const { positions } = await responseRadio.json()
    return positions
  }

  static async postUser(userData) {
    const responsToken = await fetch(this.tokenUrl)
    const { token } = await responsToken.json()

    const responseUser = await fetch(this.postUserUrl, {
      method: 'POST',
      body: userData,
      headers: {
        'Token': token
      }
    })
    return responseUser.json()
  }

} 