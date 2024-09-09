export function sumByCategory(data) {
  return data.reduce((acc, val) => {
    if (!acc[val.category]) {
      acc[val.category] = 0;
    }
    acc[val.category] += val.amount;
    return acc;
  }, {});
}
