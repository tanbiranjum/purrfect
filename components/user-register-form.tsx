"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { z } from "zod"

import { userAuthSchema } from "@/lib/validations/auth"
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

interface UserRegisterFormProps {
  open: boolean
  setOpen: (open: boolean) => void
}

const UserRegisterForm: React.FC<UserRegisterFormProps> = ({
  open,
  setOpen,
}) => {
  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof userAuthSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    axios
      .post("/api/register", values)
      .then(() => {
        toast.success("Registration completed!")
        setOpen(!open)
      })
      .catch(() => {
        toast.error("Something went wrong!")
      })

    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default UserRegisterForm
