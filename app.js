"use strict";
const charList =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-!@#$%^&*()+=<>,.?/:;{}[]\\|~` ";

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

    plaintextIndex =
      plaintextIndex < 0 ? charList.length + plaintextIndex : plaintextIndex;

    // Add the decrypted character to the plaintext.
    plaintext += charList.charAt(plaintextIndex);

    // Increment the key index.
    j--;
  }

  return plaintext.split("").reverse().join("");
}

// DOM

document.getElementById("encrypt-btn").addEventListener("click", function () {
  const text = document.getElementById("ta-decrypted").value;
  const key = document.getElementById("ta-key").value;

  if (!text || !key) {
    window.alert("Key atau Decrypted Text tidak valid!");
    return;
  }

  const encrypted = vigenereCipher(text, key);
  document.getElementById("ta-encrypted").value = encrypted;
  console.log("Text: ", text);
  console.log("Key: ", Key);
  console.log("Enc: ", encrypted);
});

document.getElementById("decrypt-btn").addEventListener("click", function () {
  const text = document.getElementById("ta-encrypted").value;
  const key = document.getElementById("ta-key").value;

  if (!text || !key) {
    window.alert("Key atau Encrypted Text tidak valid!");
    return;
  }

  const decrypted = vigenereDecrypt(text, key);
  document.getElementById("ta-decrypted").value = decrypted;
  console.log("Text: ", text);
  console.log("Key: ", Key);
  console.log("Dec: ", decrypted);
});
