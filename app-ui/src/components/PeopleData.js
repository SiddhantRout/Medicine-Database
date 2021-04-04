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


const PersonTable = ({ 
    personData, 
    selected, setSelected 
}) => {
    const classes = useStyles();

    const selectedLength = selected === undefined ? 0 : selected.length;
    const dataLength = personData === undefined ? 0 : personData.length;
    const isSelected = (person_id) => selected === undefined ? false : selected.indexOf(person_id) !== -1;

    const handleSelectAll = (event) => {
        if (event.target.checked) {
            const newSelecteds = personData.map(n => n['person_id']);
            setSelected(personData.map(n => n['person_id']));
        } else {
            setSelected([]);
        }
    }

    const handleSelect = (event, person_id) => {
        // selected = selected === undefined ? [] : selected;
        const selectedIndex = selected.indexOf(person_id);
        var newSelected = [];
        // if (selectedIndex === -1 && selected === undefined) {
        //     newSelected = newSelected.concat(person_id);
        // } 
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, person_id);
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
                        <TableCell style={{ fontWeight: 700 }} width='20%' align='center'>Name</TableCell>
                        <TableCell style={{ fontWeight: 700 }} width='5%' align='center'>Age</TableCell>
                        <TableCell style={{ fontWeight: 700 }} align='center'>Medical History</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {personData.map(row => {
                        return (
                            <TableRow>
                                <TableCell padding='checkbox' width='4%' align='center'>
                                    <Checkbox
                                        checked={isSelected(row['person_id'])}
                                        onClick={event => handleSelect(event, row['person_id'])}
                                        disableRipple={true}
                                        size='small'
                                    />
                                </TableCell>
                                {/* <TableCell width='100px' align='center'>{row['person_id']}</TableCell> */}
                                <TableCell width='180px' align='center'>{row['name']}</TableCell>
                                <TableCell width='100px' align='center'>{row['age']}</TableCell>
                                <TableCell align='center'>{row['notes'] === '' || row['notes'] === null ? "--" : row['notes']}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default PersonTable;