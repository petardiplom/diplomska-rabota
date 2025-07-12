import { Button, Container, Box, Switch, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import ServerTable from '../components/table/ServerTable';
import { useCenters } from '../hooks/apiHooks/useCenters';
import api from '../axios/axios';
import { useDebounce } from '../utils/useDebounce';
import { useMemo, useState } from 'react';
import { useServices, useToggleService } from '../hooks/apiHooks/useServices';

export const getServices = async ({ page, limit, filters, sortBy, sortOrder }) => {
    const { search, status } = filters || {};
    const response = await api.get('/services', {
        params: {
            page: page + 1, // if your backend is 1-indexed
            limit,
            search,
            status,
            sortBy,
            sortOrder
        },
    });
    return response.data;
};



const Service = () => {
    // const { user, logout } = useAuth();

    const { mutate, isLoading, isError, error } = useToggleService();

    const [search, setSearch] = useState(undefined);
    const [status, setStatus] = useState('all'); // 'all' | 'active' | 'inactive'
    const debouncedSearch = useDebounce(search, 700);


    const filters = useMemo(() => ({
        search: debouncedSearch,
        status: status === 'all' ? undefined : status, // send undefined if "all" is selected
    }), [debouncedSearch, status]);

    return (
        <>
            <ServerTable
                queryKeyPrefix="services"
                columns={[
                    { label: 'Id', accessor: 'id', sortable: true },
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
                            <Button variant="outlined" size="small">
                                Actions
                                {/* You can add a Menu here if you want a real dropdown */}
                            </Button>
                        ),
                    },
                ]}
                queryFn={getServices}
                filters={filters}
                customFilters={(
                    <>
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
                    </>
                )}
            />
        </>
    );
};

export default Service;