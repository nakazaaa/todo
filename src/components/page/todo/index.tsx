import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../../../nextjs-container/my-app/src/styles/Home.module.css'
import Link from 'next/link'
import ButtonBase from '../../../../../nextjs-container/my-app/src/components/ui/button/button'
import React, {SetStateAction, useState} from "react";
import {Button, DialogTitle, Grid, Stack, TextField} from '@mui/material'
import TodoList from "./list";
import Box from "@mui/material/Box";
import Dialog from '@mui/material/Dialog';
import axios from "axios";
import customAxios from "../../../../../nextjs-container/my-app/src/lib/customAxios";
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/material/Input';
import {number} from "prop-types";

export default function TodoPage() {
    const [IsDialogOpen, setIsDialogOpen] = useState(false)

    const OpenDialog = () => {
        setIsDialogOpen(true)
    }

    const CloseDialog = () => {
        setIsDialogOpen(false)
    }
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState(0);
    const router = useRouter();
    const AddTodo = () => {
        const PostData = {title:title,text:text,time:time,status:0}
        const url = process.env.NEXT_PUBLIC_API_HOST+'/api/todo'
        customAxios.post(url,PostData)
            .then(function (response) {
                console.log(response);
                setIsDialogOpen(false)
                // router.push('/todo');
                window.location.reload()
            })
            .catch(function (error) {console.log(error);});
    }

    const handleChangeTitle = (event: { target: { value: SetStateAction<string> } }) => {
        setTitle(event.target.value);
    };

    const handleChangeText = (event: { target: { value: SetStateAction<string> } }) => {
        setText(event.target.value);
    };

    const handleChangeTime = (event: { target: { value: SetStateAction<number> } }) => {
        setTime(event.target.value);
        return time;
    };
    return (
        <>
            {/*<ButtonBase ></ButtonBase>*/}
            <Button sx={{ margin: 2 }} onClick={OpenDialog}>追加</Button>
            <TodoList/>
            <Grid item xs={8}>
                <Dialog open={IsDialogOpen}>
                    <DialogTitle bgcolor="secondary">
                        Todo追加
                    </DialogTitle>
                    <Stack >
                        <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>タイトル</Typography>
                        <TextField sx={{ margin: 2 }}
                                   id="outlined-basic"
                                   variant="outlined"
                                   value={title}
                                   onFocus={(event) => event.target.select()} // select()を呼ぶことで、フォーカス時に文字列が自動的に選択されるようになる。
                                   onChange={handleChangeTitle}
                        />
                        <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>内容</Typography>
                        <TextField
                            sx={{ margin: 2 }}
                            id="filled-textarea"
                            multiline
                            variant="filled"
                            rows={4}
                            value={text}
                            onChange={handleChangeText}
                        />
                        <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>時間</Typography>
                        <Input
                            sx={{ margin: 2 }}
                            multiline
                            type="number"
                            variant="filled"
                            rows={1}
                            value={time}
                            onChange={handleChangeTime}
                        />
                    </Stack>
                    <Button onClick={CloseDialog}>Close</Button>
                    <Button onClick={AddTodo}>Add</Button>
                </Dialog>
            </Grid>

        </>
    )
}
