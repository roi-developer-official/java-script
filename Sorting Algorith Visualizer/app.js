const SET_LENGTH = 35;
const START_LENGTH = 4;
class Main {
    rangeText = document.querySelector('.range_text');
    rangeInput = document.getElementById('range_input');
    generateNewArrayBtn = document.querySelector('.nav_item__array_generete');
    arrayCellsList = document.querySelector('.array_cells__items');
    sortBtn = document.querySelector('.nav_item_sort');
    originalArray;
    algorithm;

    init() {
        this.sortBtn.addEventListener('click', this.beforeSort.bind(this));
        this.rangeInput.value = 4;
        this.rangeText.textContent = 4;
        this.generateArray();
        this.generateNewArrayBtn.addEventListener('click', this.genrerateNewArray.bind(this));
        this.rangeInput.addEventListener('input', () => {
            this.rangeText.textContent = this.rangeInput.value;
            this.resizeArray();
        });
    }

    generateArray() {
        this.originalArray = document.createElement('ul');
        for (let i = 0; i < SET_LENGTH; i++) {
            const listItem = document.createElement('li');
            listItem.className = "array_cell";
            listItem.id = i;
            const num = Math.random() * 200;
            listItem.style.height = num + 23 + 'px';
            listItem.value = num;
            listItem.style.left = 22 * i + 'px'
            this.appendTextNumber(listItem, num);
            this.originalArray.append(listItem);
        }

        for (let i = 0; i < START_LENGTH; i++) {
            let temp = this.originalArray.children[i].cloneNode(true);
            this.arrayCellsList.append(temp);
        }

    }

    resizeArray() {

        let parent = this.arrayCellsList;
        while (parent.firstChild) {
            parent.firstChild.remove();
        }

        for (let i = 0; i < this.rangeInput.value; i++) {
            let temp = this.originalArray.children[i].cloneNode(true);

            if(i % 2 !== 0 && i > 3){
                this.arrayCellsList.prepend(temp);
            }
            else{
                this.arrayCellsList.append(temp)
            }
        }

        for (let i = 0; i < this.arrayCellsList.children.length; i++) {
            this.arrayCellsList.children[i].id = i;
        }
    }


    genrerateNewArray() {
        let parent = this.originalArray;

        while (parent.firstChild) {
            parent.removeChild(parent.firstChild)
        }

        for (let i = 0; i < SET_LENGTH; i++) {
            const listItem = document.createElement('li');
            listItem.className = "array_cell";
            listItem.id = i;
            const num = Math.random() * 200;
            listItem.style.height = num + 23 + 'px';
            listItem.value = num;
            listItem.style.left = 22 * i + 'px'
            this.appendTextNumber(listItem, num);
            this.originalArray.append(listItem);
        }
        this.resizeArray();
    }

    createElements() {
        let len = this.arrayCellsList.children.length;

        if (this.rangeInput.value > len) {
            for (let i = len; i < this.rangeInput.value; i++) {
                const listItem = document.createElement('li');
                listItem.className = "array_cell";
                listItem.id = i;
                const num = Math.random() * 200;
                listItem.style.height = num + 23 + 'px';
                listItem.value = num;
                listItem.style.left = 22 * i + 'px'
                this.appendTextNumber(listItem, num);
                i % 2 === 0 ? this.arrayCellsList.append(listItem) : this.arrayCellsList.prepend(listItem)
            }
            for (let i = 0; i < this.arrayCellsList.children.length; i++) {
                this.arrayCellsList.children[i].id = i;
            }


        } else 
            for (let i = len - 1; i >= this.rangeInput.value; i--) {
                i % 2 === 0 ? this.arrayCellsList.removeChild(this.arrayCellsList.children[i]) : this.arrayCellsList.removeChild(this.arrayCellsList.children[0])
            }
        


    }

    beforeSort() {
        let arr = this.arrayCellsList.children;
        let doSort = false;
        for (let i = 0; i < arr.length - 1; i++) 
            if (arr[i].value > arr[i + 1].value) 
                doSort = true;
           
        if (this.algorithm === undefined) {
            alert('please choose an algorithm');
        } else if (doSort) {
            this.sortBtn.setAttribute('disabled', true);
            this.rangeInput.setAttribute('disabled', true);
            this.generateNewArrayBtn.setAttribute('disabled', true);
            this.generateNewArrayBtn.style.color = '#ccc';
            this.sortBtn.style.color = '#ccc'
            this.sort();
        } 
        else {
            return;
        }

    }

    sort() {
        switch (this.algorithm) {
            case 'bubble-sort':
                new BubbleSort(this.arrayCellsList).sort();
                break;
            case 'merge-sort':
                new MergeSort(this.arrayCellsList).sort();
                break;
            case 'heap-sort':
                new HeapSort(this.arrayCellsList).sort();
                break;

            case 'quick-sort':
                new QuickSort(this.arrayCellsList).sort();
        }
    }

