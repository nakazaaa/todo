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

export type PostData = {
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

    const addTodo = useCallback((data: PostData)=> {
        dialog.set(false);
        loading.set(true);
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo';
        customAxios.post(url,data)
          .then(()=> {
            loading.set(true);
            getTodoList()
              loading.set(false);
          })
          .catch(()=> {
              loading.set(false);
          });
    },[title, text, time, status]) ;

    const getTodoList = useCallback(()=> {
          customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo')
          .then((response) => {
            setTodoList(response.data.todos);
            loading.set(false);
        })
  },[todoList]) ;

    return (
        <>
            <Box sx={{marginBottom:10}} className={todo.icon}>
                <Fab onClick={OpenDialog} color="primary" aria-label="add">
                    <AddIcon/>
                </Fab>
            </Box>
          <Box  className={todo.list}>
            <TodoList todoList={todoList}/>
          </Box>
            <Grid item xs={8}>
                <CustomDialog title={title} text={text} time={time} status={status} dialogTitle={'Todo追加'} type={'create'} collBack={addTodo} />
            </Grid>
        </>
    )
}
