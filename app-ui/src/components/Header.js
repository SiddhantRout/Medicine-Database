import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Logo } from '../assets';

const useStyles = makeStyles((theme) => ({
    Header: {
        // width: '85%',
        // position: 'relative',
        // left: '15%'
        display: 'flex',
    },
    AppName: {
        // padding: '0.70%',
        fontWeight: '700',
        fontSize: '18px',
        paddingLeft: '1%',
        paddingRight: '1%'
    },
    Tabs: {
        paddingTop: '1.5%',
        paddingLeft: '1%'
    }
}))

const Header = ({ value, setValue }) => {
    const classes = useStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log(newValue);
    }

    return (
        <Paper className={classes.Header}>
            <div className={classes.AppName}>
                {/* <Logo/> */}
                <img src={Logo}/>
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
                className={classes.Tabs}
            >
                {/* <Tab label="Dashboard" /> */}
                <Tab label="Dosage"/>
                <Tab label="People" />
                <Tab label="Medicines" />
            </Tabs>
        </Paper>
    )
}

export default Header;