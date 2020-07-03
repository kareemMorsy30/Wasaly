import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const Card = ({children}) => {
    return (
        <Grid item xs={12} md={4} lg={12}>
            <Paper>
                {children}
            </Paper>
        </Grid>
    )
}

export default Card;