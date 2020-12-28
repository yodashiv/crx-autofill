interface userInfo {
    name: string, 
    resumePath: string, 
    email: string, 
    phone: string, 
    currentCompany: string, 
    linkedinUrl: string, 
    twitterUrl: string, 
    githubUrl: string, 
    portfolioUrl: string, 
    usCitizen: boolean, 
    graduationYear: string, 
};

const emptyUserInfo = (): userInfo => ({
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
    graduationYear: "", 
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"userInfo": emptyUserInfo()});
});

