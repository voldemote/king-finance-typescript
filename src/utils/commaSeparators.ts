export const commaSeparators = (num: number | string) => {
      const numParts = num.toString().split('.');
      numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return numParts.join('.');
};

export const parseToFloat = (num1: number | string, num2: number) => {
      const temp = parseFloat(num1.toString()) * num2;
      const res = temp.toFixed(2);
      return res;
}