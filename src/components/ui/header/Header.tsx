import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link'
import {Button, MenuItem} from "@mui/material";
import { useRouter } from 'next/router';
import { alpha } from '@mui/material/styles';
import header from "./header.module.css";
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
export  const Header = () => {
  return (
    <>
        <header className={header.header}>
            <Typography className={header.logo}
                variant="h6"
                noWrap
                component="a"
                href="/"
            >
                ヘッダー
            </Typography>
            <ul className={header.ul}>
                <li className={header.li}>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/todo"
                >
                    todo
                </Typography>
                </li>
                {/*<li className={header.li}><a href="#">Menu 2</a></li>*/}
                {/*<li className={header.li}><a href="#">Menu 3</a></li>*/}
            </ul>
        </header>
        {/*<Box*/}
        {/*    component="header"*/}
        {/*    sx={{*/}
        {/*        backdropFilter: 'blur(6px)',*/}
        {/*        backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),*/}
        {/*        position: 'sticky',*/}
        {/*        left: {*/}
        {/*            lg: `${SIDE_NAV_WIDTH}px`*/}
        {/*        },*/}
        {/*        top: 0,*/}
        {/*        width: {*/}
        {/*            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`*/}
        {/*        },*/}
        {/*    }}*/}
        {/*>*/}
        {/*    test*/}
        {/*</Box>*/}
    </>
  )
}
