import ClientTable from "../../components/table/ClientTable";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { getArchivedCustomers } from "../../axios/ApiCalls";
import { useModal } from "../../contexts/ModalContext";
import { useRestoreCustomer } from "../../hooks/apiHooks/useCustomers";

const ArchivedCustomers = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useModal();
  const { mutate: restoreCustomer } = useRestoreCustomer();

  const filterCustomers = (row, filters) => {
    const search = filters.search?.toLowerCase() || "";
    const matchesSearch =
      !search ||
      row.email?.toLowerCase().includes(search) ||
      row.firstname?.toLowerCase().includes(search) ||
      row.lastname?.toLowerCase().includes(search) ||
      row.phone?.toLowerCase().includes(search);

    return matchesSearch;
  };

  const handleRestoreCustomer = (customerId) => {
    openModal("confirmDelete", {
      message: "Are you sure you want to restore this customer?",
      title: "Restore customer",
      buttonTitle: "Restore",
      onConfirm: () => {
        restoreCustomer({ customerId });
      },
    });
  };

  return (
    <ClientTable
      title="Customers"
      queryKeyPrefix="customers_archived"
      filterFn={filterCustomers}
      columns={[
        { label: "ID", accessor: "id", sortable: true },
        { label: "Email", accessor: "email", sortable: true },
        { label: "Firstname", accessor: "firstname", sortable: true },
        { label: "Lastname", accessor: "lastname", sortable: true },
        { label: "Phone", accessor: "phone" },
        {
          label: "Actions",
          accessor: "actions",
          render: (_, row) => (
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleRestoreCustomer(row.id)}
            >
              Restore
            </Button>
          ),
        },
      ]}
      queryFn={getArchivedCustomers}
      filters={{ search }}
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
  );
};

export default ArchivedCustomers;
