const colorDivs = document.querySelectorAll('.color');
const genereteBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHex = document.querySelectorAll('.color h2');
const popup = document.querySelector('.copy-container');
const adjustBtn = document.querySelectorAll('.adjust');
const lockBtn = document.querySelectorAll('.lock');
const adjusmentsClose = document.querySelectorAll('.close-adjustment');
const sliderContainer = document.querySelectorAll('.sliders');
const closeBtn = document.querySelectorAll('.close-adjustment');
let savedPaletts = [];
let initialColors;


// Evennt Listeners
genereteBtn.addEventListener('click', randomColors);

sliders.forEach(sliders => {
    sliders.addEventListener('input', hslControls);
});

colorDivs.forEach((div, index) => {
    div.addEventListener('change', () => {
        updateTextUi(index);
    });
});

currentHex.forEach(hex => {
    hex.addEventListener('click', () => {
        copyToClipboard(hex);
    });
});

popup.addEventListener('transitionend', () => {
    const popupBox = popup.children[0];
    popupBox.classList.remove('active');
    popup.classList.remove('active');
});

adjustBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        openAdjustmentPannel(index);
    });
});
closeBtn.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        closeAdjustmentPannel(index);
    }
    )
});

lockBtn.forEach((lock, index) => {
    const ic = lock.children[0];
    console.log(ic);
    lock.addEventListener('click', () => {
        ic.classList.toggle('fa-lock-open');
        ic.classList.toggle('fa-lock');
        colorDivs[index].classList.toggle('locked');
    });
});





// Functions

// Generete Random Color
function genereteHex() {
    const hexColor = chroma.random();
    return hexColor;
}

// Set Background To Div's And Checking Cotnrast of the H2 & Icons
function randomColors() {
    initialColors = [];
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = genereteHex();

        if (div.classList.contains('locked')) {
            initialColors.push(hexText.innerText);
            return;
        }
        else {
            initialColors.push(chroma(randomColor).hex());
        }

        // Add Background 
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        // Check for Contrast
        checkTextContrast(randomColor, hexText);


        // Initial Colorize Sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    });

    // Reset Inputs To The Curresponding Color
    resetInputs();

    // Check Contrast for Buttons
    adjustBtn.forEach((button, index) => {
        checkTextContrast(initialColors[index], button);
        checkTextContrast(initialColors[index], lockBtn[index]);
    });
}

// Check Contrast Color
function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();
    if (luminance > 0.5) {
        text.style.color = "black";
    }
    else {
        text.style.color = "white";
    }
}


