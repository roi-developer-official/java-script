const rangeText = document.querySelector('.range_text');
const rangeInput = document.getElementById('range_input');
let arrayCellsList = document.querySelector('.array_cells__items');
const sortBtn = document.querySelector('.nav_item_sort');
const navSortingItems = document.querySelector('.nav_sotring__items');
const bubbleSortBtn = document.querySelector('.nav_item_bubble_sort');
const heapSortBtn = document.querySelector('.nav_item_heap_sort');
const mergeSortBtn = document.querySelector('.nav_item_merge_sort');
const quickSortBtn = document.querySelector('.nav_item_quick_sort');
let algorithem;
let interval;
let j1 = [];
let j2 = [];




bubbleSortBtn.addEventListener('click', () => {
    setAlgorithem('bubble-sort');
    for (let i = 0; i < navSortingItems.children.length; i++)
        navSortingItems.children[i].style.color = 'white';

    bubbleSortBtn.style.color = 'red';

});
heapSortBtn.addEventListener('click', () => {
    for (let i = 0; i < navSortingItems.children.length; i++)
        navSortingItems.children[i].style.color = 'white';
    setAlgorithem('heap-sort');

    heapSortBtn.style.color = 'red';
});
quickSortBtn.addEventListener('click', () => {
    setAlgorithem('quick-sort');
    for (let i = 0; i < navSortingItems.children.length; i++)
        navSortingItems.children[i].style.color = 'white';
    quickSortBtn.style.color = 'red';
});
mergeSortBtn.addEventListener('click', () => {
    setAlgorithem('merge-sort');
    for (let i = 0; i < navSortingItems.children.length; i++)
        navSortingItems.children[i].style.color = 'white';
    mergeSortBtn.style.color = 'red';
}
);
rangeInput.addEventListener('input', () => {
    rangeText.textContent = rangeInput.value;
    createElement();
});
rangeInput.addEventListener('change', clear);
sortBtn.addEventListener('click', sort);

function setAlgorithem(algo) {
    algorithem = algo;
}

function sort() {
    
    switch (algorithem) {
        case 'bubble-sort':
            bubbleSort(arrayCellsList);
            break;
        case 'merge-sort':
            beforeMergeSort(arrayCellsList);
            break;
        case 'heap-sort':
            beforeHeapSort(arrayCellsList);
            break;
    }
}


function createElement() {
    const numOfCells = rangeInput.value;
    for (let li of arrayCellsList.querySelectorAll('li')) {
        li.remove();
    }

    for (let i = 0; i < rangeInput.value; i++) {
        const listItem = document.createElement('li');
        arrayCellsList.style.maxWidth = '40%';
        listItem.className = "array_cell";
        listItem.id = i;

        listItem.style.width = '2rem';
        if (numOfCells > 20) {
            arrayCellsList.style.maxWidth = '50%';
            listItem.style.width = '3rem';
        }
        if (numOfCells > 40) {
            arrayCellsList.style.maxWidth = '55%';
        }
        if (numOfCells > 60) {
            arrayCellsList.style.maxWidth = '60%';
        }
        if (numOfCells > 70) {
            arrayCellsList.style.maxWidth = '65%';
        }
        if (numOfCells > 80) {
            arrayCellsList.style.maxWidth = '70%';
        }
        if (numOfCells > 90) {
            arrayCellsList.style.maxWidth = '75%';
        }
        if (numOfCells > 100) {
            arrayCellsList.style.maxWidth = '80%';
        }
        if (numOfCells > 110) {
            arrayCellsList.style.maxWidth = '85%';
        }
        if (numOfCells > 120) {
            arrayCellsList.style.maxWidth = '95%';
        }

        if (numOfCells > 130) {
            arrayCellsList.style.maxWidth = '95%';
        }
        if (numOfCells > 140) {
            arrayCellsList.style.maxWidth = '100%';
        }
        const num = Math.random() * 200;
        listItem.style.height = num + 23 + 'px';
        listItem.value = num;
        if (numOfCells < 11) {
            appendTextNumber(listItem, num);
            arrayCellsList.append(listItem);
        }
        arrayCellsList.append(listItem);

    }
}

function appendTextNumber(listItem, num) {
    const number = document.createElement('p');
    number.classList.add('number');
    number.textContent = Math.floor(num);
    listItem.append(number);
}



function bubbleSort(array) {
    items = array.children;

    let numbers = [];
    for (let i = 0; i < items.length; i++) {
        numbers.push(items[i].value);
    }
    let j1 = [];
    let j2 = [];

    for (let i = 0; i < numbers.length; i++) {
        for (let j = 1; j < numbers.length; j++) {
            if (numbers[j] < numbers[j - 1]) {
                j1.push(j);
                j2.push(j - 1);
                let temp = numbers[j];
                numbers[j] = numbers[j - 1];
                numbers[j - 1] = temp;
            }
        }

    }
    let i = 0;
    let bubbleSortInterval = setInterval(() => {
        if (i === j1.length) {
            clearInterval(bubbleSortInterval);
            return;
        }
        switchNodes(j1[i], j2[i], items);
        i++;
    }, 100);
}


