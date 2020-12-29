import { createWatchCompilerHost } from "typescript";

interface userInfoI {
    name: string, 
    resumePath: string, 
    email: string, 
    phone: string, 
    currentCompany: string, 
    linkedinUrl: string, 
    twitterUrl: string, 
    githubUrl: string, 
    portfolioUrl: string, 
    otherUrl: string,
    workAuthorization: boolean, 
    countryOfCitizenship: string,
    salaryExpectation: string,
    graduationYear: string, 
};

const emptyUserInfo = (): userInfoI => ({
    name: "", 
    resumePath: "", 
    email: "", 
    phone: "", 
    currentCompany: "", 
    linkedinUrl: "", 
    twitterUrl: "", 
    githubUrl: "", 
    portfolioUrl: "", 
    otherUrl: "",
    workAuthorization: true, 
    countryOfCitizenship: "United States",
    salaryExpectation: "$0 /mo",
    graduationYear: "", 
});

const testUserInfo = (): userInfoI => ({
    name: "John Doe", 
    resumePath: "", 
    email: "john.doe@gmail.com", 
    phone: "123-456-7890", 
    currentCompany: "Acme Inc.", 
    linkedinUrl: "linkedin.com/john", 
    twitterUrl: "twitter.con/john", 
    githubUrl: "github.com/john", 
    portfolioUrl: "johnportfolio.com", 
    otherUrl: "john.com",
    workAuthorization: true, 
    countryOfCitizenship: "United States",
    salaryExpectation: "$4000 /mo",
    graduationYear: "2023", 
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"userInfo": testUserInfo()});
});

// Event listenter for keyboard shortcut that will submit the application 
chrome.commands.onCommand.addListener((command) => {

    // deal with the submit application command
    if (command == "Ctrl+j") {
        chrome.tabs.query({active: true, lastFocusedWindow:true}, (tabs) => {
            let url: string = tabs[0].url;
            if (url.includes("jobs.lever.co")) {
                // we need to ask the content script for the submit button element
                chrome.tabs.sendMessage(tabs[0].id, {msg: "getSubmitButton"}, (response) => {
                    response.submitButton.click();
                });
            }
        });
    }
});