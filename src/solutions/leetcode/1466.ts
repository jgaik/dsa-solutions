// https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero

function solution(n: number, connections: [number, number][]): number {
  const directedGraph = Array.from({ length: n }, () => new Set<number>());
  const undirectedGraph = Array.from({ length: n }, () => new Set<number>());
  const visited = new Array(n).fill(false);

  connections.forEach(([a, b]) => {
    directedGraph[a].add(b);
    undirectedGraph[a].add(b);
    undirectedGraph[b].add(a);
  });

  let reorders = 0;

  const dfs = (city: number) => {
    visited[city] = true;

    for (const neighbor of undirectedGraph[city]) {
      if (visited[neighbor]) continue;
      if (directedGraph[city].has(neighbor)) {
        directedGraph[neighbor].add(city);
        directedGraph[city].delete(neighbor);
        reorders++;
      }
      dfs(neighbor);
    }
  };

  dfs(0);

  return reorders;
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    3,
    6,
    [
      [0, 1],
      [1, 3],
      [2, 3],
      [4, 0],
      [4, 5],
    ],
  ],
  [
    2,
    5,
    [
      [1, 0],
      [1, 2],
      [3, 2],
      [3, 4],
    ],
  ],
  [
    0,
    3,
    [
      [1, 0],
      [2, 0],
    ],
  ],
];

export const leet1466 = { solution, cases };
