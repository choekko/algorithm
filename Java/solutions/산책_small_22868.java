import java.io.*;
import java.util.*;
class Solution {
    public List<Integer> getShortedPath(int nodeCount, int start, int end, List<Integer>[] edgeInfos, List<Integer> exclude) {
        int[] d = new int[nodeCount + 1];
        boolean[] checker = new boolean[nodeCount + 1];
        List<Integer>[] paths = new ArrayList[nodeCount + 1];

        for (int node = 1; node <= nodeCount; node++) {
            if (node == start) {
                d[node] = 0;
            } else {
                d[node] = Integer.MAX_VALUE;
            }

            paths[node] = new ArrayList<>();
        }

        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(arr -> arr[0]));

        int current = start;

        while (true) {
            int currentCost = d[current];
            List<Integer> possibleNextNodes = edgeInfos[current];

            for (int node:possibleNextNodes) {
                if (checker[node] || exclude.contains(node)) continue;

                int addedCost = currentCost + 1;
                int minValue = Math.min(addedCost, d[node]);

                if (minValue == addedCost) {
                    paths[node] = new ArrayList<>(paths[current]);
                    paths[node].add(current);
                }

                if (node == end) {
                    paths[node].add(end);
                    return paths[node];
                }

                d[node] = minValue;

                int[] heapValue = { minValue, node };
                minHeap.add(heapValue);
            }
            checker[current] = true;
            current = minHeap.poll()[1];
        }
    }

    public Solution() {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//            File file = new File("src/input.txt");
//            BufferedReader br = new BufferedReader(new FileReader(file));

            int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int nodeCount = info[0];
            int edgeCount = info[1];

            List<Integer>[] edgeInfos = new ArrayList[nodeCount + 1];

            for (int i = 1; i <= nodeCount; i++) {
                edgeInfos[i] = new ArrayList<>();
            }
            for (int i = 0; i < edgeCount; i++) {
                int[] edge = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
                edgeInfos[edge[0]].add(edge[1]);
                edgeInfos[edge[1]].add(edge[0]);
            }

            int[] targetInfo = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int start = targetInfo[0];
            int end = targetInfo[1];

            List<Integer> shortestPath = getShortedPath(nodeCount, start, end, edgeInfos, new ArrayList<>());
            List<Integer> exclude = shortestPath.subList(1, shortestPath.size() - 1);
            List<Integer> returnShortestPath = getShortedPath(nodeCount, end, start, edgeInfos, exclude);

            System.out.println(shortestPath.size() + returnShortestPath.size() - 2);
        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}
