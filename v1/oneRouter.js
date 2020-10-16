let data = require("../data.json");
const Router = require("./router");
const prompt = require('prompt');
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const jsgraphs = require('js-graph-algorithms');
const fetch = require('node-fetch');

let routers = [];

const oneRouter = () => {
    //create a new router based on the data.
    // this is the first router in the data.
    let r = new Router(data.routers[0].router, data.routers[0].router.connections)
    console.log(r);
    routers.push(r);
    /**
     * since we need to wait until the router is initialized,
     * we prompt the user to send a packet.
     * Prompt is a package to prompt the user though the terminal.
     * Can be found here: https://github.com/flatiron/prompt#readme
     */
    prompt.start();
    console.log("demo packet initialized. Send packet? (y/n)")
    prompt.get(["sendPacket"], function(err, res) {
        if(res.sendPacket == "y") {
            var data = {message: "I'm a message sent from init!"}
            sendInitialPacket(0, data);
        }
        else {
            console.log("Bye!")
            process.exit(1);
        }
    })
}

const sendInitialPacket = (to, body) => {
    let sourceRouter = ports.query("router"+to)[0];
    var host = sourceRouter.host.split(":").reverse()[0];
    var port = sourceRouter.port;
    /**
     * node-fetch is a library to send http-requests.
     * In this case, we use it to post / forward the package.
     * The documentation can be found here:
     * https://github.com/node-fetch/node-fetch
     */
    fetch("http://" + host + ":" + port, {
        method: 'post',
        body:    JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(json => {
        console.log(json);
        process.exit(1);
    });
}

oneRouter();
