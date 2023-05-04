
import {Layout} from "@/components/ui/layout/Layout"
import {useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";;
import Box from "@mui/material/Box";
import { useRouter } from 'next/router'
import {Button, Paper, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";

export default function index() {
    const [title,setTitle] =useState('')
    const [text,setText] =useState('')
    const [status,setStatus] =useState(0)
    const router = useRouter()
    const todo_id = router.query.todo_id;
    useEffect(() =>{
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+todo_id).then((response) => {
            setTitle(response.data.todo.title)
            setText(response.data.todo.text)
            setStatus(response.data.todo.status)
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
                              {title}
                          </Grid>
                          <Grid item xs={12}>
                              {text}
                          </Grid>
                          <Grid item xs={12} justifyContent="center" alignItems="center">

                          </Grid>
                      </Grid>
                  </Paper>
              </Box>

      </Layout>
  )
}
