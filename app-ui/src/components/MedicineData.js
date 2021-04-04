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


const MedicineTable = ({ 
    medicineData, 
    selected, setSelected 
}) => {
    const classes = useStyles();

    const selectedLength = selected === undefined ? 0 : selected.length;
    const dataLength = medicineData === undefined ? 0 : medicineData.length;
    const isSelected = (name) => selected === undefined ? false : selected.indexOf(name) !== -1;

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            // const newSelecteds = medicineData.map(n => n['name']);
            setSelected(medicineData.map(n => n['name']));
        } else {
            setSelected([]);
        }
        // console.log(selected)
    }

    const handleSelect = (event, name) => {
        // selected = selected === undefined ? [] : selected;
        const selectedIndex = selected.indexOf(name);
        var newSelected = [];
        // if (selectedIndex === -1 && selected === undefined) {
        //     newSelected = newSelected.concat(person_id);
        // } 
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
        <TableContainer className={classes.TableContainer} component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell padding='checkbox' align='center' style={{ width: '1%' }}>
                            <Checkbox
                                indeterminate={selectedLength > 0 && selectedLength < dataLength}
                                checked={dataLength > 0 && selectedLength === dataLength}
                                onClick={(event) => handleSelectAll(event)}
                                disableRipple={true}
                                size='small'
                            />
                        </TableCell>
                        <TableCell width='20%' align='center'>Name</TableCell>
                        <TableCell width='5%' align='center'>Concentration</TableCell>
                        <TableCell width='20%' align='center'>Quantity</TableCell>
                        <TableCell width='20%' align='center'>Expiry</TableCell>
                        <TableCell align='center'>Purpose</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicineData.map(row => {
                        return (
                            <TableRow>
                                <TableCell padding='checkbox'  align='center' style={{ width: '1%' }}>
                                    <Checkbox
                                        checked={isSelected(row['name'])}
                                        onClick={event => handleSelect(event, row['name'])}
                                        disableRipple={true}
                                        size='small'
                                    />
                                </TableCell>
                                <TableCell width='20%' align='center'>{row['name']}</TableCell>
                                <TableCell width='5%' align='center'>{row['concentration'] === null || row['concentration'] === '' ? "--" : row['concentration']}</TableCell>
                                <TableCell width='180px' align='center'>{row['quantity']} {row['unit']}</TableCell>
                                <TableCell width='20%' align='center'>{row['expiry']}</TableCell>
                                <TableCell align='center'>{row['purpose'] === null || row['purpose'] === '' ? "--" : row['purpose']}</TableCell> 
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MedicineTable;