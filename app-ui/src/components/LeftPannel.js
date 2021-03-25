import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    LeftPannel: {
        border: '1px solid green',
        width: '15%',
        // position: 'absolute'
        height: '93vh',
    }
}))

const LeftPannel = () => {
    const classes = useStyles();

    return (
        <div className={classes.LeftPannel}>
            {/* Left Pannel */}
        </div>
    )
}

export default LeftPannel;