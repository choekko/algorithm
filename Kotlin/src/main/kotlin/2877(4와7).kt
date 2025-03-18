import kotlin.math.log2

fun main() = with(object {}.javaClass.getResourceAsStream("/input.txt")!!.bufferedReader()) {
    val n = readLine().toInt()
    var currentTreeIdx = n + 1;
    var result = ""


    while (true) {
        val currentDepth = log2(currentTreeIdx.toDouble()).toInt()

        if (currentDepth == 0) break;

        val isLeftChild = currentTreeIdx % 2 == 0

        result = "${if (isLeftChild) "4" else "7"}$result"
        currentTreeIdx /= 2

    }

    println(result)
}

