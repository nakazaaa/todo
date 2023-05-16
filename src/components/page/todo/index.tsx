import React, {SetStateAction, useCallback, useContext, useEffect, useState} from "react";
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
import todo from "./todo.module.css";
import {CustomDialog} from "@/components/ui/dialog/CustomDialog";

type PostData = {
    title:string,
    text:string,
    time:number,
    status:number,
}

export default function TodoPage() {

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [time, setTime] = useState(0);
    const [status, setStatus] = useState(0);
    const {loading,dialog} = useContext(GlobalState);
    const [todoList,setTodoList] = useState([]);

    useEffect(() =>{
        loading.set(true);
        getTodoList()
    },[]);

    const OpenDialog = () => {
        dialog.set(true)
    }

    const AddTodo = useCallback(()=> {
        dialog.set(false);
        loading.set(true);
        const PostData:PostData = {title:title,text:text,time:time,status:0};
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo';
        customAxios.post(url,PostData)
          .then(()=> {
            loading.set(true);
            getTodoList()
              loading.set(false);
          })
          .catch(()=> {
              loading.set(false);
          });
    },[]) ;

    const getTodoList = useCallback(()=> {
          customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo')
          .then((response) => {
            setTodoList(response.data.todos);
            loading.set(false);
        })
  },[todoList]) ;

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

    return (
        <>
            <Box sx={{marginBottom:10}} className={todo.icon}>
                <Fab onClick={OpenDialog} color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </Box>
            <TodoList todoList={todoList}/>
            <Grid item xs={8}>
                <CustomDialog title={title} text={text} time={time} status={status} dialogTitle={'Todo追加'} type={'create'} collBack={AddTodo} />
            </Grid>

        </>
    )
}
