import Link from 'next/link'
import {useEffect, useState} from "react";
import {Button, Card, CardContent} from '@mui/material'
import * as React from "react";
import customAxios from "@/lib/customAxios";
import Typography from "@mui/material/Typography";
import Grid from '@mui/material/Grid';
type TodoListDataEntity = {
  id:number,
  title:string,
  text:string,
}
type Props = {
  todoList:TodoListDataEntity[],
}
export default function TodoList(props:Props) {

    return (
        <>
            <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, md: 6 }}>
            {props.todoList.map((todo,index) => (
                <Grid item xs={2} key={index}>
                    <Link href={`/todo/${encodeURIComponent(todo.id)}`} passHref>
                        <Card sx={{ maxWidth: 345 }} >
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
