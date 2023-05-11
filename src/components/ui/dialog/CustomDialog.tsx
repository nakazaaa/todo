import * as React from "react";
import {Button, DialogTitle, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import {useContext, useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";
import {dialogContext, loadingContext} from "@/pages/_app";
import {useRouter} from "next/router";
import {CustomButton} from "@/components/ui/button/CustomButton";
type Props = {
  title:string,
  text:string,
  time:number,
  status:number,
  dialogTitle:string,
  type:string,
}

type PostData = {
  title:string,
  text:string,
  time:number,
  status:number,
}

export  const CustomDialog = (props:Props) => {
  const {isOpenDialog,setIsOpenDialog} = useContext(dialogContext);
  const [IsDialogOpen, setIsDialogOpen] = useState(false)
  const [title,setTitle] = useState(props.title);
  const [text,setText] = useState(props.text);
  const [status,setStatus] = useState(props.status);
  const [time,setTime] = useState(props.time);
  const dialogTitle = props.dialogTitle;
  const router = useRouter();
  const {isOpenLoading,setIsOpenLoading} = useContext(loadingContext);

  useEffect(() => {
    setTitle(props.title);
    setText(props.text);
    setStatus(props.status);
    setTime(props.time);
  }, [props.title,props.text,props.status,props.time]);

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

  const CloseDialog = () => {
    setIsOpenDialog(false);
  }


  const EditTodo = () => {
    setIsDialogOpen(false);
    setIsOpenLoading(true);
    const PostData :PostData = {title:title,text:text,time:time,status:status}
    const url:string = process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+router.query.todo_id

    customAxios.post(url,PostData)
      .then((response) => {
        customAxios.get(process.env.NEXT_PUBLIC_API_HOST+'/api/todo/'+router.query.todo_id)
          .then((response) => {
            setIsOpenLoading(false);
          });
      })
      .catch(function (error) {console.log(error);});
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      open={isOpenDialog}>
      <DialogTitle bgcolor="secondary">
        {dialogTitle}
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
          rows={1}
          value={time}
          onChange={handleChangeTime}
        />
      </Stack>
      <CustomButton sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} color="error" onClick={CloseDialog}>Close</CustomButton>
      {(() => {
        if (props.type === 'update') {
          return <CustomButton sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} color="success" onClick={EditTodo}>Update</CustomButton>
        } else if (props.type === 'create') {
          // return <CustomButton  sx={{ marginLeft: 10 ,marginRight:10 ,marginBottom:5}} onClick={AddTodo}>Add</CustomButton>
        }
      })()}

    </Dialog>
  )
}
