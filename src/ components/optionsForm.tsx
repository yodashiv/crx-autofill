import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, 
    InputLabel, makeStyles, MenuItem, Paper, RadioGroup, Select, TextField 
} from '@material-ui/core';
import {userInfoI} from "../chromeScripts/background";
import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';

const handleSave = (event: React.MouseEvent<HTMLButtonElement>, formValues: userInfoI) => {
    chrome.storage.sync.set({userInfo: formValues}, () => console.log("Set new values in chrome"))
    // chrome.runtime.sendMessage("fpbkaohbijpjlibbhfcfiidjebmkokfb", {msg: "there"}, (response) => {
    //     console.log(response);
    // });
    console.log("Put submit logic here");
}

const testUserInfo = (): userInfoI => ({
    name: "John Doe",
    email: "john.doe@gmail.com",
    phone: "123-456-7890",
    currentCompany: "Acme Inc.",
    linkedinUrl: "linkedin.com/john",
    twitterUrl: "twitter.con/john",
    githubUrl: "github.com/john",
    portfolioUrl: "johnportfolio.com",
    otherUrl: "john.com",
    workAuthorization: true,
    sponsorshipRequired: false,
    countryOfCitizenship: "United States",
    salaryExpectation: "$4000 /mo",
    graduationYear: "2023",
});


const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function OptionsForm(): JSX.Element {
    const classes = useStyles();

    let valueFromStorage: userInfoI = testUserInfo();
    const [formValues, setFormValues] = useState(valueFromStorage);

    console.log(formValues);

    useEffect(() => {
        chrome.storage.sync.get(["userInfo"], (result) => {
            setFormValues(result.userInfo);
            console.log("From the react effect hoook");
        })
    }, []);

    return (
    <form>
        <Paper style={{ padding: 16 }}>
        <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
            <TextField
                fullWidth
                required
                name="name"
                type="text"
                label="Full Name"
                value={formValues.name}
                onChange={(e) => setFormValues({...formValues, name:e.target.value})}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="email"
                fullWidth
                required
                type="email"
                label="Email"
                value={formValues.email}
                onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="phone"
                fullWidth
                type="text"
                label="Phone"
                value={formValues.phone}
                onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="currentCompany"
                fullWidth
                type="text"
                label="Current Company"
                value={formValues.currentCompany}
                onChange={(e) => setFormValues({ ...formValues, currentCompany: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="linkedinURL"
                fullWidth
                type="text"
                label="LinkedinUrl"
                value={formValues.linkedinUrl}
                onChange={(e) => setFormValues({ ...formValues, linkedinUrl: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="twitterURL"
                fullWidth
                type="text"
                label="TwitterUrl"
                value={formValues.twitterUrl}
                onChange={(e) => setFormValues({ ...formValues, twitterUrl: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="githubURL"
                fullWidth
                type="text"
                label="GithubUrl"
                value={formValues.githubUrl}
                onChange={(e) => setFormValues({ ...formValues, githubUrl: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="portfolioURL"
                fullWidth
                type="text"
                label="PortfolioUrl"
                value={formValues.portfolioUrl}
                onChange={(e) => setFormValues({ ...formValues, portfolioUrl: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="otherURL"
                fullWidth
                type="text"
                label="OtherUrl"
                value={formValues.otherUrl}
                onChange={(e) => setFormValues({ ...formValues, otherUrl: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="countryOfCitizenship"
                fullWidth
                type="text"
                label="Country of Citizenship"
                value={formValues.countryOfCitizenship}
                onChange={(e) => setFormValues({ ...formValues, countryOfCitizenship: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Authorized for work in U.S</InputLabel>
                    <Select
                        value={formValues.workAuthorization}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, workAuthorization: e.target.value == "true"})}
                    >
                        <MenuItem value={"true"}>True</MenuItem>
                        <MenuItem value={"false"}>False</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl className={classes.formControl}>
                    <InputLabel>Sponsorship Requried</InputLabel>
                    <Select
                        value={formValues.sponsorshipRequired}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormValues({ ...formValues, sponsorshipRequired: e.target.value == "true"})}
                    >
                        <MenuItem value={"true"}>True</MenuItem>
                        <MenuItem value={"false"}>False</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="salaryExpectation"
                fullWidth
                type="text"
                label="Salary Expectation"
                value={formValues.salaryExpectation}
                onChange={(e) => setFormValues({ ...formValues, salaryExpectation: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
                name="graduationYear"
                fullWidth
                type="text"
                label="Graduation Year"
                value={formValues.graduationYear}
                onChange={(e) => setFormValues({ ...formValues, graduationYear: e.target.value })}
            />
            </Grid>
            <Grid item xs={6}>
                <Button 
                variant="contained" 
                color="primary"
                onClick={(event) => handleSave(event, formValues)}
                >
                Save
                </Button>
            </Grid>
        </Grid>
        </Paper>
    </form>
    );
};

