"use client"

import React, { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { User } from "@prisma/client"
import { signOut } from "next-auth/react"

import { siteConfig } from "@/config/site"
import useAdoptionModal from "@/hooks/use-adoption-modal"
import useLoginModal from "@/hooks/use-login-modal"
import useRegisterModal from "@/hooks/use-register-modal"
import useSearchModal from "@/hooks/use-search-modal"
import { Button, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import RentModal from "../modal/adoption-modal"
import SearchModal from "../modal/search-modal"
import UserLoginModal from "../modal/user-login-modal"
import UserRegisterModal from "../modal/user-register-modal"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar"

interface SiteHeaderProps {
  currentUser?: User | null
}

export function SiteHeader({ currentUser }: SiteHeaderProps) {
  const params = useSearchParams()
  const useLogin = useLoginModal()
  const useRegister = useRegisterModal()
  const useAdoption = useAdoptionModal()
  const useSearch = useSearchModal()

  useEffect(() => {
    if (params?.has("login")) {
      useLogin.open()
    }

    if (params?.has("register")) {
      useRegister.open()
    }
  }, [params.toString()])

  return (
    <header className="top-0 z-40 w-full bg-background">
      <div className="border-b">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            {currentUser && (
              <Button
                onClick={() => useAdoption.open()}
                className="hidden md:block"
              >
                Register an Adoption
              </Button>
            )}
            <div>
              {/* Search Trigger Button */}
              <Button
                onClick={() => useSearch.open()}
                className="hidden md:block"
              >
                Search a Pet
              </Button>
            </div>
            <nav className="flex items-center space-x-1">
              <Menubar>
                <MenubarMenu>
                  <MenubarTrigger className="gap-2">
                    <Icons.menu />
                    {currentUser && (
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={currentUser?.image as string} />
                        <AvatarFallback>User</AvatarFallback>
                      </Avatar>
                    )}
                  </MenubarTrigger>
                  <MenubarContent>
                    {currentUser ? (
                      <>
                        <MenubarItem>
                          <Link href="/adoption/status">Adoption Status</Link>
                        </MenubarItem>
                        <MenubarItem onClick={() => {}}>
                          Adoption History
                        </MenubarItem>
                        <MenubarItem onClick={() => signOut()}>
                          Logout
                        </MenubarItem>
                      </>
                    ) : (
                      <>
                        <MenubarItem onClick={() => useLogin.open()}>
                          Login
                        </MenubarItem>
                        <MenubarItem onClick={() => useRegister.open()}>
                          Register
                        </MenubarItem>
                      </>
                    )}
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>
              {/* MODAL */}
              <UserRegisterModal />
              <UserLoginModal />
              <SearchModal />
              <RentModal />
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className="hidden md:block"
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
                className="hidden md:block"
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
      </div>
    </header>
  )
}
