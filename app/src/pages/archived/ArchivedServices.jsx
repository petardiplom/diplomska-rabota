import {
  Button,
  Box,
  TextField,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import api from "../../axios/axios";
import { useState } from "react";
import { useRestoreService } from "../../hooks/apiHooks/useServices";
import ClientTable from "../../components/table/ClientTable";
import { printPrice, printDate } from "../../utils/printUtils";
import { getArchivedServices } from "../../axios/ApiCalls";
import { useModal } from "../../contexts/ModalContext";

const ArchivedServices = () => {
  const { mutate: restoreService } = useRestoreService();
  const { openModal } = useModal();
  const [search, setSearch] = useState("");

  const filterServices = (row, filters) => {
    const search = filters.search?.toLowerCase() || "";
    const matchesSearch =
      !search ||
      row.name?.toLowerCase().includes(search) ||
      row.description?.toLowerCase().includes(search);

    return matchesSearch;
  };

  const handleRestoreService = (serviceId) => {
    openModal("confirmDelete", {
      message: "Are you sure you want to restore this service?",
      title: "Restore service",
      buttonTitle: "Restore",
      onConfirm: () => {
        restoreService({ serviceId });
      },
    });
  };

  return (
    <>
      <ClientTable
        title="Archived services"
        queryKeyPrefix="services_archived"
        filterFn={filterServices}
        columns={[
          { label: "ID", accessor: "id", sortable: true },
          {
            label: "Color",
            accessor: "color",
            render: (value) => (
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: value,
                  border: "1px solid #ccc",
                }}
              />
            ),
          },

          { label: "Name", accessor: "name", sortable: true },
          { label: "Description", accessor: "description" },
          {
            label: "Actions",
            accessor: "actions",
            render: (_, row) => (
              <Button
                size="small"
                variant="outlined"
                onClick={() => handleRestoreService(row.id)}
              >
                Restore
              </Button>
            ),
          },
        ]}
        queryFn={getArchivedServices}
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
        expandable
        expandIconPosition="left"
        expandRowBackground="#f0f7ff"
        fetchChildren={async (row) => {
          const res = await api.get(`/services/${row.id}/subservices`);
          return res.data;
        }}
        renderChildren={(children) => (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {children.map((child) => (
                <TableRow key={child.id}>
                  <TableCell>{child.id}</TableCell>
                  <TableCell>{child.name}</TableCell>
                  <TableCell>{child.description}</TableCell>
                  <TableCell>{printPrice(child.price)}</TableCell>
                  <TableCell>{printDate(child.created_at)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      />
    </>
  );
};

export default ArchivedServices;
