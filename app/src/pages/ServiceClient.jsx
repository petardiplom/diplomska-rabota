import { Button, Container, Box, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography, Table, TableBody, TableHead, TableRow, TableCell } from '@mui/material';
import api from '../axios/axios';
import { useState } from 'react';
import { useToggleService } from '../hooks/apiHooks/useServices';
import ClientTable from '../components/table/ClientTable';
import { printPrice, printDate } from '../utils/printUtils';
import { getServices } from '../axios/ApiCalls';
import DropDownButton from '../components/buttons/DropDownButton';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';

const ServiceClient = () => {

    const { mutate } = useToggleService();

    const [search, setSearch] = useState(undefined);
    const [status, setStatus] = useState('all'); // 'all' | 'active' | 'inactive'

    const filterServices = (row, filters) => {
        const search = filters.search?.toLowerCase() || '';
        const matchesSearch =
            !search ||
            row.name?.toLowerCase().includes(search) ||
            row.description?.toLowerCase().includes(search);

        const matchesStatus =
            filters.status === 'all' ||
            (filters.status === 'active' && row.active === true) ||
            (filters.status === 'inactive' && row.active === false);

        return matchesSearch && matchesStatus;
    };



    return (
        <>
            <ClientTable
                queryKeyPrefix="services"
                filterFn={filterServices}
                columns={[
                    { label: 'ID', accessor: 'id', sortable: true },
                    {
                        label: 'Color',
                        accessor: 'color',
                        render: (value) => (
                            <Box
                                sx={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    backgroundColor: value,
                                    border: '1px solid #ccc',
                                }}
                            />
                        ),
                    },

                    { label: 'Name', accessor: 'name', sortable: true },
                    { label: 'Description', accessor: 'description' },
                    {
                        label: 'Active',
                        accessor: 'active',
                        render: (value, row) => (
                            <Switch
                                checked={value}
                                onChange={() => {
                                    mutate({ serviceId: row.id, status: !value });
                                }}
                                color="primary"
                            />
                        ),
                    },
                    {
                        label: 'Actions',
                        accessor: 'actions',
                        render: (_, row) => (
                            <DropDownButton
                                buttonLabel="Actions"
                                options={[
                                    {
                                        label: 'Edit',
                                        icon: <EditIcon />,
                                        onClick: () => console.log('Edit clicked row', row),
                                    },
                                    { divider: true },
                                    {
                                        label: 'Archive',
                                        icon: <ArchiveIcon />,
                                        onClick: () => console.log('Archive clicked'),
                                    },
                                ]}
                            />
                        ),
                    },
                ]}
                queryFn={getServices}
                filters={{ search, status }}
                customFilters={(
                    <Box
                        display="flex"
                        alignItems="center"
                        gap={2} // adds horizontal space between elements (MUI v5+)
                        flexWrap="wrap" // responsive wrapping on smaller screens
                    >
                        <TextField
                            label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            size="small"
                        />
                        <ToggleButtonGroup
                            value={status}
                            exclusive
                            onChange={(_, val) => val && setStatus(val)}
                            size="small"
                            aria-label="status filter"
                        >
                            <ToggleButton value="all" aria-label="all statuses">All</ToggleButton>
                            <ToggleButton value="active" aria-label="active status">Active</ToggleButton>
                            <ToggleButton value="inactive" aria-label="inactive status">Inactive</ToggleButton>
                        </ToggleButtonGroup>
                    </Box>
                )}
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

export default ServiceClient;