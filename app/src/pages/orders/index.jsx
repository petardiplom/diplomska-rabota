import { Box, TextField, Chip } from "@mui/material";

import { useRef, useState } from "react";

import ClientTable from "../../components/table/ClientTable";
import { printPrice, printDateTime } from "../../utils/printUtils";
import { getOrders } from "../../axios/ApiCalls";

const Orders = () => {
  const tableRef = useRef();

  const [search, setSearch] = useState("");

  const filterOrders = (row, filters) => {
    const search = filters.search?.toLowerCase() || "";
    const matchesSearch =
      !search ||
      row.subservice_name?.toLowerCase().includes(search) ||
      row.customer_email?.toLowerCase().includes(search);

    return matchesSearch;
  };

  return (
    <>
      <ClientTable
        title="Orders"
        ref={tableRef}
        queryKeyPrefix="orders"
        filterFn={filterOrders}
        columns={[
          { label: "ID", accessor: "id", sortable: true },
          { label: "Subservice", accessor: "subservice_name" },
          {
            label: "Created at",
            accessor: "created_at",
            render: (val) => printDateTime(val),
            sortable: true,
          },
          {
            label: "Starts at",
            accessor: "start_time",
            render: (val) => printDateTime(val),
            sortable: true,
          },

          { label: "Customer", accessor: "customer_email" },
          { label: "Staff", accessor: "staff_email" },
          {
            label: "Price",
            accessor: "price",
            render: (val) => printPrice(val),
          },
          {
            label: "Type",
            accessor: "type",
            render: (val) => (
              <Chip
                label={val}
                variant="filled"
                color="secondary"
                size="small"
              />
            ),
          },
        ]}
        queryFn={getOrders}
        filters={{ search, status }}
        customFilters={
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <TextField
              label="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
            />
          </Box>
        }
      />
    </>
  );
};

export default Orders;
