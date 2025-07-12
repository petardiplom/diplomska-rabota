import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  TablePagination, Paper, Box, CircularProgress, TableSortLabel
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

export default function ServerTable({
  columns,
  queryFn,
  queryKeyPrefix = 'table',
  customFilters,
  filters = {},
  rowsPerPageOptions = [5, 10, 25, 50],
}) {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(rowsPerPageOptions[0]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSort = (accessor) => {
    const col = columns.find(c => c.accessor === accessor);
    if (!col?.sortable) return;

    if (sortBy === accessor) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(accessor);
      setSortOrder('asc');
    }
    setPage(0); // reset to first page
  };

  console.log("FILTERS", filters);

  const { data, isLoading, isError } = useQuery({
    queryKey: [queryKeyPrefix, page, limit, filters, sortBy, sortOrder],
    queryFn: () => queryFn({ page, limit, filters, sortBy, sortOrder }),
    keepPreviousData: true,
  });

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(0);
  };

  const results = data?.results || [];
  const total = data?.total || 0;

  return (
    <Paper elevation={3}>
      <Box p={2}>
        {customFilters && (
          <Box mb={2}>
            {customFilters}
          </Box>
        )}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {columns.filter(col => !col.hidden).map(col => (
                  <TableCell
                    key={col.accessor}
                    sortDirection={sortBy === col.accessor ? sortOrder : false}
                  >
                    {col.sortable ? (
                      <TableSortLabel
                        active={sortBy === col.accessor}
                        direction={sortBy === col.accessor ? sortOrder : 'asc'}
                        onClick={() => handleSort(col.accessor)}
                      >
                        {col.label}
                      </TableSortLabel>
                    ) : (
                      col.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    <CircularProgress size={24} />
                  </TableCell>
                </TableRow>
              ) : isError ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    Error loading data.
                  </TableCell>
                </TableRow>
              ) : results.length > 0 ? (
                results.map((row, idx) => (
                  <TableRow key={idx}>
                    {columns.filter(col => !col.hidden).map(col => (
                      <TableCell key={col.accessor}>
                        {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center">
                    No data found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={total}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Box>
    </Paper>
  );
}