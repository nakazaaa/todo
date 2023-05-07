
import {Layout} from "@/components/ui/layout/Layout"
import {SetStateAction, useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import {Button, DialogTitle, Paper, Stack, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import {number} from "prop-types";

export default function index() {
    const [title,setTitle] =useState('')
    const [text,setText] =useState('')
    const [status,setStatus] =useState(0)
    const [time,setTime] =useState(0)
    const router = useRouter()
    const todo_id = router.query.todo_id;
    useEffect(() =>{
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+todo_id).then((response) => {
            setTitle(response.data.todo.title)
            setText(response.data.todo.text)
            setStatus(response.data.todo.status)
            setTime(response.data.todo.time)
        })
    },[])
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
        setIsDialogOpen(true)
    }

    const CloseDialog = () => {
        setIsDialogOpen(false)
    }

    const EditTodo = () => {
        const PostData = {title:title,text:text,time:time,status:0}
        const url = process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+todo_id
        customAxios.post(url,PostData)
            .then(function (response) {
                console.log(response);
                setIsDialogOpen(false)
                router.push('/todo');
                // window.location.reload()
            })
            .catch(function (error) {console.log(error);});
    }

  return (
      <Layout>
          <Button sx={{ margin: 2 }} onClick={OpenDialog}>編集</Button>
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
                              {status}
                          </Grid>
                          <Grid item xs={12}  alignItems="center">
                              <Typography variant="h6" gutterBottom>時間</Typography>
                              {time}
                          </Grid>
                      </Grid>
                  </Paper>
              </Box>
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
                  <Button onClick={EditTodo}>更新</Button>
              </Dialog>
          </Grid>
      </Layout>
  )
}
