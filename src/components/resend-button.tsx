"use client"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "./ui/button"

export function ResendButton() {
  const refresh = 5
  const [counter, setCounter] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => setCounter((c) => {
      return c+1
    }), 1000);

    if(counter === refresh){
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [counter,setCounter]);


  return (
    <Button type="submit" className="w-full" disabled={counter !== refresh} onClick={() => signIn()}>
      Resend in {refresh-counter <=0 ? 0 : refresh-counter}s
    </Button>)
}