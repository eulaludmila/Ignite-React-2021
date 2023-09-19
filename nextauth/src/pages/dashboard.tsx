import { AuthContext } from "@/context/AuthContext"
import { api } from '../services/apiClient';
import { withSSRAuth } from "@/utils/withSSRAuth"
import { useContext, useEffect } from "react"
import { setupApiClient } from "@/services/api";
import { useCan } from "@/hooks/useCan";
import { Can } from "@/components/Can";

export default function Dashboard() {
  const { user, signOut, isAuthenticated } = useContext(AuthContext)

  useEffect(() => {
    api.get('me')
      .then((response: any) => console.log(response))
      .catch((err: any) => console.log(err))
  }, [])

  return (
    <>
      <h1>Dashboad: {user?.email}</h1>
      <button onClick={signOut}>Sign out</button>
      <Can permissions={['metrics.list']}>
        <div>Métricas</div>
      </Can>
    </>
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