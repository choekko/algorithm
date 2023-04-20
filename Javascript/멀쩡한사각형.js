// https://school.programmers.co.kr/learn/courses/30/lessons/62048#

const solution = (width, height) => {
  const normalSize = BigInt(width) * BigInt(height);

  const funcXToY = (x) => (height * x) / width; // (height / width) * x 는 실패하는 케이스가 있다.
  const funcYToX = (y) => (width * y) / height;

  let firstIntersectPoint;
  let deletedSquareCountAsBigInt = 0n;
  for (let y = 1; y <= height; y++) {
    const x = funcYToX(y);
    deletedSquareCountAsBigInt += 1n;

    if (!(x % 1)) {
      firstIntersectPoint = [x, y];
      break;
    }
  }

  for (let x = 1; x <= width; x++) {
    const y = funcXToY(x);

    if ((x === firstIntersectPoint[0]) && (y === firstIntersectPoint[1])) break;
    deletedSquareCountAsBigInt += 1n;
  }

  deletedSquareCountAsBigInt *= BigInt(width / firstIntersectPoint[0]);
  return normalSize - deletedSquareCountAsBigInt;
}