import React, { useState } from 'react';
import PersonList from './PersonList';

import {
    Typography,
    TextField,
    Button,
    Grid,
    Select,
    MenuItem,
    Container,
    Box,
    Alert
} from '@mui/material';


const initialForm = { FirstName: '', LastName: '', Email: '', Phone: '', State: '', City: '' };


const PersonAdd = () => {
    const [person, setPerson] = useState(initialForm);
    const [people, setPeople] = useState([]);
    const [editingIndex, setEditingIndex] = useState(-1);
    const [errors, setErrors] = useState({});
    const [showwAlert, setShowAlert] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePhone = (phone) => {
        return /^\d{10}$/.test(phone);
    };

    const handleAddPerson = () => {

        if (!person.FirstName || !person.LastName || !person.Email || !person.Phone) {
            return;
        }

        let errorsObj = {};

        if (!validateEmail(person.Email)) {
            errorsObj = { ...errorsObj, Email: true };

        }

        if (!validatePhone(person.Phone)) {
            errorsObj = { ...errorsObj, Phone: true };

        }
    

        if (Object.keys(errorsObj).length > 0) {
            setShowAlert(true);
            return;
        } else {
            setErrors({});
            setPeople([...people, person]);
            setPerson(initialForm);
            setShowAlert(false);

        }

    };

    const handleEditPerson = (index) => {
        setPerson(people[index]);
        setEditingIndex(index);
    };

    const handleUpdatePerson = () => {
        const updatedPeople = [...people];
        updatedPeople[editingIndex] = person;
        setPeople(updatedPeople);
        setPerson(initialForm);
        setEditingIndex(-1);
    };

    const handleDeletePerson = (index) => {
        const updatedPeople = people.filter((_, i) => i !== index);
        setPeople(updatedPeople);
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        const temp = { ...person };
        temp[name] = value;
        if (name === 'FirstName' || name === 'LastName') {
            if (!/^[a-zA-Z]+$/.test(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Only letters are allowed',
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }
        } else if (name === 'Email') {
            if (!validateEmail(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Invalid email format',
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }
        } else if (name === 'Phone') {
            if (!validatePhone(value)) {
                setErrors({
                    ...errors,
                    [name]: 'Phone number must be 10 digits',
                });
            } else {
                setErrors({
                    ...errors,
                    [name]: '',
                });
            }
        }
        if (name === 'State') {
            if (value === "Maharashtra") {
                temp.City = "Mumbai";
            } else if (value === "Gujrat") {
                temp.City = "Ahemdabad"
            }
        }
        setPerson(temp)

    }
    console.log("this is error", errors);
    return (
        <div>
            {
                showwAlert && (
                    <Alert variant="filled" onClose={() => { setShowAlert(false) }} severity="error">
                        Please resolve the errors
                    </Alert>
                )
            }

            <Container>
                <Typography variant="h4" sx={{ color: '#e29c35' }}>Add / Edit Person</Typography>
                <Box sx={{ background: '#f5e5cd', p: 3, m: 3, border: "2px solid #f1cc95" }} >
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <TextField
                                label="First Name"
                                name='FirstName'
                                value={person.FirstName}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                error={!!errors.FirstName}
                                helperText={errors.FirstName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Last Name"
                                name='LastName'
                                value={person.LastName}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                error={!!errors.LastName}
                                helperText={errors.LastName}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Email"
                                name='Email'
                                value={person.Email}
                                onChange={(e) => handleChange(e)}
                                fullWidth

                                error={!!errors.Email}
                                helperText={errors.Email}
                            />
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Phone"
                                name='Phone'
                                value={person.Phone}
                                onChange={(e) => handleChange(e)}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                                fullWidth
                                error={!!errors.Phone}
                                helperText={errors.Phone}

                            />
                        </Grid>
                        <Grid item xs={4}>
                            {/* <InputLabel id="State-label">Age</InputLabel> */}
                            <Select
                                // labelId="State-label"
                                label="State"
                                name='State'
                                value={person.State}
                                onChange={(e) => handleChange(e)}
                                fullWidth
                                inputProps={{ shrink: "true" }}
                            >
                                <MenuItem selected value={"Maharashtra"}>Maharashtra</MenuItem>
                                <MenuItem value={"Gujrat"}>Gujrat</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="City"
                                name='City'
                                value={person.City}
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </Grid>
                </Box>

            </Container>

            {editingIndex === -1 ? (
                <Button variant="contained" sx={{ background: "#e29c35" }} onClick={handleAddPerson}>
                    Add
                </Button>
            ) : (
                <Button variant="contained" sx={{ background: "#e29c35" }} onClick={handleUpdatePerson}>
                    Update
                </Button>
            )}


            <Box sx={{ background: '#f5e5cd', p: 3, m: 3, border: "2px solid #f1cc95" }} >
                <PersonList people={people} handleDeletePerson={handleDeletePerson} handleEditPerson={handleEditPerson} />
            </Box>

        </div>
    );
};

export default PersonAdd;
