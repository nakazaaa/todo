import axios from 'axios'
import {ChangeEvent, useContext, useState} from 'react'
import {Button, Card, Paper, TextField} from "@mui/material";
import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from 'next/router';
import {AuthInfoContext} from "@/lib/AuthContextProvider";

/* 
 * REVIEW
 * パスワードフォーカス時エンター押下でログインAPI発火してほしい
 * ログイン中がわかりづらいのでinputとbuttonをdisabledにしたりローディングを入れたりして整える
 */
export default function Login() {
    const router = useRouter();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const changeEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }
    const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }


    const [authInfo, setAuthInfo]  = useContext(AuthInfoContext)
    const loginAccessToken = () => {
        const data = {
            email:email,
            password:password,
        }
        axios.post(process.env.NEXT_PUBLIC_API_HOST+'/api/login', data)
            .then((response) => {
                localStorage.setItem('token', response.data.access_token);
                router.push('/todo');
            })
    }

    return (
        <>
            <Box sx={{ marginTop: 8 }}>
                <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        // height: "70vh",
                        width: "400px",
                        m: "20px auto"
                    }}
                >
                    <Grid container spacing={2} justifyContent="center" alignItems="center">

                        <Typography variant="h4" align="center" gutterBottom>
                            ログインフォーム
                        </Typography>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="メールアドレス"
                                name="email"
                                type="email"
                                autoComplete="email"
                                onChange={changeEmail}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                label="パスワード"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                onChange={changePassword}
                            />
                        </Grid>
                        <Grid item xs={12} justifyContent="center" alignItems="center">
                            <Button variant="contained" onClick={loginAccessToken}>
                                ログイン
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
        </>
    )
}
