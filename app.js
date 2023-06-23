"use strict";
const charList =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-!@#$%^&*()+=<>,.?/:;{}[]\\|~` ";

console.log("charList length: ", charList.length);
function vigenereCipher(text, key) {
  let ciphertext = "";
  let keyLength = key.length;
  let prevIndex = 0;

  for (let i = 0, j = 0; i < text.length; i++) {
    let char = text.charAt(i);
    let keyChar = key.charAt(j % keyLength);

    // Find the index of the character in the charList.'
    let charIndex = charList.indexOf(char);
    let keyCharIndex = charList.indexOf(keyChar);

    // Encrypt the character using the Vigenère cipher.
    let cipherIndex = (charIndex + keyCharIndex) % charList.length;

    // transitive addition
    if (ciphertext.length >= 1)
      cipherIndex = (cipherIndex + prevIndex) % charList.length;

    prevIndex = cipherIndex;

    console.log(cipherIndex);

    // Add the encrypted character to the ciphertext.
    ciphertext += charList.charAt(cipherIndex);

    // Increment the key index.
    j++;
  }

  return ciphertext;
}

function vigenereDecrypt(ciphertext, key) {
  let plaintext = "";
  let keyLength = key.length;

  for (let i = ciphertext.length - 1, j = i; i >= 0; i--) {
    let char = ciphertext.charAt(i);
    let keyChar = key.charAt(j % keyLength);

    // Find the index of the character in the charList.
    let cipherIndex = charList.indexOf(char);
    let keyCharIndex = charList.indexOf(keyChar);

    // Decrypt the character using the Vigenère cipher.
    let plaintextIndex = (cipherIndex - keyCharIndex) % charList.length;

    if (i > 0)
      plaintextIndex =
        (plaintextIndex - charList.indexOf(ciphertext.charAt(i - 1))) %
        charList.length;

    console.log(charList.indexOf(ciphertext.charAt(i - 1)));

    plaintextIndex =
      plaintextIndex < 0 ? charList.length + plaintextIndex : plaintextIndex;

    // Add the decrypted character to the plaintext.
    plaintext += charList.charAt(plaintextIndex);

    // Increment the key index.
    j--;
  }

  return plaintext.split("").reverse().join("");
}

const text = "Hello, World!";
const key = "az!kjos$";
let ciphertext = vigenereCipher(text, key);
console.log("\n");
let plaintext = vigenereDecrypt(ciphertext, key);

console.log("Text: ", text);
console.log("Cipher: ", ciphertext);
console.log("Plain: ", plaintext);
