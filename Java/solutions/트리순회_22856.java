class Solution {

    class Node {
        Integer parentNode;
        Integer leftChildNode;
        Integer rightChildNode;
        Boolean hasLeftChecked = false;
        Boolean hasRightChecked = false;
    }

    public Solution() {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//            File file = new File("src/input.txt");
//            BufferedReader br = new BufferedReader(new FileReader(file));

            int nodeCount = Integer.parseInt(br.readLine());
            Node[] nodes = new Node[nodeCount + 1];

            for (int i = 0; i < nodeCount; i++) {
                nodes[i + 1] = new Node();
            }

            for (int i = 0; i < nodeCount; i++) {
                List<Integer> nodeInfo = Arrays.stream(br.readLine().split(" ")).map(Integer::parseInt).collect(Collectors.toList());
                int currentNode = nodeInfo.get(0);
                int leftChildNode = nodeInfo.get(1);
                int rightChildNode = nodeInfo.get(2);

                nodes[currentNode].leftChildNode = leftChildNode;
                nodes[currentNode].rightChildNode = rightChildNode;

                if (leftChildNode != -1) {
                    nodes[leftChildNode].parentNode = currentNode;
                }
                if (rightChildNode != -1) {
                    nodes[rightChildNode].parentNode = currentNode;
                }

                if (leftChildNode == -1) {
                    nodes[currentNode].hasLeftChecked = true;
                }
                if (rightChildNode == -1) {
                    nodes[currentNode].hasRightChecked = true;
                }
            }

            int lastNode = 1;

            while (true) {
                Node current = nodes[lastNode];

                if (current.rightChildNode == -1) break;
                lastNode = current.rightChildNode;
            }

            int currentNode = 1;
            int count = 0;


            while (true) {

                Node current = nodes[currentNode];

                if (current.hasLeftChecked && current.hasRightChecked) {
                    if (currentNode == lastNode) {
                        System.out.println(count);
                        return;
                    }
                    currentNode = current.parentNode;
                    count++;
                    continue;
                }
                if (current.hasLeftChecked) {
                    currentNode = current.rightChildNode;
                    current.hasRightChecked = true;
                    count++;
                    continue;
                }

                currentNode = current.leftChildNode;
                current.hasLeftChecked = true;
                count++;
            }

        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}
