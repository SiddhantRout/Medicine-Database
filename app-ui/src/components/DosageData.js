import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Table, TableContainer, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import { Paper, Checkbox } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    TableContainer: {
        position: 'absolute',
        top: '22%',
        width: '90%',
        left: '5%',
        height: '70%',
        // boxShadow: 'none',
        // border: '1px solid black',
        // borderRight: '1px solid black',
        // borderRadius: 0
    },
}))


const DosageTable = ({ 
    dosageData, 
    selected, setSelected 
}) => {
    const classes = useStyles();

    const selectedLength = selected === undefined ? 0 : selected.length;
    const dataLength = dosageData === undefined ? 0 : dosageData.length;
    const isSelected = (dosage_id) => selected === undefined ? false : selected.indexOf(dosage_id) !== -1;

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // const newSelecteds = dosageData.map(n => n['dosage_id']);
            setSelected(dosageData.map(n => n['dosage_id']));
        } else {
            setSelected([]);
        }
    }

    const handleSelect = (event, dosage_id) => {
        // selected = selected === undefined ? [] : selected;
        const selectedIndex = selected.indexOf(dosage_id);
        var newSelected = [];
        // if (selectedIndex === -1 && selected === undefined) {
        //     newSelected = newSelected.concat(person_id);
        // } 
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, dosage_id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selectedLength - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
          );
        }
        // console.log(newSelected)
        setSelected(newSelected);
    }

    return (
        <TableContainer id='person-table' className={classes.TableContainer} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding='checkbox' width='4%' align='center'>
                            <Checkbox
                                indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                checked={dataLength > 0 && selectedLength === dataLength}
                                onClick={(event) => handleSelectAll(event)}
                                disableRipple={true}
                                size='small'
                            />
                        </TableCell>
                        {/* <TableCell width='10%' align='center'>Person ID</TableCell> */}
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Person</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Medicine</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Start Date</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>End Date</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Dose</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Time1</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Time2</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='10%' align='center'>Time3</TableCell>
                        <TableCell style={{ fontWeight: 700 }} align='center'>Notes</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dosageData.map(row => {
                        return (
                            <TableRow>
                                <TableCell padding='checkbox' width='4%' align='center'>
                                    <Checkbox
                                        checked={isSelected(row['dosage_id'])}
                                        onClick={event => handleSelect(event, row['dosage_id'])}
                                        disableRipple={true}
                                        size='small'
                                    />
                                </TableCell>
                                {/* <TableCell width='100px' align='center'>{row['person_id']}</TableCell> */}
                                <TableCell width='10%' align='center'>{row['person']}</TableCell>
                                <TableCell width='10%' align='center'>{row['medicine']}</TableCell>
                                <TableCell width='10%' align='center'>{row['start_date']}</TableCell>
                                <TableCell width='10%' align='center'>{row['end_date']}</TableCell>
                                <TableCell width='10%' align='center'>{row['dose']}{row['frequency']}</TableCell>
                                <TableCell width='10%' align='center'>{row['time1'] === '' || row['time1'] === null ? "---" : row['time1']}</TableCell>
                                <TableCell width='10%' align='center'>{row['time2'] === '' || row['time2'] === null ? "---" : row['time2']}</TableCell>
                                <TableCell width='10%' align='center'>{row['time3'] === '' || row['time3'] === null ? "---" : row['time3']}</TableCell>
                                <TableCell align='center'>{row['notes'] === '' || row['notes'] === null ? "--" : row['notes']}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default DosageTable;