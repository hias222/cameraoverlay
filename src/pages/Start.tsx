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
                <Grid container spacing={5}>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="/overlay/start/left">
                            Pool left
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="/overlay/start/right">
                            Pool right
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="/overlay/finish/left">
                            Finish left
                    </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="outlined" color="primary" href="/overlay/finish/right">
                            Finish right
                    </Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );

}
