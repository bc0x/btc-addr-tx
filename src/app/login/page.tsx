import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { auth, signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function Login() {
  const session = await auth()

  if(session?.user){
    redirect('/')
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form className="space-y-4" action={async (formData) => {
            "use server"
            await signIn("resend", formData)
          }}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="sr-only">
                  Email
                </Label>
                <Input id="email" name="email" type="email" placeholder="name@example.com" required />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/login.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
