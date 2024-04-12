import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

class Solution {
    class Position implements Comparable<Position> {
        private int row;
        private int col;

        public Position(int row, int col) {
            this.row = row;
            this.col = col;
        }

        @Override
        public int compareTo(Position o) {
            if (o.row == this.row) {
                return o.col - this.col;
            }
            return o.row - this.row;
        }
    }
    private int[] D_ROWS = { -1, 0, 1, 0 };
    private int[] D_COLS = { 0, 1, 0, -1 };
    List<List<Position>> breadCrumbs = new ArrayList<>();

    public int getCount(List<Position> breadCrumb, int yCount, boolean[][] checker, char[][] matrix) {

        if (breadCrumb.size() == 7) {
            Collections.sort(breadCrumb);

            boolean hasDuplicated = breadCrumbs.stream().anyMatch((bc) -> {
                for (int i = 0; i < 7; i++) {
                    if (bc.get(i).row != breadCrumb.get(i).row || bc.get(i).col != breadCrumb.get(i).col) return false;
                }
                return true;
            });

            if (hasDuplicated) return 0;

            breadCrumbs.add(breadCrumb);

            return 1;
        }

        int count = 0;

        for (Position position:breadCrumb)
        {
            for (int i = 0; i < 4; i++) {
                int dRow = D_ROWS[i];
                int dCol = D_COLS[i];
                int nextRow = position.row + dRow;
                int nextCol = position.col + dCol;

                if (nextRow < 0 || nextRow > 4 || nextCol < 0 || nextCol > 4 || checker[nextRow][nextCol]) continue;
                if (breadCrumb.stream().anyMatch((pos) -> (pos.row == nextRow) && (pos.col == nextCol))) continue;;

                boolean isY = matrix[nextRow][nextCol] == 'Y';
                int nextYCount = isY ? yCount + 1 : yCount;

                if (nextYCount >= 4) continue;

                Position newPosition = new Position(nextRow, nextCol);
                List<Position> newBreadCrumb = new ArrayList<>(breadCrumb);
                newBreadCrumb.add(newPosition);
                count += getCount(newBreadCrumb, nextYCount, checker, matrix);
            }
        }

        return count;
    }


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

            for (int size = 1; size <= count1; size++) {
                for (int i = 1; i < numbers1.size(); i++) {
                    int windowValue = pre
                }
            }


        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}


public class Main {
    public static void main(String[] args) {
        new Solution();
    }
}