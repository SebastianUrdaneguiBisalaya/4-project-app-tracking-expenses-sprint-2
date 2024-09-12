
export function sumByDate(data) {
    return data.reduce((acc, val) => {
      if (!acc[val.date]) {
        acc[val.date] = 0;
      }
      acc[val.date] += parseFloat(val.amount);
      return acc;
    }, {});
  }
  