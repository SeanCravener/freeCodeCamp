function telephoneCheck(str) {
  const numVal = /^(1|1\s)?(\(\d{3}\)|\d{3})(\s|-)?\d{3}(\s|-)?\d{4}$/;

  return numVal.test(str);
}

telephoneCheck("555-555-5555");
