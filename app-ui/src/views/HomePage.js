import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Header, LeftPannel } from '../components';
import { People, Medicines } from '../views';

const useStyles = makeStyles((theme) => ({

}))

const HomePage = () => {
    const classes = useStyles();
    const [ headerValue, setHeaderValue ] = React.useState(0);

    return (
        <div>
            <Header value={headerValue} setValue={setHeaderValue} />
            <div style={{ display: 'flex' }}>
                {/* <LeftPannel/> */}
                {headerValue === 0 ? <People/> : <Medicines/>}
            </div>
        </div>
    )
}

export default HomePage;