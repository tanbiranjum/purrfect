export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Purrfect",
  description: "Adopt your soulmate and true companion.",
  mainNav: [
    {
      title: 'Adoption',
      href: "/adoption"
    },
    {
      title: 'Post an adoption',
      href: "/post-adoption"
    }
  ],
  links: {
    twitter: "https://twitter.com/imtanbirr",
    github: "https://github.com/tanbiranjum",
    docs: "https://ui.shadcn.com",
  },
}
