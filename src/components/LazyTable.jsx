/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Table, Stack, Paper, Pagination, Select,
} from '@mantine/core';

export default function LazyTable({
  route, columns, defaultPageSize, rowsPerPageOptions,
}) {
  const [data, setData] = useState([]);

  const [page, setPage] = useState(1); // 1 indexed
  const [pageSize, setPageSize] = useState(defaultPageSize ?? 10);

  useEffect(() => {
    fetch(`${route}?page=${page}&page_size=${pageSize}`)
      .then((res) => res.json())
      .then((resJson) => setData(resJson));
  }, [route, page, pageSize]);

  // const handleChangePage = (newPage) => {
  //   if (newPage < page || data.length === pageSize) {
  //     setPage(newPage + 1);
  //   }
  // };

  // const handleChangePageSize = (newPageSize) => {
  //   setPageSize(newPageSize);
  //   setPage(1);
  // };

  const defaultRenderCell = (col, row) => <div>{row[col.field]}</div>;

  // const handleChangePageSize = (value) => {
  //   const newPageSize = value;

  //   setPageSize(newPageSize);
  //   setPage(1);
  // };

  return (
    <Paper padding="md" mx={10} my={10} shadow={0}>
      <Table>
        <thead>
          <tr>
            {columns.map((col) => <th key={col.headerName}>{col.headerName}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {
                columns.map((col) => (
                  <td key={col.headerName}>
                    {col.renderCell ? col.renderCell(row) : defaultRenderCell(col, row)}
                  </td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </Table>

    </Paper>
  );
}
