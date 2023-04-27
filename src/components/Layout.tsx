import {Header} from "@/components/header/Header";
import React, {ReactElement, useContext} from 'react'
type LayoutProps = Required<{
    readonly children: ReactElement
}>


export  const Layout = ({ children }: LayoutProps) => {
  return (
    <>
        <Header/>
        {children}
    </>
  )
}
