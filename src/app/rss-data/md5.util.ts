export function md5(str: string): string {
    // Преобразование строки в UTF-8
    function utf8Encode(s: string): string {
      return unescape(encodeURIComponent(s));
    }
  
    // Основные вспомогательные функции MD5
    function rotateLeft(lValue: number, iShiftBits: number) {
      return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
  
    function addUnsigned(lX: number, lY: number) {
      const lX4 = lX & 0x40000000;
      const lY4 = lY & 0x40000000;
      const lX8 = lX & 0x80000000;
      const lY8 = lY & 0x80000000;
      const lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
      if (lX4 & lY4) return lResult ^ 0x80000000 ^ lX8 ^ lY8;
      if (lX4 | lY4) {
        if (lResult & 0x40000000) return lResult ^ 0xC0000000 ^ lX8 ^ lY8;
        else return lResult ^ 0x40000000 ^ lX8 ^ lY8;
      } else return lResult ^ lX8 ^ lY8;
    }
  
    // Функции MD5 для каждого раунда
    function F(x: number, y: number, z: number) { return (x & y) | (~x & z); }
    function G(x: number, y: number, z: number) { return (x & z) | (y & ~z); }
    function H(x: number, y: number, z: number) { return x ^ y ^ z; }
    function I(x: number, y: number, z: number) { return y ^ (x | ~z); }
  
    function FF(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a: number, b: number, c: number, d: number, x: number, s: number, ac: number) {
      a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
      return addUnsigned(rotateLeft(a, s), b);
    }
  
    function convertToWordArray(str: string) {
      const lWordCount: number[] = [];
      const lMessageLength = str.length;
      let lNumberOfWords = (((lMessageLength + 8) >> 6) + 1) * 16;
      for (let i = 0; i < lNumberOfWords; i++) lWordCount[i] = 0;
      for (let i = 0; i < lMessageLength; i++) {
        lWordCount[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
      }
      lWordCount[lMessageLength >> 2] |= 0x80 << ((lMessageLength % 4) * 8);
      lWordCount[lNumberOfWords - 2] = lMessageLength * 8;
      return lWordCount;
    }
  
    function wordToHex(lValue: number) {
      let wordToHexValue = "", wordToHexValueTemp = "", lByte, lCount;
      for (lCount = 0; lCount <= 3; lCount++) {
        lByte = (lValue >>> (lCount * 8)) & 255;
        wordToHexValueTemp = "0" + lByte.toString(16);
        wordToHexValue += wordToHexValueTemp.substr(wordToHexValueTemp.length - 2, 2);
      }
      return wordToHexValue;
    }
  
    let x = [];
    let k, AA, BB, CC, DD, a, b, c, d;
    str = utf8Encode(str);
    x = convertToWordArray(str);
    a = 0x67452301;
    b = 0xEFCDAB89;
    c = 0x98BADCFE;
    d = 0x10325476;
  
    for (k = 0; k < x.length; k += 16) {
      AA = a; BB = b; CC = c; DD = d;
      a = FF(a, b, c, d, x[k + 0], 7, 0xD76AA478);
      d = FF(d, a, b, c, x[k + 1], 12, 0xE8C7B756);
      c = FF(c, d, a, b, x[k + 2], 17, 0x242070DB);
      b = FF(b, c, d, a, x[k + 3], 22, 0xC1BDCEEE);
      a = FF(a, b, c, d, x[k + 4], 7, 0xF57C0FAF);
      d = FF(d, a, b, c, x[k + 5], 12, 0x4787C62A);
      c = FF(c, d, a, b, x[k + 6], 17, 0xA8304613);
      b = FF(b, c, d, a, x[k + 7], 22, 0xFD469501);
      a = FF(a, b, c, d, x[k + 8], 7, 0x698098D8);
      d = FF(d, a, b, c, x[k + 9], 12, 0x8B44F7AF);
      c = FF(c, d, a, b, x[k + 10], 17, 0xFFFF5BB1);
      b = FF(b, c, d, a, x[k + 11], 22, 0x895CD7BE);
      a = FF(a, b, c, d, x[k + 12], 7, 0x6B901122);
      d = FF(d, a, b, c, x[k + 13], 12, 0xFD987193);
      c = FF(c, d, a, b, x[k + 14], 17, 0xA679438E);
      b = FF(b, c, d, a, x[k + 15], 22, 0x49B40821);
      a = GG(a, b, c, d, x[k + 1], 5, 0xF61E2562);
      d = GG(d, a, b, c, x[k + 6], 9, 0xC040B340);
      c = GG(c, d, a, b, x[k + 11], 14, 0x265E5A51);
      b = GG(b, c, d, a, x[k + 0], 20, 0xE9B6C7AA);
      a = GG(a, b, c, d, x[k + 5], 5, 0xD62F105D);
      d = GG(d, a, b, c, x[k + 10], 9, 0x2441453);
      c = GG(c, d, a, b, x[k + 15], 14, 0xD8A1E681);
      b = GG(b, c, d, a, x[k + 4], 20, 0xE7D3FBC8);
      a = GG(a, b, c, d, x[k + 9], 5, 0x21E1CDE6);
      d = GG(d, a, b, c, x[k + 14], 9, 0xC33707D6);
      c = GG(c, d, a, b, x[k + 3], 14, 0xF4D50D87);
      b = GG(b, c, d, a, x[k + 8], 20, 0x455A14ED);
      a = HH(a, b, c, d, x[k + 4], 4, 0xF4292244);
      d = HH(d, a, b, c, x[k + 9], 11, 0x432AFF97);
      c = HH(c, d, a, b, x[k + 14], 16, 0xAB9423A7);
      b = HH(b, c, d, a, x[k + 3], 23, 0xFC93A039);
      a = HH(a, b, c, d, x[k + 8], 4, 0x655B59C3);
      d = HH(d, a, b, c, x[k + 13], 11, 0x8F0CCC92);
      c = HH(c, d, a, b, x[k + 2], 16, 0xFFEFF47D);
      b = HH(b, c, d, a, x[k + 7], 23, 0x85845DD1);
      a = II(a, b, c, d, x[k + 0], 6, 0x6FA87E4F);
      d = II(d, a, b, c, x[k + 7], 10, 0xFE2CE6E0);
      c = II(c, d, a, b, x[k + 14], 15, 0xA3014314);
      b = II(b, c, d, a, x[k + 5], 21, 0x4E0811A1);
      a = II(a, b, c, d, x[k + 12], 6, 0xF7537E82);
      d = II(d, a, b, c, x[k + 3], 10, 0xBD3AF235);
      c = II(c, d, a, b, x[k + 10], 15, 0x2AD7D2BB);
      b = II(b, c, d, a, x[k + 1], 21, 0xEB86D391);
      a = addUnsigned(a, AA);
      b = addUnsigned(b, BB);
      c = addUnsigned(c, CC);
      d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
  }