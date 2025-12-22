import { usersCollection } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
import bcrypt from 'bcryptjs';
// const userList=[
//     {name: "hablu", password:'1234'},
//     {name: "bablu",password: '5678'},
//     {name: "dablu", password:"3452"}
// ]

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
    // The name to display on the sign in form (e.g. 'Sign in with...')
    name: 'Credentials',

    credentials: {
      email: { label: "Email", type: "email", placeholder: "domain@example.com" },
      password: { label: "Password", type: "password",placeholder: 'password' }
    },
    async authorize(credentials, req) {
        if(!credentials) return null;
     const{email,password}=credentials

     const user = await usersCollection.findOne({email})
     if(!user) return null;
     const isPasswordOk= await bcrypt.compare(password, user.password)
     if(isPasswordOk){
        return user;
     }

      return null;
    }
  })
    // ...add more providers here
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    return true
  },
  async redirect({ url, baseUrl }) {
    return baseUrl
  },
  async session({ session, token, user }) {
    if(token){
        session.user.role = token.role
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {
    if(user){
        token.role = user.role
    }
    return token
  }
}
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
