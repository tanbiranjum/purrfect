"use client"

import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import AuthFormDialog from "./dialog/auth-form-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar"
import UserLoginForm from "./user-login-form"
import UserRegisterForm from "./user-register-form"

interface SiteHeaderProps {
  currentUser?: User | null
}

export function SiteHeader({ currentUser }: SiteHeaderProps) {
  const [openRegisterForm, setOpenRegisterForm] = React.useState(false)
  const [openLoginForm, setOpenLoginForm] = React.useState(false)

  console.log({ currentUser })
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="gap-2">
                  <Icons.menu />
                  <Avatar className="h-6 w-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => setOpenLoginForm(!openLoginForm)}>
                    Login
                  </MenubarItem>
                  <MenubarItem
                    onClick={() => setOpenRegisterForm(!openRegisterForm)}
                  >
                    Register
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
            <AuthFormDialog
              open={openRegisterForm}
              setOpen={setOpenRegisterForm}
              name="Register now"
              description="Registration is quite easy than you think"
            >
              <UserRegisterForm />
            </AuthFormDialog>
            <AuthFormDialog
              open={openLoginForm}
              setOpen={setOpenLoginForm}
              name="Login now"
              description="Login using email and password"
            >
              <UserLoginForm open={openLoginForm} setOpen={setOpenLoginForm} />
            </AuthFormDialog>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
