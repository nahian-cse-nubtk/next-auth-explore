"use client"
import React from 'react';
import {signIn} from "next-auth/react"

const LoginButton = () => {
    return (
        <button onClick={()=>signIn()} className="btn">Login</button>
    );
};

export default LoginButton;