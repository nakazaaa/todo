import {Header} from "@/components/ui/header/Header";
import React, {ReactElement, useContext} from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import layout from "./layout.module.css";
import {Sidebar} from "@/components/ui/sidebar/Sidebar";

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
    <Box className={layout.layout}>
      <Header/>
        <Box className={layout.main}>
          <Sidebar/>
          <Box className={layout.contents}>
            {children}
          </Box>
        </Box>
    </Box>
  )
}