function beforeHeapSort(array){
    let numbers = [];
    numbers = Array.from(array.childNodes);
    for(let i = 0; i < numbers.length; i++){
        numbers[i] = numbers[i].value;
    }
    heapSort(numbers);

}


function heapSort(array){

    let n = array.length;
    for(let i = Math.floor(n / 2)  - 1; i >=0; i--)
        heapify(array,n,i);

    for(let i = n-1; i > 0; i--){
        j1.push(0);
        j2.push(i);
        let temp = array[0];
        array[0] = array[i];
        array[i] = temp;
        heapify(array,i,0);
    }

    let i = 0;
    let heapSortInteval = setInterval(() => {
        if (i === j1.length) {
            clearInterval(heapSortInteval);
            return;
        }
        switchNodes(j1[i], j2[i], arrayCellsList.children);
        i++;
    }, 100);

}

function heapify(array, n, i){

    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i  + 2;

    if(l < n && array[l] > array[largest])
        largest = l;
    if(r < n && array[r] > array[largest])
        largest = r;

    if(largest != i){
        j1.push(i);
        j2.push(largest);
        let swap = array[i];
        array[i] = array[largest];
        array[largest] = swap;
        heapify(array,n,largest);
    }
}


function beforeMergeSort(array) {
    let numbers = [];
    numbers = Array.from(array.childNodes);
    numbers = mergeSort(numbers);
}

function mergeSort(array) {

    let items = arrayCellsList.children;
    let leftIndex, rightIndex;
    if (array.length <= 1)
        return array;

    let middle = Math.ceil(array.length / 2);
    //slice the array into two.
    const left = mergeSort(array.splice(0, middle));
    const right = mergeSort(array.splice(-middle));

    for (let i = 0; i < items.length; i++) {
        if (left[0].id === items[i].id)
            leftIndex = i;
    }
    for (let i = 0; i < items.length; i++) {
        if (right[0].id === items[i].id)
            rightIndex = i;
    }


    return merge(left, right);
}

function merge(left, right) {
    let resultArray = [];
    let i = j = 0;
    let rangeArray = [];
    while (i < left.length && j < right.length) {
        if (left[i].value < right[j].value) {
            animateArray.push(left[i], right[j]);
            resultArray.push(left[i++]);
        }
        else {
            animateArray.push(right[j], left[i]);
            resultArray.push(right[j++]);
        }
    }
    while (i < left.length) {
        resultArray.push(left[i++]);
    }
    while (j < right.length) {
        resultArray.push(right[j++]);
    }

    for (let i = 0; i < resultArray.length; i++) {
        rangeArray.push(resultArray[i].id);
    }
    replaceNodes(rangeArray);
    return resultArray;
}


function replaceNodes(range) {

    let items = arrayCellsList.children;
    let rangeArray = [];
    let resultArray = [];
    let min, max;
    range.forEach(item => rangeArray.push(Number.parseInt(item)));
    min = rangeArray.reduce((curr, prev) => curr < prev ? curr : prev);
    max = rangeArray.reduce((curr, prev) => curr > prev ? curr : prev);

    rangeArray.map(item => {
        for (let i = 0; i < items.length; i++) {
            if (item == (items[i].id))
                resultArray.push(items[i]);
        }
    });



    let j = 0;
    let i = min;
    let interval = setInterval(() => {
        if (i === max)
            clearInterval(interval);

        let index;
        let temp = items[i].cloneNode(true);

        for (let k = 0; k < items.length; k++) {
            if (items[k].id == resultArray[j].id) {
                index = k;
            }
        }

        let temp2 = resultArray[j].cloneNode(true);
        temp.style.backgroundColor = 'rgb(20,202,10)';
        temp2.style.backgroundColor = 'rgb(20,202,10)';
        setTimeout(() => {
            temp2.style.backgroundColor = 'darkblue';
            temp.style.backgroundColor = 'darkblue';
        }, 20);

        items[i].parentElement.replaceChild(temp2, items[i]);
        items[i].parentElement.replaceChild(temp, items[index]);

        j++;
        i++;
    }, 50)

}


function switchNodes(i, j, items) {

    if(algorithem === 'heap-sort')
        items[i].style.background = 'rgb(20,202,10)';
    else
        items[i].style.background = 'black';
        items[j].style.background = 'rgb(20,202,10)';
        setTimeout(() => {
            items[i].style.background = 'blue';
            items[j].style.background = 'blue';
        }, 35)
        temp = items[i].cloneNode(true);
        items[i].parentNode.replaceChild(items[j].cloneNode(true), items[i]);
        items[j].parentNode.replaceChild(temp, items[j]);

}



function clear() {
    if (interval) {
        clearInterval(interval);
    }

}

function init() {
    rangeInput.value = 4;
    createElement();
}

init();









