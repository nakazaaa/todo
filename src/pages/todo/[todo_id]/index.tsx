import {Layout} from "@/components/ui/layout/Layout"
import {SetStateAction, useContext, useEffect, useMemo, useState} from "react";
import customAxios from "@/lib/customAxios";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import {Button, DialogTitle, Paper, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
import {dialogContext, loadingContext} from "@/pages/_app";
import {useMenu} from "@mui/base";
import {CustomDialog} from "@/components/ui/dialog/CustomDialog";

export default function index() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }
    const router = useRouter();
    const todoId = useMemo(()=> router.query.todo_id,[router]);
    const [title,setTitle] = useState('');
    const [text,setText] = useState('');
    const [status,setStatus] = useState(0);
    const [time,setTime] = useState(0);
    const {open,setOpen} = useContext(loadingContext);
    const {isOpenDialog,setIsOpenDialog} = useContext(dialogContext);
    useEffect(() =>{
        if (!router.isReady) {
            return;
        }
        setOpen(true);
        const todo_id : string | string[] | undefined = router.query.todo_id;
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+todo_id)
          .then((response) => {
            setTitle(response.data.todo.title);
            setText(response.data.todo.text);
            setStatus(response.data.todo.status);
            setTime(response.data.todo.time);
            setOpen(false);
        }).catch(()=>{
            setOpen(false);
          }
        )
    },[router.isReady,todoId]);
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
    const [IsDialogOpen, setIsDialogOpen] = useState(false)

    const OpenDialog = () => {
        setIsOpenDialog(true);
    }

    const CloseDialog = () => {
        setIsDialogOpen(false);
    }

    const EditTodo = () => {
        setIsDialogOpen(false);
        setOpen(true);
        const PostData :PostData = {title:title,text:text,time:time,status:0}
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+router.query.todo_id
        customAxios.post(url,PostData)
          .then(function (response) {
              console.log(response);
              setOpen(false);
              window.location.reload();
          })
          .catch(function (error) {console.log(error);});
    }

    let statusString = '';
    if (status === 1){
        statusString = '処理中'
    }else if (status === 2){
        statusString = '完了'
    }else if (status === 0){
        statusString = '未対応'
    }

    return (
      <Layout>
          <>
              <Fab onClick={OpenDialog} color="success" aria-label="edit">
                  <EditIcon />
              </Fab>
              <Box sx={{ marginTop: 8 }}>
                  <Paper
                    elevation={3}
                    sx={{
                        p: 4,
                        width: "400px",
                        m: "20px auto"
                    }}
                  >
                      <Grid container spacing={2} justifyContent="center" alignItems="center">
                          <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>タイトル</Typography>
                              {title}
                          </Grid>
                          <Grid item xs={12}>
                              <Typography variant="h6" gutterBottom>内容</Typography>
                              {text}
                          </Grid>
                          <Grid item xs={12}  alignItems="center">
                              <Typography variant="h6" gutterBottom>ステータス</Typography>
                              {statusString}
                          </Grid>
                          <Grid item xs={12}  alignItems="center">
                              <Typography variant="h6" gutterBottom>時間</Typography>
                              {time}分
                          </Grid>
                      </Grid>
                  </Paper>
              </Box>
              <Grid item xs={8}>
                  <CustomDialog title={title} text={text} time={time} status={status} />
              </Grid>
          </>
      </Layout>
    )
}
