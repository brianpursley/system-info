const http = require('http');
const os = require("os");

const port = process.env.PORT || 80;

const server = http.createServer(function (request, response) {
    let i;
    response.writeHead(200, {"Content-Type": "text/html"});

    response.write(`
        <html lang="en">
        <head>
            <title>Server Info</title>
            <style>
            * {
                font-family: "Courier New", Courier, monospace;
            }
            h1 {
                text-align: center;
            }
            h2 {
                text-align: center;
            }
            table {
                margin: 0 auto;
                border-collapse: collapse;
                border-spacing: 0;
            }
            td {
                padding: .25rem .5rem;
                border: 1px solid #ddd;
            }
            td:first-of-type {
                font-weight: bold;
                background: #eee;          
            }
            td:last-of-type {
                word-break: break-all;
            }
            </style>
        </head>
        <body>
            <h1>${os.hostname()}</h1>
        <table>        
  `);

    function writeNameValueRow(response, name, value) {
        response.write(`<tr><td>${name}</td><td>${value}</td></tr>`);
    }

    writeNameValueRow(response, "arch", os.arch());

    const cpus = os.cpus();
    let cpusValue = '';
    for (i in cpus) {
        cpusValue += `${cpus[i].model}, speed = ${cpus[i].speed}<br/>`;
    }
    writeNameValueRow(response, `cpus`, cpusValue);

    writeNameValueRow(response, "endianness", os.endianness());
    writeNameValueRow(response, "freemem", os.freemem());
    writeNameValueRow(response, "homedir", os.homedir());
    writeNameValueRow(response, "loadavg", os.loadavg());

    const nics = os.networkInterfaces();
    let nicsValue = '';
    for (i in nics) {
        for (const a in nics[i]) {
            nicsValue += `${i}: ${nics[i][a].family} address = ${nics[i][a].address} (${nics[i][a].netmask}, ${nics[i][a].cidr})<br/>`;
        }
    }
    writeNameValueRow(response, "networkInterfaces", nicsValue);

    writeNameValueRow(response, "platform", os.platform());
    writeNameValueRow(response, "release", os.release());
    writeNameValueRow(response, "tmpdir", os.tmpdir());
    writeNameValueRow(response, "totalmem", os.totalmem());
    writeNameValueRow(response, "type", os.type());
    writeNameValueRow(response, "uptime", os.uptime());

    writeNameValueRow(response, "userInfo", `
    gid = ${os.userInfo().gid}<br/>
    homedir = ${os.userInfo().homedir}<br/>
    shell = ${os.userInfo().shell}<br/>
    uid = ${os.userInfo().uid}<br/>
    username = ${os.userInfo().username}<br/>
  `);

    response.write("</table><h2>Environment Variables</h2><table>");

    for (i in process.env) {
        writeNameValueRow(response, i, process.env[i]);
    }

    response.end(`
      </table>
    </body>
  </html>
  `);
});

function shutdown() {
    console.log("Closing all connections");
    const timeoutId = setTimeout(() => {
        console.error('Timeout while closing connections');
    }, 10000);
    try {
        server.close();
        server.closeAllConnections();
    } catch (err) {
        console.error(err);
    }
    clearTimeout(timeoutId);
    console.log("Connections closed");
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

server.listen(port);

console.log(`Server running on port ${port}`);
