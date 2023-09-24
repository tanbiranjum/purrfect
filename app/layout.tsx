import "@/styles/globals.css"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "@uploadthing/react/styles.css"
import { Metadata } from "next"
import Head from "next/head"
import { Toaster } from "react-hot-toast"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer/footer"
import { SiteHeader } from "@/components/header/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

import getCurrentUser from "./actions/get-current-user"
import AuthProvider from "./providers/auth-provider"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const currentUser = await getCurrentUser()
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <Head>
          <title>Purrfect - Pet adoption website</title>
        </Head>
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
            fontSans.variable
          )}
          suppressHydrationWarning={true}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AuthProvider currentUser={currentUser}>
              <div className="relative flex min-h-screen flex-col">
                <SiteHeader currentUser={currentUser} />
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </AuthProvider>
          </ThemeProvider>
          <Toaster />
          <Footer />
        </body>
      </html>
    </>
  )
}
