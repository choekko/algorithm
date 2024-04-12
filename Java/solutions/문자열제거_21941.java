class 문자열제거_22856 {
    class Info {
        String target;
        int score;

        public Info(String target, int score) {
            this.target = target;
            this.score = score;
        }
    }
    public Solution() {
        try {
//            File file = new File("src/input.txt");
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
//            BufferedReader br = new BufferedReader(new FileReader(file));

            String baseStr = br.readLine();
            int infoCount = Integer.parseInt(br.readLine());
            Info[] infos = new Info[infoCount];

            for (int idx = 0; idx < infoCount; idx++) {
                String[] infoString = br.readLine().split(" ");
                infos[idx] = new Info(infoString[0], Integer.parseInt(infoString[1]));
            }

            int[] dp = new int[baseStr.length() + 1];

            for (int idx = 0; idx < dp.length - 1; idx++) {
                dp[idx + 1] = Math.max(dp[idx] + 1, dp[idx + 1]);

                for (Info info:infos) {
                    if (baseStr.startsWith(info.target, idx)) {
                        int targetLength = info.target.length();
                        dp[idx + targetLength] = Math.max(dp[idx + targetLength], dp[idx] + info.score);
                    }
                }
            }

            System.out.println(dp[dp.length - 1]);
        } catch (FileNotFoundException e) {
            e.getStackTrace();
        } catch (IOException e) {
            e.getStackTrace();
        }
    }
}