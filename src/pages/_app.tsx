import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {Loading} from "@/components/ui/loading/Loading";
import React, {createContext, useState} from 'react'


export const loadingContext =  createContext({} as {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
})

export default function App({ Component, pageProps }: AppProps) {
    const [open, setOpen] = useState(false);
  return (
    <>
        <loadingContext.Provider value={{open, setOpen }}>
            <Component {...pageProps} />
            <Loading/>
        </loadingContext.Provider>

    </>

  )
}
