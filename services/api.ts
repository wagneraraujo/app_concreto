import axios from 'axios'

// const baseUrl = 'http://localhost:1337'
const baseUrl = 'http://192.168.0.106:1337'
// const baseUrl = 'https://85da-170-78-98-161.ngrok.io/'
//http://192.168.0.108:1337/api/auth/local/register
export const api = axios.create({
  baseURL: baseUrl,
})

export const loginUser = async (identifier: any, password: any) => {
  return api.post('/api/auth/local', {
    identifier: identifier,
    password: password,
  })
}

export const createColaboradorAccount = async (
  identifier: string,
  email: string,
  password: string,
  username: string,
  telefone: string,
  tipo_conta: 'colaborador',
  nome_sobrenome: string,
) => {
  return api.post('/api/auth/local/register', {
    identifier: identifier,
    email: email,
    password: password,
    username: username,
    telefone: telefone,
    tipo_conta: 'colaborador',
    nome_sobrenome: nome_sobrenome,
  })
}

export const createEmpresaAccount = async (
  identifier: string,
  email: string,
  password: string,
  username: string,
  telefone: string,
  tipo_conta: 'empresa',
  nome_sobrenome: string,
) => {
  return api.post('/api/auth/local/register', {
    identifier: identifier,
    email: email,
    password: password,
    username: username,
    telefone: telefone,
    tipo_conta: 'empresa',
    nome_sobrenome: nome_sobrenome,
  })
}