    appendTextNumber(listItem, num) {
        const number = document.createElement('p');
        number.classList.add('number');
        number.textContent = Math.floor(num);
        listItem.append(number);
    }

    setAlgorithem(algo) {
        this.algorithm = algo;

    }
}

class Shared extends Main {
    array;
    constructor(array) {
        super();
        this.array = array;
    }
    onDoneSort() {
        for (let i = 0; i < this.array.length; i++) {
            this.array[i].style.background = 'green';
        }
        this.rangeInput.removeAttribute('disabled', true);
        this.sortBtn.removeAttribute('disabled', true);
        this.sortBtn.style.color = 'white';
        this.generateNewArrayBtn.removeAttribute('disabled', true);
        this.generateNewArrayBtn.style.color = 'white';

    }

    switchNodes(i, j) {

        let elIPos = this.array[i].getBoundingClientRect().left;
        let elJPos = this.array[j].getBoundingClientRect().left;
        let moveLeft = (elIPos - elJPos);
        this.array[i].style.transform = `translateX(-${moveLeft}px)`
        this.array[j].style.transform = `translateX(${moveLeft}px)`

        this.array[j].addEventListener('transitionend', () => {

            this.array[i].style.transform = `translateX(0)`
            this.array[j].style.transform = `translateX(0)`
            let temp = this.array[i].cloneNode(true);
            this.array[i].parentNode.replaceChild(this.array[j].cloneNode(true), this.array[i]);
            this.array[j].parentNode.replaceChild(temp, this.array[j]);

        })
    }


}


class Nav {
    main = new Main();
    navSortingItems = document.querySelector('.nav_sotring__items');
    bubbleSortBtn = document.querySelector('.nav_item_bubble_sort');
    heapSortBtn = document.querySelector('.nav_item_heap_sort');
    mergeSortBtn = document.querySelector('.nav_item_merge_sort');
    quickSortBtn = document.querySelector('.nav_item_quick_sort');

    init() {
        this.main.init();
        this.bubbleSortBtn.addEventListener('click', () => {
            this.main.algorithm = 'bubble-sort';
            for (let i = 0; i < this.navSortingItems.children.length; i++) 
                this.navSortingItems.children[i].style.color = 'white';
            


            this.bubbleSortBtn.style.color = 'red';
        });

        this.heapSortBtn.addEventListener('click', () => {
            this.main.algorithm = 'heap-sort';
            for (let i = 0; i < this.navSortingItems.children.length; i++) 
                this.navSortingItems.children[i].style.color = 'white';
            


            this.heapSortBtn.style.color = 'red';
        });

        this.quickSortBtn.addEventListener('click', () => {
            this.main.algorithm = 'quick-sort';
            for (let i = 0; i < this.navSortingItems.children.length; i++) 
                this.navSortingItems.children[i].style.color = 'white';
            


            this.quickSortBtn.style.color = 'red';
        });

        this.mergeSortBtn.addEventListener('click', () => {
            this.main.algorithm = 'merge-sort';
            for (let i = 0; i < this.navSortingItems.children.length; i++) 
                this.navSortingItems.children[i].style.color = 'white';
            


            this.mergeSortBtn.style.color = 'red';
        });
    }
}
let nav = new Nav();
nav.init();

class BubbleSort extends Shared {
    array;

    constructor(array) {
        super(array);
        this.array = array.children;
    }

    sort() {
        let numbers = [];
        let j1 = [];

        for (let i = 0; i < this.array.length; i++) {
            numbers.push(this.array[i].value);
        }

        for (let i = 0; i < numbers.length; i++) {
            for (let j = 1; j < numbers.length; j++) {
                if (numbers[j] < numbers[j - 1]) {
                    j1.push(j);
                    j1.push(j - 1);
                    let temp = numbers[j];
                    numbers[j] = numbers[j - 1];
                    numbers[j - 1] = temp;
                }
            }
        }

        let i = 0;
        let bubbleSortInterval = setInterval(() => {
            if (i === j1.length) {
                this.onDoneSort();
                clearInterval(bubbleSortInterval);
                return;
            }

           this.switchNodes(j1[i],j1[i+1]);
     
            i += 2;
        }, 150);

    }

}


class QuickSort extends Shared{
    array;
    j = [];
    

    constructor(array) {
        super(array);
        this.array = array.children;
    }

    sort() {
        let numbers = [];
        for (let i = 0; i < this.array.length; i++) {
            numbers.push(this.array[i].value);
        }

        this.quickSort(numbers, 0, numbers.length - 1);


        let i = 0;
        let quickSortInterval = setInterval(() => {
            if (i >= this.j.length) {
                this.onDoneSort();
                clearInterval(quickSortInterval);
                return;
            }

            this.switchNodes(this.j[i], this.j[i + 1]);
            i += 2;
        }, 150);
    }


    quickSort(array, start, end) {
        if (start >= end) 
            return;
        


        let boundry = this.partition(array, start, end);
        this.quickSort(array, start, boundry - 1);
        this.quickSort(array, boundry + 1, end);

    }

