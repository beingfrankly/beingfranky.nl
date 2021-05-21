import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav className="flex flex-row p-8 space-x-8 w-full justify-end">
        <Link href="/"><a>Home</a></Link>
        <Link href="/blog"><a>Blog</a></Link>
      </nav>

      <main className="prose lg:prose-xl">{children}</main>

      <footer className="p-8">
        © 2021-present Frank van Eldijk-Smeding. All Rights Reserved.
      </footer>
    </>
  )
}
