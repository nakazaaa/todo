import * as React from "react";
import {Button, DialogTitle, MenuItem, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import {useCallback, useContext, useEffect, useState} from "react";
import customAxios from "@/lib/customAxios";
import {useRouter} from "next/router";
import {CustomButton} from "@/components/ui/button/CustomButton";
import {GlobalState} from "@/context/GlobalProvider";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {PostData} from "@/components/page/todo";

type Props = {
  title:string,
  text:string,
  time:number,
  status:number,
  dialogTitle:string,
  type:string,
  collBack:(data: PostData)=>void
}



export  const CustomDialog = (props:Props) => {

  const [title,setTitle] = useState(props.title);
  const [text,setText] = useState(props.text);
  const [status,setStatus] = useState(props.status);
  const [time,setTime] = useState(props.time);
  const dialogTitle = props.dialogTitle;
  const router = useRouter();
  const {loading,dialog} = useContext(GlobalState);
  const [todoList,setTodoList] = useState([]);

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

  const handleChangeStatus = (event: SelectChangeEvent<number>) => {
    const inputStatus = Number(event.target.value);
    setStatus(inputStatus);
  };

  const CloseDialog = () => {
    dialog.set(false);
  }

  const onSubmit = useCallback(() => {
    props.collBack({ title, text, time, status }) ;
  },[title, text, time, status, props.collBack]) ;

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%' } }}
      open={dialog.isOpen}
    >
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
        <Typography sx={{ margin: 1 }} variant="h6" gutterBottom>ステータス</Typography>
        <Select
            sx={{ margin: 4 }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={status}
            label="Age"
            onChange={handleChangeStatus}
        >
          <MenuItem value={0}>未対応</MenuItem>
          <MenuItem value={1}>処理中</MenuItem>
          <MenuItem value={2}>完了</MenuItem>
        </Select>
      </Stack>
      <CustomButton color="error" onClick={CloseDialog}>Close</CustomButton>
      <CustomButton color="success" onClick={onSubmit}>Update</CustomButton>
    </Dialog>
  )
}
