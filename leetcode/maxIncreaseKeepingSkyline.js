// In a 2 dimensional array grid, each value grid[i][j] represents the height of a building located there. We are allowed to increase the height of any number of buildings, by any amount (the amounts can be different for different buildings). Height 0 is considered to be a building as well. 

// At the end, the "skyline" when viewed from all four directions of the grid, i.e. top, bottom, left, and right, must be the same as the skyline of the original grid. A city's skyline is the outer contour of the rectangles formed by all the buildings when viewed from a distance. See the following example.

// What is the maximum total sum that the height of the buildings can be increased?

// Example:
// Input: grid = [[3,0,8,4],[2,4,5,7],[9,2,6,3],[0,3,1,0]]
// Output: 35
// Explanation: 
// The grid is:
// [ [3, 0, 8, 4], 
//   [2, 4, 5, 7],
//   [9, 2, 6, 3],
//   [0, 3, 1, 0] ]

// The skyline viewed from top or bottom is: [9, 4, 8, 7]
// The skyline viewed from left or right is: [8, 7, 9, 3]

// The grid after increasing the height of buildings without affecting skylines is:

// gridNew = [ [8, 4, 8, 7],
//             [7, 4, 7, 7],
//             [9, 4, 8, 7],
//             [3, 3, 3, 3] ]

var maxIncreaseKeepingSkyline = function (grid) {
    let columnMax = findColumnMax(grid);
    let rowMax = findRowMax(grid);
    let count = 0;

    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            if (columnMax[col] > rowMax[row]) {
                count += rowMax[row] - grid[row][col];
            } else {
                count += columnMax[col] - grid[row][col];
            }
        }
    }
    return count;

};

function findColumnMax(grid) {
    let arr = [];
    for (let i = 0; i < grid.length; i++) {
        arr.push(getCol(grid, i))
    }
    return findRowMax(arr)
}

function getCol(matrix, col) {
    var column = [];
    for (var i = 0; i < matrix.length; i++) {
        column.push(matrix[i][col]);
    }
    return column;
}

function findRowMax(grid) {
    let arr = [];
    for (let i = 0; i < grid.length; i++) {
        let max = grid[i][0];
        for (let j = 0; j < grid[i].length; j++) {
            if (max < grid[i][j]) {
                max = grid[i][j]
            }
        }
        arr.push(max)
    }
    return arr;
}