import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { CloseIcon } from '../assets';

const useStyles = makeStyles((theme) => ({
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

const EditDialogBox = ({ setOpen, setFetchData, selectedDetails }) => {
    const classes = useStyles();
    const [ personID, setPersonID ] = React.useState(selectedDetails[0]['person_id'])
    const [ name, setName ] = React.useState(selectedDetails[0]['name']);
    const [ age, setAge ] = React.useState(selectedDetails[0]['age']);
    const [ medicalHistory, setMedicalHistory ] = React.useState(selectedDetails[0]['notes']);

    const handleClose = () => {
        setOpen(false);
    }

    const handleEditButton = () => {
        axios.post(
            `http://localhost:8080/Minor_Project/EditPerson`,
            {
                personID,
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
        // console.log(personID, name, age, medicalHistory)
    }

    const handleClearButton = () => {
        setName(selectedDetails[0]['name']);
        setAge(selectedDetails[0]['age']);
        setMedicalHistory(selectedDetails[0]['notes']);
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleAge = (event) => {
        setAge(event.target.value)
    }

    const handleMedicalHistory = (event) => {
        setMedicalHistory(event.target.value)
    }

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Edit Person
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
                            className={classes.AddInputs}
                            // value={name}
                            onChange={(event) => handleName(event)}
                            placeholder={selectedDetails[0]['name']}
                        />
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            className={classes.AddInputs}
                            // value={age}
                            onChange={(event) => handleAge(event)}
                            placeholder={selectedDetails[0]['age']}
                        />
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            style={{ height: '7rem', verticalAlign: 'top' }}
                            className={classes.AddInputs}
                            multiline={true}
                            // value={medicalHistory}
                            onChange={(event) => handleMedicalHistory(event)}
                            placeholder={selectedDetails[0]['notes']}
                        />
                    </div>
                </div>
            </div>
            <div className={classes.ButtonBar} style={{ display: 'flex' }}>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button onClick={handleClearButton}>Clear</Button>
                </div>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button onClick={handleEditButton}>Edit</Button>
                </div>
            </div>
        </Paper>
    )
}

export default EditDialogBox;