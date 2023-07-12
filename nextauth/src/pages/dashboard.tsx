import { AuthContext } from "@/context/AuthContext"
import { api } from '../services/apiClient';
import { withSSRAuth } from "@/utils/withSSRAuth"
import { useContext, useEffect } from "react"
import { setupApiClient } from "@/services/api";

export default function Dashboard() {
  const {user} = useContext(AuthContext)

  useEffect(() => {
    api.get('me')
      .then((response:any) => console.log(response))
      .catch((err:any) => console.log(err))
  }, [])

  return (
    <h1>Dashboard: {user?.email}</h1>
  )
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiClient(ctx)
  const response = await apiClient.get('me')
  console.log(response.data)
  return {
      props: {}
  }
})