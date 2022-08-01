import Head from "next/head"
import React, { FC } from "react"
import MainLayout from "./main"

const Layout: FC<{ title?: string; children?: React.ReactNode }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "web"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>{children}</MainLayout>
    </>
  )
}

export default Layout
