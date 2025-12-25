import { usersCollection } from "@/lib/dbConnect";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
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
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }),
  GitHubProvider({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET
  })
    // ...add more providers here
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    try{
      const payload={
        ...user,
        provider: account.provider,
        providerId: account.providerAccountId,
        role: 'user',
        createdAt: new Date().toISOString()
      }
      if(!user?.email){
        return false
      }
      const isExists = await usersCollection.findOne({email: user.email,provider: account.providerAccountId})
      if(!isExists){
        const result= await usersCollection.insertOne(payload)
      }
      return true;
    }
    catch(error){
      return false
    }

  },
  async redirect({ url, baseUrl }) {

    if (url.startsWith("/")) return `${baseUrl}${url}`
    if (new URL(url).origin === baseUrl) return url
    return baseUrl
  },
  async session({ session, token, user }) {
    if(token){
        session.user.role = token.role
    }
    return session
  },
  async jwt({ token, user, account, profile, isNewUser }) {

    return token
  }
}
}
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
