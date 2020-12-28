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
    graduationYear: "2023", 
});

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({"userInfo": testUserInfo()});
});