var g = new Graph();

var renderer;
var layouter;

var newnode;
var totalnodes;
var totaledges;
var srcnode;
var next_node;

var namelist = [];
var weightlist = [];
var itr = [];

//arrays as replacement for weightlist?????
var index_1 = [];
var index_2 = [];
var edge_weight = [];





window.onload = function() {



//BASIC LAYOUT OF GRAPH

/* layout the graph using the Spring layout implementation */
layouter = new Graph.Layout.Spring(g);
layouter.layout();

/* draw the graph using the RaphaelJS draw implementation */
renderer = new Graph.Renderer.Raphael('canvas', g, (window.innerWidth* 8/12), window.innerHeight);
renderer.draw();

totalnodes = 0;
totaledges = 0;

//ADDING ELEMENTS TO GRAPH

//adding new nodes
document.getElementById("addnodes").onclick = function() {newNode()};

function newNode() {
    var nodename = document.getElementById("nodename").value;
    g.addNode(nodename, { label: nodename });
    renderer.draw();

    namelist[totalnodes] = nodename;
    totalnodes++;

    document.getElementById("nodename").value = "";
}


//adding new edges
document.getElementById("addedges").onclick = function() {newEdge()};

function newEdge() {
    var node1 = document.getElementById("node1").value;
    var node2 = document.getElementById("node2").value;
    var weight = document.getElementById("weight").value;
    g.addEdge(node1, node2, { label: weight, directed : true } );
    renderer.draw();

    console.log(namelist.indexOf(node2));
    console.log(weightlist);

    //weightlist[index1][index2] = document.getElementById("weight").value;
    //adding the above info into a list
    index_1[totaledges] = namelist.indexOf(node1);
    index_2[totaledges] = namelist.indexOf(node2);
    edge_weight[totaledges] = weight;
    console.log(edge_weight[totaledges]);
    totaledges++;

    document.getElementById("node1").value = "";
    document.getElementById("node2").value = "";
    document.getElementById("weight").value = "";
}





//GRAPH MANIPULATION FUNCTIONS

document.getElementById("clear").onclick = function() {clearCanvas()};
function clearCanvas() {
    var div = document.getElementById('canvas');
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
    g = null;
    g = new Graph();

    layouter = new Graph.Layout.Spring(g);
    layouter.layout();
    renderer = new Graph.Renderer.Raphael('canvas', g, window.innerWidth, window.innerHeight);
    renderer.draw();
}


document.getElementById("dij").onclick = function() {dij()};

function dij() {
    var sim = document.getElementById('simulation');
    sim.innerHTML = '';
    sim.innerHTML += 'Enter source node: </br>';
    sim.innerHTML += '<input type="text" id="src" placeholder="Node name">';
    sim.innerHTML += '<input type="button" id="setsrc" value="Set Source" onclick="addSrc()"> <br>';
    sim.innerHTML += '<input type="button" id="startsim" value="Start Simulation" style=" width: 99%;" onclick="startSim()">';

}

};




//ADD SOURC NODE FUNCTION

addSrc = function(){
    srcnode = document.getElementById('src').value;
    var newsim = document.getElementById('srcout');
    newsim.innerHTML = 'Taking Source node as ' + srcnode;
};




//SIMULATION

startSim = function(){
    var simtable = document.getElementById("table");
    simtable.innerHTML = 'Iteration Table: <br>';


    //INITIALIZING WEIGHTLIST TO INFINITY

    for (var i=0;i<totalnodes;i++) {
        weightlist[i] = [];
    }

    for(var i=0;i<totalnodes;i++) {
        for(var j=0;j<totalnodes;j++) {
            weightlist[i][j]=100; //Change to infinity
        }
    }

    
    //INITIALIZING WEIGHTLIST ACCORDING TO INPUT

    for(var i=0 ;i<totaledges ;i++) {
        weightlist[index_1[i]][index_2[i]] = edge_weight[i];
        console.log(edge_weight[i]);
    }

    console.log(weightlist);


    // CHANGE TABLE FORMAT
    // *******************
    // -> Problem with clear graph here
    //

    var table = document.createElement("TABLE");
    table.border='1';
    table.cellpadding='2';
    table.setAttribute("id", "dijsktraTable");
    document.body.appendChild(table);
    var y,t,z;
    for(var i=0;i<=totalnodes;i++){
    y = document.createElement("TR");
    y.setAttribute("id", "myTr1");
    document.getElementById("dijsktraTable").appendChild(y);

    z = document.createElement("TD");

    document.getElementById("myTr1").appendChild(z);
    for(i=0;i<=totalnodes;i++)
    {
        if(i==0)
            t=document.createTextNode("ShortestPathSet");
        else
            t=document.createTextNode("Node"+i);
        z.appendChild(t);
    }
    }
    simtable.appendChild(table);


    var status = [] ; 
    for(var x = 0;x<totalnodes;x++){ 
        status[x]=0;
    }
    for(var x = 0;x<totalnodes;x++){ 
        addDijTuples(status);
    }



    //MAIN DIJKSTRA'S FUNC

    function addDijTuples(status){        
        status[namelist.indexOf(srcnode)]=1;
        var src_node = namelist.indexOf(srcnode);
        var count = totalnodes;
        var table = document.getElementById("dijsktraTable");
        var rowCount = table.rows.length;
        
        var row = table.insertRow(rowCount);
        var c=0;               
        for(var i=0;i<=count;i++){
            if(rowCount==1){
                if(i==0){
                    row.insertCell(i).innerHTML= src_node;
                }
                else{
                    itr[c]=weightlist[src_node][i-1];
                    c++;
                    row.insertCell(i).innerHTML= weightlist[src_node][i-1];
                }
            }
            else{
                if(i==0){        
                    row.insertCell(i).innerHTML= next_node;
                }
                else{
                    var bleh = Number(weightlist[src_node][next_node])+ Number(weightlist[next_node][i-1]) ; 
                    var num = Math.min(itr[i-1],bleh);
                    row.insertCell(i).innerHTML = num ; 
                    itr[c]=num;
                    c++;
                }
    
            }
        }   
        
        next_val = 100;
        for(var m=0;m<count;m++){
            if(itr[m]<next_val&&status[m]==0){
                next_val=itr[m];
            }
        }
        
        console.log(next_val);
        for(var m=0;m<count;m++){
            if(itr[m]==next_val){
                break;
            }
        }
        
        console.log(m);
        next_node=m ; 
        status[next_node]=1;
    }


};

