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
const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;
export  const Header = () => {
  return (
    <>
        <Box
            component="header"
            sx={{
                backdropFilter: 'blur(6px)',
                backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                position: 'sticky',
                left: {
                    lg: `${SIDE_NAV_WIDTH}px`
                },
                top: 0,
                width: {
                    lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                },
            }}
        >
            test
        </Box>
    </>
  )
}
