import React from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    Header: {
        // width: '85%',
        // position: 'relative',
        // left: '15%'
        display: 'flex',
    },
    AppName: {
        padding: '0.70%',
        fontWeight: '700',
        fontSize: '18px',
        paddingLeft: '1%',
        paddingRight: '1%'
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
                Nigoni (Chuha, which means rat)
            </div>
            <Tabs
                value={value}
                onChange={handleChange}
            >
                {/* <Tab label="Dashboard" /> */}
                <Tab label="People" />
                <Tab label="Medicines" />
            </Tabs>
        </Paper>
    )
}

export default Header;