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
  colId: number
}
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [colId, setColId] = useState<any>()
  const [userStorageLoading, setuserStorageLoading] = useState(true)
  const [loading, setLoading] = useState(false)
  const [erroReq, setErroReq] = useState(false)

  async function loginAuth(identifier: any, password: any) {
    await loginUser(identifier, password)
      .then((res) => {
        // console.log(response.data.jwt)
        if (res.status === 200) {
          // idColaborador(res.data?.user.email)
          //   .then((res) => {
          //     setColId(res.data.data[0].id)
          //     console.log('resposta idcolaborador', res.data.data[0].id)
          //     const idc = res.data?.data[0].id
          //   })
          //   .catch((err) => {
          //     console.log(err)
          //   })
          // console.log('after local storage login id', colId)
          const userLogado = {
            id: res.data.user.id,
            name: res.data.user.username,
            email: res.data.user.email,
            telefone: res.data.user.telefone,
            nome_sobrenome: res.data.user.nome_sobrenome,
            tipo_conta: res.data.user.tipo_conta,
            token: res.data.jwt,
          }

          setUser(userLogado)
          AsyncStorage.setItem('@userConcreto', JSON.stringify(userLogado))
        }

        idColaborador(res.data?.user.email).then((res) => {
          console.log('idd==========0', res)
          // setUser({ ...user, meuIdcol: 10 })
          console.log('user auth', res.data.data[0].id)
          setColId(res.data.data[0].id)
          AsyncStorage.setItem(
            '@colconcreto',
            JSON.stringify(res.data?.data[0].id),
          )
          // AsyncStorage.setItem('@userConcreto', JSON.stringify(user))
        })
      })

      .catch((err) => {
        setErroReq(true)
        throw new Error(' Algo deu errado')
      })
  }

  async function Logout() {
    setUser({} as User)
    await AsyncStorage.removeItem('@userConcreto')
    await AsyncStorage.removeItem('@colconcreto')
    setColId({})
  }

  useEffect(() => {
    async function LoadStorageUser() {
      const data = await AsyncStorage.getItem('@userConcreto')
      const collocal = await AsyncStorage.getItem('@colconcreto')
      if (data) {
        const userCol = JSON.parse(collocal) as any
        const userLogado = JSON.parse(data) as User
        const newuser = Object.assign(userLogado, { meuIdcol: userCol })
        AsyncStorage.setItem('@userConcreto', JSON.stringify(newuser))
        setColId(userCol)
        setUser(userLogado)
      }

      // if (collocal) {
      //   const userCol = JSON.parse(collocal) as any
      //   console.log('localstorae', userCol)
      // }

      setuserStorageLoading(false)
    }
    LoadStorageUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{ user, loginAuth, Logout, userStorageLoading, erroReq, colId }}
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
