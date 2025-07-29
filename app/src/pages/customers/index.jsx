import ClientTable from "../../components/table/ClientTable";
import DropDownButton from "../../components/buttons/DropDownButton";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { getCustomers } from "../../axios/ApiCalls";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import { useModal } from "../../contexts/ModalContext";
import { useArchiveCustomer } from "../../hooks/apiHooks/useCustomers";

const Customers = () => {
  const [search, setSearch] = useState("");
  const { openModal } = useModal();
  const { mutate: archiveCustomer } = useArchiveCustomer();

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

  const handleArchiveCustomer = (customerId) => {
    openModal("confirmDelete", {
      message: "Are you sure you want to archive this item?",
      onConfirm: () => {
        archiveCustomer({ customerId });
      },
    });
  };

  return (
    <ClientTable
      title="Customers"
      queryKeyPrefix="customers"
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
            <DropDownButton
              buttonLabel="Actions"
              options={[
                {
                  label: "Edit",
                  icon: <EditIcon />,
                  onClick: () => openModal("editCustomer", { customer: row }),
                },
                { divider: true },
                {
                  label: "Archive",
                  icon: <ArchiveIcon />,
                  onClick: () => handleArchiveCustomer(row.id),
                },
              ]}
            />
          ),
        },
      ]}
      actions={
        <>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            onClick={() => openModal("addCustomer")}
          >
            CUSTOMER
          </Button>
        </>
      }
      queryFn={getCustomers}
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

export default Customers;
