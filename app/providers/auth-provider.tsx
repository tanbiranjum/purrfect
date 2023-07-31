"use client"

import React, { createContext } from "react"

interface AuthProviderProps {
  currentUser: any
  children: React.ReactNode
}

export const AuthContext = createContext({
  id: "",
  email: "",
  name: "",
  image: "",
  emailVerified: false,
})

const AuthProvider: React.FC<AuthProviderProps> = ({
  currentUser,
  children,
}) => {
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  )
}

export default AuthProvider
