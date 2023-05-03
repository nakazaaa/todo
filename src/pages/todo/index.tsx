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

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];
export default function index() {
  return (
    <>
        <Layout>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>testHead</TableCell>
                  <TableCell align="right">testHead</TableCell>
                  <TableCell align="right">testHead</TableCell>
                  <TableCell align="right">testHead</TableCell>
                  <TableCell align="right">testHead</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  // key={row.name}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    test
                  </TableCell>
                  <TableCell align="right">test</TableCell>
                  <TableCell align="right">test</TableCell>
                  <TableCell align="right">test</TableCell>
                  <TableCell align="right">test</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Layout>
    </>
  )
}
