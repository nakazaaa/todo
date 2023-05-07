
import {Layout} from "@/components/ui/layout/Layout"
import {useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";;
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import {Button, Paper, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import Typography from "@mui/material/Typography";

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
    },[title,text])
  return (
      <Layout>

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

      </Layout>
  )
}
