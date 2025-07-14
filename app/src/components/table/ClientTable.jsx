import React, { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  CircularProgress,
  TableSortLabel,
  IconButton,
  Collapse,
  useTheme,
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useQuery } from "@tanstack/react-query";
import { useCenter } from "../../contexts/CenterContext";

export default React.forwardRef(function ClientTable(
  {
    columns,
    queryFn,
    queryKeyPrefix = "table",
    customFilters,
    filters = {},
    filterFn,
    rowsPerPageOptions = [5, 10],
    expandable = false,
    fetchChildren,
    renderChildren,
    expandIconPosition = "left",
  },
  ref
) {
  const { centerId } = useCenter();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(rowsPerPageOptions[0]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [childrenData, setChildrenData] = useState({});

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  const expandRowBackground = isDarkMode ? "#121212" : "#f1f1f1";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: [queryKeyPrefix, centerId],
    queryFn,
    keepPreviousData: true,
    enabled: !!centerId,
  });

  const handlePageChange = (_, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSort = (accessor) => {
    const col = columns.find((c) => c.accessor === accessor);
    if (!col?.sortable) return;

    if (sortBy === accessor) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(accessor);
      setSortOrder("asc");
    }
    setPage(0);
  };

  const handleRefetchChildren = async (rowId) => {
    console.log("CALLLED!!!");
    if (fetchChildren && expandedRowId === rowId) {
      const row = data.find((r) => r.id === rowId);
      if (row) {
        const children = await fetchChildren(row);
        setChildrenData((prev) => ({ ...prev, [rowId]: children }));
      }
    }
  };

  React.useImperativeHandle(ref, () => ({
    refetchChildren: handleRefetchChildren,
  }));

  const toggleExpand = async (row) => {
    const isExpanded = expandedRowId === row.id;
    setExpandedRowId(isExpanded ? null : row.id);

    if (!isExpanded && fetchChildren && !childrenData[row.id]) {
      const children = await fetchChildren(row);
      setChildrenData((prev) => ({ ...prev, [row.id]: children }));
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];

    if (typeof filterFn === "function") {
      return data.filter((row) => filterFn(row, filters));
    }

    return data;
  }, [data, filters, filterFn]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue == null) return 1;
      if (bValue == null) return -1;

      const comparison =
        typeof aValue === "number"
          ? aValue - bValue
          : aValue.toString().localeCompare(bValue.toString());

      return sortOrder === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortBy, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = page * limit;
    return sortedData.slice(start, start + limit);
  }, [sortedData, page, limit]);

  if (isLoading) {
    return (
      <Paper elevation={3}>
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress size={32} />
        </Box>
      </Paper>
    );
  }

  if (isError) {
    return (
      <Paper elevation={3}>
        <Box
          p={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <Box textAlign="center">
            <div>⚠️ Failed to load data.</div>
            <div style={{ fontSize: 14, color: "#666" }}>
              Please try again later.
            </div>
            <Box mt={2}>
              <button onClick={() => refetch()}>Retry</button>
            </Box>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper elevation={3}>
      <Box p={2}>
        {customFilters && <Box mb={2}>{customFilters}</Box>}

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {expandable && expandIconPosition === "left" && <TableCell />}
                {columns
                  .filter((col) => !col.hidden)
                  .map((col) => (
                    <TableCell
                      key={col.accessor}
                      sortDirection={
                        sortBy === col.accessor ? sortOrder : false
                      }
                    >
                      {col.sortable ? (
                        <TableSortLabel
                          active={sortBy === col.accessor}
                          direction={
                            sortBy === col.accessor ? sortOrder : "asc"
                          }
                          onClick={() => handleSort(col.accessor)}
                        >
                          {col.label}
                        </TableSortLabel>
                      ) : (
                        col.label
                      )}
                    </TableCell>
                  ))}
                {expandable && expandIconPosition === "right" && <TableCell />}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedData.length > 0 ? (
                paginatedData.map((row) => {
                  const isExpanded = expandedRowId === row.id;
                  return (
                    <React.Fragment key={row.id}>
                      <TableRow>
                        {expandable && expandIconPosition === "left" && (
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => toggleExpand(row)}
                            >
                              {isExpanded ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                          </TableCell>
                        )}
                        {columns
                          .filter((col) => !col.hidden)
                          .map((col) => (
                            <TableCell key={col.accessor}>
                              {col.render
                                ? col.render(row[col.accessor], row)
                                : row[col.accessor]}
                            </TableCell>
                          ))}
                        {expandable && expandIconPosition === "right" && (
                          <TableCell>
                            <IconButton
                              size="small"
                              onClick={() => toggleExpand(row)}
                            >
                              {isExpanded ? (
                                <KeyboardArrowUp />
                              ) : (
                                <KeyboardArrowDown />
                              )}
                            </IconButton>
                          </TableCell>
                        )}
                      </TableRow>

                      {isExpanded && childrenData[row.id] && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + (expandable ? 1 : 0)}
                            style={{
                              paddingBottom: 0,
                              paddingTop: 0,
                              background: expandRowBackground,
                            }}
                          >
                            <Collapse
                              in={true}
                              timeout={300}
                              collapsedSize={0}
                              unmountOnExit
                              appear
                            >
                              <Box sx={{ px: 2, py: 2 }}>
                                {childrenData[row.id]?.length === 0 ? (
                                  <Box
                                    color="text.secondary"
                                    textAlign="center"
                                  >
                                    No details available.
                                  </Box>
                                ) : (
                                  renderChildren(childrenData[row.id], row)
                                )}
                              </Box>
                            </Collapse>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (expandable ? 1 : 0)}
                    align="center"
                  >
                    <Box py={3} color="text.secondary">
                      No data found.
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={sortedData.length}
          page={page}
          onPageChange={handlePageChange}
          rowsPerPage={limit}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Box>
    </Paper>
  );
});
