import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useSelector } from 'react-redux';
import { selectLogList } from '@/store/selectors';
interface Column {
  id: 'name' | 'price' | 'from' | 'to' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Event', minWidth: 100 },
  { id: 'price', label: 'Price', minWidth: 100 },
  { id: 'from', label: 'From', minWidth: 100 },
  { id: 'to', label: 'To', minWidth: 100 },
  { id: 'date', label: 'Date', minWidth: 100 },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

export default function StickyHeadTable() {
  const eventList = useSelector(selectLogList);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const get_date_of_last_n_days_from_today = (n: any) => {
    const date = new Date(n * 1000);
    const pad = (n: any) => n.toString().padStart(2, '0');

    const yyyy = date.getFullYear(),
      mm = pad(date.getMonth() + 1),
      dd = pad(date.getDate());

    return `${yyyy}-${mm}-${dd}`;
  }
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, zIndex: 0 }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {eventList
              // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, key: any) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                    {columns.map((column) => {
                      let value = row[column.id];
                      if (column.id == 'price' && value) value = value / 1e18;
                      if (column.id == 'from' && value) value = value.substring(0, 15) + '...' + value.substring(value.length - 8);
                      if (column.id == 'to' && value) value = value.substring(0, 15) + '...' + value.substring(value.length - 8);
                      if (column.id == 'date' && value) value = get_date_of_last_n_days_from_today(value);

                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
