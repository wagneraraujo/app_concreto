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
        Cnpj: cnpj,
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

export const createServices = async (
  Titulo: string,
  Descricao: string,
  empresa: number,
  tipos_servicos: number,
  adminempresa: Number,
  jwt: any,
  users: any,
) => {
  return api.post(
    '/api/criar-servicos',
    {
      data: {
        Titulo: Titulo,
        Descricao: Descricao,
        empresa: empresa,
        tipos_servicos: tipos_servicos,
        adminempresa: adminempresa,
        users: users,
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

export const getMyEmpresas = async (email: string) => {
  const res = await api.get(
    `/api/empresas?filters[adminempresa][email]=${email}`,
  )
  return res.data
}

export const getServicos = async () => {
  const res = await api.get('/api/tipos-servicos')
  return res.data
}

export const getServicosSolicitados = async (email: string) => {
  const res = await api.get(
    `/api/criar-servicos?filters[users][email]=${email}&populate=*`,
  )
  return res.data
}

export const getServicoId = async (id: number) => {
  const res = await api.get(`/api/criar-servicos/${id}?populate=*`)
  return res.data
}
