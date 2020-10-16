const http = require('http');
const seaport = require('seaport');
const ports = seaport.connect('localhost', 9090);
const fetch = require('node-fetch');

class Router{
    constructor(name, connections) {
        this.name = name;
        this.connections = connections;
        var self = this; // trick to access router from inner functions
        this.server = http.createServer(function(req, res) {
            let data = []
            // If the request contains any data, this listener is activated.
            req.on('data', chunk => {
                data.push(chunk)
            })

            // listener when reading data stream is done.
            req.on('end', () => {
                if(data.length > 0) {
                    console.log("Data received at router " + self.name);
                    // you need to write your code here.
                    // decipher buffer data hint: look into JSON.parse:
                    const response = JSON.parse(data)
                    res.end(JSON.stringify(response))
                    // end result with res.end(something);
                    // hint: Remember that res.end takes a string. How can we send an object?
                    // Look in the JSON documentation.

                }
                else {
                    res.end("No data received");
                }
            })

        })
        this.port = ports.register("router"+this.name);
        this.server.listen(this.port, function() {
            console.log("\nRouter " + name + " is listening on port " + this.address().port);
        });
    }

    getRouteTo = (destination) => {
        let found;
        this.connections.forEach((c) => {
            if(c.to === destination) {
                found = c;
            }
        })
        return found;
    }

    forwardRequestTo(destination, data) {
        fetch(destination, {
            method: 'post',
            body: JSON.stringify(packet),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => res.json())
        .then(json => console.log(json))
    }
}

module.exports = Router;
