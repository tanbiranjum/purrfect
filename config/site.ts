export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Purrfect",
  description: "Adopt your soulmate and true companion.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: 'Adoption',
      href: "/adoption"
    }
  ],
  links: {
    twitter: "https://twitter.com/shadcn",
    github: "https://github.com/shadcn/ui",
    docs: "https://ui.shadcn.com",
  },
}
