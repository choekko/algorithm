import java.io.*;
import java.lang.reflect.Array;
import java.util.*;
class Solution {
    int[] problems;
    int minSum;
    int maxSum;
    int minDifference;

    // 파라미터로 들어오는 idx 이상의 값들을 포함해서 만들 수 있는 경우의 수를 반환하는 함수
    public int getCount(int idx, int sum, int minProblem) {
        int currentSum = sum + problems[idx];
        int count = 0;

        if (currentSum >= minSum && currentSum <= maxSum && problems[idx] - minProblem >= minDifference) {
            count++;
        }

        for (int i = idx + 1; i < problems.length; i++) {
            count += getCount(i, currentSum, minProblem);
        }

        return count;
    }

    public Solution() {
        try {
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//            File file = new File("src/input.txt");
//            BufferedReader br = new BufferedReader(new FileReader(file));

            int[] info = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            int problemCount = info[0];
            minSum = info[1];
            maxSum = info[2];
            minDifference = info[3];
            problems = Arrays.stream(br.readLine().split(" ")).mapToInt(Integer::parseInt).toArray();
            Arrays.sort(problems);

            int count = 0;

            for (int i = 0; i < problemCount; i++) {
                for (int j = i + 1; j < problemCount; j++) {
                    count += getCount(j, problems[i], problems[i]);
                }
            }

            System.out.println(count);
        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}