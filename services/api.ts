import axios from 'axios'
import { UserInterfaceIdiom } from 'expo-constants'
import { useAuth } from '../hooks/auth'

// http://192.168.0.106:1337/api/empresas?filters[adminempresa][username][$eq]=marcos@gmail.com
// const baseUrl = 'http://localhost:1337'
const baseUrl = 'http://192.168.0.106:1337'
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

export const solicitarServico = async (
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

export const cadastrarEmpresa = async (
  Telefone: string,
  Nome_Empresa: string,
  Endereco: string,
  cnpj: string,
  adminempresa: Number,
  jwt: any,
) => {
  return api.post(
    '/api/empresas',
    {
      data: {
        Telefone: Telefone,
        Nome_Empresa: Nome_Empresa,
        Endereco: Endereco,
        cnpj: cnpj,
        adminempresa: adminempresa,
      },
    },
    {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    },
  )
}

export const getEmpresas = async () => {
  const res = await api.get('/api/empresas')
  return res.data
}

export const getMyEmpresas = async (username: string) => {
  const res = await api.get(
    `/api/empresas?filters[adminempresa][username][$eq]=${username}`,
  )
  return res.data
}
