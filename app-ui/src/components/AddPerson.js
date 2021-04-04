import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { CloseIcon } from '../assets';

const useStyles = makeStyles((theme) => ({
    // AddDialog: {
    //     minHeight: '70%', 
    //     maxHeight: '70%',
    //     minWidth: '90%',
    //     maxWidth: '90%',
    // },
    AddLabels: {
        paddingTop: '2rem',
        paddingRight: '4rem'
        // paddingLeft: '3rem',
    },
    AddInputs: {
        border: '1px solid black',
        borderRadius: 10,
        // padding: '1.2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        width: '90%'
    },
    ErrorInputs: {
        border: '1px solid red',
        borderRadius: 10,
        // padding: '1.2rem',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        width: '90%'
    },
    AddDialog: {
        position: 'absolute',
        top: '22%',
        width: '70%',
        left: '15%',
        height: '70%',
        // border: '1px solid black',
        borderRadius: 5,
    },
    TopRightMenu: {
        position: 'absolute',
        top: '1%',
        right: '1%'
    },
    DialogTitle: {
        fontSize: '1.5rem',
        fontWeight: 500
    },
    ButtonBar: {
        position: 'absolute',
        bottom: '1%',
        right: '1%',
    },
}))

const AddPersonDialogBox = ({ setOpen, setFetchData }) => {
    const classes = useStyles();
    const [ name, setName ] = React.useState('');
    const [ age, setAge ] = React.useState('');
    const [ medicalHistory, setMedicalHistory ] = React.useState('');
    const [ addButtonClicked, setAddButtonClicked ] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddButton = () => {
        setAddButtonClicked(true)
        if(
            name !== '' &&
            age !== ''
        ) {
            axios.post(
                `http://localhost:8080/Minor_Project/AddPerson`,
                {
                    name,
                    age,
                    medicalHistory,
                }
            )
            .then(response => {
                console.log(response)
                setFetchData(true)
                setOpen(false)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    const handleClearButton = () => {
        setName('');
        setAge('');
        setMedicalHistory('');
    }

    const handleName = (event) => {
        setName(event.target.value)
        setAddButtonClicked(false)
    }

    const handleAge = (event) => {
        setAge(event.target.value)
        setAddButtonClicked(false)
    }

    const handleMedicalHistory = (event) => {
        setMedicalHistory(event.target.value)
        setAddButtonClicked(false)
    }

    const isErrorName = name === '' && addButtonClicked;
    const isErrorAge = age === '' && addButtonClicked;

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Add Person
                </div>
                <div className={classes.TopRightMenu}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}>
                <div>
                    <div className={classes.AddLabels}>Name</div>
                    <div className={classes.AddLabels}>Age</div>
                    <div className={classes.AddLabels}>Medical History</div>
                </div>
                <div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            className={isErrorName ? classes.ErrorInputs : classes.AddInputs}
                            value={name}
                            onChange={(event) => handleName(event)}
                        />
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            className={isErrorAge ? classes.ErrorInputs : classes.AddInputs}
                            value={age}
                            onChange={(event) => handleAge(event)}
                        />
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            style={{ height: '7rem', verticalAlign: 'top' }}
                            className={classes.AddInputs}
                            multiline={true}
                            value={medicalHistory}
                            onChange={(event) => handleMedicalHistory(event)}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.ButtonBar} style={{ display: 'flex' }}>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button onClick={handleClearButton}>Clear</Button>
                </div>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button onClick={handleAddButton}>Add</Button>
                </div>
            </div>
        </Paper>
    )
}

export default AddPersonDialogBox;