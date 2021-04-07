import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { Input, Paper, Button, IconButton } from '@material-ui/core';
import { Select, MenuItem } from '@material-ui/core';
import { CloseIcon } from '../assets';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
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

const EditDosageDialogBox = ({ setOpen, setFetchData, selectedDetails }) => {
    const classes = useStyles();
    const [ dosageID, setDosageID ] = React.useState(selectedDetails[0]['dosage_id'])
    const [ dose, setDose ] = React.useState(selectedDetails[0]['dose'])
    const [ frequency, setFrequency ] = React.useState(selectedDetails[0]['frequency'])
    const [ time1, setTime1 ] = React.useState(selectedDetails[0]['time1'])
    const [ time2, setTime2 ] = React.useState(selectedDetails[0]['time2'])
    const [ time3, setTime3 ] = React.useState(selectedDetails[0]['time3'])
    const [ notes, setNotes ] = React.useState(selectedDetails[0]['notes'])

    const handleClose = () => {
        setOpen(false);
    }

    const handleEditButton = () => {
        axios.post(
            `http://localhost:8080/Minor_Project/EditDosage`,
            {
                dosageID,
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
        // console.log(dose, frequency, time1, time2, time3, notes);
    }

    const handleClearButton = () => {
        setDose('');
        setFrequency('');
        setTime1('');
        setTime2('');
        setTime3('');
        setNotes('');
    }

    const handleDose = (event) => {
        setDose(event.target.value)
    }

    const handleFrequency = (event) => {
        setFrequency(event.target.value)
    }

    const handleTime1 = (time) => {
        setTime1(time)
    }

    const handleTime2 = (time) => {
        setTime2(time)
    }

    const handleTime3 = (time) => {
        setTime3(time)
    }

    const handleNotes = (event) => {
        setNotes(event.target.value)
    }

    return (
        <Paper className={classes.AddDialog}>
            <div style={{ padding: '0.5rem' }}>
                <div className={classes.DialogTitle}>
                    Edit Dosage
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
                        <div style={{paddingTop: '2rem'}}>
                            {selectedDetails[0]['person']}
                        </div>
                        <div style={{paddingTop: '2rem'}}>
                            {selectedDetails[0]['medicine']}
                        </div>
                        <div style={{paddingTop: '2rem', width: '100%'}}>
                        {selectedDetails[0]['start_date']}
                        </div>
                        <div style={{paddingTop: '2rem', width: '86%'}}>
                            {selectedDetails[0]['end_date']}
                        </div>
                        <div style={{paddingTop: '2rem', display: 'flex'}}>
                            <div style={{ width: '40%' }}>
                                <Input 
                                    disableUnderline={true}
                                    className={classes.AddInputs}
                                    style={{ paddingRight: '0.1rem' }}
                                    placeholder={selectedDetails[0]['dose']}
                                    // value={dose}
                                    onChange={(event) => handleDose(event)}
                                />
                            </div>
                            <div >
                                <Select 
                                    className={classes.AddInputs} 
                                    disableUnderline={true}
                                    onChange={handleFrequency}
                                    // value={frequency}
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
                                    placeholder={selectedDetails[0]['time1']}
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
                                    placeholder={selectedDetails[0]['time2']}
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
                                    placeholder={selectedDetails[0]['time3']}
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
                                placeholder={selectedDetails[0]['notes']}
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
                    <Button onClick={handleEditButton}>Edit</Button>
                </div>
            </div>
        </Paper>
    )
}

export default EditDosageDialogBox;