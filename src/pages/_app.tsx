import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Loading} from "@/components/ui/loading/Loading";
import React, {createContext, useState} from 'react'

const [open, setOpen] = useState(false);
export const loadingContext = createContext<boolean>(open);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Loading/>
    </>

  )
}
