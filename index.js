function pacificAtlantic(heights) {
  if (!heights || heights.length === 0) return [];

  const rows = heights.length;
  const cols = heights[0].length;
  const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];

  const pacific = new Set();
  const atlantic = new Set();






  function dfs(i, j, visited, prevHeight) {
    // BASE CASE -------------------
    if (
      visited.has(`${i},${j}`) || 
      i < 0 || i >= rows || 
      j < 0 || j >= cols || 
      heights[i][j] < prevHeight
    ) {
      return;
    }
    // ACCOUNT FOR VISITED CELL
    visited.add(`${i},${j}`);




    for (const [di, dj] of directions) {
      dfs(i + di, j + dj, visited, heights[i][j]);
    }
  }









  // CALL----------------------
  // Perform targeted DFS calls for all adjacent to the Pacific and Atlantic oceans
  // (vs. nested loop to call all nodes)
  for (let i = 0; i < rows; i++) {
    dfs(i, 0, pacific, heights[i][0]);          // Left edge (Pacific)
    dfs(i, cols - 1, atlantic, heights[i][cols - 1]); // Right edge (Atlantic)
  }

  for (let j = 0; j < cols; j++) {
    dfs(0, j, pacific, heights[0][j]);          // Top edge (Pacific)
    dfs(rows - 1, j, atlantic, heights[rows - 1][j]); // Bottom edge (Atlantic)
  }

  // BUILD RETURN -------------- Find cells that are in both Pacific and Atlantic sets
  const result = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (pacific.has(`${i},${j}`) && atlantic.has(`${i},${j}`)) {
        result.push([i, j]);
      }
    }
  }

  return result;
}

// Sample execution
const heights = [
    [1, 2, 2, 3, 5],
    [3, 2, 3, 4, 4],
    [2, 4, 5, 3, 1],
    [6, 7, 1, 4, 5],
    [5, 1, 1, 2, 4]
];

console.log(pacificAtlantic(heights));
