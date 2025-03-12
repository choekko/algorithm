fun main() = with(object {}.javaClass.getResourceAsStream("/input.txt")!!.bufferedReader()) {
    val testCaseCount = readLine().toInt();
    val testCases = List(testCaseCount) {
        List(9) {
            readLine().map { it.digitToInt() }.toMutableList()
        }
    }

    fun fillSudoku(board: List<MutableList<Int>>): Boolean {
        val emptyPositions: MutableList<Pair<Int, Int>> = mutableListOf()

        (0..8).toList().forEach { i ->
            (0..8).toList().forEach { j ->
                if (board[i][j] == 0) {
                    emptyPositions.add(i to j)
                }
            }
        }

        val requiredNumbersByRow = MutableList(9) { row ->
            (1..9).associateWith { num -> board[row].count { it == num } }
                .also { map ->
                    if (map.filter { it.value > 1 }.isNotEmpty()) {
                        return false
                    }
                }
                .filter { it.value == 0 }.keys.toMutableList();
        }
        val requiredNumbersByColumn = MutableList(9) { col ->
            val cols = List(9) { row -> board[row][col] }

            (1..9)
                .associateWith { num -> cols.count { it == num } }
                .also { map ->
                    if (map.filter { it.value > 1 }.isNotEmpty()) {
                       return false
                    }
                }
                .filter { it.value == 0 }.keys.toMutableList();
        }
        val requiredNumbersByBox = MutableList(9) { boxOrder ->
            val box = MutableList(9) {
                val lowestRow = boxOrder / 3 * 3
                val lowestCol = boxOrder % 3 * 3
                val row = lowestRow + it / 3
                val col = lowestCol + it % 3
                board[row][col]
            }
            (1..9).associateWith { num -> box.count { it == num } }
                .also { map ->
                    if (map.filter { it.value > 1 }.isNotEmpty()) {
                        return false
                    }
                }
                .filter { it.value == 0 }.keys.toMutableList();
        }

        fun dfs(emptyPositionsIndex: Int): Boolean {
            if (emptyPositionsIndex >= emptyPositions.size) {
                return true
            }

            val (row, col) = emptyPositions[emptyPositionsIndex]
            val possibleNumbers = requiredNumbersByRow[row].intersect(requiredNumbersByColumn[col].toSet()).intersect(requiredNumbersByBox[row / 3 * 3 + col / 3].toSet())

            if (possibleNumbers.isEmpty()) {
                return false
            }

            possibleNumbers.forEach { num ->
                board[row][col] = num
                requiredNumbersByRow[row].remove(num)
                requiredNumbersByColumn[col].remove(num)
                requiredNumbersByBox[row / 3 * 3 + col / 3].remove(num)

                if (dfs(emptyPositionsIndex + 1)) {
                    return true
                }

                board[row][col] = 0
                requiredNumbersByRow[row].add(num)
                requiredNumbersByColumn[col].add(num)
                requiredNumbersByBox[row / 3 * 3 + col / 3].add(num)
            }

            return false
        }

        return dfs(0)
    }

    println(testCases.joinToString("\n\n") {
        if (fillSudoku(it)) {
            it.map { row -> row.joinToString("") }.joinToString("\n")
        } else {
            "Could not complete this grid."
        }
    })
}



