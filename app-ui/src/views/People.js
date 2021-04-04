import React from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import { PersonTable, AddPersonDialogBox, EditPersonDialogBox, DeletePersonDialogBox } from '../components';
import { Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    People: {
        width: '85%',
        // position: 'absolute',
        // left: '15%',
        padding: '15px',
        display: 'flex'
    },
    Appbar: {
        background: '#ffffff',
        width: '90%',
        top: '10%',
        left: '5%',
        // right: '2%'
        // boxShadow: 'none',
        // borderLeft: '1px solid black',
        // borderRight: '1px solid black',
        // borderTop: '1px solid black',
    },
    Button: {
        paddingLeft: '15px',
        paddingRight: '15px'
    },
    SearchBar: {
        position: 'absolute',
        right: '20px',
        border: '1px solid black',
        borderRadius: 10,
        paddingLeft: '10px'
    },
}))

const Bar = ({
    isOpenAddMenu, setIsOpenAddMenu,
    isOpenEditMenu, setIsOpenEditMenu,
    isOpenDeleteMenu, setIsOpenDeleteMenu,
    selected
}) => {
    const classes = useStyles();

    const handleAdd = () => {
        setIsOpenAddMenu(true);
        setIsOpenEditMenu(false);
        setIsOpenDeleteMenu(false);
    }

    const handleEdit = () => {
        setIsOpenAddMenu(false);
        setIsOpenEditMenu(true);
        setIsOpenDeleteMenu(false);
    }

    const handleDelete = () => {
        setIsOpenAddMenu(false);
        setIsOpenEditMenu(false);
        setIsOpenDeleteMenu(true);
    }

    const selectedLength = selected.length;

    return (
        <div className={classes.Appbar}>
            <div style={{ display: 'flex' }}>
                <Button 
                    className={classes.Button}
                    onClick={handleAdd}
                >
                    Add
                </Button>
                
                <Button 
                    className={classes.Button}
                    onClick={handleEdit}
                    disabled={selectedLength !== 1}
                >
                    Edit
                </Button>
                <Button 
                    className={classes.Button}
                    onClick={handleDelete}
                    disabled={selectedLength === 0}
                >
                    Delete
                </Button>
                <div className={classes.SearchBar}>
                    <Input
                        disableUnderline={true}
                        placeholder='Search'
                    />
                </div>
            </div>
        </div>
    )
}

const People = () => {
    const classes = useStyles();

    const [ personData, setPersonData ] = React.useState([]);
    const [ fetchData, setFetchData ] = React.useState(false);

    const [ isOpenAddMenu, setIsOpenAddMenu ] = React.useState(false);
    const [ isOpenEditMenu, setIsOpenEditMenu ] = React.useState(false);
    const [ isOpenDeleteMenu, setIsOpenDeleteMenu ] = React.useState(false);

    const [ selected, setSelected ] = React.useState([]);
    const [ selectedDetails, setSelectedDetails ] = React.useState([]);

    React.useEffect(() => {
        axios.get(`http://localhost:8080/Minor_Project/SendDataFromPeople`)
        .then((response) => {
            setPersonData((prev) => [...response.data]);
            if(fetchData) {
                setFetchData(false);
            }
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        })
    }, [ fetchData ])

    React.useEffect(() => {
        setSelectedDetails(personData.filter(row => selected.indexOf(row['person_id']) !== -1))
        console.log(selectedDetails)
    }, [ selected ])

    return (
        <div className={classes.People}>
            <div>
                <Bar
                    isOpenAddMenu={isOpenAddMenu} setIsOpenAddMenu={setIsOpenAddMenu}
                    isOpenEditMenu={isOpenEditMenu} setIsOpenEditMenu={setIsOpenEditMenu}
                    isOpenDeleteMenu={isOpenDeleteMenu} setIsOpenDeleteMenu={setIsOpenDeleteMenu}
                    selected={selected}
                />
            </div>
            <div>
                {
                    ((isOpenAddMenu || isOpenEditMenu || isOpenDeleteMenu) === false) ?
                        <PersonTable 
                            personData={personData} 
                            selected={selected} 
                            setSelected={setSelected}
                        /> :
                        isOpenAddMenu ?
                            <AddPersonDialogBox 
                                setOpen={setIsOpenAddMenu} 
                                setFetchData={setFetchData}
                            /> :
                            isOpenEditMenu ? 
                                <EditPersonDialogBox
                                    setOpen={setIsOpenEditMenu} 
                                    setFetchData={setFetchData}
                                    setSelected={setSelected}
                                    selectedDetails={selectedDetails}
                                /> : 
                                <DeletePersonDialogBox
                                    setOpen={setIsOpenDeleteMenu} 
                                    setFetchData={setFetchData}
                                    selected={selected}
                                    setSelected={setSelected}
                                />
                }
            </div>
        </div>
    )
}

export default People;