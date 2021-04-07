import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';
import { CloseIcon } from '../assets';
import { MuiPickersUtilsProvider, KeyboardDatePicker, KeyboardTimePicker } from '@material-ui/pickers';
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

const AddDosageDialogBox = ({ setOpen, setFetchData, personList, medicineList }) => {
    const classes = useStyles();
    const [ personID, setPersonID ] = React.useState('');
    const [ person, setPerson ] = React.useState('');
    const [ medicine, setMedicine ] = React.useState('');
    const [ startDate, setStartDate ] = React.useState('');
    const [ endDate, setEndDate ] = React.useState('');
    const [ dose, setDose ] = React.useState('');
    const [ frequency, setFrequency ] = React.useState('');
    const [ time1, setTime1 ] = React.useState('');
    const [ time2, setTime2 ] = React.useState('');
    const [ time3, setTime3 ] = React.useState('');
    const [ notes, setNotes ] = React.useState('');
    const [ addButtonClicked, setAddButtonClicked ] = React.useState(false);    

    const handleClose = () => {
        setOpen(false);
    }

    const handleAddButton = () => {
        setAddButtonClicked(true)
        if(
            person !== '' &&
            medicine !== '' &&
            startDate !== '' &&
            endDate !== '' &&
            dose !== '' &&
            frequency !== ''
        ) {
            axios.post(
                `http://localhost:8080/Minor_Project/AddDosage`,
                {
                    person,
                    medicine,
                    startDate,
                    endDate,
                    dose,
                    frequency,
                    time1,
                    time2,
                    time3,
                    notes
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
        console.log(person, medicine, startDate, endDate, dose, frequency, time1, time2, time3, notes);
    }

    const handleClearButton = (event) => {
        setPerson('');
        setMedicine('');
        setStartDate('');
        setEndDate('');
        setDose('');
        setFrequency('');
        setTime1('');
        setTime2('');
        setTime3('');
        setNotes('');
    }

    const handlePerson = (event) => {
        setPerson(event.target.value)
        // setPersonID(personList.map(p => p['key'] == person)['value'])
        setAddButtonClicked(false)
    }

    const handleMedicine = (event) => {
        setMedicine(event.target.value)
        setAddButtonClicked(false)
    }

    const handleStartDate = (date) => {
        setStartDate(date)
        setAddButtonClicked(false)
    }

    const handleEndDate = (date) => {
        setEndDate(date)
        setAddButtonClicked(false)
    }

    const handleDose = (event) => {
        setDose(event.target.value)
        setAddButtonClicked(false)
    }

    const handleFrequency = (event) => {
        setFrequency(event.target.value)
        setAddButtonClicked(false)
    }

    const handleTime1 = (time) => {
        setTime1(time)
        setAddButtonClicked(false)
    }

    const handleTime2 = (time) => {
        setTime2(time)
        setAddButtonClicked(false)
    }

    const handleTime3 = (time) => {
        setTime3(time)
        setAddButtonClicked(false)
    }

    const handleNotes = (event) => {
        setNotes(event.target.value)
        setAddButtonClicked(false)
    }

    const isErrorPerson = person === '' && addButtonClicked;
    const isErrorMedicine = medicine === '' && addButtonClicked;
    const isErrorStartDate = startDate === '' && addButtonClicked;
    const isErrorEndDate = endDate === '' && addButtonClicked;
    const isErrorDose = dose === '' && addButtonClicked;
    const isErrorFrequency = frequency === '' && addButtonClicked;

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Add Dosage
                </div>
                <div className={classes.TopRightMenu}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>
            <div style={{ display : 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', paddingRight: '1rem' }}>
                    <div>
                        <div className={classes.AddLabels}>Person</div>
                        <div className={classes.AddLabels}>Medicine</div>
                        <div className={classes.AddLabels}>Start Date</div>
                        <div className={classes.AddLabels}>End Date</div>
                        <div className={classes.AddLabels}>Dose</div>
                        {/* <div className={classes.AddLabels}>Frequency</div> */}
                    </div>
                    <div>
                        <div style={{paddingTop: '1.5rem'}}>
                            <Select 
                                className={isErrorPerson ? classes.ErrorInputs : classes.AddInputs} 
                                disableUnderline={true}
                                onChange={handlePerson}
                                value={person}
                                // style={{ width: '150%' }}
                            >
                                {personList.map(p => {
                                    return (
                                        <MenuItem value={p['value']}>
                                            <div>{p['key']}</div>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{paddingTop: '1.5rem'}}>
                            <Select 
                                className={isErrorMedicine ? classes.ErrorInputs : classes.AddInputs} 
                                disableUnderline={true}
                                onChange={handleMedicine}
                                value={medicine}
                                // style={{ width: '150%' }}
                            >
                                {medicineList.map(m => {
                                    return (
                                        <MenuItem value={m}>
                                            <div>{m}</div>
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </div>
                        <div style={{paddingTop: '1.5rem', width: '100%'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={isErrorStartDate ? classes.ErrorInputs : classes.AddInputs}
                                    disableToolbar
                                    variant="inline"
                                    onChange={handleStartDate}
                                    format='dd/MM/yyyy'
                                    invalidDateMessage=''
                                    disablePast={true}
                                    style={{ width: '78%' }}
                                    value={startDate}
                                    InputProps={{
                                        disableUnderline: true,
                                        color: 'primary',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div style={{paddingTop: '1.5rem', width: '86%'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    className={isErrorEndDate ? classes.ErrorInputs : classes.AddInputs}
                                    disableToolbar
                                    variant="inline"
                                    onChange={handleEndDate}
                                    format='dd/MM/yyyy'
                                    invalidDateMessage=''
                                    disablePast={true}
                                    value={endDate}
                                    InputProps={{
                                        disableUnderline: true,
                                        color: 'primary',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        {/* <div style={{paddingTop: '1.5rem'}}>
                            <Input 
                                disableUnderline={true}
                                className={classes.AddInputs}
                                value={concentration}
                                onChange={(event) => handleConcentration(event)}
                            />
                        </div> */}
                        <div style={{paddingTop: '1.5rem', display: 'flex'}}>
                            <div style={{ width: '40%' }}>
                                <Input 
                                    disableUnderline={true}
                                    className={isErrorDose ? classes.ErrorInputs : classes.AddInputs}
                                    style={{ paddingRight: '0.1rem' }}
                                    value={dose}
                                    onChange={(event) => handleDose(event)}
                                />
                            </div>
                            <div >
                                <Select 
                                    className={isErrorFrequency ? classes.ErrorInputs : classes.AddInputs} 
                                    disableUnderline={true}
                                    onChange={handleFrequency}
                                    value={frequency}
                                    style={{ width: '160%' }}
                                >
                                    <MenuItem value="/day">
                                        <div>/day</div>
                                    </MenuItem>
                                    <MenuItem value="/week">
                                        <div>/week</div>
                                    </MenuItem>
                                </Select>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem', paddingLeft: '1rem' }}>
                    <div>
                        <div className={classes.AddLabels}>Time1</div>
                        <div className={classes.AddLabels}>Time2</div>
                        <div className={classes.AddLabels}>Time3</div>
                        <div className={classes.AddLabels}>Notes</div>
                    </div>
                    <div>
                        <div style={{paddingTop: '1.5rem'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className={classes.AddInputs}
                                    // disableToolbar
                                    variant="inline"
                                    onChange={handleTime1}
                                    // format='dd/MM/yyyy'
                                    invalidDateMessage=''
                                    style={{ width: '78%' }}
                                    value={time1}
                                    InputProps={{
                                        disableUnderline: true,
                                        color: 'primary',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div style={{paddingTop: '1.5rem'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className={classes.AddInputs}
                                    // disableToolbar
                                    variant="inline"
                                    onChange={handleTime2}
                                    // format='dd/MM/yyyy'
                                    invalidDateMessage=''
                                    style={{ width: '78%' }}
                                    value={time2}
                                    InputProps={{
                                        disableUnderline: true,
                                        color: 'primary',
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </div>
                        <div style={{paddingTop: '1.5rem'}}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    className={classes.AddInputs}
                                    // disableToolbar
                                    variant="inline"
                                    onChange={handleTime3}
                                    // format='dd/MM/yyyy'
                                    invalidDateMessage=''
                                    style={{ width: '78%' }}
                                    value={time3}
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
                                style={{ height: '5.5rem' }}
                                value={notes}
                                onChange={(event) => handleNotes(event)}
                            />
                        </div>
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

export default AddDosageDialogBox;