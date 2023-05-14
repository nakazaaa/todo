import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Button, MenuItem, Stack} from "@mui/material";
import header from "./header.module.css";
import { useRouter } from 'next/router';
import customAxios from "@/lib/customAxios";
import Link from "next/link";
import sidebar from "@/components/ui/sidebar/sidebar.module.css";

export  const Sidebar = () => {
  return (
      <>
        <Box className={sidebar.sidebar}>
          <Stack>
            <Link  className={sidebar.link} href={`/todo`} passHref>
              todo
            </Link>
            <Link className={sidebar.link} href={`/status`} passHref>
              ステータス
            </Link>
          </Stack>
        </Box>
      </>
  )
}
