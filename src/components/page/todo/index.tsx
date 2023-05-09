import React, {SetStateAction, useContext, useEffect, useState} from "react";
import {Button, DialogTitle, Grid, Stack, TextField} from '@mui/material'
import TodoList from "./list";
import Dialog from '@mui/material/Dialog';
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import {useRouter} from "next/router";
import Input from '@mui/material/Input';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {loadingContext} from "@/pages/_app";

export default function TodoPage() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }

    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState(0);
    const {open,setOpen} = useContext(loadingContext);
    const router = useRouter();
    const [todoList,setTodoList] = useState([]);
    const [IsDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() =>{
        setOpen(true);
        getTodoList().then(() => {
            setOpen(false);
        });
    },[]);

    const OpenDialog = () => {
        setIsDialogOpen(true)
    }

    const CloseDialog = () => {
        setIsDialogOpen(false)
    }

    const getTodoList = async (): Promise<void> => {
         await customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo')
          .then((response) => {
            setTodoList(response.data.todos);
        })
    };

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputTime = Number(event.target.value);
        setTime(inputTime);
    };

    const AddTodo = async (): Promise<void> => {
        setIsDialogOpen(false);
        setOpen(true);
        const PostData:PostData = {title:title,text:text,time:time,status:0};
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo';
        await customAxios.post(url,PostData)
            .then(function () {
                getTodoList();
                setOpen(false);
            })
            .catch(function (error) {
                  setOpen(false);
            });
    }


    return (
        <>
            <Fab onClick={OpenDialog} color="primary" aria-label="add">
                <AddIcon/>
            </Fab>
            <TodoList todoList={todoList}/>
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
