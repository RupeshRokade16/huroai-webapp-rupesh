const {app} = require('./index');

const port = 5000;

const server = app.listen(port, () => {
    console.log('Server listening at Port ',port);
})

module.exports = server;