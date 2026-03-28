"use client";
import Image  from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import { SignInButton, Show, UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const navItems = [
    { label: "Library", href: "/"},
    { label: "Add New", href: "/book/new"}
  ]
  return (
    <header className="w-full fixed z-50 bg-('--bg-primary)">
        <div className="max-w-7xl px-5 mx-auto w-full py-4 flex justify-between items-center h-(--navbar-height)`">
          <Link href="/" className="flex gap-0.5 items-center">
            <Image 
              src="/assets/logo.png"
              alt="Bookified"
              width={42}
              height={26}
            />
              <span className="font-semibold text-xl hidden sm:block text-block">Bookified</span>
          </Link>
          <nav className="w-fit flex gap-7.5 items-center">
            {navItems.map(({label, href}) => {
              const active = pathname === href || (href !== "/" && pathname.startsWith(href))
                return (
                  <Link href={href} key={label} className={cn('text-base font-medium leading-6 transition-all', active ? 'text-var[var(--color-brand)] border-b-2 border-(--color-brand) pb-0.5' : 'text-black hover:opacity-70')}>
                    {label}
                  </Link>
                )
            })}
            <div className="flex gap-7.5 items-center">
              <Show when="signed-out">
                <SignInButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign In
                  </button>
                </SignInButton>
              </Show>
              <Show when="signed-in">
                <div className="flex gap-1 items-center hover:opacity-70 transition-opacity">
                  <UserButton />
                  {user?.firstName && (
                    <Link href="/subscriptions" className="hidden sm:inline text-base font-medium text-black">
                      {user.firstName}
                    </Link>
                  )}
                </div>
              </Show>
            </div>
          </nav>
        </div>
    </header>
  )
}

export default Navbar