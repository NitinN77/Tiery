import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { getUser } from "@/lib/server-utils"

export async function SiteHeader() {
  const { user, session } = await getUser({ queryUserFromDB: true })

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {session ? (
              <div className="flex flex-1 items-center justify-end space-x-3">
                <Link href={`${process.env.NEXTAUTH_URL}/profile/${user?.id}`}>
                  <Button variant={"outline"}>{session.user?.name}</Button>
                </Link>

                <Link
                  href={`${process.env.NEXTAUTH_URL}/api/auth/signout/github`}
                >
                  <Button>Logout</Button>
                </Link>
              </div>
            ) : (
              <Link href={`${process.env.NEXTAUTH_URL}/api/auth/signin/github`}>
                <Button>Login</Button>
              </Link>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
