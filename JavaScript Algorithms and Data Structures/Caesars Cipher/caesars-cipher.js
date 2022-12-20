function rot13(str) {
  let newStr = "";
  const cipher = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    let isLetter = cipher.includes(char);
    if (isLetter === false) {
      newStr += char;
    } else {
      let charIndex = cipher.findIndex((a) => a === char);

      newStr += cipher[charIndex + 13] || cipher[charIndex - 13];
    }
  }

  return newStr;
}

rot13("SERR PBQR PNZC");
