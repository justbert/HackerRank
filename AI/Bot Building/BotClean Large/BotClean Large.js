var Height;
var Width;
var MaxLayer;

function processData(input) {
    var lines = input.split('\n');
    
    var locations = lines[0].split(" ");
    var row = parseInt(locations[0]);
    var col = parseInt(locations[1]);
    
    var dimensions = lines[1].split(" ");
    Height = parseInt(dimensions[0]);
    Width= parseInt(dimensions[1]);
    
    MaxLayer = Height;
    if(MaxLayer < Width) {
        MaxLayer = Width;
    }
    
    var grid = [];
    for(var i = 2; i < Height+2; ++i)
    {
        grid.push(lines[i].split(""));
    }
    
    nextMove(row, col, grid);
} 

function nextMove(row, col, grid) {
    var bI = row;
    var bJ = col;
    
    if(grid[bI][bJ] === 'd') {
        console.log("CLEAN");
        return;
    }
    
    var target = findClosest(bI, bJ, grid);
    
    if(bJ < target.j) {
        ++bJ;
        console.log("RIGHT");
    } else if(bJ > target.j) {
        --bJ;
        console.log("LEFT");
    } else if(bI < target.i) {
        ++bI;
        console.log("DOWN");
    } else if(bI > target.i) {
        --bI;
        console.log("UP");
    }
}

function findClosest(row, col, grid) {
    
    function calculateDistance(i, j) {
        var x = i - row;
        var y = j - col;
        
        return Math.abs(x) + Math.abs(y);
    }
    
    var found = false;
    var target = {
        i: -1,
        j: -1,
        distance: Number.MAX_VALUE
    };
    
    //Layer represents the perimeter of the squares layer times away from
    //the bot where 0 layer would be the bot itself.
    //Ex. Layer 1
    //---
    //-B-
    //---
    for(var layer = 1; layer < MaxLayer; ++layer) {
		
		var currentI = row - layer;
		var currentJ = col - layer;
        
        //Square represents the squares in the layer.
        //Layer 1 has 8 squares, layer 2, 16.
        
        //top and bottom of layer
        for(var square = 0; square < layer*2+1; ++square) {
            
            /*if(row == 2 && col == 3) {
                console.log("Top: "+currentI + " " + currentJ +"Bot: "+(currentI+layer*2) + " " + currentJ );
            }*/

            if(isValidSquare(currentI, currentJ)) {
                if(grid[currentI][currentJ] == 'd') {
                    found = true;
                    if(calculateDistance(currentI, currentJ) < target.distance) {
                        target.i = currentI;
                        target.j = currentJ;
                        target.distance = calculateDistance(currentI, currentJ);
                    }
                }
                
            } 
            if(isValidSquare(currentI+layer*2, currentJ)) {
                if(grid[currentI+layer*2][currentJ] == 'd') {
                    found = true;
                    if(calculateDistance(currentI+layer*2, currentJ) < target.distance) {
                        target.i = currentI+layer*2;
                        target.j = currentJ;
                        target.distance = calculateDistance(currentI+layer*2, currentJ);
                    }
                }
            }
            ++currentJ;
        }
        
        var currentI = row - layer;
		var currentJ = col + layer;
        
        //sides of layer
        for(var square = 0; square < layer*2-1; ++square) {
            ++currentI;
            
            if(isValidSquare(currentI, currentJ)) {
                if(grid[currentI][currentJ] == 'd') {
                    found = true;
                    if(calculateDistance(currentI, currentJ) < target.distance) {
                        target.i = currentI;
                        target.j = currentJ;
                        target.distance = calculateDistance(currentI, currentJ);
                    }
                }
            } 
            if(isValidSquare(currentI, currentJ-layer*2)) {
                if(grid[currentI][currentJ-layer*2] == 'd') {
                    found = true;
                    if(calculateDistance(currentI, currentJ-layer*2) < target.distance) {
                        target.i = currentI;
                        target.j = currentJ-layer*2;
                        target.distance = calculateDistance(currentI, currentJ-layer*2);
                    }
                }
            }
        }
        
        if(found) {
            return target;
        }
    }
    console.log("Not found. (" + currentI +"," + currentJ+") Layer = " + layer);
}

function isValidSquare(I, J) {
    if(I < 0 || I >= Height || J < 0 || J >= Width) {
        return false;
    }
    return true;
}
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
