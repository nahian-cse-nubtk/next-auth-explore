"use server"
import { usersCollection } from '@/lib/dbConnect'
import bcrypt from 'bcryptjs';
import React from 'react'

export default async function PostUser(payload) {

    const isExists = await usersCollection.findOne({email: payload.email})
    if(isExists){
        return{
            success: false,
            message: "user already exists"
        }

    }
    const hashPassword= await bcrypt.hash(payload.password,10)

    const newUser = {
        ...payload,
        role: "user",
        password: hashPassword,
        createdAt: new Date().toISOString()
    }

    const result = await usersCollection.insertOne(newUser)
    if(result.acknowledged){
        return{
            success: true,
            message: `user is added with ${result.insertedId}`
        }
    }


}
