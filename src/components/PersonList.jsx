import React from 'react';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PersonList = ({ people, handleDeletePerson, handleEditPerson }) => {
   
    return (
        <div>
            <Typography variant="h4" sx={{color:'#e29c35'}}>Person List</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>

                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>State</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Actions</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {people.map((p, index) => (
                            <TableRow key={index}>
                                <TableCell>{p.FirstName}</TableCell>
                                <TableCell>{p.LastName}</TableCell>
                                <TableCell>{p.Email}</TableCell>
                                <TableCell>{p.Phone}</TableCell>
                                <TableCell>{p.State}</TableCell>
                                <TableCell>{p.City}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color='secondary' onClick={() => handleEditPerson(index)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" sx={{background:'#e29c35'}} onClick={() => handleDeletePerson(index)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default PersonList;
