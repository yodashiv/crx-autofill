
// Autofill values 
const autoFillValues = (userInfo: userInfoI) => {
    //FIXME: allow for upload of resume
    let linkedinBox: HTMLElement = document.getElementsByName("urls[LinkedIn]")[0];
    linkedinBox.setAttribute("autocomplete", "off");
    linkedinBox.setAttribute("value", "This is just a test.");
};

chrome.storage.sync.get("userInfo", (result) => autoFillValues(result.userInfo));