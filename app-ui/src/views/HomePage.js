import React from 'react';
import { Header, LeftPannel } from '../components';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}))

const HomePage = () => {
    const classes = useStyles();
    const [ headerValue, setHeaderValue ] = React.useState(0);

    return (
        <div>
            <Header value={headerValue} setValue={setHeaderValue} />
            <LeftPannel/>
        </div>
    )
}

export default HomePage;