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
const textAreaDecrypted = document.getElementById("ta-decrypted");
const textAreaEncrypted = document.getElementById("ta-encrypted");
const textAreaKey = document.getElementById("ta-key");
const listKeysDiv = document.getElementById("list-keys");

const encryptBtn = document.getElementById("encrypt-btn");
const decryptBtn = document.getElementById("decrypt-btn");
const resetBtn = document.getElementById("reset-btn");

const challangeBox = document.getElementById("challenge-bx");

let plainText = "";

const vignereKeys = [];
let selectedKeyIndex = -1;

encryptBtn.addEventListener("click", function () {
  emptyVignereKeys();
  const text = textAreaDecrypted.value;
  const key = textAreaKey.value;

  if (!text || !key) {
    window.alert("Key atau Decrypted Text tidak valid!");
    return;
  }

  const encrypted = vigenereCipher(text, key);
  textAreaEncrypted.value = encrypted;

  const ms = new Date().getMilliseconds().toString();
  console.log("ms: ", ms);

  let innerTag = `
  <p>Keys</p>
  <ul>
`;

  vignereKeys.push(key);

  vignereKeys.push(
    vigenereCipher(key, ms[0] + ms[1] + ms[2] + ms[0] + ms[1] + ms[0])
  );

  vignereKeys.push(
    vigenereCipher(key, ms[2] + ms[2] + ms[1] + ms[2] + ms[2] + ms[2])
  );

  vignereKeys.push(
    vigenereCipher(key, ms[1] + ms[0] + ms[1] + ms[2] + ms[0] + ms[1])
  );

  vignereKeys.push(
    vigenereCipher(
      key,
      (parseInt(ms[0]) + parseInt(ms[1])).toString() +
        (parseInt(ms[2]) + parseInt(ms[0])).toString() +
        (parseInt(ms[1]) + parseInt(ms[0])).toString() +
        (parseInt(ms[0]) + parseInt(ms[1])).toString() +
        (parseInt(ms[2]) + parseInt(ms[0])).toString() +
        (parseInt(ms[1]) + parseInt(ms[0])).toString()
    )
  );

  vignereKeys.push(
    vigenereCipher(
      key,
      (parseInt(ms[0]) + parseInt(ms[0])).toString() +
        (parseInt(ms[2]) + parseInt(ms[2])).toString() +
        (parseInt(ms[0]) + parseInt(ms[0])).toString() +
        (parseInt(ms[1]) + parseInt(ms[0])).toString() +
        (parseInt(ms[0]) + parseInt(ms[2])).toString() +
        (parseInt(ms[1]) + parseInt(ms[0])).toString()
    )
  );

  vignereKeys.push(
    vigenereCipher(
      key,
      (parseInt(ms[2]) + parseInt(ms[2])).toString() +
        (parseInt(ms[2]) + parseInt(ms[2])).toString() +
        (parseInt(ms[1]) + parseInt(ms[2])).toString() +
        (parseInt(ms[0]) + parseInt(ms[2])).toString() +
        (parseInt(ms[2]) + parseInt(ms[2])).toString() +
        (parseInt(ms[1]) + parseInt(ms[2])).toString()
    )
  );

  vignereKeys.forEach(
    (k, i) => (innerTag += '<li id="key-' + i.toString() + '">' + k + "</li>")
  );

  innerTag += "</ul>";

  selectedKeyIndex = 0;

  listKeysDiv.innerHTML = innerTag;

  document.getElementById("key-0").classList.add("selected");

  console.log("Text: ", text);
  console.log("Key: ", key);
  console.log("Enc: ", encrypted);
});

decryptBtn.addEventListener("click", function () {
  const text = textAreaEncrypted.value;
  const key = textAreaKey.value;

  if (!text || !key) {
    window.alert("Key atau Encrypted Text tidak valid!");
    return;
  }

  if (challangeBox.checked) {
    if (key !== vignereKeys[selectedKeyIndex]) {
      const newSelectedIndex = Math.floor(Math.random() * vignereKeys.length);

      const newEncry = vigenereCipher(plainText, vignereKeys[newSelectedIndex]);
      textAreaEncrypted.value = newEncry;

      document
        .getElementById("key-" + selectedKeyIndex.toString())
        .classList.remove("selected");
      document
        .getElementById("key-" + newSelectedIndex.toString())
        .classList.add("selected");
      selectedKeyIndex = newSelectedIndex;

      window.alert("Key salah, key telah diubah");

      return;
    } else {
      challangeBox.checked = false;
      encryptBtn.removeAttribute("disabled");
      resetBtn.removeAttribute("disabled");
      textAreaEncrypted.removeAttribute("disabled");
      textAreaDecrypted.removeAttribute("disabled");
      textAreaDecrypted.value = "";
    }
  }

  const decrypted = vigenereDecrypt(text, key);
  textAreaDecrypted.value = decrypted;
  console.log("Text: ", text);
  console.log("Key: ", key);
  console.log("Dec: ", decrypted);
});

resetBtn.addEventListener("click", function () {
  textAreaEncrypted.value = "";
  textAreaDecrypted.value = "";
  textAreaKey.value = "";
  listKeysDiv.innerHTML = "";

  emptyVignereKeys();
});

function emptyVignereKeys() {
  while (vignereKeys.length > 0) vignereKeys.pop();
}

challangeBox.addEventListener("change", function () {
  if (this.checked) {
    plainText = textAreaDecrypted.value;
    encryptBtn.setAttribute("disabled", "disabled");
    resetBtn.setAttribute("disabled", "disabled");
    textAreaEncrypted.setAttribute("disabled", "disabled");
    textAreaDecrypted.setAttribute("disabled", "disabled");
    textAreaDecrypted.value = "xxxxx";
  } else {
    encryptBtn.removeAttribute("disabled");
    resetBtn.removeAttribute("disabled");
    textAreaEncrypted.removeAttribute("disabled");
    textAreaDecrypted.removeAttribute("disabled");
    textAreaDecrypted.value = plainText;
  }
});
