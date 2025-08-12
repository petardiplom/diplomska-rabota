import ClientTable from "../../components/table/ClientTable";
import DropDownButton from "../../components/buttons/DropDownButton";
import { Box, Button, Chip, TextField } from "@mui/material";
import { useState } from "react";
import { getStaff } from "../../axios/ApiCalls";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import AddIcon from "@mui/icons-material/Add";
import SelectOption from "../../components/forms/SelectOption";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { useNavigate } from "react-router-dom";
import { useCenter } from "../../contexts/CenterContext";
import { useModal } from "../../contexts/ModalContext";

const getRoleColor = (role) => {
  if (role === "owner") {
    return "error"; //color
  }
  if (role === "manager") {
    return "primary";
  }

  if (role === "staff") {
    return "success";
  }

  return "secondary";
};

const Staff = () => {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");

  const { openModal } = useModal();

  const { centerId } = useCenter();

  const navigate = useNavigate();

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const filterStaff = (row, filters) => {
    const search = filters.search?.toLowerCase() || "";
    const matchesSearch =
      !search ||
      row.username?.toLowerCase().includes(search) ||
      row.email?.toLowerCase().includes(search);

    const matchesRole =
      filters.role === "all" ||
      (filters.role === "owner" && row.role === "owner") ||
      (filters.role === "manager" && row.role === "manager") ||
      (filters.role === "staff" && row.role === "staff");

    return matchesSearch && matchesRole;
  };

  return (
    <ClientTable
      title="Staff"
      queryKeyPrefix="staff"
      filterFn={filterStaff}
      actions={
        <>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            color="primary"
            onClick={() =>
              openModal("addStaff", {
                title: "Add staff",
              })
            }
          >
            STAFF
          </Button>
        </>
      }
      columns={[
        { label: "ID", accessor: "id", sortable: true },
        { label: "Name", accessor: "username", sortable: true },
        { label: "Email", accessor: "email", sortable: true },
        {
          label: "Role",
          accessor: "role",
          render: (val) => <Chip label={val} color={getRoleColor(val)} />,
        },
        {
          label: "Actions",
          accessor: "actions",
          render: (_, row) => (
            <DropDownButton
              buttonLabel="Actions"
              options={[
                {
                  label: "Schedule",
                  icon: <ScheduleIcon />,
                  onClick: () =>
                    navigate(`/centers/${centerId}/staff/${row.id}/schedule`),
                },
                {
                  label: "Edit",
                  icon: <EditIcon />,
                  //   onClick: () => openModal("editService", { service: row }),
                },
                { divider: true },
                {
                  label: "Archive",
                  icon: <ArchiveIcon />,
                  //   onClick: () => handleArchiveService(row.id),
                },
              ]}
            />
          ),
        },
      ]}
      queryFn={getStaff}
      filters={{ search, role }}
      customFilters={
        <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="small"
          />

          <Box sx={{ minWidth: "209px" }}>
            <SelectOption
              label="Role"
              value={role}
              onChange={handleRole}
              fullWidth
              options={[
                {
                  value: "all",
                  label: "All",
                },
                {
                  value: "owner",
                  label: "Owner",
                },
                {
                  value: "manager",
                  label: "Manager",
                },
                {
                  value: "staff",
                  label: "Staff",
                },
              ]}
            />
          </Box>
        </Box>
      }
    />
  );
};

export default Staff;
