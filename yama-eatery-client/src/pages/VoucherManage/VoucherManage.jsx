import { Add, Delete, Edit, FileUpload, Menu } from '@mui/icons-material'
import {
    Avatar,
    Button,
    Chip,
    MenuItem,
    Paper,
    Stack,
    Tab,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material'
import React, { useMemo, useState } from 'react'
import logo from '@/assets/img/general/logo192.png'
import VoucherAdd from './VoucherAdd'
import CrudTableHead from '@/components/Crud Components/CrudTableHead'
import CrudTabs from '@/components/Crud Components/CrudTabs'
import CrudSearchBar from '@/components/Crud Components/CrudSearchBar'
import CrudMenuOptions from '@/components/Crud Components/CrudMenuOptions'
import CrudConfirmation from '@/components/Crud Components/CrudConfirmation'



const headCells = [
    {
        name: 'Voucher Name',
        orderData: 'name',
        numeric: false,
        widthPercent: 30,
    },
    {
        name: 'Expiration Date',
        orderData: 'expiredDate',
        numeric: false,
        widthPercent: 20,
    },
    {
        name: 'Reduced Percent',
        orderData: 'reducedPercent',
        numeric: true,
        widthPercent: 10,
    },
    {
        name: 'Max Reducing (VND)',
        orderData: 'maxReducing',
        numeric: true,
        widthPercent: 20,
    },
    {
        name: 'Status',
        orderData: 'quantity',
        numeric: false,
        widthPercent: 15,
    },
    {
        name: '',
        numeric: false,
        widthPercent: 5,
    },
]

function createData(id, image, name, expiredDate, reducedPercent, maxReducing, quantity) {
    return {
        id,
        image,
        name,
        expiredDate,
        reducedPercent,
        maxReducing,
        quantity,
    }
}

const rows = [
    createData(1, 'images/voucher1.jpg', 'Black Friday Voucher', '2024-11-25', 50, 200000, 100),
    createData(2, 'images/voucher2.jpg', 'Cyber Monday Voucher', '2024-12-02', 30, 150000, 200),
    createData(3, 'images/voucher3.jpg', 'Christmas Voucher', '2024-12-25', 40, 300000, 50),
]

// Helper functions for sorting
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

const VoucherManage = () => {
    const [order, setOrder] = useState('asc')
    const [orderBy, setOrderBy] = useState('name')
    const [page, setPage] = useState(0)
    const rowsPerPage = 10

    const [openAddPage, setOpenAddPage] = useState(false)

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

    const visibleRows = useMemo(
        () =>
            [...rows]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page]
    )
    // Add state to manage the selected percentage filter
    const [reducedPercentFilter, setReducedPercentFilter] = useState('All');

    // Function to handle filter changes
    const handleReducedPercentFilterChange = (event) => {
        setReducedPercentFilter(event.target.value);
    };
    // Filtering logic based on reduced percentage
    const filteredRows = useMemo(() => {
        if (reducedPercentFilter === 'All') {
            return rows; // No filtering, show all
        } else if (reducedPercentFilter === 'Less than 20%') {
            return rows.filter(row => row.reducedPercent < 20);
        } else if (reducedPercentFilter === '20% - 40%') {
            return rows.filter(row => row.reducedPercent >= 20 && row.reducedPercent <= 40);
        } else if (reducedPercentFilter === 'More than 40%') {
            return rows.filter(row => row.reducedPercent > 40);
        }
    }, [rows, reducedPercentFilter]);


    return (
        <Paper
            sx={{
                width: '1200px',
                padding: '1%',
                bgcolor: '#f0f2f5',
                zIndex: -1,
            }}
        >
            <Stack marginBottom={1} spacing={2}>
                <Typography variant="h5" fontWeight={'bold'}>
                    Voucher Management
                </Typography>

                <Stack direction={'row'} justifyContent={'space-between'} padding={'0 1%'}>
                    <CrudSearchBar
                        listItem={['Black Friday', 'Cyber Monday', 'Christmas']}
                        widthPercent={50}
                        handleChange={() => { }}
                    />
                    <React.Fragment>
                        <Button variant="contained" onClick={() => setOpenAddPage(true)} startIcon={<Add />}>
                            Add New Voucher
                        </Button>
                        {openAddPage && (
                            <VoucherAdd open={openAddPage} handleClose={() => setOpenAddPage(false)} />
                        )}
                    </React.Fragment>
                </Stack>

                <CrudTabs value={0} handleChange={() => { }}>
                    <Tab icon={<Menu />} iconPosition="start" label="All Vouchers" />
                </CrudTabs>
                <Typography variant="body1">Filter by Reduced Percent:</Typography>
                
            </Stack>
            

            <Paper sx={{ borderRadius: 3, overflow: 'auto' }}>
                <Table stickyHeader sx={{ minWidth: '750px' }}>
                    <CrudTableHead order={order} orderBy={orderBy} headCells={headCells} onRequestSort={handleRequestSort} />
                    <TableBody>
                        {visibleRows.map((row) => (
                            <TableRow hover key={row.id} sx={{ cursor: 'pointer' }}>
                                <TableCell>
                                    <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                        <Avatar src={row.image} />
                                        <p>{row.name}</p>
                                    </Stack>
                                </TableCell>
                                <TableCell>{row.expiredDate}</TableCell>
                                <TableCell align="right">{row.reducedPercent}%</TableCell>
                                <TableCell align="right">{row.maxReducing.toLocaleString()} VND</TableCell>
                                <TableCell>
                                    {row.quantity > 0 ? (
                                        <Chip label="Available" color="success" />
                                    ) : (
                                        <Chip label="Out of Stock" color="error" />
                                    )}
                                </TableCell>
                                <TableCell>
                                    <CrudMenuOptions>
                                        <MenuItem>
                                            <Button startIcon={<Edit />}>Update</Button>
                                        </MenuItem>
                                        <MenuItem>
                                            <CrudConfirmation
                                                title="Delete Confirmation"
                                                description="Are you sure you want to delete this voucher?"
                                                handleConfirm={() => alert('Deleted')}
                                            >
                                                {(handleOpen) => (
                                                    <Button onClick={handleOpen} startIcon={<Delete />}>
                                                        Remove
                                                    </Button>
                                                )}
                                            </CrudConfirmation>
                                        </MenuItem>
                                    </CrudMenuOptions>
                                </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component={'div'}
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                />
            </Paper>
        </Paper>
    )
}

export default VoucherManage
