"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { userLoginSchema } from "@/lib/validations/auth"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Icons } from "./icons"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface UserLoginFormProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const UserLoginForm: React.FC<UserLoginFormProps> = ({ open, setOpen }) => {
  const router = useRouter()

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof userLoginSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    signIn("credentials", {
      ...values,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in!")
        setOpen(!open)
        router.refresh()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Next</Button>
      </form>
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => signIn("google")}
          className="flex w-full gap-2 bg-red-500 dark:bg-white"
        >
          <Icons.google />
          Continue with Google
        </Button>
        <Button
          onClick={() => signIn("github")}
          className="flex w-full gap-2 bg-black dark:bg-white"
        >
          <Icons.gitHub className="h-4 text-white dark:text-slate-800" />
          Continue with Github
        </Button>
      </div>
    </Form>
  )
}

export default UserLoginForm