    partition(array, start, end) {
        let pivot = array[end];
        let boundry = start - 1;
        for (let i = start; i <= end; i++) {
            if (array[i] <= pivot) {
                boundry++;
                this.j.push(i);
                this.j.push(boundry);
                let temp = array[boundry];
                array[boundry] = array[i];
                array[i] = temp;
            }
        }

        return boundry;
    }

}

class HeapSort extends Shared {
    array;
    j1 = [];
    j2 = [];

    constructor(array) {
        super(array);
        this.array = array.children;
    }
    sort() {
        let numbers = [];
        for (let i = 0; i < this.array.length; i++) {
            numbers.push(this.array[i].value);
        }
        this.heapSort(numbers);
    }
    heapSort(array) {
        let n = this.array.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) 
            this.heapify(array, n, i);
        
        for (let i = n - 1; i > 0; i--) {
            this.j2.push(i);
            this.j1.push(0);
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            this.heapify(array, i, 0);
        }
        let i = 0;
        let heapSortInteval = setInterval(() => {
            if (i === this.j1.length) {
                this.onDoneSort();
                clearInterval(heapSortInteval);
                return;
            }
            this.switchNodes(this.j1[i], this.j2[i]);
            i++;
        }, 150);

    }
    heapify(array, n, i) {
        let largest = i;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        if (l < n && array[l] > array[largest]) 
            largest = l;
        

        if (r < n && array[r] > array[largest]) 
            largest = r;
        

        if (largest != i) {
            this.j1.push(i);
            this.j2.push(largest);
            let swap = array[i];
            array[i] = array[largest];
            array[largest] = swap;
            this.heapify(array, n, largest);
        }
    }

}



class MergeSort extends Shared{
        array;
        cells;
        ms = 0;
        indexes = [];
        constructor(array) {
            super(array);
            this.cells = array.children;
            this.array = Array.from(array.childNodes);
        }

        sort() {
            this.indexes = [];
            this.mergeSort(this.array);
            
                let i = 0; 
                let interval = setInterval(()=>{
                    if(i >= this.indexes.length){
                       new Shared(this.cells).onDoneSort();
                        clearInterval(interval);
                        return;
                    }

                    this.switchNodes(this.indexes[i], this.indexes[i+1]);
                    i+=2;

                },150);    
        }


        mergeSort(array) {

        if (array.length <= 1)
            return array;

        let middle = Math.ceil(array.length / 2);
        // slice the array into two.
        const left = this.mergeSort(array.splice(0, middle));
        const right = this.mergeSort(array.splice(- middle));

        return this.merge(left, right);
    }
    merge(left, right) {
        let resultArray = [];
        let i = 0;
        let j = 0;
        let rangeArray = [];
        while (i < left.length && j < right.length) {
            if (left[i].value < right[j].value) {
                resultArray.push(left[i++]);
            }
             else {
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

        this.replaceNodes(rangeArray);
        return resultArray;
    }

    switchNodes(i, j) {

        let elIPos = this.cells[i].getBoundingClientRect().left;
        let elJPos = this.cells[j].getBoundingClientRect().left;
        let moveLeft = (elIPos - elJPos);
        this.cells[i].style.transform = `translateX(-${moveLeft}px)`
        this.cells[j].style.transform = `translateX(${moveLeft}px)`

        this.cells[j].addEventListener('transitionend', () => {
            this.cells[i].style.transform = `translateX(0)`
            this.cells[j].style.transform = `translateX(0)`
            let temp = this.cells[i].cloneNode(true);
            this.cells[i].parentNode.replaceChild(this.cells[j].cloneNode(true), this.cells[i]);
            this.cells[j].parentNode.replaceChild(temp, this.cells[j]);
        })


    }

    replaceNodes(range) { 
        // the original ul.
        let items = this.cells;
        // the id's from the range array
        let rangeArray = [];
        // only the el with the id's which the original ul includes
        let resultArray = [];
        let min;
        range.forEach(item => rangeArray.push(Number.parseInt(item)));
        min = rangeArray.reduce((curr, prev) => curr < prev ? curr : prev);
       

        rangeArray.map(item => {
            for (let i = 0; i < items.length; i++) {
                if (item == items[i].id)
                    resultArray.push(items[i].cloneNode(true));
            }
        })

        let i = min;
        let j = 0;
        let interval = setInterval(() => {
                    if (j >= resultArray.length) {
                        clearInterval(interval);
                        return;
                    }
                    let index;
                    for (let k = 0; k < items.length; k++) {
                        if (items[k].id == resultArray[j].id) {
                            index = k;
                            break;
                        }
                    }
        
                    if (items[i].id !== items[index].id) {
                     
                        this.indexes.push(index);
                        this.indexes.push(i);
        
        
                        let temp = items[i].id;
                        items[i].id = items[index].id;
                        items[index].id = temp;
        
                    }
                    j++;
                    i++;
                },
                0);

              
 }

}
