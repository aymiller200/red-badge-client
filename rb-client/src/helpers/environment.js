let APIURL = ''

switch (window.location.hostname) {
    case 'localhost':
    case '127.0.0.1':
        APIURL='http://localhost:3535'
        break
    case 'am-ontour.herokuapp.com':
        APIURL='https://am-my-ontour.herokuapp.com'
}

export default APIURL