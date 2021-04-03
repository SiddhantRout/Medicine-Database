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

const AddMedicineDialogBox = ({ setOpen, setFetchData }) => {
    const classes = useStyles();
    const [ name, setName ] = React.useState('');
    const [ concentration, setConcentration ] = React.useState('');
    const [ quantity, setQuantity ] = React.useState('');
    const [ unit, setUnit ] = React.useState('');
    const [ expiry, setExpiry ] = React.useState('');
    const [ purpose, setPurpose ] = React.useState('');
    const [ addButtonClicked, setAddButtonClicked ] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddButton = () => {
        setAddButtonClicked(true)
        if(
            name !== '' &&
            quantity !== '' &&
            unit !== '' &&
            expiry !== ''
        ) {
            axios.post(
                `http://localhost:8080/Minor_Project/AddMedicine`,
                {
                    name,
                    concentration,
                    quantity,
                    unit,
                    expiry,
                    purpose,
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
        // console.log(name, concentration, quantity, unit, expiry, purpose);
    }

    const handleClearButton = () => {
        setName('');
        setConcentration('');
        setQuantity('');
        setUnit('');
        setExpiry('');
        setPurpose('');
    }

    const handleName = (event) => {
        setName(event.target.value)
        setAddButtonClicked(false)
    }

    const handleConcentration = (event) => {
        setConcentration(event.target.value)
        setAddButtonClicked(false)
    }

    const handleQuantity = (event) => {
        setQuantity(event.target.value)
        setAddButtonClicked(false)
    }
    
    const handleUnit = (event) => {
        setUnit(event.target.value)
        setAddButtonClicked(false)
    }

    const handleExpiry = (date) => {
        setExpiry(date)
        setAddButtonClicked(false)
    }

    const handlePurpose = (event) => {
        setPurpose(event.target.value)
        setAddButtonClicked(false)
    }

    const isErrorName = name === '' && addButtonClicked;
    const isErrorQuantity = quantity === '' && addButtonClicked;
    const isErrorUnit = unit === '' && addButtonClicked;
    const isErrorExpiry = expiry === '' && addButtonClicked;

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Add Medicine
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
                            className={classes.AddInputs}
                            value={concentration}
                            onChange={(event) => handleConcentration(event)}
                        />
                    </div>
                    <div style={{paddingTop: '1.5rem', display: 'flex'}}>
                        <div style={{ width: '52%' }}>
                            <Input 
                                disableUnderline={true}
                                className={isErrorQuantity ? classes.ErrorInputs : classes.AddInputs}
                                style={{ paddingRight: '0.1rem' }}
                                value={quantity}
                                onChange={(event) => handleQuantity(event)}
                            />
                        </div>
                        <div >
                            <Select 
                                className={isErrorUnit ? classes.ErrorInputs : classes.AddInputs} 
                                disableUnderline={true}
                                onChange={handleUnit}
                                value={unit}
                                style={{ width: '150%' }}
                            >
                                <MenuItem value="tablet(s)">
                                    <div>tablet(s)</div>
                                </MenuItem>
                                <MenuItem value="ml">
                                    <div>ml</div>
                                </MenuItem>
                            </Select>
                        </div>
                    </div>
                    <div style={{paddingTop: '1.5rem', width: '86%'}}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                className={isErrorExpiry ? classes.ErrorInputs : classes.AddInputs}
                                disableToolbar
                                variant="inline"
                                onChange={handleExpiry}
                                format='dd/MM/yyyy'
                                invalidDateMessage=''
                                disablePast={true}
                                value={expiry}
                                InputProps={{
                                    disableUnderline: true,
                                    color: 'primary',
                                }}
                            />
                        </MuiPickersUtilsProvider>
                    </div>
                    <div style={{paddingTop: '1.5rem'}}>
                        <Input 
                            disableUnderline={true}
                            className={classes.AddInputs}
                            value={purpose}
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
                    <Button onClick={handleAddButton}>Add</Button>
                </div>
            </div>
        </Paper>
    )
}

export default AddMedicineDialogBox;