const uppercaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const symbols = ['!', '@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', ';', ':', '"', "'", '<', '>', ',', '.', '?', '/'];

function generatePassword(event) {
    event.preventDefault();                                                      //prevent form submission

    // document.getElementById('first-password').classList.add('password-display-hidden');    //hide the previous passwords and the GIF before generating new ones
    // document.getElementById('second-password').classList.add('password-display-hidden');

    let hiddenElements = document.getElementsByClassName("password-display");
        Array.from(hiddenElements).forEach(element => {
            element.classList.replace("password-display", "password-display-hidden");
        });
        document.getElementById('first-password').textContent = '';
        document.getElementById('second-password').textContent = '';

    let loadingGif = document.querySelector('#loading-animation img');            //show loading GIF
        loadingGif.style.display = 'block';
        loadingGif.style.margin = '0 auto';    

    setTimeout(() => {
        let useUppercase = document.querySelector('#uppercase').checked;
        let useLowercase = document.querySelector('#lowercase').checked;
        let useNumbers = document.querySelector('#numbers').checked;
        let useSymbols = document.querySelector('#symbols').checked;
        let length = parseInt(document.querySelector('#length').value, 10);
        
        if (!useUppercase && !useLowercase && !useNumbers && !useSymbols) {      //if no character type is selected
            alert('Please select at least one character type!');
            return;
        } else if (length < 4 || length > 128) {
            alert('Password length must be between 4 and 128 characters!');      //if password length is not between 4 and 128
            return;
        } else if (isNaN(length)) {
            alert('Please enter a password length!');                            //if no password length is entered
            return;
        } else {
            var includeChars = [];
            if (useUppercase) {                                                  //get selected character types
                includeChars.push(uppercaseLetters);
            }
            if (useLowercase) {
                includeChars.push(lowercaseLetters);
            }
            if (useNumbers) {
                includeChars.push(numbers);
            }
            if (useSymbols) {
                includeChars.push(symbols);
            }
            includeChars = includeChars.flat();                                  //flatten array
            console.log(includeChars);
        }

        let pwd1 = '';
        let pwd2 = '';
        for (let i = 0; i < length; i++) {
            let randomChar1 = Math.floor(Math.random() * includeChars.length);
            let randomChar2 = Math.floor(Math.random() * includeChars.length);
            pwd1 += includeChars[randomChar1];
            pwd2 += includeChars[randomChar2];
        }

        document.getElementById('first-password').textContent = pwd1;
        document.getElementById('second-password').textContent = pwd2;

        loadingGif.style.display = 'none';

        let hiddenElements = document.getElementsByClassName("password-display-hidden");
        Array.from(hiddenElements).forEach(element => {
            element.classList.replace("password-display-hidden", "password-display");
        });
    }, 2000);
}

document.getElementById('generate').addEventListener('click', generatePassword);

document.getElementById("first-password").addEventListener("click", () => writeClipboardText(document.getElementById("first-password").textContent));
document.getElementById("second-password").addEventListener("click", () => writeClipboardText(document.getElementById("second-password").textContent));

async function writeClipboardText(text) {
    try {
        await navigator.clipboard.writeText(text).then(() => {
            alert("Password copied to clipboard");
        });
    } catch (error) {
        console.error(error.message);
    }
}


