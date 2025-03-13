fun main(): Unit = with(object {}.javaClass.getResourceAsStream("/input.txt")!!.bufferedReader()) {

    // 1. 햄버거 높이 중앙까지 먹었다면? -> level - 1 의 패티 개수 + 1
    // 2. 햄버거 높이 중앙 이전까지 먹었다면? -> level - 1 햄버거에서 biteCount - 1 만큼 먹은 것과 같음
    // 3. 햄버거 높이 중앙 이후까지 먹었다면? -> (기본적으로 level - 1 패티 개수 + 1은 확보) 추가로 level - 1 햄버거에서 (biteCount - level 햄버거 중앙 높이) 만큼 먹음

    val (targetLevelAsString, biteCountAsString) = readLine().split(" ")
    val (targetLevel, biteCount) = targetLevelAsString.toInt() to biteCountAsString.toLong()
    val burgers = MutableList<Pair<Long, Long>?>(targetLevel + 1) { null } // Pair<height, pattiesCount>

    burgers[0] = 1L to 1L // 0번째 레벨은 패티 1개로 시작

    (1..targetLevel).forEach { level ->
        burgers[level] = Pair(burgers[level - 1]!!.first * 2 + 3, burgers[level - 1]!!.second * 2 + 1);
    }

    fun getNumberOfPattiesEaten(level: Int, biteCount: Long): Long {
        if (biteCount <= 0) {
            return 0
        }

        if (level == 0) {
            return 1
        }

        val middleHeight = (burgers[level]!!.first / 2 + 1).toLong()

        if (biteCount == middleHeight) {
            return burgers[level - 1]!!.second + 1
        } else if (biteCount < middleHeight) {
            return getNumberOfPattiesEaten(level - 1, biteCount - 1)
        } else {
            return burgers[level - 1]!!.second + 1 + getNumberOfPattiesEaten(level - 1, biteCount - middleHeight)
        }
    }

    println(getNumberOfPattiesEaten(targetLevel, biteCount))
}
