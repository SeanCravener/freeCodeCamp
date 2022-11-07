function convertToRoman(num) {
  const arabicNum = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const romanNum = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  let romanResult = "";

  arabicNum.forEach((number, i) => {
    while (num >= number) {
      romanResult += romanNum[i];
      num -= number;
    }
  })

  return romanResult;
}

convertToRoman(36);