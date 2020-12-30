const setNodeValue = (elem, value) => {
    if (elem) {
        elem.setAttribute("autocomplete", "off");
        elem.setAttribute("value", value);
    }
};
// Autofill values 
const autoFillValuesLever = (userInfo) => {
    //Automatically click the resume upload button for the user
    // let resumeButton: HTMLInputElement = document.getElementById("resume-upload-input") as HTMLInputElement;
    // resumeButton.click();
    //fill out links
    let linkedinBox = document.getElementsByName("urls[LinkedIn]")[0];
    setNodeValue(linkedinBox, userInfo.linkedinUrl);
    let twitterBox = document.getElementsByName("urls[Twitter]")[0];
    setNodeValue(twitterBox, userInfo.twitterUrl);
    let githubBox = document.getElementsByName("urls[GitHub]")[0];
    setNodeValue(githubBox, userInfo.githubUrl);
    let portfolioBox = document.getElementsByName("urls[Portfolio]")[0];
    setNodeValue(portfolioBox, userInfo.portfolioUrl);
    let otherUrlBox = document.getElementsByName("urls[Other]")[0];
    setNodeValue(otherUrlBox, userInfo.otherUrl);
    // select the work authorization status
    let questionDivs = document.querySelectorAll("div.text:not(.full-width)");
    for (let questionDiv of questionDivs) {
        let textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("legally authorized")) {
            // we want the parent's sibling's first child: this will be the UL element
            let formOptions = questionDiv.parentElement.nextElementSibling.firstElementChild;
            // now, if work auth is true, then we select first option and fill it in, 
            // else we select the no option and fill it in 
            if (userInfo.workAuthorization) {
                formOptions.querySelector("input[value=Yes]").checked = true;
            }
            else {
                formOptions.querySelector("input[value=No]").checked = true;
            }
        }
    }
    // select whether visa sponsorship is needed
    for (let questionDiv of questionDivs) {
        let textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("require sponsorship")) {
            // we want the parent's sibling's first child: this will be the UL element
            let formOptions = questionDiv.parentElement.nextElementSibling.firstElementChild;
            // now, if work auth is true, then we select first option and fill it in, 
            // else we select the no option and fill it in 
            if (userInfo.sponsorshipRequired) {
                formOptions.querySelector("input[value=Yes]").checked = true;
            }
            else {
                formOptions.querySelector("input[value=No]").checked = true;
            }
        }
    }
    //Find the country of citizenship if it exists
    for (let questionDiv of questionDivs) {
        let textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("country of citizenship")) {
            // we want the parent's sibling's first child: this will be the UL element
            let countryCitizenBox = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(countryCitizenBox, userInfo.countryOfCitizenship);
        }
    }
    //Fill out salary expectations if it exists
    for (let questionDiv of questionDivs) {
        let textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("salary expectation")) {
            // we want the parent's sibling's first child: this will be the UL element
            let salaryBox = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(salaryBox, userInfo.salaryExpectation);
        }
    }
};
// Listen for a request 
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.msg == "submitApplication") {
        let submitButton = document.querySelector("button.postings-btn.template-btn-submit.cerulean");
        submitButton.click();
    }
});
chrome.storage.sync.get("userInfo", (result) => autoFillValuesLever(result.userInfo));
