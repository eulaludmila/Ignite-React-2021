import NextAuth from "next-auth"
import Providers from "next-auth/providers"
import {fauna} from '../../../services/fauna'
import {query as q} from 'faunadb';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
  ],
  //função executada de forma automática depois que acontece uma ação, no caso a de login
  callbacks: {
    async signIn(user, account, profile){
      const {email} = user;
      
      try {
        await fauna.query(
          q.If(//se
            q.Not(// não 
              q.Exists(// existe
                q.Match(// onde - where
                  q.Index('user_by_email'), //usar conceito de índices
                  q.Casefold(user.email)// deixar o email com letra minúsculo
                )
              )
            ),
            q.Create(
              q.Collection('users'),
              {data: {email}}
            ),
            q.Get(//else vou buscar as informações do usuário que já existe
              q.Match(// onde - where
                q.Index('user_by_email'), //usar conceito de indices
                q.Casefold(email)
              )
            )
          )
        )
        return true;
      } catch (error) {
        
        return false;
      }
      
    }
  }
})