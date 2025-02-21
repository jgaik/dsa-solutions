// https://leetcode.com/problems/evaluate-division

function solution(
  equations: [string, string][],
  values: number[],
  queries: [string, string][]
): number[] {
  const graph = new Map<string, Map<string, number>>();

  equations.forEach(([left, right], idx) => {
    if (!graph.has(left)) {
      graph.set(left, new Map());
    }
    if (!graph.has(right)) {
      graph.set(right, new Map());
    }

    graph.get(left)?.set(right, values[idx]);
    graph.get(right)?.set(left, 1 / values[idx]);
  });

  const dfs = (
    node: string,
    start: string,
    target: string,
    result: number,
    visited: Set<string>
  ) => {
    if (node !== start) graph.get(start)?.set(node, result);
    if (graph.get(node)?.has(target)) {
      graph.get(start)?.set(target, result * graph.get(node)?.get(target)!);
      return;
    }

    for (const [neighbor, neighborResult] of graph.get(node)!) {
      if (visited.has(neighbor)) continue;
      visited.add(neighbor);
      dfs(neighbor, start, target, result * neighborResult, visited);
    }
  };

  return queries.map(([left, right]) => {
    if (!graph.has(left) || !graph.has(right)) return -1;

    if (left === right) return 1;

    const visited = new Set<string>([left]);
    dfs(left, left, right, 1, visited);
    return graph.get(left)?.get(right) ?? -1;
  });
}

const cases: Array<
  [ReturnType<typeof solution>, ...Parameters<typeof solution>]
> = [
  [
    [6.0, 0.5, -1.0, 1.0, -1.0],
    [
      ["a", "b"],
      ["b", "c"],
    ],
    [2.0, 3.0],
    [
      ["a", "c"],
      ["b", "a"],
      ["a", "e"],
      ["a", "a"],
      ["x", "x"],
    ],
  ],
  [
    [3.75, 0.4, 5.0, 0.2],
    [
      ["a", "b"],
      ["b", "c"],
      ["bc", "cd"],
    ],
    [1.5, 2.5, 5.0],
    [
      ["a", "c"],
      ["c", "b"],
      ["bc", "cd"],
      ["cd", "bc"],
    ],
  ],
  [
    [0.5, 2, -1.0, -1.0],
    [["a", "b"]],
    [0.5],
    [
      ["a", "b"],
      ["b", "a"],
      ["a", "c"],
      ["x", "y"],
    ],
  ],
  [
    [-1.0, -1.0, 1.0, 1.0],
    [
      ["a", "b"],
      ["c", "d"],
    ],
    [1.0, 1.0],
    [
      ["a", "c"],
      ["b", "d"],
      ["b", "a"],
      ["d", "c"],
    ],
  ],
  [
    [4.0],
    [
      ["a", "b"],
      ["b", "c"],
      ["a", "e"],
      ["e", "c"],
    ],
    [2.0, 2.0, 1.0, 4.0],
    [["a", "c"]],
  ],
  [
    [360.0, 20.0, 1.0, -1.0, -1.0],
    [
      ["x1", "x2"],
      ["x2", "x3"],
      ["x3", "x4"],
      ["x4", "x5"],
    ],
    [3.0, 4.0, 5.0, 6.0],
    [
      ["x1", "x5"],
      ["x2", "x4"],
      ["x2", "x2"],
      ["x2", "x9"],
      ["x9", "x9"],
    ],
  ],
];

export const leet399 = { solution, cases };
