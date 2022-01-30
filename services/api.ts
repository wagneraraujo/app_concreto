import axios from 'axios'

// const baseUrl = 'http://localhost:1337'
const baseUrl = 'https://strapi-16gl.onrender.com'

export const api = axios.create({
  baseURL: baseUrl,
})

export const loginUser = async (identifier: any, password: any) => {
  return api.post('/api/auth/local', {
    identifier: identifier,
    password: password,
  })
}
