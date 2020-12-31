var emptyUserInfo = function () { return ({
    name: "",
    email: "",
    phone: "",
    currentCompany: "",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    otherUrl: "",
    workAuthorization: true,
    sponsorshipRequired: false,
    countryOfCitizenship: "United States",
    salaryExpectation: "$0 /mo",
    graduationYear: ""
}); };
var testUserInfo = function () { return ({
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
    graduationYear: "2023"
}); };
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ "userInfo": emptyUserInfo() });
});
// Event listenter for keyboard shortcut that will submit the application 
chrome.commands.onCommand.addListener(function (command) {
    // deal with the submit application command
    if (command == "submit-application-lever") {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, function (tabs) {
            var url = tabs[0].url;
            if (url.includes("jobs.lever.co")) {
                // we need to ask the content script for the submit button element
                chrome.tabs.sendMessage(tabs[0].id, { msg: "submitApplication" }, null);
            }
        });
    }
});
// Listen for a message from our options page
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.msg == "there") {
        sendResponse("I got your message buddy!");
    }
});
