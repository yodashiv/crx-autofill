
const setNodeValue = (elem: HTMLElement, value: string) => {
    elem.setAttribute("autocomplete", "off");
    elem.setAttribute("value", value);
};

// Autofill values 
const autoFillValuesLever = (userInfo: userInfoI) => {
    //FIXME: allow for upload of resume
    let linkedinBox: HTMLElement = document.getElementsByName("urls[LinkedIn]")[0];
    setNodeValue(linkedinBox, userInfo.linkedinUrl);
};

chrome.storage.sync.get("userInfo", (result) => autoFillValuesLever(result.userInfo));