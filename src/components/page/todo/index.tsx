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
import GlobalProvider, {GlobalState} from "@/context/GlobalProvider";
import Box from "@mui/material/Box";

export default function TodoPage() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }

    /* REVIEW 事情がない限りjsではシングルクォート('')を使用する */
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [time, setTime] = useState(0);
    const {loading,dialog} = useContext(GlobalState);
    const [todoList,setTodoList] = useState([]);

    useEffect(() =>{
        loading.set(true);
        getTodoList().then(() => {
            loading.set(false);
        });
    },[]);

    const OpenDialog = () => {
        dialog.set(true)
    }

    const CloseDialog = () => {
        dialog.set(false)
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

    /* REVIEW voidの使い方しかしてないのでvoidでいい */
    const AddTodo = async (): Promise<void> => {
        dialog.set(false);
        loading.set(true);
        const PostData:PostData = {title:title,text:text,time:time,status:0};
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo';
        await customAxios.post(url,PostData)
            .then(function () {
                getTodoList();
                loading.set(false);
            })
            .catch(function (error) {
                loading.set(false);
            });
    }


    return (
        <>
            <Box sx={{marginBottom:10}}>
                <Fab onClick={OpenDialog} color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </Box>

            <TodoList todoList={todoList}/>
            <Grid item xs={8}>
                {/*TODO ダイアログ統一化する*/}
                <Dialog
                  sx={{ '& .MuiDialog-paper': { width: '80%' } }}
                  open={dialog.isOpen}
                >
                    <DialogTitle bgcolor="secondary">
                        Todo追加
                    </DialogTitle>
                    {/* 
                    　　REVIEW
                       　　きつきつすぎるので少しpaddingを設ける
                         　CustomDialog.tsxと内容がかぶるのでコンポーネントでpropsで差分をつけられるようにする
                    */}
                    <Stack>
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
                        {/* 時間の単位がわかりづらいので予定時間（分）などで表記するか、以下などのようにする */}
                        {/* <Box>
                            <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>時間</Typography>
                            <Box display="flex" alignItems="end" textAlign="right">
                                <Input
                                    sx={{ margin: 2 }}
                                    type="number"
                                    inputProps={{
                                        min: '0',
                                        max: '999',
                                        style:{ textAlign: 'end' }
                                    }}
                                />
                                <Box lineHeight="4rem">分</Box>
                            </Box>
                        </Box>
 */}
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
