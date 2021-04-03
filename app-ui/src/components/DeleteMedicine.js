import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { CloseIcon } from '../assets';

const useStyles = makeStyles((theme) => ({
    DeleteDialog: {
        position: 'absolute',
        top: '25%',
        width: '50%',
        left: '25%',
        height: '50%',
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
    DialogContent: {
        padding: '3rem'
    },
    ButtonBar: {
        position: 'absolute',
        bottom: '1%',
        right: '1%',
    },
}))

const DeleteMedicineDialogBox = ({ setOpen, setFetchData, selected, setSelected }) => {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteButton = () => {
        axios.post(
            `http://localhost:8080/Minor_Project/DeleteMedicine`, { selected }
        )
        .then(response => {
            console.log(response)
            setFetchData(true)
            setOpen(false)
            setSelected([])
        })
        .catch(error => {
            console.log(error)
        })
        // console.log(selected);
    }

    return (
        <Paper className={classes.DeleteDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Delete Medicine
                </div>
                <div className={classes.TopRightMenu}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
            <div className={classes.DialogContent}>
                <p>The details of the medicine once deleted will not be retrieved.</p>
                <p>Are you sure you want to remove this record?</p>
            </div>
            <div className={classes.ButtonBar} style={{ display: 'flex' }}>
                <div style={{ paddingRight: '20px', paddingBottom: '10px' }}>
                    <Button onClick={handleDeleteButton}>Confirm</Button>
                </div>
            </div>
        </Paper>
    )
}

export default DeleteMedicineDialogBox;