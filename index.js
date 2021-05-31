const http = require('http');
const accountSid = `INSERT_ACCOUNT_SID_HERE`;
const authToken = `INSERT_ACCOUNT_AUTH_TOKEN`;
const client = require('twilio')(accountSid, authToken);
const urls = ['INSERT_URLS_TO_CHECK']

// Runs every 5 minutes, to check http status code 
setInterval(() => {
    for (let i = 0; i < urls.length; i++) {
        http.get(urls[i], (res) => {
            const message = `HTTP Status ${urls[i]}: ${res.statusCode}`
            console.log(message)
            if (res.statusCode !== 200) {
                client.messages.create ({
                    body: message,
                    from: 'INSERT_TWILIO_NUMBER',
                    to: 'INSERT_RECIPIENT'
                })
                .then(message => console.log(message.sid));
            }
        });
    }
}, 300000);


