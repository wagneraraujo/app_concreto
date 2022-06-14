import * as React from 'react'

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { idColaborador, loginUser } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loading from '../components/LoadingScreen'

const AuthContext = createContext({} as AuthDataType)

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: number
  name: string
  email: string
  telefone: number
  nome_sobrenome: string
  tipo_conta: string
  token: any
  meuIdcol?: number
}
interface AuthDataType {
  user: User
  loginAuth: any
  Logout(): void
  userStorageLoading: Boolean
  erroReq: any
}
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [colId, setColId] = useState<any>()
  const [userStorageLoading, setuserStorageLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erroReq, setErroReq] = useState(false)

  async function loginAuth(identifier: any, password: any) {
    try {
      setLoading(true)
      const response = await loginUser(identifier, password)

      if (response.data.user.tipo_conta === 'colaborador') {
        idColaborador(response.data.user.email)
          .then((res) => {
            setColId(res.data.data[0].id)
            // console.log('resposta idcolaborador', res.data.data[0].id)
          })
          .catch((err) => {
            console.log(err)
          })
      }
      // console.log(response.data.jwt)
      if (response.status === 200) {
        // console.log('after local storage login id', colId)
        const userLogado = {
          id: response.data.user.id,
          name: response.data.user.username,
          email: response.data.user.email,
          telefone: response.data.user.telefone,
          nome_sobrenome: response.data.user.nome_sobrenome,
          tipo_conta: response.data.user.tipo_conta,
          token: response.data.jwt,
          meuIdcol: colId,
        }

        setUser(userLogado)
        await AsyncStorage.setItem('@userConcreto', JSON.stringify(userLogado))
      }
    } catch (error) {
      // console.log(error)
      setErroReq(true)
      throw new Error(' Algo deu errado')
    } finally {
      setLoading(false)
      // setErroReq(false)
    }
  }

  async function Logout() {
    setUser({} as User)
    await AsyncStorage.removeItem('@userConcreto')
  }

  useEffect(() => {
    async function LoadStorageUser() {
      const data = await AsyncStorage.getItem('@userConcreto')
      if (data) {
        const userLogado = JSON.parse(data) as User
        setUser(userLogado)
      }

      setuserStorageLoading(false)
    }
    LoadStorageUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loginAuth, Logout, userStorageLoading, erroReq }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}

//contexto em  hook
function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
