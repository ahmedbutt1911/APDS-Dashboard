import config from "../config";

const sendMessageToExtension = (payload) => {
  const EXTENSION_ID = config.extensionnId; // Your extension ID

  return new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(EXTENSION_ID, { action: "USER_LOGIN", ...payload }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          console.log("Response from extension:", response);
          resolve(response);
        }
      });
    } else {
      const error = new Error("Chrome runtime is not available");
      console.error(error);
      reject(error);
    }
  });
};

const logoutExtension = () => {
  const EXTENSION_ID = config.extensionnId; // Your extension ID

  return new Promise((resolve, reject) => {
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(EXTENSION_ID, { action: "USER_LOGOUT" }, (response) => {
        if (chrome.runtime.lastError) {
          console.error("Error sending message:", chrome.runtime.lastError);
          reject(chrome.runtime.lastError);
        } else {
          console.log("Response from extension:", response);
          resolve(response);
        }
      });
    } else {
      const error = new Error("Chrome runtime is not available");
      console.error(error);
      reject(error);
    }
  });
};

export { sendMessageToExtension, logoutExtension };