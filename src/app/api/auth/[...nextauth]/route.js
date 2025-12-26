import { authOptions } from "@/lib/authOptions"
import NextAuth from "next-auth"

// const userList=[
//     {name: "hablu", password:'1234'},
//     {name: "bablu",password: '5678'},
//     {name: "dablu", password:"3452"}
// ]


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
