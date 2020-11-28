// setTimeOut example:
/*

    let ims  = 0;
       let j =0;
        while(j < numbers.length){
            for(let i = 1; i < numbers.length; i++){
                setTimeout(()=>{
                    // this.array[i-1].style.border = '2px solid red';
                    console.log(i-1);
                    setTimeout(()=>{
                            console.log(i);
        
                    },200);
                },ims)
                ims+=1000
            }
            j++;
        }
*/

class Main {

    rangeText = document.querySelector('.range_text');
    rangeInput = document.getElementById('range_input');
    generateNewArrayBtn = document.querySelector('.nav_item__array_generete');
    arrayCellsList = document.querySelector('.array_cells__items');
    sortBtn = document.querySelector('.nav_item_sort');
    algorithm;

    init() {
        this.sortBtn.addEventListener('click', this.beforeSort.bind(this));
        this.rangeInput.value = 4;
        this.rangeText.textContent = 4;
        this.createElements();
        this.generateNewArrayBtn.addEventListener('click',this.createElements.bind(this));
        this.rangeInput.addEventListener('input', () => {
            this.rangeText.textContent = this.rangeInput.value;
            this.createElements();
        });
    }



    createElements() {
        for (let li of this.arrayCellsList.querySelectorAll('li')) {
            li.remove();
        }

        for (let i = 0; i < this.rangeInput.value; i++) {
            const listItem = document.createElement('li');
            listItem.className = "array_cell";
            listItem.id = i;
            const num = Math.random() * 200;
            listItem.style.height = num + 23 + 'px';
            listItem.value = num;
            this.appendTextNumber(listItem, num);
            this.arrayCellsList.append(listItem);
        }
    }
    beforeSort(){
        if(this.algorithm === undefined){
            alert('please choose an algorithm');
        }
        else{
            this.sortBtn.setAttribute('disabled',true);
            this.rangeInput.setAttribute('disabled', true);
            this.generateNewArrayBtn.setAttribute('disabled', true);
            this.generateNewArrayBtn.style.color = '#ccc';
            this.sortBtn.style.color = '#ccc'
            this.sort();
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

class Shared extends Main{
    array;
    constructor(array){
        super();
        this.array = array;
    }
    onDoneSort(){
        for(let i = 0; i < this.array.length; i++){
            this.array[i].style.background = 'green';
        }
        this.rangeInput.removeAttribute('disabled', true);
        this.sortBtn.removeAttribute('disabled',true);
        this.sortBtn.style.color = 'white';
        this.generateNewArrayBtn.removeAttribute('disabled', true);
        this.generateNewArrayBtn.style.color = 'white';

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

class BubbleSort {
    array;
    constructor(array) {
        this.array = array.children;
    }

    sort() {
        let numbers = [];
        let j1 = [];
        let j2 = [];
        let arr = [];
        for (let i = 0; i < this.array.length; i++) {
            numbers.push(this.array[i].value);
        }

        for (let i = 0; i < numbers.length; i++) {
            for (let j = 1; j < numbers.length; j++) {
                arr.push(j - 1);
                arr.push(j);
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
                new Shared(this.array).onDoneSort();
                clearInterval(bubbleSortInterval);
                return;
            }
            this.switchNodes(j1[i], j2[i], this.array);
            i++;
        }, 100);

    }

    switchNodes(i, j) {
        this.array[i].style.background = 'black';
        this.array[j].style.background = 'rgb(20,202,10)';
        setTimeout(() => {
            this.array[i].style.background = 'blue';
            this.array[j].style.background = 'blue';
        }, 35)
        let temp = this.array[i].cloneNode(true);
        this.array[i].parentNode.replaceChild(this.array[j].cloneNode(true), this.array[i]);
        this.array[j].parentNode.replaceChild(temp, this.array[j]);
    }

}

class QuickSort {
    array;
    j = [];

    constructor(array) {
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
                new Shared(this.array).onDoneSort();
                clearInterval(quickSortInterval);
                return;
            }
            this.switchNodes(this.j[i],this.j[i + 1]);
            i+=2;
        }, 100);
        
    }

    switchNodes(i, j) {

        this.array[i].style.background = 'black';
        this.array[j].style.background = 'rgb(20,202,10)';
        setTimeout(() => {
            this.array[i].style.background = 'blue';
            this.array[j].style.background = 'blue';
        }, 35)
        let temp = this.array[i].cloneNode(true);

        this.array[i].parentNode.replaceChild(this.array[j].cloneNode(true), this.array[i]);
        this.array[j].parentNode.replaceChild(temp, this.array[j]);

    }


    quickSort(array, start, end) {
        if (start >= end) 
            return;
        
        let boundry = this.partition(array,start,end);
        this.quickSort(array,start,boundry - 1);
        this.quickSort(array,boundry + 1, end);

    }

    partition(array, start, end) {
        let pivot = array[end];
        let boundry = start - 1;
        for (let i = start; i <= end; i++) {
            if (array[i] <= pivot) {
                boundry++;
                this.j.push(boundry);
                this.j.push(i);
                let temp = array[boundry];
                array[boundry] = array[i];
                array[i] = temp;
            }
        }

        return boundry;
    }

}

class HeapSort {
    array;
    j1=[];
    j2 = [];

    constructor(array) {
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
            this.j1.push(0);
            this.j2.push(i);
            let temp = array[0];
            array[0] = array[i];
            array[i] = temp;
            this.heapify(array, i, 0);
        }

        let i = 0;
        let heapSortInteval = setInterval(() => {
            if (i === this.j1.length) {
                new Shared(this.array).onDoneSort();
                clearInterval(heapSortInteval);
                return;
            }
            this.switchNodes(this.j1[i], this.j2[i]);
            i++;
        }, 100);


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

    switchNodes(i, j) {
        this.array[i].style.background = 'rgb(20,202,10)';
        this.array[j].style.background = 'rgb(20,202,10)';
        setTimeout(() => {
            this.array[i].style.background = 'blue';
            this.array[j].style.background = 'blue';
        }, 35)
        let temp = this.array[i].cloneNode(true);

        this.array[i].parentNode.replaceChild(this.array[j].cloneNode(true), this.array[i]);
        this.array[j].parentNode.replaceChild(temp, this.array[j]);
    }

}


class MergeSort {
    array;
    cells;
    ms = 0;
    
    constructor(array) {
        this.cells = array.children;
        this.array = Array.from(array.childNodes);
    }

    sort() {
        this.mergeSort(this.array);
    
        for(let i = 0; i < this.cells.length; i++){
            this.ms += 400;
        }
        this.ms += 40;
       
        setTimeout(()=>{
            new Shared(this.cells).onDoneSort();
        }, this.ms)
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
            if (left[i].value<right[j].value) {
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
    
    
    replaceNodes(range) {
    
        
        //the original ul.
        let items = this.cells;
        // the id's from the range array 
        let rangeArray = [];
        //only the el with the id's which the original ul includes
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
            }) 

           
            let j = 0;  
            let i = min;
            let interval = setInterval(() => {
                if (i === max){
                    clearInterval(interval);
                }
                
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
            }, 400)

    

        }

    
    }
