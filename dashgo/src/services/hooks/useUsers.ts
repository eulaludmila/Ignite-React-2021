import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";
import { api } from "../api";

type User = {
  id: string,
  name: string,
  email: string,
  createdAt: string
}

type Data = {
  users: User[]
}

type GetUserResponse = {
  users: User[];
  totalCount: number;
}

export async function getUsers(page: number): Promise<GetUserResponse>{
    const { data, headers } = await api.get<Data>('users', {
      params: {
        page
      }
    });

    const totalCount = Number(headers['x-total-count'])

    const users = data.users.map(user => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'long',
          year: 'numeric'
        }),
      }
    });
    return { users, totalCount};
}

export function useUsers(page: number, options?: UseQueryOptions){
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 10 minutos sem ser carregada
    ...options
  }) as UseQueryResult<any, unknown>; 
}