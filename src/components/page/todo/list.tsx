import Link from 'next/link'
import {useEffect, useState} from "react";
import {Button, Card, CardContent} from '@mui/material'
import * as React from "react";
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';

export default function TodoList() {
    type TodoList = {
        id:number,
        title:string,
        text:string,
    }
    const [todoList,setTodoList] =useState([])
     useEffect(() =>{
         customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo').then((response) => {
                setTodoList(response.data.todos)
                console.dir(todoList)
            })
    },[])

    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ padding: 8 }} columns={{ xs: 2, sm: 8, md: 12 }}>
            {todoList.map((todo:TodoList,index) => (
                <Grid item xs={2} sm={4} md={3} key={index}>
                    <Link href={`/todo/${encodeURIComponent(todo.id)}`} passHref>
                        <Card sx={{ maxWidth: 345 }}>
                            <CardContent>
                                <h1>
                                    {todo.title}
                                </h1>
                                <Typography variant="body2" color="text.secondary">
                                    {todo.text}
                                </Typography>

                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
            ))}
            </Grid>
        </>
    )
}
