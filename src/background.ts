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
    graduationYear: string, 
};

//FIXME
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
    graduationYear: "", 
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"userInfo": emptyUserInfo()});
});