import NextAuth from "next-auth"
import { signIn } from "next-auth/client"
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
  jwt:{
    signingKey: process.env.SIGNING_KEY
  },
  //função executada de forma automática depois que acontece uma ação, no caso a de login
  callbacks: {
    async signIn(user, account, profile){
      const {email} = user;
      
      try {
        await fauna.query(
          q.Create(
            q.Collection('users'),
            {data: {email}}
          )
        )
        return true;
      } catch (error) {
        
        return false;
      }
      
    }
  }
})