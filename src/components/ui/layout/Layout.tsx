import {Header} from "@/components/ui/header/Header";
import React, {ReactElement, useContext} from 'react'
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import layout from "./layout.module.css";;

type LayoutProps = Required<{
    readonly children: ReactElement
}>
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Header/>
        <Box className={layout.layout}>
            {children}
        </Box>
    </div>
  )
}
