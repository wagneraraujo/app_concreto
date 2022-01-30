import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react'
import { loginUser } from '../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'

const AuthContext = createContext({} as AuthDataType)

interface AuthProviderProps {
  children: ReactNode
}

interface User {
  id: number
  name: string
  email: string
  telefone?: number
}
interface AuthDataType {
  user: User
  loginAuth: any
}
function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [userStorageLoading, setuserStorageLoading] = useState(true)

  async function loginAuth(identifier: any, password: any) {
    try {
      const response = await loginUser(identifier, password)
      if (response.status === 200) {
        console.log(response.data.user.email)

        const userLogado = {
          id: response.data.user.id,
          name: response.data.user.username,
          email: response.data.user.email,
        }

        setUser(userLogado)
        await AsyncStorage.setItem('@userConcreto', JSON.stringify(userLogado))
      }
    } catch (error) {
      console.log(error)
      throw new Error(' Algo deu errado')
    }
  }

  useEffect(() => {
    async function LoadStorageUser() {
      const data = await AsyncStorage.getItem('@userConcreto')
      console.log(data)
      if (data) {
        const userLogado = JSON.parse(data) as User
        setUser(userLogado)
      }
      setuserStorageLoading(false)
    }

    LoadStorageUser()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loginAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

//contexto em  hook
function useAuth() {
  const context = useContext(AuthContext)
  return context
}

export { AuthProvider, useAuth }
