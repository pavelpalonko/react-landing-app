import { useState } from "react"

export const useUsersServiсe = () => {

  const getUsersUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=6'
  const positionsUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
  const tokenUrl = 'https://frontend-test-assignment-api.abz.agency/api/v1/token'
  const postUserUrl = `https://frontend-test-assignment-api.abz.agency/api/v1/users`

  const [nextUrl, setNextUrl] = useState(getUsersUrl)

  class UsersService {

    static async getAllUsers(isRefresh) {
        const responseUsers = await fetch(isRefresh ? getUsersUrl : nextUrl) 
        const resultUsers = await responseUsers.json()
        setNextUrl(resultUsers.links.next_url)

        return {
          users: resultUsers.users,
          showBtn: !!resultUsers.links.next_url
        }
    }

    static async getPositions() {
      const responseRadio = await fetch(positionsUrl)
      const { positions } = await responseRadio.json()
      return positions
    }

    static async postUser(userData) {
      const responsToken = await fetch(tokenUrl)
      const { token } = await responsToken.json()

      const responseUser = await fetch(postUserUrl, {
        method: 'POST',
        body: userData,
        headers: {
          'Token': token
        }
      })
      return responseUser.json()
    }
  }
  
  return UsersService
}
