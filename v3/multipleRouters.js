let data = require("../data.json");
const Router = require("./routerV3");
const Packet = require("./packet");
const prompt = require('prompt');
const jsgraphs = require('js-graph-algorithms');

let routers = [];

const multipleRouters = () => {
    /**
     * 1. Iterate through the data and create the routers from it
     * as well as add it to our array.
     */

     data.routers.forEach(router => {
         // initialize router
         let r = new Router(router.router, router.connections)
         // add to array
         routers.push(r)
     })


    /**
     * 2. build a weighted directional graph and adds the edges
     * between the nodes through the data.json file
     */

     const g = new jsgraphs.WeightedGraph(4);
     g.addEdge(new jsgraphs.Edge(0, 1, 1));
     g.addEdge(new jsgraphs.Edge(0, 2, 3));
     g.addEdge(new jsgraphs.Edge(0, 3, 7));
     g.addEdge(new jsgraphs.Edge(1, 2, 1));
     g.addEdge(new jsgraphs.Edge(2, 3, 2));

    /**
     * 3. create a new packet.
     * create a packet with a name, a source, a destination and a ttl.
     * the source should be 0, destination 3 and ttl > 3.
     * the name can be whatever you'd like.
     */

    let demoPacket = new Packet('myPacket', 0, 3, 4);
    // Add the shortest path to the packet.
    demoPacket.shortestPath = getShortestPath(g, demoPacket.source, demoPacket.destination);

    /**
     * Prompt is a package to prompt the user though the terminal.
     * Can be found here: https://github.com/flatiron/prompt#readme
     */
    prompt.start();
    console.log("demo packet initialized. Send packet? (y/n)")
    prompt.get(["sendPacket"], function(err, res) {
        if(res.sendPacket == "y") {
            demoPacket.forwardPacket(demoPacket.source);
        }
        else {
            console.log("Bye!")
            process.exit(1);
        }
    })
}

/**
 * This methods gets the router names / indexes on the shortest path.
 */
const getShortestPath = (graph, from, to)  => {

  let sp = [];
  // write the functionality here. Remember to look at the documentation!
  const dijkstra = new jsgraphs.Dijkstra(graph, 0);

  for(let v = 1; v < graph.V; ++v){
  if(dijkstra.hasPathTo(v)){
      const path = dijkstra.pathTo(v);
      const pathWay = []
      for(let i = 0; i < path.length; ++i) {
          const e = path[i];
          pathWay.push(e.to())
      }
      sp.push(pathWay)
  } else {
    return 'Does not have path'
  }
}


  // return the shortest path as an array
  return sp[sp.length - 1]
}

multipleRouters();
