import React, {SetStateAction, useState} from "react";
import {Button, DialogTitle, Grid, Stack, TextField} from '@mui/material'
import TodoList from "./list";
import Dialog from '@mui/material/Dialog';
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import Input from '@mui/material/Input';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function TodoPage() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }
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
        const PostData:PostData = {title:title,text:text,time:time,status:0}
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo'
        customAxios.post(url,PostData)
            .then(function (response) {
                console.log(response);
                setIsDialogOpen(false)
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
    };
    return (
        <>
            <Fab onClick={OpenDialog} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
            <TodoList/>
            <Grid item xs={8}>
                {/*TODO ダイアログ統一化する*/}
                <Dialog
                  sx={{ '& .MuiDialog-paper': { width: '80%' } }}
                  open={IsDialogOpen}
                >
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
                    <Button sx={{ marginLeft: 10 ,marginRight:10,marginBottom:2}} color="error"  onClick={CloseDialog}>Close</Button>
                    <Button sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} onClick={AddTodo}>Add</Button>
                </Dialog>
            </Grid>

        </>
    )
}
