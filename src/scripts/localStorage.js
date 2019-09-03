export const setStorageVal = (key, value) => {
    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem(key, value);
    } else {
        console.error('No Web Storage support!');
    }
}

export const getStorageVal = key => {
    if (typeof(Storage) !== 'undefined') {
        return localStorage.getItem(key);
    } else {
        console.error('No Web Storage support!');
    }
}