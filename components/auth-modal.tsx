"use client"

import { createContext, useContext, useState } from "react"

type AuthMode = "login" | "register" | null

const AuthModalContext = createContext<{
  mode: AuthMode
  open: (mode: AuthMode) => void
  close: () => void
}>({
  mode: null,
  open: () => {},
  close: () => {},
})

export const useAuthModal = () => useContext(AuthModalContext)

export const AuthModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<AuthMode>(null)

  return (
    <AuthModalContext.Provider
      value={{
        mode,
        open: (m) => setMode(m),
        close: () => setMode(null),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}