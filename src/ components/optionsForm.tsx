import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, 
    InputLabel, makeStyles, MenuItem, Paper, RadioGroup, Select, TextField 
} from '@material-ui/core';
import React from 'react';
import ReactDOM from 'react-dom';

const handleSubmit = () => {
    console.log("Put submit logic here");
}

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function OptionsForm() {
    const classes = useStyles();

    return (
    <form onSubmit={handleSubmit}>
        <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
            <TextField
                fullWidth
                required
                name="firstName"
                type="text"
                label="First Name"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                fullWidth
                required
                name="lastName"
                type="text"
                label="Last Name"
            />
            </Grid>
            <Grid item xs={12}>
            <TextField
                name="email"
                fullWidth
                required
                type="email"
                label="Email"
            />
            </Grid>
            <Grid item xs={12}>
            <FormControlLabel
                label="Employed"
                control={
                <Checkbox
                    name="employed"
                />
                }
            />
            </Grid>
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        // onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
        </Paper>
    </form>
    );
};

