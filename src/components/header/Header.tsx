import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from 'next/link'
import {Button, MenuItem} from "@mui/material";
import { useRouter } from 'next/router';

export  const Header = () => {
  return (
    <>
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        ヘッダー
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} p="10px" gap={3}>
                        <Link href={'/todo'} passHref>Todo</Link>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        p: 1,
                        m: 1,
                        color: 'inherit',
                        borderRadius: 1,
                        textDecoration: 'none',
                    }}>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </>
  )
}
