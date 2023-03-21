const permutation = (numbers, n) => {
  if (n === 0) return [[]];
  if (n === 1) return numbers.map(number => [number]);

  let result = [];

  numbers.forEach(number => {
    result = [...result, ...permutation(numbers, n - 1).map(candidate => [number, ...candidate])];
  })

  return result;
}

function solution(users, emoticons) {
  const discountRatesCandidates = permutation([10, 20, 30, 40], 7);

  let result = [0, 0]
  discountRatesCandidates.forEach(candidate => {
    const emoticonInfo = emoticons.map(
      (originalPrice, idx) => ({
        discountRate: candidate[idx],
        discountedPrice: originalPrice * (100 - candidate[idx]) / 100,
      })
    )
    let emoticonPlusAmount = 0;
    let salesAmount = 0;


    users.forEach(([wantedDiscountRate, limit]) => {
      let salesAmountPerUser = 0;
      emoticonInfo.forEach(({ discountRate, discountedPrice }) => {
        if (discountRate >= wantedDiscountRate) {
          salesAmountPerUser += discountedPrice;
        }
      })
      if (salesAmountPerUser >= limit) {
        emoticonPlusAmount++;
        return;
      }
      salesAmount += salesAmountPerUser;
    })

    if (result[0] < emoticonPlusAmount
      || (result[0] === emoticonPlusAmount && result[1] <= salesAmount)) {
      result = [emoticonPlusAmount, salesAmount];
    }
  })
  return result;
}