import { signOut } from '@/context/AuthContext';
import { AuthTokenError } from '@/pages/AuthTokenError';
import axios, { Axios, AxiosError } from 'axios';
import { GetServerSidePropsContext } from 'next';
import { parseCookies, setCookie } from 'nookies'

let isRefreshing = false
let failedRequestQueue: any[] = []
interface AxiosErrorResponse {
  code?: string
}

export function setupApiClient(ctx: GetServerSidePropsContext | undefined = undefined) {
  let cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  //intercepta uma resposta para fazer algo após a resposta
  
  /*
    api.interceptors.request = intercepta uma requisição para fazer algo antes da requisição
    api.interceptors.response = intercepta uma resposta para fazer algo após a resposta
  */
  api.interceptors.response.use(response => {
    //primeiro parâmtro é o sucesso
    return response
  }, (error: AxiosError<AxiosErrorResponse>) => {
    if(error.response?.status === 401){
      if(error.response.data?.code === 'token.expired'){
        cookies = parseCookies(ctx); // atualizar cookies
        const { 'nextauth.refreshToken': refreshToken } = cookies
        const originalConfig = error.config
  
        if(!isRefreshing) {
          isRefreshing = true 
  
          api.post('/refresh', {
            refreshToken
          }).then(response => {
            const { token } = response.data
    
            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/', //info d quais caminhos possuem acesso
            })
            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken,  {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/', //info d quais caminhos possuem acesso
            })
    
            api.defaults.headers['Authorization'] = `Bearer ${token}` //atualizando com o novo token após o login
          
            failedRequestQueue.forEach(request => request.onSuccess(token))
            failedRequestQueue = [];
          })
          .catch(err => {
            failedRequestQueue.forEach(request => request.onFailure(err))
            failedRequestQueue = [];
  
            if(process.browser){
              signOut()
            }
          })
          .finally(() => {
            isRefreshing = false
          })
        } 
  
        /* Será feito uma fila para que quando houver um atualização 
          do refresh a requisição não falhe e entre numa fila para quando houver a atualização do token */
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            // será executado o processo de refresh token der certo
            onSuccess: (token: string) => {
  
              if(originalConfig?.headers){
                originalConfig.headers['Authorization'] = `Bearer ${token}` 
                resolve(api(originalConfig))
              }
            },
            // será executado o processo de refresh token der errado
            onFailure:  (err: AxiosError) => {
              reject(err)
            }
          })
        })
      } else {
        if(process.browser){
          signOut()
        } else {
          return Promise.reject(new AuthTokenError())
        }
      }
    }
  
  
    return Promise.reject(error)
  })

  return api
}