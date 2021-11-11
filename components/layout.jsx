import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Link href="/"><a>Home</a></Link>
        <Link href="/blog"><a>Blog</a></Link>
      </nav>

      <main>{children}</main>

      <footer>
        © 2021-present Frank van Eldijk-Smeding. All Rights Reserved.
      </footer>
    </>
  )
}
