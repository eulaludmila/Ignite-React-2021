import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies'

let cookies = parseCookies();

interface AxiosErrorResponse {
  code?: string
}

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `Bearer ${cookies['nextauth.token']}`
  }
});

//intercepta uma resposta para fazer algo após a resposta
api.interceptors.response.use(response => {
  //primeiro parâmtro é o sucesso
  return response
}, (error: AxiosError<AxiosErrorResponse>) => {
  if(error.response?.status === 401){
    if(error.response.data?.code === 'token.expired'){
      cookies = parseCookies(); // atualizar cookies
      const { 'nextauth.refreshToken': refreshToken } = cookies

      api.post('/refresh', {
        refreshToken
      }).then(response => {
        const { token } = response.data

        setCookie(undefined, 'nextauth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', //info d quais caminhos possuem acesso
        })
        setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken,  {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: '/', //info d quais caminhos possuem acesso
        })

        api.defaults.headers['Authorization'] = `Bearer ${token}` //atualizando com o novo token após o login
      })
    } else {
      // deslogar usuário
    }
  }
})