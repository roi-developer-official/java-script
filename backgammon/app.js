class Board {
  
    initSelectors(){
        this.board = document.querySelector('.board');
        this.container = document.querySelector('.container');
        this.cols = this.container.querySelectorAll('div ul');
        this.diceBtn = document.querySelector('.dice-btn');
        this.diceDivs = document.querySelector('.dice')
        this.dropTitle = document.querySelector('.drop-title');
        this.dropBlackPalette = document.querySelector('.out-black-tools');
        this.eateanConteiner = document.querySelector('.eaten-container');
        this.dropWhiteContanier = document.querySelector('.out-white-tools');
        this.startNewGameDiv = document.querySelector('.start-new-game');
        this.winP = document.querySelector('.win');
        this.startNewBtn = document.querySelector('.start-new-btn');
        this.startPlayBtn = document.querySelector('.start-play');
        this.instructionDiv = document.querySelector('.instructions');
    }

    initListeners(){
        this.startPlayBtn.addEventListener('click',()=>{
            this.instructionDiv.style.visibility = 'hidden'

        })
        this.diceBtn.addEventListener('click', this.genrateRandomNumbers.bind(this));

        this.dropWhiteContanier.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        this.startNewBtn.addEventListener('click', ()=>{
            this.init();
        });

        this.dropWhiteContanier.addEventListener('drop', (e) => {
        if(this.playerTurn)
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
            col.addEventListener('drop', (e) => {
                e.preventDefault();
                if(this.playerTurn){
                    this.dropped = col;
                    this.handlePlayerMovment();
                }
            });
        })  
    }

    init() {
              
        this.initCols()
        this.startNewGameDiv.style.visibility = 'hidden';
        this.diceDivs.children[0].style.visibility = 'hidden';
        this.diceDivs.children[1].style.visibility = 'hidden';
        this.diceBtn.removeAttribute('disabled', true);
        this.playerToolCount =15;
        this.oppenentToolsCount = 15;
        this.playerTurn = false;
        this.countMove = 0;
        this.doubleFlag = true;
        this.playerEatenCount = 0;
        this.oppenentEatenCount = 0;
        this.dropped = null;
        this.dragged = null;
        this.num1 = null;
        this.num2 = null;
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
            if (validate){
                this.handleDragAndDrop();
            }
        }
    }

    enableDiceButton(){
        this.num1 = null;
        this.num2 = null;
        this.diceBtn.removeAttribute('disabled', true);
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

    getWhiteCols(){
        let cols = [];

        for(let col of this.cols){
            if(col.children.length > 0 && col.children[0].classList[1] === 'white-tool'){
                cols.push(col)
            }
        }
        return cols;
    }
    
    moveOutPlayerTool(){
        let tool = this.createOutTool('green');
        this.dropWhiteContanier.append(tool);
        this.dragged.removeChild(this.dragged.children[0])
        this.playerToolCount--;
        this.countMove++;
        let isWin = this.checkForWin();
        return isWin;
    }

    handlerOutMovment() {
        let houseCols = this.getWhiteCols().sort((a,b)=>b.id - a.id)
        let blackcols = this.getEmptyAndBlackCols();
        let isBlack = blackcols.filter(col=>+col.id < 7).filter(col=>col.children.length > 0);
        let isWin;
  
        houseCols = houseCols.filter(col => +col.id < 7);

            let dragPos = +this.dragged.id;

            if (this.num1 === dragPos){
               isWin = this.moveOutPlayerTool();
               if(isWin){
                   return;
               }
                this.tempNum1 = this.num1;
                this.num1 = null;
            }
            else if(this.num2 === dragPos){
               isWin = this.moveOutPlayerTool();
               if(isWin){
                return;
               }
                this.tempNum2 = this.num2;
                this.num2 = null;
            }
            else {
                this.num1 = this.num1 || this.tempNum1;
                this.num2 = this.num2 || this.tempNum2;
            
                for (let col of houseCols) {
                    let firstCol = col.children.length;
               
                    if (firstCol) {
                        if(this.num1 > +col.id && dragPos === +col.id){
                           isWin = this.moveOutPlayerTool();
                           if(isWin){
                            return;
                        }
                            
                            break;
                        }
                        else if(this.num2 > +col.id && dragPos === +col.id){
                          
                           isWin = this.moveOutPlayerTool();
                           if(isWin){
                            return;
                           }
                            break;
                        }
                        else{
                            break;
                        }
                    }
                }
            }
  
        if ((this.countMove === 2 && !this.isDouble)
            || (this.countMove === 4 && this.isDouble)) {   
                
            this.countMove = 0;
            this.switchTurn();
            return;
        }
        else if(isBlack.length && !this.checkForNoActionOnPlayerHouse() ){
             this.countMove = 0;
             this.switchTurn();
             return;
          
        }
        if(this.isDouble){
            this.num1 = this.tempNum1;
            this.num2 = this.tempNum2;
        }  

}

    checkForNoActionOnPlayerHouse(){
    
        //empty and white
        let cols = this.getEmptyAndWhiteCols().filter(col=>col.id < 7);

        //all the white cols (not empty)
        let whiteCols = this.getWhiteCols().filter(col=>col.id < 7);

        whiteCols = whiteCols.sort((a,b)=>b.id - a.id);

        //check if in the initial cols there is no action
        let pos = cols.filter(col=> +col.id === this.num1);
        pos = pos[0];
        if(pos && pos.children.length > 0){
            return true;
        }
        else{
            pos = cols.filter(col=>+col.id === this.num2);

            pos = pos[0];
            if(pos && pos.children.length > 0){
                return true;
            }
        }

        //if the initial pos is empty check for the first col you find
        for(let col of whiteCols){
            if(col.children.length > 0){
                if((+col.id - this.num1) <= 0 || (+col.id - this.num2)<=0){
                    return true;
                }
                break;
            }
        }
        for(let col of whiteCols){
            //check for empty pos in the cols array
            let whitePos = +col.id;
          
            let isEmpty = this.num1 && cols.filter(col=> +col.id === (whitePos - this.num1));
            let isEmptyB = this.num2 && cols.filter(col=> +col.id === (whitePos - this.num2));

            if ((isEmpty && isEmpty.length) ||(isEmptyB && isEmptyB.length)) {
                return true;
            }
           
        }

        return false;

    }

    removeChildrens(ul){
        while(ul.firstChild){
            ul.removeChild(ul.firstChild);
        }
    }

    initCols() {
        this.removeChildrens(this.dropBlackPalette);
        this.removeChildrens(this.eateanConteiner);
        this.removeChildrens(this.dropWhiteContanier);
      

        this.cols.forEach(col=>{
            if(col.children.length){
                this.removeChildrens(col)
            }
        })
        this.cols.forEach(col => {
            if (col.id < 13) {
                col.style.justifyContent = 'flex-end';
            }
            switch (+col.id) {

                case 1:
                    this.fillCols(2,col,'black');
                    break;
                case 6: 
                this.fillCols(5,col,'green')
                break;
                case 8:
                    this.fillCols(3, col, 'green')
                    break;
                case 12:
                    this.fillCols(5,col,'black');
                    break;
                case 13:
                    this.fillCols(5,col, 'green');
                    break;
                case 17:
                    this.fillCols(3,col,'black')
                    break;
                case 19:
                    this.fillCols(5, col, 'black');
                    break;
                case 24:
                    this.fillCols(2, col, 'green')
                    break;
                default: break;
            }
        })
    }

    genrateRandomNumbers() {

        this.diceBtn.setAttribute('disabled', true);
        this.num1 = Math.floor(Math.random() * 6 + 1);

        this.countMove = 0;
        this.diceDivs.children[0].src = `./images/${this.num1}-dice.svg`;
        this.diceDivs.children[0].style.visibility = 'visible';

        this.num2 = Math.floor(Math.random() * 6 + 1);

        this.diceDivs.children[1].src = `./images/${this.num2}-dice.svg`;
        this.diceDivs.children[1].style.visibility = 'visible';

        this.playerTurn = !this.playerTurn;
        
        this.tempNum1 = this.num1;
        this.tempNum2 = this.num2
    
        if (this.playerTurn) {
            if (this.playerEatenCount) {
                //if there is no action for the player while eaten
                if (!this.checkForNoActionOnEatenPlayer()) {
                    setTimeout(() => {
                        this.switchTurn()
               
                    }, 300)
                }
            }
            else {
                //check if there is no action for the player
                if(this.isAllHousePlayer()){
                    if(!this.checkForNoActionOnPlayerHouse()){
                       this.switchTurn();
                        return;
                    }
                }
                //check with first number
                else if (!this.checkForNoActionOnPlayer(this.num1)) {
                    //if no action with first number check for second number
                    if (!this.checkForNoActionOnPlayer(this.num2))
                        setTimeout(() => {
                         
                            this.switchTurn();
                            return;
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

    checkForWin(){

        if(this.oppenentToolsCount === 0){
            this.startNewGameDiv.style.visibility = 'visible';
            this.winP.textContent = 'You Lose!'
            return true;
            
        }
        else if(this.playerToolCount === 0){
            this.startNewGameDiv.style.visibility = 'visible';
            this.winP.textContent = 'You Win!'
            return true;
        }

        return false;
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

            this.countMove++;
            this.num1 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }
        else if (dropped === this.num2) {
        
            this.countMove++;
            this.num2 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }

        if((this.isDouble && this.countMove === 4) ||(!this.isDouble && this.countMove === 2)){
    
            this.switchTurn();
            this.countMove = 0;
            return
        }


        if (this.playerEatenCount === 0) {
            // this.num1 = num1;
            // this.num2 = num2;
            if (!this.checkForNoActionOnPlayer(this.num1) && !this.checkForNoActionOnPlayer(this.num2)) {
        
                this.countMove = 0;
                this.switchTurn();
                return;
            }
        }

        if (!this.checkForNoActionOnEatenPlayer() && this.playerEatenCount) {
            this.switchTurn();
            this.countMove = 0;
 
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
            if ((this.cols[i].children.length > 0 && this.cols[i].children[0].classList[1] === 'white-tool')||
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

        let num1 = this.num1;
        let num2 = this.num2;
        let isAction;
        
        //handle black eaten 
        if (this.dropped && this.dropped.children.length === 1 && this.dropped.children[0].classList[1] === 'black-tool') {
            this.eatanHandler('black', this.dropped);
            this.oppenentEatenCount++;
        }

        let tool = this.createTool('green');
        this.dragged.removeChild(this.dragged.children[0]);
        this.dropped.appendChild(tool)

         //no moves after player movement.
        if (dragged - dropped === this.num1) {

            //remove
                this.num1 = null;
                this.countMove++;
            }
        else if (dragged - dropped === this.num2) {

            //remove
                this.num2 = null;
                this.countMove++;
          }
        
        //if the player finished switch turn
        if ((this.isDouble && this.countMove === 4) || (!this.isDouble && this.countMove === 2)) {
            this.countMove = 0;
            this.switchTurn();
            return;
        }

        //remove
        else if(this.isDouble && this.countMove !== 4){
            this.num1 = num1;
            this.num2 = num2;
        }


        const isAllHouse = this.isAllHousePlayer();

        if(isAllHouse){
            if(!this.checkForNoActionOnPlayerHouse()){
                this.countMove = 0;
                this.switchTurn();
                return;
            }
        }
        else if(!isAllHouse){
            if ((!this.checkForNoActionOnPlayer(this.num1) || !this.checkForNoActionOnPlayer(this.num2)) &&
            !this.playerEatenCount) {
               this.countMove = 0;
               this.switchTurn();
               return;
           }
        }

    }

    createOutTool(color) {
        let tool = document.createElement('div');
        tool.classList.add('out-tool');
        tool.style.background = color;
        return tool;
    }


    moveOppenent(empty,blackCol){
        if (empty.children.length && empty.children[0].classList[1] === 'white-tool') {
            this.playerEatenCount++;
            this.addEatenToContainer('green');
            empty.removeChild(empty.children[0])
        }

        this.dragged = blackCol
        this.dropped = empty
        this.handleOppenentMovment();
        this.countMove++;
    }

    allHouseOppenetMove() {
        let blackCols = this.getBlackCols();
        blackCols = blackCols.filter(col => +col.id > 18);
        let emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
        let doReturn = true;
        let doRemove = true;
        let num1 = this.num1;
        let num2 = this.num2;
        let isWin;

        if ((this.isDouble && this.countMove === 4) ||
            !this.isDouble && this.countMove === 2
        ) {
            this.enableDiceButton();
            return;
        }

        let pos = 24 - this.num1 + 1;
        let col = blackCols.filter(col => +col.id === pos);
        //if there is not a tool in the dice position : find the first col with children and if it is smaller then the dice the do not remove but move else remove
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
           
            
            col.removeChild(col.children[0]);
            let tool = this.createOutTool('black');
            this.dropBlackPalette.append(tool);
            this.oppenentToolsCount--;
            isWin = this.checkForWin();
            if(isWin){
                return;
            }
            this.countMove++;
            blackCols = this.getBlackCols().filter(col => +col.id > 18);

        }
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
        if (doRemove && col) {  
            
            col.removeChild(col.children[0]);
            let tool = this.createOutTool('black');
            this.dropBlackPalette.append(tool);
            this.oppenentToolsCount--;
            isWin = this.checkForWin();
            if(isWin){
                return;
            }
            this.countMove++;
            blackCols = this.getBlackCols().filter(col => +col.id > 18);
            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
        }

        if((!this.isDouble && this.countMove === 2) || this.isDouble && this.countMove === 4){
            this.enableDiceButton();
            return;
        }

        if(this.isDouble && this.doubleFlag){
            this.doubleFlag = false;
            this.num1 = num1;
            this.num2 = num2;
            this.allHouseOppenetMove();
        }
    
        if (this.checkForOppnentMovmentAbility()) {
            
            if (this.isDouble && this.countMove < 4) {
                this.num1 = num1;
                this.num2 = num2;
                for (let blackCol of blackCols) {
                    let blackPos = +blackCol.id;
                    for (let empty of emptyCols) {
                        let emptyPos = +empty.id;
                        if((blackPos + this.num1 === emptyPos) && doReturn) {
                            this.moveOppenent(empty,blackCol);
                            doReturn = false;
                            
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.allHouseOppenetMove();
                        }
                        else if((blackPos + this.num2 === emptyPos) && doReturn) {
                            this.moveOppenent(empty,blackCol);
                            doReturn = false;
                            
            
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.allHouseOppenetMove();
                        }
                    }
                }
            }
            else if(!this.isDouble && this.countMove < 2) {
                doReturn = true;
                for (let blackCol of blackCols) {
                    let blackPos = +blackCol.id;
                    for (let empty of emptyCols) {
                        let emptyPos = +empty.id;
                        if (this.num1 && (blackPos + this.num1 === emptyPos) && doReturn) {
                            this.moveOppenent(empty,blackCol)
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            
                            this.allHouseOppenetMove();
                            doReturn = false;
                        }
                        else if (this.num2 && (blackPos + this.num2 === emptyPos) && doReturn) {
                            this.moveOppenent(empty,blackCol)
                            
                            blackCols = this.getBlackCols().filter(col => +col.id > 18);
                            emptyCols = this.getEmptyBlackAndOnesWhiteCols().filter(col => +col.id > 18);
                            this.allHouseOppenetMove();
                            doReturn = false;
                        }

                    }
                }
            }
        }

        if (this.isDouble && this.doubleFlag) {
            this.doubleFlag = false;
            this.num1 = num1;
            this.num2 = num2;
            this.allHouseOppenetMove();
        }

        this.enableDiceButton();
     
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
        let isAction = this.checkForNoActionOnOpponent(this.num1) || this.checkForNoActionOnOpponent(this.num2);
        let isActionWhileEaten = this.checkForNoActionWhilteEatenOppenent();


        if(this.oppenentEatenCount){
            if(isActionWhileEaten){
                this.checkForEmptyWhenEaten();
            }
            else{
                this.enableDiceButton();
                return;
            }
        }
        else{
            if (this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
                this.countMove = 0;
            }
            else if(isAction){
                    this.chackforEmpty();
                    this.countMove = 0;
             }
            else{
                this.enableDiceButton();
                return;
            }
        }
    }

    getBlackCols() {
        let blackCols = [];
        for (let i = 0; i < this.cols.length; i++) {
            if (this.cols[i].children && this.cols[i].children[0] &&
                 this.cols[i].children[0].classList[1] === 'black-tool') {
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
    }

    eatPlayerWhenEaten(removed){
        this.playerEatenCount++;
        this.removeEatenFromContainer('black');
        let blackTool = this.createTool('black');
        let tool = this.createTool('green');
        removed.removeChild(removed.children[0])
        this.eateanConteiner.append(tool);
        removed.append(blackTool)
        removed = this.getWhiteOnesCols();
        removed = removed.filter(col => col.id <= 6);
        this.oppenentEatenCount--;

        return removed;
    }

    putToolOutFromEaten(col){
        this.removeEatenFromContainer('black');
        let tool = this.createTool('black');
        col.append(tool)
        this.oppenentEatenCount--;
    }

    checkForNoActionOnOpponent(num) {

        let cols = this.getEmptyAndBlackCols();
        let blackCols = cols.filter(col => col.children.length > 0 && col.children[0].classList[1] === 'black-tool');

        for (let i = 0; i < blackCols.length; i++) {
            let blackPos = +blackCols[i].id;

            let isEmpty = cols.filter(col => +col.id === (blackPos + num));

            if (isEmpty.length) {
                return true;
            }

        }
        return false;
    }

    checkForNoActionWhilteEatenOppenent(){
        let cols = this.getEmptyAndBlackCols().filter(col=>+col.id < 7);

     
        for(let col of cols){
            let pos = +col.id;
            if(pos === this.num1 || pos === this.num2){
                return true;
            }
        }
        return false;

    }

    checkForEmptyWhenEaten() {

        let cols = this.getEmptyAndBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        cols = cols.filter(col => col.id <= 6);
        whiteCols = whiteCols.filter(col => +col.id <= 6);

        let num1 = this.num1
        let num2 = this.num2
        let isAction;



        //check for singles first
        for (let i = 0; i < whiteCols.length && this.oppenentEatenCount; i++) {
            if (this.num1 === +whiteCols[i].id && this.oppenentEatenCount) {
                whiteCols = this.eatPlayerWhenEaten(whiteCols[i]);
                
                this.num1 = null; 
            }
            else if (this.num2 === +whiteCols[i].id && this.oppenentEatenCount) {
                whiteCols = this.eatPlayerWhenEaten(whiteCols[i]);
                this.num2 = null;
                
            }

        }


        if(!this.num1 && !this.num2 && !this.isDouble){
            this.enableDiceButton();
            return;
        }
    
        //check for empty spaces
        if (this.oppenentEatenCount){
      
            for (let i = 0; i < cols.length; i++) {
                if (this.num1 === +cols[i].id) {
                    this.putToolOutFromEaten(cols[i]);
                    this.num1 = null;
              
                    


                    if (this.oppenentEatenCount === 0)
                        break;
                }
                if (this.num2 === +cols[i].id) {
               
                    this.putToolOutFromEaten(cols[i]);
                    this.num2 = null;
                    
                    if (this.oppenentEatenCount === 0)
                        break;
                }
            }
        }

        isAction = this.checkForNoActionWhilteEatenOppenent();
        if(!isAction && this.oppenentEatenCount){
            this.enableDiceButton();
            return;
        }

        if (this.isDouble) {
            this.isDouble = false;
            if (this.oppenentEatenCount) {
                this.num1 = num1;
                this.num2 = num2;
                this.checkForEmptyWhenEaten()
                
            }
            else {
                if (!this.num1 && this.num2) {
                    
                    this.num1 = num1;
                    this.chackforEmpty();
                    this.num1 = null;
                    this.num2 = num2;
                    this.chackforEmpty();
                }
                else if (!this.num2 && this.num1) {
                    
                    this.num2 = num2;
                    this.chackforEmpty();
                    this.num2 = null;
                    this.num1 = num1;
                    this.chackforEmpty();
                }
                else if (!this.num1 && !this.num2) {
                    
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
                    this.enableDiceButton();
                    return;
                }
                else {
                    
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

    oppenentEatPlayer(dragged, dropped){
        let blackCols;
        this.playerEatenCount++;
        this.eatanHandler('green', dropped)
        this.dragged = dragged
        this.dropped = dropped;
        this.handleOppenentMovment()

        blackCols = this.getBlackCols();
        return blackCols;
    }



    chackforEmpty() {
        let emptyCols = this.getEmptyAndBlackCols();
        let blackCols = this.getBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        let num1 = this.num1;
        let num2 = this.num2;
   

        for (let i = 0; i < blackCols.length && this.num1; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;

            if ((blackPos + this.num1) >= 25 && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
                break;
            }

            let emptyCol = this.getColById(emptyCols, destiny);     

            //this cond is for when a player dont eat with num1 and num2 and then he moves and can eat
            
            if (emptyCol) {
                
                
                if (emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                    this.playerEatenCount++;
                this.eatanHandler('green', emptyCol);
                }

                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                this.handleOppenentMovment();
                this.num1 = null;
                break;
            }
        }

        blackCols = this.getBlackCols();

          //ceack for singles for eat
          for (let i = 0; i < blackCols.length; i++) {
            let blackCol = +blackCols[i].id;
            for (let j = 0; j < whiteCols.length; j++) {
                let whiteCol = +whiteCols[j].id
                if (this.num1 && ((blackCol + this.num1)=== whiteCol)) {
                    
             
                    blackCols = this.oppenentEatPlayer(blackCols[i], whiteCols[j])
                    this.num1 = null;
                    if(this.playerEatenCount === 0){
                        break;
                    }
                  
                }


                else if (this.num2 && ((blackCol + this.num2) === whiteCol)) {
                    blackCols = this.oppenentEatPlayer(blackCols[i], whiteCols[j])
                    
              
                    this.num2 = null;
                    if(this.playerEatenCount === 0){
                        break;
                    }
                 
                }

            }
        }

        blackCols = this.getBlackCols();

        for (let i = 0; i < blackCols.length && this.num2; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num2;

            let emptyCol = this.getColById(emptyCols, destiny);

            if ((blackPos + this.num2 >= 25) && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
      
                break;
            }

            if (emptyCol) {
                


               //this cond is for when a player dont eat with num1 and num2 and then he moves and can eat
                if (emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                    this.eatanHandler('green', emptyCol);
                    this.playerEatenCount++;
                }
                this.dropped = emptyCol;
                this.dragged = this.getColById(blackCols, blackPos);
                this.num2 = null;
                this.handleOppenentMovment();
                break;
            }
        }

          //ceack for singles for eat
          for (let i = 0; i < blackCols.length; i++) {
            let blackCol = +blackCols[i].id;
            for (let j = 0; j < whiteCols.length; j++) {
                let whiteCol = +whiteCols[j].id
                if (this.num1 && ((blackCol + this.num1)=== whiteCol)) {
                    
                    blackCols = this.oppenentEatPlayer(blackCols[i], whiteCols[j])
                    this.num1 = null;
                    if(this.playerEatenCount === 0){
                        break;
                    }
                  
                }


                else if (this.num2 && ((blackCol + this.num2) === whiteCol)) {
                    blackCols = this.oppenentEatPlayer(blackCols[i], whiteCols[j])
                    
              
                    this.num2 = null;
                    if(this.playerEatenCount === 0){
                        break;
                    }
                 
                }

            }
        }
        
  
        blackCols = this.getBlackCols();
        for (let i = 0; i < blackCols.length && this.num1; i++) {
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;

            let emptyCol = this.getColById(emptyCols, destiny);


            if ((blackPos + this.num1 >= 25) && this.checkForAllToolInHouseOpponent()) {
                this.allHouseOppenetMove();
    
                break;
            }

            
            if (emptyCol) {
                if (emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool') {
                    this.eatanHandler('green', emptyCol);
                    this.playerEatenCount++;
                }
                
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

        if(!this.isDouble){
            this.enableDiceButton();
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




let board = new Board();
board.initSelectors()
board.initListeners();
board.init();
