const createRequest = (options = {}) => {
    const { method, url, data, callback } = options;

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open(method, url);
    xhr.send(data);
    xhr.addEventListener('load', () => {
        callback(null, xhr.response);
    });
};