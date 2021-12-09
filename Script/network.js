'use strict';

//const serverEndPoint = 'https://api.irail.be/liveboard/?format=json&id=BE.NMBS.008896008';
const serverEndPoint = 'https://api.irail.be/liveboard/?format=json&id=BE.NMBS.008813003';
const customHeaders = new Headers();

// Add a few headers - UITZONDERING
customHeaders.append('Accept', 'application/json');

const getData = () => fetch(serverEndPoint, { headers: customHeaders }).then((r) => r.json());
