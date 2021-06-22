let tmp = [1, 2, 3, 4];

tmp.forEach((e, _, array) => {
    array[3] += e;
    console.log(array)
    })
console.log(tmp)