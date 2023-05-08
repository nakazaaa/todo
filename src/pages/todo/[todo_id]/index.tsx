import {Layout} from "@/components/ui/layout/Layout"
import {SetStateAction, useContext, useEffect, useState} from "react";
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
import {loadingContext} from "@/pages/_app";

export default function index() {
    type PostData = {
        title:string,
        text:string,
        time:number,
        status:number,
    }

    const [title,setTitle] = useState('');
    const [text,setText] = useState('');
    const [status,setStatus] = useState(0);
    const [time,setTime] = useState(0);
    const router = useRouter();
    const {open,setOpen} = useContext(loadingContext);
    useEffect(() =>{
        if (!router.isReady) {
            return;
        }
        const todo_id : string | string[] | undefined = router.query.todo_id;
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+todo_id).then((response) => {
            setOpen(true);
            setTitle(response.data.todo.title);
            setText(response.data.todo.text);
            setStatus(response.data.todo.status);
            setTime(response.data.todo.time);
            setOpen(false);
        })
    },[router]);
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
    const [IsDialogOpen, setIsDialogOpen] = useState(false)

    const OpenDialog = () => {
        setIsDialogOpen(true);
    }

    const CloseDialog = () => {
        setIsDialogOpen(false);
    }

    const EditTodo = () => {
        const PostData :PostData = {title:title,text:text,time:time,status:0}
        const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+router.query.todo_id
        customAxios.post(url,PostData)
          .then(function (response) {
              console.log(response);
              setIsDialogOpen(false);
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
                  {/*TODO ダイアログ統一化する*/}
                  <Dialog
                    sx={{ '& .MuiDialog-paper': { width: '80%' } }}
                          open={IsDialogOpen}>
                      <DialogTitle bgcolor="secondary">
                          Todo編集
                      </DialogTitle>
                      <Stack >
                          <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>タイトル</Typography>
                          <TextField sx={{ margin: 2 }}
                                     id="outlined-basic"
                                     variant="outlined"
                                     value={title}
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
                      <Button sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} color="error" onClick={CloseDialog}>Close</Button>
                      <Button sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} color="success" onClick={EditTodo}>Update</Button>
                  </Dialog>
              </Grid>
          </>
      </Layout>
    )
}
