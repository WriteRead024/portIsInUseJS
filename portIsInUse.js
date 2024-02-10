
// code adapted from
// https://stackoverflow.com/a/29872303/832705
// Feb. 5th, 2020
// CC BY-SA 3.0
// MSL.l otherwise

const net = require('net');

module.exports = function (port, callback) {
    var portInUseError = false;

    var server = net.createServer(function (socket) {
        socket.write('portIsInUse echo server\r\n');
        socket.pipe(socket);
    });

    server.listen(port, '127.0.0.1');

    server.on('error', function (e) {
        portInUseError = true;
        callback(true);
    });

    server.on('listening', function (e) {
        server.close();
        if (!portInUseError) {
            callback(false);
        } else {
            var warnmesg = "Warning: unexpected program state in 'portIsInUse' module, ";
            warnmesg += `both the port '${port}' in use error and listening event occurred`;
            console.log(warnmesg);
            //callback(warnmesg);
        }
    });
};
