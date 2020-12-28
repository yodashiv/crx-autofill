
// Autofill values 
const autoFillValues = (userInfo: userInfoI) => (
    //FIXME: allow for upload of resume
    let linkedinBox: HTMLElement = document.getElementsByName("urls[LinkedIn]")[0];
    linkedinBox.innerHTML = "This is just a test";
);

chrome.storage.sync.get("userInfo", (result) => autoFillValues(result.userInfo));