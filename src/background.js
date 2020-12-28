;
var emptyUserInfo = function () { return ({
    name: "",
    resumePath: "",
    email: "",
    phone: "",
    currentCompany: "",
    linkedinUrl: "",
    twitterUrl: "",
    githubUrl: "",
    portfolioUrl: "",
    usCitizen: false,
    graduationYear: ""
}); };
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ "userInfo": emptyUserInfo() });
});
var message = "hello";
message = 6;
console.log(message);
