import {userInfoI} from "./background";

const setNodeValue = (elem: HTMLElement | undefined, value: string) => {
    if (elem) {
        elem.setAttribute("autocomplete", "off");
        elem.setAttribute("value", value);
    }
};

// Autofill values 
const autoFillValuesLever = (userInfo: userInfoI) => {
    //Automatically click the resume upload button for the user
    // let resumeButton: HTMLInputElement = document.getElementById("resume-upload-input") as HTMLInputElement;
    // resumeButton.click();

    //fill out links
    let linkedinBox: HTMLElement | undefined = document.getElementsByName("urls[LinkedIn]")[0];
    setNodeValue(linkedinBox, userInfo.linkedinUrl);
    let twitterBox: HTMLElement | undefined = document.getElementsByName("urls[Twitter]")[0];
    setNodeValue(twitterBox, userInfo.twitterUrl);
    let githubBox: HTMLElement | undefined = document.getElementsByName("urls[GitHub]")[0];
    setNodeValue(githubBox, userInfo.githubUrl);
    let portfolioBox: HTMLElement | undefined = document.getElementsByName("urls[Portfolio]")[0];
    setNodeValue(portfolioBox, userInfo.portfolioUrl);
    let otherUrlBox: HTMLElement | undefined = document.getElementsByName("urls[Other]")[0];
    setNodeValue(otherUrlBox, userInfo.otherUrl);

    // select the work authorization status
    let questionDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll("div.text:not(.full-width)");
    for (let questionDiv of questionDivs) {
        let textValue: string = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("legally authorized")) {
            // we want the parent's sibling's first child: this will be the UL element
            let formOptions: Element = questionDiv.parentElement.nextElementSibling.firstElementChild;

            // now, if work auth is true, then we select first option and fill it in, 
            // else we select the no option and fill it in 
            if (userInfo.workAuthorization) {
                (formOptions.querySelector("input[value=Yes]") as HTMLInputElement).checked = true;
            } else {
                (formOptions.querySelector("input[value=No]") as HTMLInputElement).checked = true;
            }
        }
    }

    // select whether visa sponsorship is needed
    for (let questionDiv of questionDivs) {
        let textValue: string = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("require sponsorship")) {
            // we want the parent's sibling's first child: this will be the UL element
            let formOptions: Element = questionDiv.parentElement.nextElementSibling.firstElementChild;

            // now, if work auth is true, then we select first option and fill it in, 
            // else we select the no option and fill it in 
            if (userInfo.sponsorshipRequired) {
                (formOptions.querySelector("input[value=Yes]") as HTMLInputElement).checked = true;
            } else {
                (formOptions.querySelector("input[value=No]") as HTMLInputElement).checked = true;
            }
        }
    }

    //Find the country of citizenship if it exists
    for (let questionDiv of questionDivs) {
        let textValue: string = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("country of citizenship")) {
            // we want the parent's sibling's first child: this will be the UL element
            let countryCitizenBox: Element = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(countryCitizenBox as HTMLElement, userInfo.countryOfCitizenship);
        }
    }

    //Fill out salary expectations if it exists
    for (let questionDiv of questionDivs) {
        let textValue: string = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("salary expectation")) {
            // we want the parent's sibling's first child: this will be the UL element
            let salaryBox: Element = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(salaryBox as HTMLElement, userInfo.salaryExpectation);
        }
    }

};

// Listen for a request 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg == "submitApplication") {
        let submitButton: HTMLButtonElement = document.querySelector("button.postings-btn.template-btn-submit.cerulean");
        submitButton.click();
    }
});

chrome.storage.sync.get("userInfo", (result) => autoFillValuesLever(result.userInfo));

export {};