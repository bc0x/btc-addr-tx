"use client"

import { signOut } from "next-auth/react"
import { Button } from "./ui/button"

export function SignOutButton() {
  return (<Button variant="ghost" onClick={async () => {
    await signOut()
  }}>
    Logout
  </Button>)
}