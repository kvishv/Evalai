"use client"

import { signIn } from "next-auth/react"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => signIn("google", { callbackUrl: "/auth/dashboard" })}
        className="px-4 py-2 rounded-md bg-black text-white"
      >
        Continue with Google
      </button>
    </div>
  )
}
