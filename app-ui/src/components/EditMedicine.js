import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';
import { CloseIcon } from '../assets';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

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

const EditMedicineDialogBox = ({ setOpen, setFetchData, selectedDetails }) => {
    const classes = useStyles();
    const [ name, setName ] = React.useState(selectedDetails[0]['name']);
    const [ concentration, setConcentration ] = React.useState(selectedDetails[0]['concentration']);
    const [ quantity, setQuantity ] = React.useState(selectedDetails[0]['quantity']);
    const [ unit, setUnit ] = React.useState(selectedDetails[0]['unit']);
    const [ expiry, setExpiry ] = React.useState(selectedDetails[0]['expiry']);
    const [ purpose, setPurpose ] = React.useState(selectedDetails[0]['purpose']);

    const handleClose = () => {
        setOpen(false);
    }

    const handleEditButton = () => {
        axios.post(
            `http://localhost:8080/Minor_Project/EditMedicine`,
            {
                name, 
                // concentration,
                quantity,
                // unit,
                // expiry,
                purpose
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
        // console.log(name, concentration, quantity, unit, expiry, purpose);
    }

    const handleClearButton = () => {
        setName(selectedDetails[0]['name']);
        setConcentration(selectedDetails[0]['concentration']);
        setQuantity(selectedDetails[0]['quantity']);
        setUnit(selectedDetails[0]['unit']);
        setExpiry(selectedDetails[0]['expiry']);
        setPurpose(selectedDetails[0]['purpose']);
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleConcentration = (event) => {
        setConcentration(event.target.value)
    }

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
    }
    
    const handleUnit = (event) => {
        setUnit(event.target.value)
    }

    const handleExpiry = (date) => {
        setExpiry(date)   
    }

    const handlePurpose = (event) => {
        setPurpose(event.target.value)
    }

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Edit Medicine
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
                    <div className={classes.AddLabels}>Concentration</div>
                    <div className={classes.AddLabels}>Quantity</div>
                    <div className={classes.AddLabels}>Expiry</div>
                    <div className={classes.AddLabels}>Purpose</div>
                </div>
                <div>
                    <div style={{paddingTop: '2rem'}}>
                        {/* <Input 
                            disableUnderline={true}
                            className={classes.AddInputs}
                            placeholder={selectedDetails[0]['name']}
                            // value={name}
                            onChange={(event) => handleName(event)}
                        /> */}
                        {name}
                    </div>
                    <div style={{paddingTop: '2rem'}}>
                        {/* <Input 
                            disableUnderline={true}
                            className={classes.AddInputs}
                            placeholder={selectedDetails[0]['concentration']}
                            // value={concentration}
                            onChange={(event) => handleConcentration(event)}
                        /> */}
                        {concentration === null ? "--" : concentration}
                    </div>
                    <div style={{paddingTop: '1.5rem', display: 'flex'}}>
                        <div style={{ width: '52%' }}>
                            <Input 
                                disableUnderline={true}
                                className={classes.AddInputs}
                                style={{ paddingRight: '0.1rem' }}
                                placeholder={selectedDetails[0]['quantity']}
                                // value={quantity}
                                onChange={(event) => handleQuantity(event)}
                            />
                        </div>
                        <div style={{ paddingTop: '0.2rem' }}>
                            {/* <Select 
                                className={classes.AddInputs} 
                                disableUnderline={true}
                                onChange={handleUnit}
                                placeholder={selectedDetails[0]['unit']}
                                // value={unit}
                                style={{ width: '150%', border: '1px solid black' }}
                            >
                                <MenuItem value="tablet(s)">
                                    <div>tablet(s)</div>
                                </MenuItem>
                                <MenuItem value="ml">
                                    <div>ml</div>
                                </MenuItem>
                            </Select> */}
                            {unit}
                        </div>
                    </div>
                    <div style={{paddingTop: '1.8rem', width: '86%'}}>
                        {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={classes.AddInputs}
                                disableToolbar
                                variant="inline"
                                onChange={handleExpiry}
                                format='dd/MM/yyyy'
                                invalidDateMessage=''
                                disablePast={true}
                                emptyLabel={expiry}
                                value={expiry}
                                InputProps={{
                                    disableUnderline: true,
                                    color: 'primary',
                                }}
                            />
                        </MuiPickersUtilsProvider> */}
                        {expiry}
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            className={classes.AddInputs}
                            // value={purpose}
                            placeholder={selectedDetails[0]['purpose']}
                            onChange={(event) => handlePurpose(event)}
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

export default EditMedicineDialogBox;