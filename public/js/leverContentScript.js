var setNodeValue = function (elem, value) {
    if (elem) {
        elem.setAttribute("autocomplete", "off");
        elem.setAttribute("value", value);
    }
};
// Autofill values 
var autoFillValuesLever = function (userInfo) {
    //Automatically click the resume upload button for the user
    // let resumeButton: HTMLInputElement = document.getElementById("resume-upload-input") as HTMLInputElement;
    // resumeButton.click();
    //fill out links
    var linkedinBox = document.getElementsByName("urls[LinkedIn]")[0];
    setNodeValue(linkedinBox, userInfo.linkedinUrl);
    var twitterBox = document.getElementsByName("urls[Twitter]")[0];
    setNodeValue(twitterBox, userInfo.twitterUrl);
    var githubBox = document.getElementsByName("urls[GitHub]")[0];
    setNodeValue(githubBox, userInfo.githubUrl);
    var portfolioBox = document.getElementsByName("urls[Portfolio]")[0];
    setNodeValue(portfolioBox, userInfo.portfolioUrl);
    var otherUrlBox = document.getElementsByName("urls[Other]")[0];
    setNodeValue(otherUrlBox, userInfo.otherUrl);
    // select the work authorization status
    var questionDivs = document.querySelectorAll("div.text:not(.full-width)");
    for (var _i = 0, _a = questionDivs; _i < _a.length; _i++) {
        var questionDiv = _a[_i];
        var textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("legally authorized")) {
            // we want the parent's sibling's first child: this will be the UL element
            var formOptions = questionDiv.parentElement.nextElementSibling.firstElementChild;
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
    for (var _b = 0, _c = questionDivs; _b < _c.length; _b++) {
        var questionDiv = _c[_b];
        var textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("require sponsorship")) {
            // we want the parent's sibling's first child: this will be the UL element
            var formOptions = questionDiv.parentElement.nextElementSibling.firstElementChild;
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
    for (var _d = 0, _e = questionDivs; _d < _e.length; _d++) {
        var questionDiv = _e[_d];
        var textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("country of citizenship")) {
            // we want the parent's sibling's first child: this will be the UL element
            var countryCitizenBox = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(countryCitizenBox, userInfo.countryOfCitizenship);
        }
    }
    //Fill out salary expectations if it exists
    for (var _f = 0, _g = questionDivs; _f < _g.length; _f++) {
        var questionDiv = _g[_f];
        var textValue = questionDiv.innerHTML.toLowerCase();
        if (textValue.includes("salary expectation")) {
            // we want the parent's sibling's first child: this will be the UL element
            var salaryBox = questionDiv.parentElement.nextElementSibling.firstElementChild;
            setNodeValue(salaryBox, userInfo.salaryExpectation);
        }
    }
};
// Listen for a request 
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.msg == "submitApplication") {
        var submitButton = document.querySelector("button.postings-btn.template-btn-submit.cerulean");
        submitButton.click();
    }
});
chrome.storage.sync.get("userInfo", function (result) { return autoFillValuesLever(result.userInfo); });
