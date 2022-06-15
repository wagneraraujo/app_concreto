import axios from 'axios'

// http://192.168.0.106:1337/api/empresas?filters[adminempresa][username][$eq]=marcos@gmail.com
const baseUrl = 'http://192.168.0.107:1337'
// const baseUrl = 'https://strapi-16gl.onrender.com'
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

export const idColaborador = async (email: string) => {
  const res = api.get(
    `/api/colaboradores?filters[user][email]=${email}&populate=*`,
  )
  return res
}

export const createColaboradorAccount = async (
  identifier: string,
  email: string,
  password: string,
  username: string,
  telefone: string,
  tipo_conta: 'colaborador',
  Primeiro_Nome: string,
) => {
  return api.post('/api/auth/local/register', {
    identifier: identifier,
    email: email,
    password: password,
    username: username,
    telefone: telefone,
    tipo_conta: 'colaborador',
    Primeiro_Nome: Primeiro_Nome,
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
  Gerente_Empresa: any,
  Valor: number,
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
        Gerente_Empresa: Gerente_Empresa,
        Valor: Valor,
      },
    },

    {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    },
  )
}

export const updateServicesIdAdicionais = async (
  text: any,
  id: number,
  jwt: any,
) => {
  return api.put(
    '/api/criar-servicos/' + id,
    {
      data: {
        Info_adicionais: text,
      },
    },

    {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    },
  )
}

export const startServiceColaborador = async (
  id: number,
  Status_servico: boolean,
  jwt: any,
) => {
  return api.put(
    '/api/criar-servicos/' + id,
    {
      data: {
        Status_servico: Status_servico,
      },
    },

    {
      headers: {
        Authorization: 'Bearer ' + jwt,
      },
    },
  )
}

export const createColaborador = async (
  user: string,
  Nome: string,
  Telefone: string,
  jwt: any,
) => {
  return api.post(
    '/api/colaboradores',
    {
      data: {
        user: user,
        Nome: Nome,
        Telefone: Telefone,
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
export const getServicosId = async (id: number) => {
  const res = await api.get('/api/tipos-servicos/' + id)
  return res.data
}
export const getAllServicosSolicitados = async () => {
  const res = await api.get(
    '/api/criar-servicos?pagination[page]=1&pagination[pageSize]=16&populate=*',
  )
  return res.data
}

export const getServicosSolicitados = async (email: string) => {
  const res = await api.get(
    `/api/criar-servicos?filters[Gerente_Empresa][email]=${email}&populate=*`,
  )
  return res.data
}

export const getServicosRelacionadoColaborador = async (id: any) => {
  const res = await api.get(
    `api/criar-servicos?filters[colaborador][id]=${id}&populate=*`,
  )
  return res.data
}

export const getServicoId = async (id: number) => {
  const res = await api.get(`/api/criar-servicos/${id}?populate=*`)
  return res.data
}

export const deleteServicoId = async (id: number, jwt: any) => {
  await api.delete(`/api/criar-servicos/${id}`, {
    headers: {
      Authorization: 'Bearer ' + jwt,
    },
  })
  return
}
