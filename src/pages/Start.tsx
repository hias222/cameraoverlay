import { Button, Container, Grid, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(3),
        },
    },
}));



export default function Display() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Container maxWidth="sm">
                <Grid container>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="overlay/left">
                            Pool left
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="overlay/right">
                            Pool right
                    </Button>
                    </Grid>
                </Grid>

            </Container>
        </div>
    );

}
