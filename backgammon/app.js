class Board {
    board = document.querySelector('.board');
    container = document.querySelector('.container');
    cols = this.container.querySelectorAll('div ul');
    diceBtn = document.querySelector('.dice-btn');
    diceDivs = document.querySelector('.dice')
    dropTitle = document.querySelector('.drop-title');
    dropBlackPalette = document.querySelector('.out-black-tools');
    eateanConteiner = document.querySelector('.eaten-container');
    dropWhiteContanier = document.querySelector('.out-white-tools');
    num1 = null;
    num2 = null;
    tools = null;
    dragged = null;
    dropped = null;
    isAllHouseOppenet = false;
    playerEatenCount = 0;
    oppenentEatenCount = 0;
    isDouble = false;
    doubleFlag = true;
    playerToolCount = 13;
    oppenentToolsCount = 2;
    countMove = 0;
  
    playerTurn = false;


    init() {
        this.initCols()
        this.tools = document.querySelectorAll('.white-tool');
        this.diceBtn.addEventListener('click', this.genrateRandomNumbers.bind(this));
        this.dropWhiteContanier.addEventListener('dragover', (e) => {
            e.preventDefault();

        })
        this.dropWhiteContanier.addEventListener('drop', (e) => {
            if(this.isAllHousePlayer()){
                this.handlerOutMovment();
            }
        })


        this.container.addEventListener('dragstart', (e) => {
            if (e.target.classList[1] === 'white-tool') {
                e.dataTransfer.effectAllowed = 'copyMove';
                this.dragged = e.target.parentElement;
            }
        });

        this.container.addEventListener('dragover', (e) => {
            e.preventDefault()
        });

        this.cols.forEach(col => {
            col.addEventListener('dragover', (e) => {

            });
            col.addEventListener('dragenter', (e) => {

            });
            col.addEventListener('drop', (e) => {
                e.preventDefault();
                this.dropped = col;
                this.handlePlayerMovment();
            });
        })
    }


    handlePlayerMovment() {

        let validate;
        if (this.playerEatenCount) {
            validate = this.validatePlayerMoveWhenEaten();
            if (validate){
                this.handleDragAndDropWhileEaten();
        
            }
        }
        else {
            validate = this.validatePlayerMove();
            if (validate)
                this.handleDragAndDrop();
        }

    }

    isAllHousePlayer(){
        let houseCols = this.getEmptyAndWhiteCols();
        let whiteCount = 0;
        houseCols = houseCols.filter(col => +col.id < 7).filter(col=>col.children[0] && col.children[0].classList[1] === 'white-tool')

        if(this.playerEatenCount){
            return false;
        }

        for (let col of houseCols) {
            whiteCount += col.children.length;
        }

        if (whiteCount === this.playerToolCount)
            return true;

        else return false;
    }


    handlerOutMovment() {
        let houseCols = this.getEmptyAndWhiteCols();
        let blackcols = this.getEmptyAndBlackCols();
        let isBlack = blackcols.filter(col=>+col.id < 7).filter(col=>col.children.length > 0);
  

        houseCols = houseCols.filter(col => +col.id < 7);
        houseCols = houseCols.sort((a,b)=>b.id - a.id);

            let dragPos = +this.dragged.id;
           
            if (this.num1 === dragPos || this.num2 === dragPos) {
               
                //append to the container and remove from dragged
                let tool = this.createOutTool('green');
                this.dropWhiteContanier.append(tool);
                this.dragged.removeChild(this.dragged.children[0])
                this.playerToolCount--;
                this.countMove++;
            }
            else {
                for (let col of houseCols) {
                    let firstCol = col.children.length;
                    console.log(firstCol,col);
                    if (firstCol) {
                        if(+col.id < dragPos){
                        
                            let tool = this.createOutTool('green');
                            this.dropWhiteContanier.append(tool);
                            this.dragged.removeChild(this.dragged.children[0])
                            this.playerToolCount--;
                            this.countMove++;
                            break;
                        }
                        else{
                            break;
                        }
                    }
                }
            }

            console.log(this.countMove);

            console.log(this.checkForNoActionOnPlayerHouse());
           
        if ((this.countMove === 2 && !this.isDouble)
            || (this.countMove === 4 && this.isDouble)) {   
            this.countMove = 0;
            this.switchTurn();
            console.log('switch from handleoutmovemnt');
        }
        else if(isBlack.length){
            if(!this.checkForNoActionOnPlayerHouse()){
            console.log('switch from handleoutmovemnt');
             this.countMove = 0;
             this.switchTurn();
          }
        }
    }



    checkForNoActionOnPlayerHouse(){
        let cols = this.getEmptyAndWhiteCols();
        let whiteCols = this.getEmptyAndWhiteCols().filter(col=>col.id < 7);

        whiteCols = cols.filter(col => col.children.length > 0 && col.children[0].classList[1] === 'white-tool');
        whiteCols = whiteCols.sort((a,b)=>b.id - a.id);

      
        //check if in the initial cols there is no action
        let pos = whiteCols.filter(col=>+col.id === this.num1);
        pos = pos[0];
        if(pos && pos.children.length > 0){
            return true;
        }
        else{
            pos = whiteCols.filter(col=>+col.id === this.num2);
            pos = pos[0];
            if(pos && pos.children.length > 0){
                return true;
            }
        }
       
        for(let col of whiteCols){
            console.log(+col.id , this.num1);
            if(col.children.length > 0){
                if((+col.id - this.num1) <= 0 || (+col.id - this.num2)<=0){
                    console.log('1');
                    return true;
                }
                else{
                    return false;
                }

            }
            //should only be true if there is no column before it
           
            let whitePos = +col.id;
            let isEmpty = cols.filter(col=> +col.id === (whitePos - this.num1));
            let isEmptyB = cols.filter(col=> +col.id === (whitePos - this.num2));
            
            if (isEmpty.length || isEmptyB.length) {
                console.log('2');
                return true;
            }
           
        }

        return false;

    }



    initCols() {
        this.cols.forEach(col => {
            if (col.id < 13) {
                col.style.justifyContent = 'flex-end';
            }
            switch (+col.id) {
                case 1:
                    this.fillCols(2,col,'black');
                    break;
                case 2: 
                this.fillCols(2,col, 'green')
                break;

                case 3: 
                this.fillCols(2,col,'green')
                break;

                case 4: 
                this.fillCols(2,col,'green')
                break;

                case 5: 
                this.fillCols(2,col,'green')
                break;
                case 6: 
                this.fillCols(5,col,'green')
                break;

                // case 7:
                //     this.fillCols(2, col, 'green')
                //     break;

                // case 9: 
                // this.fillCols(2,col,'black')
                // break;

                // case 10: 
                // this.fillCols(2,col,'black')
                // break;

                // case 11: 
                // this.fillCols(2,col,'black')
                // break;

                // case 16: 
                // this.fillCols(2,col,'black')
                // break;
                // case 15: 
                // this.fillCols(2,col,'black')
                // break;
                // case 14:
                //     this.fillCols(5,col,'green')
                // //     break;
                // case 1:
                //     this.fillCols(3, col, 'green');
                //     break;
                // case 12:
                //     this.fillCols(5,col,'black');
                //     break;
                // case 13:
                //     this.fillCols(5,col, 'green');
                // //     break;
                // case 17:
                //     this.fillCols(3,col,'black')
                //     break;
                // case 19:
                //     this.fillCols(5, col, 'black');
                //     break;

                // case 20:
                //     this.fillCols(2, col, 'black')
                //     break;
                // case 21:
                //     this.fillCols(2, col, 'black')
                //     break;
                // case 22:
                //     this.fillCols(1, col, 'green')
                //     break;
                // case 23:
                //     this.fillCols(1, col, 'green')
                //     break;
                // case 24:
                //     this.fillCols(2, col, 'black')
                //     break;

                // case 24:
                //     this.fillCols(2,col,'green');
                //     break;
                default: break;
            }
        })
    }

    genrateRandomNumbers() {
        this.num1 = Math.floor(Math.random() * 6 + 1);

        this.diceDivs.children[0].src = `./images/${this.num1}-dice.svg`;
        this.diceDivs.children[0].style.visibility = 'visible';

        this.num2 = Math.floor(Math.random() * 6 + 1);

        this.diceDivs.children[1].src = `./images/${this.num2}-dice.svg`;
        this.diceDivs.children[1].style.visibility = 'visible';

        this.playerTurn = !this.playerTurn;

    
        if (this.playerTurn) {
            if (this.playerEatenCount) {
                //if there is no action for the player while eaten
                if (!this.checkForNoActionOnEatenPlayer()) {
                    setTimeout(() => {
                        this.switchTurn()
                        console.log('switch turn from random numbers');
                    }, 300)
                }
            }
            else {
                //if there is no action for the player
                if(this.isAllHousePlayer()){
                    if(!this.checkForNoActionOnPlayerHouse()){
                        console.log('switch turn from random numbers');
                        this.switchTurn();
                    }
                }
                //check with first number
                else if (!this.checkForNoActionOnPlayer(this.num1)) {
                    //if no action with first number check for second number
                    if (!this.checkForNoActionOnPlayer(this.num2))
                        setTimeout(() => {
                            console.log('switch turn from random numbers');
                            this.switchTurn();
                    }, 300)
                }

            }
        }
        
        if (this.num1 === this.num2) {
            this.isDouble = true
            this.doubleFlag = true;
        }
        else
            this.isDouble = false;
        
    }

    fillCols(number, col, color) {
        for (let i = 0; i < number; i++) {
            let tool = this.createTool(color)
            col.appendChild(tool);
        }
    }

    createTool(color) {
        let tool = document.createElement('li');
        tool.style.backgroundColor = color;
        tool.classList.add('tool');
        if (color === 'green') {
            tool.classList.add('white-tool');
            tool.setAttribute('draggable', true);
        }
        else {
            tool.classList.add('black-tool');
        }
        return tool;
    }

    validatePlayerMove() {
        const dropped = +this.dropped.id;
        const dragged = +this.dragged.id;
        const isLeftmove = dropped <= dragged;
        let isBlack = this.dropped.children;

        //check if the move is currect with the dice number
        const isDice = (dragged - dropped) === this.num1 || (dragged - dropped) === this.num2;

        if ((isBlack[0] && isBlack[0].classList[1] === 'black-tool' && isBlack.length > 1)) {
            isBlack = true;
        }
        else {
            isBlack = false;
        }

        if (isLeftmove && !isBlack && isDice) {
            return true;
        }
        return false;
    }

    validatePlayerMoveWhenEaten() {
        const dropped = +this.dropped.id;
        let empty;
        let white;
        let oneBlack;
        let col = this.getColById(this.cols, dropped);


        empty = col.children.length === 0;
        white = !empty && col.children[0].classList[1] === 'white-tool';
        oneBlack = !empty && col.children[0].classList[1] === 'black-tool' && col.children.length === 1;

        if ((empty || white || oneBlack) && dropped > 18) {
            return true;
        }
        return false;
    }

    checkForNoActionOnPlayer(num) {

        let cols = this.getEmptyAndWhiteCols();
        let whiteCols = cols.filter(col => col.children.length > 0 && col.children[0].classList[1] === 'white-tool');

        for (let i = 0; i < whiteCols.length; i++) {
            let whitePos = +whiteCols[i].id;

            let isEmpty = cols.filter(col => +col.id === (whitePos - num));

            if (isEmpty.length) {
                return true;
            }

        }

        return false;
    }


    checkForNoActionOnEatenPlayer() {
        let cols = this.getEmptyAndWhiteCols();
        cols = cols.filter(col => +col.id > 18);

        for (let i = 0; i < cols.length; i++) {
            let emptyPos = +cols[i].id;
            let pos = 24 - emptyPos + 1;
            if (pos === this.num1 || pos === this.num2) {
                return true;
            }
        }
        return false;
    }


    checkForAllToolInHousePlayer() {
        let houseCols = [];
        let toolCount = 0;
        for (let col of this.cols) {
            if (+col.id < 7) {
                houseCols.push(col);
            }
        }


        for (let col of houseCols) {
            if (col.children.length > 0 && col.children[0].classList[1] === 'white-tool') {
                toolCount += col.children.length;
            }
        }  

        if (toolCount === this.playerToolCount) {
            return true;
        }

        return false;
   }



    checkForAllToolInHouseOpponent() {
        let houseCols = [];
        let toolCount = 0;
        for (let col of this.cols) {
            if (+col.id > 18) {
                houseCols.push(col);
            }
        }
        for (let col of houseCols) {
            if (col.children.length > 0 && col.children[0].classList[1] === 'black-tool') {
                toolCount += col.children.length;
            }
        }

        if (toolCount === this.oppenentToolsCount) {
            return true;
        }
        return false;
    }




    handleDragAndDropWhileEaten() {
        const dropped = 24 - +this.dropped.id + 1;

        let num1 = this.num1;
        let num2 = this.num2;


        if (dropped === this.num1 || dropped === this.num2)
            if (this.dropped.children.length && this.dropped.children[0].classList[1] === 'black-tool') {
                this.oppenentEatenCount++;
                this.dropped.removeChild(this.dropped.children[0]);
                this.addEatenToContainer('black');
            }

        if (dropped === this.num1) {
            console.log('1');
            this.countMove++;
            this.num1 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }
        else if (dropped === this.num2) {
            console.log('2');
            this.countMove++;
            this.num2 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }

        if((this.isDouble && this.countMove === 4) ||(!this.isDouble && this.countMove === 2)){
            console.log('switchTurn from handle drag and drop');
            this.switchTurn();
            this.countMove = 0;
            return
        }


        if (this.playerEatenCount === 0) {
            this.num1 = num1;
            this.num2 = num2;
            if (!this.checkForNoActionOnPlayer(this.num1) && !this.checkForNoActionOnPlayer(this.num2)) {
                console.log('switch from drag and drop');
                this.switchTurn();
                return;
            }
        }

        if (!this.checkForNoActionOnEatenPlayer() && this.playerEatenCount) {
            this.switchTurn();
            this.countMove = 0;
            console.log('switch from drag and drop');
            return;
        }


        if (this.isDouble) {
            this.num1 = num1;
            this.num2 = num2;
        }


    }

    getEmptyAndWhiteCols() {
        let cols = [];

        //or the first el is white or the col length is 1, or the col length is 0
        for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].children.length > 0 && this.cols[i].children[0].classList[1] === 'white-tool' ||
                this.cols[i].children.length === 1 || this.cols[i].children.length === 0

            ) {
                cols.push(this.cols[i])
            }
        }
        return cols.sort((a, b) => a.id - b.id);

    }


    switchTurn() {
        setTimeout(() => {
            this.genrateRandomNumbers();
            this.opponentMove();
        }, 300)
    }


    handleDragAndDrop() {
        const dropped = +this.dropped.id;
        const dragged = +this.dragged.id;

        //handle black eaten 
        if (this.dropped && this.dropped.children.length === 1 && this.dropped.children[0].classList[1] === 'black-tool') {
            this.eatanHandler('black', this.dropped);
            this.oppenentEatenCount++;
        }

        let tool = this.createTool('green');
        this.dragged.removeChild(this.dragged.children[0]);
        this.dropped.appendChild(tool)


        console.log(this.countMove);


        //no moves after player movement.
        if (this.isDouble) {
            if (dragged - dropped === this.num1 || dragged - dropped === this.num2)
                this.countMove++;

            if (this.countMove === 4) {
                this.countMove = 0;
                this.num1 = null;
                this.num2 = null;
                this.switchTurn();
             console.log('0');

                return;
            }
        }
        else {
            if (dragged - dropped === this.num1) {
                this.num1 = null;
                this.countMove++;
            }
            else if (dragged - dropped === this.num2) {
                this.num2 = null;
                this.countMove++;
            }
        }


        if(this.checkForAllToolInHousePlayer()){
            if(this.checkForNoActionOnPlayerHouse()){
                this.switchTurn();
                this.countMove = 0;
            console.log('1');

            }
        }

        if ((!this.checkForNoActionOnPlayer(this.num1) || !this.checkForNoActionOnPlayer(this.num2)) &&
            !this.playerEatenCount) {
            this.countMove = 0;
            console.log('2');

            this.switchTurn();
            return;
        }

        //if the player finished switch turn
        if ((this.isDouble && this.countMove === 4) || (!this.isDouble && this.countMove === 2)) {
            this.countMove = 0;
            console.log('3');
            this.switchTurn();
            return;
        }

    }


    createOutTool(color) {
        let tool = document.createElement('div');
        tool.classList.add('out-tool');
        tool.style.background = color;
        return tool;
    }


    allHouseOppenetMove() {

        let blackCols = this.getBlackCols();
        blackCols = blackCols.filter(col => +col.id > 18);
        let emptyCols;
        let doReturn = true;
        let doRemove = true;

        let num1 = this.num1;
        let num2 = this.num2;

        if ((this.isDouble && this.countMove === 4) ||
            !this.isDouble && this.countMove === 2
        ) {
            this.doReturn = false;
            this.num1 = null;
            this.num2 = null;
            this.isDouble = false;
            return;
        }


        let pos = 24 - this.num1 + 1;
        let col = blackCols.filter(col => +col.id === pos);

        col = col[0];
        if (!col) {
            for (let colm of blackCols) {
                if (colm.children.length > 0) {
                    if (+colm.id < pos) {
                        doRemove = false;
                        col = colm;
                    }
                    else {
                        doRemove = true;
                        col = colm;
                    }
                    break;
                }
            }
        }

        if (doRemove && col) {
            console.log('1', col);
            col.removeChild(col.children[0]);
            let tool = this.createOutTool('black');
            this.dropBlackPalette.append(tool);
            this.oppenentToolsCount--;
            this.countMove++;
            this.num1 = null;
        }


        if ((this.isDouble && this.countMove === 4) ||
            !this.isDouble && this.countMove === 2
        ) {
            this.doReturn = false;
            this.num1 = null;
            this.num2 = null;
            this.isDouble = false;
            return;
        }


        blackCols = this.getBlackCols().filter(col => +col.id > 18);
        pos = 24 - this.num2 + 1;
        col = blackCols.filter(col => +col.id === pos);

        if (col) {
            doRemove = true;
        }

        col = col[0]
        if (!col) {
            for (let colm of blackCols) {
                if (colm.children.length > 0) {
                    if (+colm.id < pos) {
                        doRemove = false;
                        col = colm;
                    }
                    else {
                        doRemove = true;
                        col = colm;
                    }
                    break;
                }
            }
        }



        console.log(this.num2, doRemove, col);
        if (doRemove && col) {
            console.log('2', col);
            col.removeChild(col.children[0]);
            let tool = this.createOutTool('black');
            this.dropBlackPalette.append(tool);
            this.oppenentToolsCount--;
            this.countMove++;
            this.num2 = null;
        }


        if (this.isDouble && this.doubleFlag) {
            this.doubleFlag = false;
            this.num1 = num1;
            this.num2 = num2;
            this.allHouseOppenetMove();
        }


        blackCols = this.getBlackCols().filter(col => +col.id > 18);
        emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);


        if (this.checkForOppnentMovmentAbility()) {
            if (this.isDouble && this.countMove < 4) {
                this.num1 = num1;
                this.num2 = num2;
                for (let blackCol of blackCols) {
                    let blackPos = +blackCol.id;
                    for (let empty of emptyCols) {
                        let emptyPos = +empty.id;
                        if ((blackPos + this.num1 === emptyPos) && doReturn) {
                            if (empty.children && empty.children[0].classList[1] === 'white-tool') {
                                this.playerEatenCount++;
                                this.addEatenToContainer('green');
                                empty.removeChild(empty.children[0])
                            }
                            this.dragged = blackCol
                            this.dropped = empty
                            doReturn = false;
                            this.handleOppenentMovment();
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.countMove++;
                            this.allHouseOppenetMove();

                        }
                        else if ((blackPos + this.num2 === emptyPos) && doReturn) {
                            if (empty.children && empty.children[0].classList[1] === 'white-tool') {
                                this.playerEatenCount++;
                                this.addEatenToContainer('green');
                                empty.removeChild(empty.children[0])
                            }

                            this.dragged = blackCol;
                            this.dropped = empty
                            doReturn = false;
                            this.handleOppenentMovment();
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.countMove++;
                            this.allHouseOppenetMove();
                        }
                    }
                }
            }
            else if (!this.isDouble && this.countMove < 2) {

                console.log('object');
                for (let blackCol of blackCols) {
                    let blackPos = +blackCol.id;
                    for (let empty of emptyCols) {
                        let emptyPos = +empty.id;
                        if (this.num1 && (blackPos + this.num1 === emptyPos)) {

                            if (empty.children && empty.children[0].classList[1] === 'white-tool') {
                                this.playerEatenCount++;
                                this.addEatenToContainer('green');
                                empty.removeChild(empty.children[0])
                            }

                            this.dragged = blackCol
                            this.dropped = empty
                            console.log('3', this.dragged, this.dropped, this.num1);
                            this.handleOppenentMovment();
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.countMove++;
                            this.num1 = null;
                            this.allHouseOppenetMove();
                        }
                        else if (this.num2 && (blackPos + this.num2 === emptyPos)) {

                            if (empty.children && empty.children[0].classList[1] === 'white-tool') {
                                this.playerEatenCount++;
                                this.addEatenToContainer('green');
                                empty.removeChild(empty.children[0])
                            }
                            this.dragged = blackCol;
                            this.dropped = empty
                            this.handleOppenentMovment();
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.countMove++;
                            console.log('4', this.dragged, this.dropped, this.num2);
                            this.num2 = null;
                            this.allHouseOppenetMove();

                        }

                    }
                }
            }
        }


    }

    checkForOppnentMovmentAbility() {
        let emptyCols = this.getEmptyBlackAndOnesWhiteCols();
        let blackCols = this.getBlackCols();

        for (let blackCol of blackCols) {
            let blackPos = +blackCol.id;
            for (let empty of emptyCols) {
                let emptyPos = +empty.id;

                if (blackPos + this.num1 === emptyPos || blackPos + this.num2 === emptyPos) {
                    return true;
                }
            }

        }

        return false;

    }

    getEmptyBlackAndOnesWhiteCols() {
        let cols = [];

        for (let col of this.cols) {
            let children = col.children;
            if (children.length === 0 ||
                (children.length === 1 && children[0].classList[1] === 'white-tool') ||
                (children.length > 0 && children[0].classList[1] === 'black-tool')) {
                cols.push(col)
            }
        }

        return cols;
    }



    opponentMove() {


        if (this.checkForAllToolInHouseOpponent()) {
            this.allHouseOppenetMove();
            this.countMove = 0;
        }
        else if (!this.oppenentEatenCount)
            this.chackforEmpty();
        else
            this.checkForEmptyWhenEaten();
    }


    getBlackCols() {
        let blackCols = [];
        for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].children[0] && this.cols[i].children[0].classList[1] === 'black-tool') {
                blackCols.push(this.cols[i])
            }
        }
        return blackCols.sort((a, b) => a.id - b.id);
    }


    getEmptyAndBlackCols() {
        let emptyCols = [];
        for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].children.length === 0 ||
                this.cols[i].children[0].classList[1] === 'black-tool' || (this.cols[i].children[0].classList[1] === 'white-tool' && this.cols[i].children.length === 1)) {
                emptyCols.push(this.cols[i])
            }
        }

        return emptyCols.sort((a, b) => a.id - b.id)
    }

    getWhiteOnesCols() {
        let whiteCols = [];
        for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].children[0] && this.cols[i].children.length === 1 && this.cols[i].children[0].classList[1] === 'white-tool') {
                whiteCols.push(this.cols[i])
            }
        }
        return whiteCols;
    }

    handleOppenentMovment() {
        let tool = this.createTool('black');
        this.dragged.removeChild(this.dragged.children[0]);
        this.dropped.appendChild(tool)
        this.isAllHouseOppenet = this.checkForAllToolInHouseOpponent();
    }

    checkForEmptyWhenEaten() {

        let cols = this.getEmptyAndBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        cols = cols.filter(col => col.id <= 6);
        whiteCols = whiteCols.filter(col => col.id <= 6);

        let num1 = this.num1
        let num2 = this.num2


        //check for singles first
        for (let i = 0; i < whiteCols.length && this.oppenentEatenCount; i++) {
            if (this.num1 === +whiteCols[i].id && this.oppenentEatenCount) {
                this.playerEatenCount++;
                this.removeEatenFromContainer('black');
                let blackTool = this.createTool('black');
                let tool = this.createTool('green');
                whiteCols[i].removeChild(whiteCols[i].children[0])
                this.eateanConteiner.append(tool);
                whiteCols[i].append(blackTool)
                whiteCols = this.getWhiteOnesCols();
                whiteCols = whiteCols.filter(col => col.id <= 6);
                this.oppenentEatenCount--;
                this.num1 = null;
            }

            else if (this.num2 === +whiteCols[i].id && this.oppenentEatenCount) {
                this.playerEatenCount++;
                this.removeEatenFromContainer('black');
                let blackTool = this.createTool('black');
                let tool = this.createTool('green');
                whiteCols[i].removeChild(whiteCols[i].children[0])
                this.eateanConteiner.append(tool);
                whiteCols[i].append(blackTool)
                whiteCols = this.getWhiteOnesCols();
                whiteCols = whiteCols.filter(col => col.id <= 6);
                this.oppenentEatenCount--;
                this.num2 = null;
            }

        }


        if (this.oppenentEatenCount)
            for (let i = 0; i < cols.length; i++) {
                if (this.num1 === +cols[i].id) {
                    this.removeEatenFromContainer('black');
                    let tool = this.createTool('black');
                    cols[i].append(tool)
                    this.num1 = null;
                    this.oppenentEatenCount--;
                    if (this.oppenentEatenCount === 0)
                        break;
                }
                else if (this.num2 === +cols[i].id) {
                    this.removeEatenFromContainer('black');
                    let tool = this.createTool('black');
                    cols[i].append(tool);
                    this.num2 = null;
                    this.oppenentEatenCount--;
                    if (this.oppenentEatenCount === 0)
                        break;
                }
            }


        if (this.isDouble) {
            if (this.oppenentEatenCount) {
                this.isDouble = false;
                this.num1 = num1;
                this.num2 = num2;
                this.checkForEmptyWhenEaten()
                console.log('1');
            }
            else {
                this.isDouble = false;
                if (!this.num1 && this.num2) {
                    console.log('2');
                    this.num1 = num1;
                    this.chackforEmpty();
                    this.num1 = null;
                    this.num2 = num2;
                    this.chackforEmpty();
                }
                else if (!this.num2 && this.num1) {
                    console.log('3');
                    this.num2 = num2;
                    this.chackforEmpty();
                    this.num2 = null;
                    this.num1 = num1;
                    this.chackforEmpty();

                }
                else if (!this.num1 && !this.num2) {
                    console.log('4');
                    this.num1 = num1;
                    this.num2 = num2;
                    this.chackforEmpty();
                }
            }
        }
        else if (!this.isDouble) {
            if (!this.oppenentEatenCount) {
                //check for no match in dice
                if (!this.num1 && !this.num2) {
                    return;
                }
                else {
                    console.log('6');
                    this.chackforEmpty();
                }
            }
        }

    }

    addEatenToContainer(color) {
        let tool = this.createTool(color)
        this.eateanConteiner.append(tool)
    }

    removeEatenFromContainer(color) {
        let eatens = this.eateanConteiner.children;

        for (let eaten of eatens) {
            if (eaten.style.backgroundColor === color) {
                eaten.parentElement.removeChild(eaten);
                return;
            }
        }

    }


    chackforEmpty() {
        let emptyCols = this.getEmptyAndBlackCols();
        let blackCols = this.getBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        let num1 = this.num1;
        let num2 = this.num2;



        //ceack for singles
        for (let i = 0; i < blackCols.length; i++) {
            let blackCol = +blackCols[i].id;
            for (let j = 0; j < whiteCols.length; j++) {
                let whiteCol = +whiteCols[j].id
                if (this.num1 && blackCol + this.num1 === whiteCol) {
                    this.playerEatenCount++;
                    this.eatanHandler('green', whiteCols[j])
                    this.dragged = blackCols[i];
                    this.dropped = whiteCols[j];
                    this.handleOppenentMovment()
                    blackCols = this.getBlackCols();
                    this.num1 = null;
                }
                if (this.num2 && blackCol + this.num2 === whiteCol) {
                    this.playerEatenCount++;
                    this.eatanHandler('green', whiteCols[j])
                    this.dragged = blackCols[i];
                    this.dropped = whiteCols[j];
                    this.handleOppenentMovment()
                    blackCols = this.getBlackCols();
                    this.num2 = null;
                }

            }
        }





        for (let i = 0; i < blackCols.length && this.num1; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;


            if (blackPos + this.num1 === 25 && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
                break;
            }



            let emptyCol = this.getColById(emptyCols, destiny);

            if (emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                this.eatanHandler('green', emptyCol);
            }

            if (emptyCol) {
                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                this.handleOppenentMovment();
                this.num1 = null;
                break;
            }
        }


        blackCols = this.getBlackCols();
        for (let i = 0; i < blackCols.length && this.num2; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num2;

            let emptyCol = this.getColById(emptyCols, destiny);




            if (blackPos + this.num2 === 25 && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
                break;
            }


            if (emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                this.eatanHandler('green', emptyCol);
            }

            if (emptyCol) {
                this.dropped = emptyCol;
                this.dragged = this.getColById(blackCols, blackPos);
                this.num2 = null;
                this.handleOppenentMovment();
                break;
            }
        }


        blackCols = this.getBlackCols();
        for (let i = 0; i < blackCols.length && this.num1; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;

            let emptyCol = this.getColById(emptyCols, destiny);



            if (blackPos + this.num1 === 25 && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
                break;
            }


            if (emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                this.eatanHandler('green', emptyCol);
            }

            if (emptyCol) {
                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                this.handleOppenentMovment();
                this.num2 = null;
                break;
            }
        }

        if (this.isDouble && !this.checkForAllToolInHouseOpponent()) {
            this.isDouble = false;
            this.num1 = num1;
            this.num2 = num2;
            this.chackforEmpty();
        }



    }

    eatanHandler(color, col) {

        let tool = this.createTool(color);
        col.removeChild(col.children[0])
        this.eateanConteiner.append(tool)
    }


    getColById(array, id) {

        for (let i = 0; i < array.length; i++) {
            if (+array[i].id === id) {
                return array[i];
            }
        }

        return null;

    }

}




new Board().init()
