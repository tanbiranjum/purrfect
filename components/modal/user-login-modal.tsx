"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { userLoginSchema } from "@/lib/validations/auth"
import useLoginModal from "@/hooks/use-login-modal"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import Modal from "./modal"
import { Separator } from "../ui/separator"

const UserLoginModal = () => {
  const router = useRouter()
  const useLogin = useLoginModal()

  const form = useForm<z.infer<typeof userLoginSchema>>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof userLoginSchema>) {
    signIn("credentials", {
      ...values,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        toast.success("Logged in!")
        useLogin.close()
        router.refresh()
      }

      if (callback?.error) {
        toast.error(callback.error)
      }
    })
  }

  const toggle = () => {
    if (useLogin.isOpen) {
      useLogin.close()
    } else {
      useLogin.open()
    }
  }

  return (
    <Modal name="Login" isOpen={useLogin.isOpen} toggle={toggle}>
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
          <Button type="submit" className="w-full">Sign in</Button>
        </form>
        <Separator/>
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
    </Modal>
  )
}

export default UserLoginModal
