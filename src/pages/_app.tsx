import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Loading} from "@/components/ui/loading/Loading";
import React, {createContext, useState} from 'react'
import GlobalProvider from "@/context/GlobalProvider";

export default function App({ Component, pageProps }: AppProps) {

  return (
    <>
      <GlobalProvider >
        <Component {...pageProps} />
        <Loading/>
      </GlobalProvider>
    </>
  )
}
