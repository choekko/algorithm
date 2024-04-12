class 두_배열의_합_fail_1243 {
    public Solution() {
        try {
//            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
            File file = new File("src/input.txt");
            BufferedReader br = new BufferedReader(new FileReader(file));

            int target = Integer.parseInt(br.readLine());
            int count1 = Integer.parseInt(br.readLine());
            List<Integer> numbers1 = Arrays.stream(br.readLine().split(" ")).map(Integer::parseInt).collect(Collectors.toList());
            int count2 = Integer.parseInt(br.readLine());
            List<Integer> numbers2 = Arrays.stream(br.readLine().split(" ")).map(Integer::parseInt).collect(Collectors.toList());

            numbers1.add(0, 0);
            numbers2.add(0, 0);

            List<Integer> prefixSums1 = new ArrayList<>();
            List<Integer> prefixSums2 = new ArrayList<>();

            prefixSums1.add(0);
            prefixSums2.add(0);

            for (int i = 1; i < numbers1.size(); i++) {
                prefixSums1.add(prefixSums1.get(i - 1) + numbers1.get(i));
            }

            for (int i = 1; i < numbers2.size(); i++) {
                prefixSums2.add(prefixSums2.get(i - 1) + numbers2.get(i));
            }

            List<Integer> candidate1 = new ArrayList<>();
            List<Integer> candidate2 = new ArrayList<>();

            for (int size = 1; size < count1; size++) {
                for (int i = 1; i < numbers1.size(); i++) {
                    if (i - size < 0) continue;
                    int windowValue = prefixSums1.get(i) - prefixSums1.get(i - size);
                    candidate1.add(windowValue);
                }
            }

            for (int size = 1; size < count2; size++) {
                for (int i = 1; i < numbers2.size(); i++) {
                    if (i - size < 0) continue;
                    int windowValue = prefixSums2.get(i) - prefixSums2.get(i - size);
                    candidate2.add(windowValue);
                }
            }

            int[] candidateArray1 = candidate1.stream().mapToInt(Integer::intValue).toArray();
            int[] candidateArray2 = candidate2.stream().mapToInt(Integer::intValue).toArray();

            System.out.println(Arrays.toString(candidateArray1));
            System.out.println(Arrays.toString(candidateArray2));

            Arrays.sort(candidateArray1);
            Arrays.sort(candidateArray2);

            System.out.println(Arrays.toString(candidateArray1));
            System.out.println(Arrays.toString(candidateArray2));

            int count = 0;

            for (int candidate:candidateArray1) {
                int other = target - candidate;

                if (Arrays.binarySearch(candidateArray2, other) != -1) {
                    count++;
                }
            }

            System.out.println(count);
        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
