const colorPicker = document.querySelector('.color-picker');
const schemePicker = document.getElementById('scheme-select');
const colorOne = document.querySelector('.color-one');
const colorsDisplay = document.querySelector('.colors-display')
let colorsArray = []

document.querySelector('.get-scheme-button').addEventListener('click', function() {
    colorsArray = []
    const colorChosen = colorPicker.value.slice(1);
    const schemeChosen = schemePicker.value;
    fetch(`https://www.thecolorapi.com/scheme?hex=${colorChosen}&mode=${schemeChosen}`)
        .then(response => response.json())
        .then(data => {
            data.colors.forEach(color => {
                colorsArray.push(color.hex.value)
            })
            for (let i = 0; i < colorsArray.length; i++) {
                    document.querySelector(`.color-${i}`)
                        .style.backgroundColor = `${colorsArray[i]}`
                    document.querySelector(`.color-${i}`)
                        .innerHTML = `
                        <div class="inner-display" id="inner-text-${[i]}">
                            ${colorsArray[i]}
                        </div>
                        `
                } 
        });
})

// Gets value of hex for the specific inner-text that is clicked, then calls the function to copy it to the clipboard

colorsDisplay.addEventListener('click', function(e) {
    const targetId = e.target.id
    if (targetId && targetId.startsWith('inner-text-')) {
        const index = targetId.split('-')[2]
        const hexValue = colorsArray[index]
        copyToClipboard(hexValue);
    }
})

// Creates temporary text field on page to then use the clipboard API to copy the contents of the hexcode.  Then, a brief notification displays to the user that it's been copied 

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    const notification = document.createElement('div')
    notification.textContent = 'Copied to clipboard!';
    notification.className = 'copy-notification';
    document.body.appendChild(notification);
    setTimeout(() => {
        document.body.removeChild(notification);
    }, 1100);
}
