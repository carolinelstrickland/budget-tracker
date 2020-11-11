const indexedDB = 
window.indexedDB ||
window.mozIndexedDB ||
window.webkitIndexedDB ||
window.msIndexedDB ||
window.shimIndexedDB;

let db;
const request = indexedDB.open("budget", 1);

request.onupgradeneeded = ({ target }) => {
    let db = target.result;
    db.createdObjectStore("pending", { autoIncrement: true });
};

request.onsuccess = ({ target }) => {
    db = target.result;
    if (navigator.online) {
        checkDatabase();
    }
};

request.onerror = function(event) {
    console.log("Whoops! " + event.target.errorCode);
};

function saveRecord(record) {
    const transaction = db.transation(["pending"], "readwrite");
    const store = transaction.objectStore("pending");

    store.add(record);
}

