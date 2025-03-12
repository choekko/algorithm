## 입력 받는 법
- 백준 입력을 받을 때
    ```kotlin
    fun main() = with(System.`in`.bufferedReader()) {}
    ```
- 파일 입력을 받을 떄
    ```kotlin
    fun main() = with(object {}.javaClass.getResourceAsStream("/input.txt")!!.bufferedReader()) {
    ```
