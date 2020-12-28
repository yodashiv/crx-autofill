
const setNodeValue = (elem: HTMLElement, value: string) => {
    elem.setAttribute("autocomplete", "off");
    elem.setAttribute("value", value);
};

// Autofill values 
const autoFillValuesLever = (userInfo: userInfoI) => {
    //FIXME: allow for upload of resume


    let linkedinBox: HTMLElement = document.getElementsByName("urls[LinkedIn]")[0];
    setNodeValue(linkedinBox, userInfo.linkedinUrl);
    let twitterBox: HTMLElement = document.getElementsByName("urls[Twitter]")[0];
    setNodeValue(twitterBox, userInfo.twitterUrl);
    let githubBox: HTMLElement = document.getElementsByName("urls[Github]")[0];
    setNodeValue(linkedinBox, userInfo.githubUrl);
    let portfolioBox: HTMLElement = document.getElementsByName("urls[Portfolio]")[0];
    setNodeValue(portfolioBox, userInfo.portfolioUrl);
    let otherUrlBox: HTMLElement = document.getElementsByName("urls[Other]")[0];
    setNodeValue(otherUrlBox, userInfo.otherUrl);

    // select the work authorization status
    
};

chrome.storage.sync.get("userInfo", (result) => autoFillValuesLever(result.userInfo));