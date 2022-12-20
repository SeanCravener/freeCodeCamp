function palindrome(str) {
  let mainStr = str.toLowerCase().match(/[a-z0-9]/g);
  return mainStr.join("") === mainStr.reverse().join("");
}

palindrome("eye");
