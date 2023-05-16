import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button, MenuItem} from "@mui/material";
import header from "./header.module.css";
import { useRouter } from 'next/router';
import customAxios from "@/lib/customAxios";
import Link from "next/link";

export  const Header = () => {

    const router = useRouter();
    const logout = () => {
        customAxios.post(process.env.NEXT_PUBLIC_API_HOST+'/api/logout')
            .then((response) => {
                router.push('/login');
            })
    }

  return (
    <>
      <header className={header.header}>
        <Typography className={header.logo}
                    variant="h6"
                    noWrap
        >
          <Link href={`/`} passHref>
            ヘッダー
          </Link>
        </Typography>
        <Box sx={{
          display: 'flex',
          flexDirection: 'row-reverse',
          p: 1,
          m: 1,
          color: 'inherit',
          borderRadius: 1,
          textDecoration: 'none',
        }}>
          <Button onClick={logout}   color="inherit" variant="text" >logout</Button>
        </Box>
      </header>
    </>
  )
}