// Colorize the Sliders
function colorizeSliders(color, hue, brightness, saturation) {
    // Scale Saturaion
    const nosat = color.set('hsl.s', 0);
    const fullSat = color.set('hsl.s', 1);
    const scaleSat = chroma.scale([nosat, color, fullSat]);
    // Scale Brightness
    const midBright = color.set('hsl.l', 0.5);
    const scaleBright = chroma.scale(["black", midBright, "white"]);

    // Input Update 
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSat(0)}, ${scaleSat(1)} )`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBright(0)}, ${scaleBright(0.5)},${scaleBright(1)} )`;

    // Scale hue
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204,75,75),rgb(204,204,75),rgb(75,204,75),rgb(75,204,204),rgb(75,75,204),rgb(204,75,204),rgb(204,75,75))`;

}


// Adding Functionality to The Sliders
function hslControls(e) {
    // Getting The Index 
    const index = e.target.getAttribute('data-bright') || e.target.getAttribute('data-set') || e.target.getAttribute('data-hue');

    // And The perant Div Element and All of His Sliders
    let sliders = e.target.parentElement.querySelectorAll('input[type="range"]');
    const hue = sliders[0]
    const bright = sliders[1];
    const sat = sliders[2];

    // Getting The Original Color 
    const bgColor = initialColors[index];

    // Setting The color From The Sliders
    let color = chroma(bgColor)
        .set('hsl.s', sat.value)
        .set('hsl.h', hue.value)
        .set('hsl.l', bright.value);

    // Adding it To The Background
    colorDivs[index].style.backgroundColor = color;

    // Colorize Sliders With Change
    colorizeSliders(color, hue, bright, sat);
}


// Changing The Hex H2 And The Icons With Change Of The Sliders
function updateTextUi(index) {
    // Getting The Div
    const activeDiv = colorDivs[index];
    // Getting his Current Color Object
    const color = chroma(activeDiv.style.backgroundColor);
    const textHex = activeDiv.querySelector('h2');
    const icons = activeDiv.querySelectorAll('.controls button');

    // Converting To Hex And Set's And Check Them Contrast
    textHex.innerText = color.hex();
    checkTextContrast(color, textHex);

    for (icon of icons) {
        checkTextContrast(color, icon);
    }
}

// Reseting The Sliders value's To The Corresponding Color
function resetInputs() {
    const sliders = document.querySelectorAll('.sliders input');

    sliders.forEach(slider => {
        if (slider.name === 'hue') {
            //get the background color
            const hueColor = initialColors[slider.getAttribute('data-hue')];
            //get the hue of the background
            const hueValue = chroma(hueColor).hsl()[0];
            slider.value = Math.floor(hueValue);
        }
        if (slider.name === 'brightness') {
            const brightColor = initialColors[slider.getAttribute('data-bright')];
            const brightValue = chroma(brightColor).hsl()[2];
            slider.value = Math.floor(brightValue * 100) / 100;
        }
        if (slider.name === 'saturation') {
            const setColor = initialColors[slider.getAttribute('data-set')];
            const setValue = chroma(setColor).hsl()[1];
            slider.value = Math.floor(setValue * 100) / 100;
        }
    });
}

function copyToClipboard(hex) {
    const el = document.createElement('textarea');
    el.value = hex.innerText;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    // Pop Up Animation
    const popupBox = popup.children[0];
    popup.classList.add('active');
    popupBox.classList.add('active');

}
function openAdjustmentPannel(index) {
    sliderContainer[index].classList.toggle('active');
}
function closeAdjustmentPannel(index) {
    sliderContainer[index].classList.remove('active');
}



// Implement Save To Pallete ana Local Storage Stuff
const saveBtn = document.querySelector('.save');
const submitSave = document.querySelector('.submit-save');
const closeSave = document.querySelector('.close-save');
const saveContainer = document.querySelector('.save-container');
const saveInput = document.querySelector('.save-container input');
const libraryContainer = document.querySelector('.library-container');
const libraryBtn = document.querySelector('.library');
const closeLibraryBtn = document.querySelector('.close-library');


// Event Listeners
saveBtn.addEventListener('click', () => {
    openPalette();
});
submitSave.addEventListener('click', () => {
    savePalette();
}
)
closeSave.addEventListener('click', () => {
    closePalette();
});
libraryBtn.addEventListener('click', openLibrary);
closeLibraryBtn.addEventListener('click', closeLibrary);


// Functions
function openPalette() {
    const popup = saveContainer.children[0];
    saveContainer.classList.add('active');
    popup.classList.add('active');
}

function closePalette(e) {
    const popup = saveContainer.children[0];
    saveContainer.classList.remove('active');
    popup.classList.add('remove');

}
function savePalette() {
    saveContainer.classList.remove('active');
    popup.classList.remove('active');
    
    let paletteNr;
    const name = saveInput.value;
    const colors = [];

    currentHex.forEach(hex => {
        colors.push(hex.innerText);
    });
    const paletteObjects = JSON.parse(sessionStorage.getItem('palettes'));

    if(paletteObjects){
        paletteNr = paletteObjects.length;
    }
    else{
        paletteNr = savedPaletts.length;
    }
    
    const paletteObj = { name, colors, nr: paletteNr };

    savedPaletts.push(paletteObj);

    // Save To Local Storage
    savedToLocal(paletteObj);

    saveInput.value = "";

    // Generete The Palette for The Library
    const palette = document.createElement('div');
    palette.classList.add(paletteObj.nr);
    palette.classList.add('custom-palette');
    const title = document.createElement('h4');
    title.innerText = paletteObj.name;
    const preview = document.createElement('div');
    preview.classList.add('small-preview');
    paletteObj.colors.forEach(smallColor => {
    const smallDiv = document.createElement('div');
    smallDiv.style.backgroundColor = smallColor;
    preview.appendChild(smallDiv);
    });
    const removeBtn = document.createElement('button');
    const paletteBtn= document.createElement('button');
    removeBtn.classList.add(paletteObj.nr);
    removeBtn.classList.add('remove-palette-btn');
    paletteBtn.classList.add('pick-palette-btn');
    paletteBtn.classList.add(paletteObj.nr);
    paletteBtn.innerText = "Select";
    removeBtn.innerText = "Delete";

    // Attach Event To The Button
    paletteBtn.addEventListener('click', e=>{
        closeLibrary();
        const paletteIndex = e.target.classList[1];
        initialColors = [];
        savedPaletts[paletteIndex].colors.forEach((color,index)=>{
            initialColors.push(color);
            colorDivs[index].style.backgroundColor = color;
            const text = colorDivs[index].children[0];
            checkTextContrast(color,text);
            updateTextUi(index);
        });
    });

    removeBtn.addEventListener('click', (e)=>{
        const paletteIndex = parseInt(e.target.classList[0]);
        const library = libraryContainer.children[0];
         for(let palette of library.children){
            if(parseInt(palette.classList[0]) === paletteIndex){
                library.removeChild(palette);
                removeFromLocal(paletteIndex);
                break;
            }
        }
    })

    // Append To Library
    palette.appendChild(title);
    palette.appendChild(removeBtn);
    palette.appendChild(preview);
    palette.appendChild(paletteBtn);
    libraryContainer.children[0].appendChild(palette);
}



function getLocal(){

    if(sessionStorage.getItem('palettes') === null){
        localPalette = [];
    }
    else{
        const paletteObjects = JSON.parse(sessionStorage.getItem('palettes'));
        savedPaletts = [...paletteObjects];
        paletteObjects.forEach(paletteObj=>{
            // Generete The Palette for The Library
            const palette = document.createElement('div');
            palette.classList.add(paletteObj.nr);
            palette.classList.add('custom-palette');
            const title = document.createElement('h4');
            title.innerText = paletteObj.name;
            const preview = document.createElement('div');
            preview.classList.add('small-preview');
            paletteObj.colors.forEach(smallColor => {
                const smallDiv = document.createElement('div');
                smallDiv.style.backgroundColor = smallColor;
                preview.appendChild(smallDiv);
            });

            const paletteBtn = document.createElement('button');
            paletteBtn.classList.add('pick-palette-btn');
            paletteBtn.classList.add(paletteObj.nr);
            paletteBtn.innerText = "Select";
            const removeBtn = document.createElement('button');
            removeBtn.classList.add('remove-palette-btn');
            removeBtn.classList.add(paletteObj.nr);
            removeBtn.innerText = "Delete";

            // Attach Event To The Button
            paletteBtn.addEventListener('click', e => {
                closeLibrary();
                const paletteIndex = e.target.classList[1];
                initialColors = [];
                paletteObjects[paletteIndex].colors.forEach((color, index) => {
                    initialColors.push(color);
                    colorDivs[index].style.backgroundColor = color;
                    const text = colorDivs[index].children[0];
                    checkTextContrast(color, text);
                    updateTextUi(index);

                });
            });
            removeBtn.addEventListener('click', (e)=>{
                const paletteIndex = parseInt(e.target.classList[1]);
                const library = libraryContainer.children[0];
    
                for(let pallete of library.children){
                    if(parseInt(pallete.classList[0]) === paletteIndex){
                        console.log(pallete)
                        library.removeChild(pallete);
                        removeFromLocal(paletteIndex);
                        break;
                    }
                }
            })
    
            // Append To Library
            palette.appendChild(title);
            palette.appendChild(removeBtn)
            palette.appendChild(preview);
            palette.appendChild(paletteBtn);
            libraryContainer.children[0].appendChild(palette);

        })
    }

}

function removeFromLocal(deleteIndex){
    console.log(deleteIndex);
    let palettes = JSON.parse(sessionStorage.getItem('palettes'));
    let newPalette = palettes.filter((el)=>{
        
        return  el.nr !== deleteIndex ;
    });
    
    sessionStorage.setItem('palettes', JSON.stringify(newPalette));
 
}

function savedToLocal(paletteObj) {
    let localPalette;
    if (sessionStorage.getItem('palettes') === null) {
        localPalette = [];
    }
    else {
        localPalette = JSON.parse(sessionStorage.getItem('palettes'));
    }
    localPalette.push(paletteObj);
    sessionStorage.setItem('palettes', JSON.stringify(localPalette));


}


function openLibrary(){
    const popup = libraryContainer.children[0];
    libraryContainer.classList.add('active');
    popup.classList.add('active');
}

function closeLibrary(){
    const popup = libraryContainer.children[0];
    libraryContainer.classList.remove('active');
    popup.classList.remove('active');
}

getLocal();
randomColors();
