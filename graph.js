var jsgraphs = require('js-graph-algorithms');

// 1. Initialize your graph here.
// // 2. Add edges to your graph below
const g = new jsgraphs.WeightedGraph(4);
g.addEdge(new jsgraphs.Edge(0, 1, 1));
g.addEdge(new jsgraphs.Edge(0, 2, 3));
g.addEdge(new jsgraphs.Edge(0, 3, 7));
g.addEdge(new jsgraphs.Edge(1, 2, 1));
g.addEdge(new jsgraphs.Edge(2, 3, 2));


// 3. Create a function that takes a graph, a from node and a to node,
//    and print the shortest path between the two nodes.
// (4.) Modify above function to handle it, if a path doesn't exist.


const shortestPath = (graph, to, from) => {
    let sp = [];
    // write the functionality here. Remember to look at the documentation!
    const dijkstra = new jsgraphs.Dijkstra(graph, 0);

    for(let v = 1; v < g.V; ++v){
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
};

const result = shortestPath(g, 0, 3)
