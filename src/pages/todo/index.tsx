import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {Layout} from "@/components/ui/layout/Layout";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function index() {
  return (
    <>
        <Layout>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>タイトル</TableCell>
                  <TableCell align="right">内容</TableCell>
                  <TableCell align="right">ステータス</TableCell>
                  <TableCell align="right">時間</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  // key={row.name}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    タイトル
                  </TableCell>
                  <TableCell align="right">内容</TableCell>
                  <TableCell align="right">ステータス</TableCell>
                  <TableCell align="right">時間</TableCell>

                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Layout>
    </>
  )
}
