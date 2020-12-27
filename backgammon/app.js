class Board {
    board = document.querySelector('.board');
    container = document.querySelector('.container');
    cols = this.container.querySelectorAll('div ul');
    diceBtn = document.querySelector('.dice-btn');
    diceDivs = document.querySelector('.dice')
    eateanConteiner = document.querySelector('.eaten-container');
    num1 = null;
    num2 = null;
    tools = null;
    dragged = null;
    dropped =  null;
    playerEatenCount = 0;
    oppenentEatenCount = 0;
    isDouble  = false;
    countMove = 0;
    playerTurn = false;
    

    init(){
        this.initCols()
        this.tools = document.querySelectorAll('.white-tool');
        this.diceBtn.addEventListener('click', this.genrateRandomNumbers.bind(this));

        this.container.addEventListener('dragstart', (e)=>{
            if(e.target.classList[1] === 'white-tool'){
                e.dataTransfer.effectAllowed = 'copyMove';
                this.dragged = e.target.parentElement;
            }
        });

        this.container.addEventListener('dragover', (e)=>{
            e.preventDefault()
        });
     
        this.cols.forEach(col=>{
            col.addEventListener('dragover', (e)=>{
      
            });
            col.addEventListener('dragenter', (e)=>{
         
            });
            col.addEventListener('drop', (e)=>{
                e.preventDefault();
                this.dropped = col;
                this.handlePlayerMovment();
            });
        })
    }


    handlePlayerMovment(){
        let validate;
        if(this.playerEatenCount){
            validate = this.validatePlayerMoveWhenEaten();
            if(validate)
             this.handleDragAndDropWhileEaten();
        }
        else{
            validate = this.validatePlayerMove();
            if(validate)
                this.handleDragAndDrop(); 
        }
        
    }


    initCols(){
            this.cols.forEach(col=>{
                if(col.id < 13){
                    col.style.justifyContent = 'flex-end';
                }
                switch(+col.id){
                    case 1:
                        this.fillCols(2,col,'black');
                        break;
                    case 2: 
                    this.fillCols(2,col, 'black')
                    break;

                    case 3: 
                    this.fillCols(2,col,'black')
                    break;

                    case 4: 
                    this.fillCols(2,col,'black')
                    break;

                    case 5: 
                    this.fillCols(2,col,'black')
                    break;

                    case 7: 
                    this.fillCols(2,col,'black')
                    break;

                    case 9: 
                    this.fillCols(2,col,'black')
                    break;

                    case 10: 
                    this.fillCols(2,col,'black')
                    break;

                    case 11: 
                    this.fillCols(2,col,'black')
                    break;

                    case 16: 
                    this.fillCols(2,col,'black')
                    break;
                    case 15: 
                    this.fillCols(2,col,'black')
                    break;
                    // case 14:
                    //     this.fillCols(5,col,'green')
                    //     break;
                    case 8: 
                      this.fillCols(3,col, 'green');
                      break;
                    case 12:
                        this.fillCols(5,col,'black');
                        break;
                    // case 13:
                    //     this.fillCols(5,col, 'green');
                    //     break;
                    case 17:
                        this.fillCols(3,col,'black')
                        break;
                    case 19:
                        this.fillCols(5,col,'black');
                        break;
                    
                        case 20: 
                            this.fillCols(2,col, 'black')
                            break;
                        case 21: 
                            this.fillCols(2,col, 'black')
                            break;
                        // case 22: 
                        //     this.fillCols(2,col, 'black')
                        //     break;
                        case 23: 
                            this.fillCols(2,col, 'black')
                            break;
                        case 24: 
                            this.fillCols(2,col, 'black')
                            break;

                    // case 24:
                    //     this.fillCols(2,col,'green');
                    //     break;
                    default :break;
                }
            })
    }

    genrateRandomNumbers(){
        this.num1 = Math.floor(Math.random() * 6 + 1);
 
        this.diceDivs.children[0].src = `./images/${this.num1}-dice.svg` ;
        this.diceDivs.children[0].style.visibility = 'visible';
        
        this.num2 = Math.floor(Math.random() * 6 + 1);
    
        this.diceDivs.children[1].src = `./images/${this.num2}-dice.svg` ;
        this.diceDivs.children[1].style.visibility = 'visible';
   
        this.playerTurn = !this.playerTurn;

        console.log(this.playerTurn);
        if(this.playerTurn)
        {
            if(this.playerEatenCount){
               //if there is no action for the player while eaten
                if(!this.checkForNoActionOnEatenPlayer()){
                    setTimeout(()=>{
                   this.switchTurn()
                    },300)
                }
            }
            else{
                //if there is no action for the player
                //check with first number
                if(!this.checkForNoActionOnPlayer(this.num1)){
                    //if no action with first number check for second number
                    if(!this.checkForNoActionOnPlayer(this.num2))
                        setTimeout(()=>{
                                this.switchTurn();
                        },300)
                }  
         
            }
        }

        if(this.num1 === this.num2){
            this.isDouble = true
        }
        else 
            this.isDouble = false;
    }

    fillCols(number,col, color){
        for(let i = 0; i < number ; i++){
            let tool = this.createTool(color)
            col.appendChild(tool);
        }
    }

    createTool(color){
        let tool = document.createElement('li');
        tool.style.backgroundColor = color;
        tool.classList.add('tool');
        if(color === 'green'){
            tool.classList.add('white-tool');
            tool.setAttribute('draggable', true);
        }
        else{
            tool.classList.add('black-tool');
        }
        return tool;
    }

    validatePlayerMove(){
        const dropped = +this.dropped.id;
        const dragged = +this.dragged.id;
        const isLeftmove = dropped <= dragged;
        let isBlack = this.dropped.children;

        //check if the move is currect with the dice number
        const isDice = (dragged - dropped) === this.num1 || (dragged - dropped) === this.num2;

        if((isBlack[0] && isBlack[0].classList[1] === 'black-tool' && isBlack.length > 1)){
            isBlack = true;
        }
        else{
            isBlack = false;
        }

        if(isLeftmove && !isBlack && isDice){
            return true;
        }
        return false;
    }

    validatePlayerMoveWhenEaten(){
        const dropped = +this.dropped.id;
        let empty;
        let white;
        let oneBlack;
        let col = this.getColById(this.cols,dropped);


        empty = col.children.length === 0;
        white = !empty && col.children[0].classList[1] === 'white-tool';
        oneBlack = !empty && col.children[0].classList[1] === 'black-tool' && col.children.length === 1;

        if((empty || white || oneBlack) && dropped > 18){
            return true;
        }
        return false;
    }

    checkForNoActionOnPlayer(num){
       
        let cols = this.getEmptyAndWhiteCols();
        let whiteCols = cols.filter(col=>col.children.length > 0 && col.children[0].classList[1] === 'white-tool');
 
    
        for(let i = 0; i < whiteCols.length; i++){
            let whitePos = +whiteCols[i].id;
            console.log(whitePos);
            let isEmpty = cols.filter(col=>+col.id === (whitePos - num));
      
            if(isEmpty.length){
                return true;
            } 
      
        }
        return false;
    }

    checkForNoActionOnEatenPlayer(){
        let cols = this.getEmptyAndWhiteCols();
        cols = cols.filter(col=>+col.id > 18);

        for(let i = 0; i < cols.length; i++){
            let emptyPos = +cols[i].id;
            let pos = 24 - emptyPos  +  1;
            if(pos === this.num1 || pos === this.num2){
                console.log(pos);
                return true;
            }
        }

        return false;
    }

    handleDragAndDropWhileEaten(){
        const dropped = 24 - +this.dropped.id + 1;

        let num1 = this.num1;
        let num2 = this.num2;
     

    if(dropped === this.num1 || dropped === this.num2)
        if(this.dropped.children.length && this.dropped.children[0].classList[1] === 'black-tool'){
            this.oppenentEatenCount++;
            this.dropped.removeChild(this.dropped.children[0]);
            this.addEatenToContainer('black');
        }
        
        if(dropped === this.num1){
        
            this.countMove++;
            this.num1 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }
        else if(dropped === this.num2){
            this.countMove++;
            this.num2 = null;
            this.playerEatenCount--;
            let tool = this.createTool('green');
            this.dropped.append(tool);
            this.removeEatenFromContainer('green');
        }


        if(!this.checkForNoActionOnEatenPlayer() && this.playerEatenCount){
            this.switchTurn();
            this.countMove = 0;
            return;
        }

        if(this.isDouble){
            this.num1 = num1;
            this.num2 = num2;
        }
        else if(this.countMove === 2){
            this.countMove = 0;
        }



    }

    getEmptyAndWhiteCols(){
        let cols =[];

        //or the first el is white or the col length is 1, or the col length is 0
        for(let i = 0 ; i < this.cols.length; i++){
            if(this.cols[i].children.length > 0 && this.cols[i].children[0].classList[1] === 'white-tool' ||
             this.cols[i].children.length === 1 || this.cols[i].children.length === 0

             ){
                cols.push(this.cols[i])
            }
        }
        return cols.sort((a,b)=>a.id - b.id);

    }

    switchTurn(){
        setTimeout(()=>{
            this.genrateRandomNumbers();
            this.opponentMove();
        },300)
    }



    handleDragAndDrop(){
        const dropped = +this.dropped.id;
        const dragged = +this.dragged.id;

        //handle black eaten 
         if(this.dropped && this.dropped.children.length === 1 && this.dropped.children[0].classList[1] === 'black-tool'){
            this.eatanHandler('black', this.dropped);
            this.oppenentEatenCount++;
        }

                let tool = this.createTool('green');
                this.dragged.removeChild(this.dragged.children[0]);
                this.dropped.appendChild(tool)

                //no moves after player movement.
                if(this.isDouble){
                    if(dragged - dropped === this.num1 || dragged - dropped === this.num2)
                          this.countMove++;
    
                    if(this.countMove === 4){
                        this.countMove = 0;
                        this.num1 = null;
                        this.num2 = null;
                    }
                  
                }
                else{
                    if(dragged - dropped === this.num1 ){
                        this.num1 = null;
                    }
                    else if(dragged - dropped === this.num2){
                        this.num2 = null;
                    }
                }

        if((!this.checkForNoActionOnPlayer(this.num1) || !this.checkForNoActionOnPlayer(this.num2))&&
        !this.playerEatenCount){
                this.switchTurn();
                return;
        
        }
   

        //if the player finished switch turn
        if(this.num1 === null && this.num2 === null){
            this.switchTurn();
        }

    }

    opponentMove(){
        if(!this.oppenentEatenCount)
          this.chackforEmpty();
        else 
            this.checkForEmptyWhenEaten();
    }

    getBlackCols(){
        let blackCols = [];
        for(let i = 0; i < this.cols.length; i++){
            if(this.cols[i].children[0] && this.cols[i].children[0].classList[1] === 'black-tool'){
                blackCols.push(this.cols[i]) 
            }
        }
        return blackCols.sort((a,b)=>a.id - b.id);
    }


    getEmptyAndBlackCols(){
        let emptyCols = [];
        for(let i = 0; i < this.cols.length; i++){
            if(this.cols[i].children.length === 0 || 
                this.cols[i].children[0].classList[1] === 'black-tool' || (this.cols[i].children[0].classList[1] === 'white-tool' && this.cols[i].children.length === 1) ){
                emptyCols.push(this.cols[i])
            }
        }
      
        return emptyCols.sort((a,b)=>a.id - b.id)
    }

    getWhiteOnesCols(){
        let whiteCols = [];
        for(let i = 0; i < this.cols.length; i++){
            if(this.cols[i].children[0] && this.cols[i].children.length === 1 && this.cols[i].children[0].classList[1] === 'white-tool'){
                whiteCols.push(this.cols[i]) 
            }
        }
        return whiteCols;
    }


    handleOppenentMovment (){
        let tool = this.createTool('black');
        this.dragged.removeChild(this.dragged.children[0]);
        this.dropped.appendChild(tool)
    }

    checkForEmptyWhenEaten(){

        let cols = this.getEmptyAndBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        cols = cols.filter(col=>col.id <= 6);
        whiteCols = whiteCols.filter(col=>col.id <= 6);
        
        let num1 = this.num1
        let num2 = this.num2


        console.log(num1,num2);
        
    
        //check for singles first
        for(let i = 0; i < whiteCols.length && this.oppenentEatenCount; i++){
            if(this.num1 === +whiteCols[i].id && this.oppenentEatenCount){
                this.playerEatenCount++;
                this.removeEatenFromContainer('black');
                let blackTool = this.createTool('black');
                let tool = this.createTool('green');
                whiteCols[i].removeChild(whiteCols[i].children[0])
                this.eateanConteiner.append(tool);
                whiteCols[i].append(blackTool)
                whiteCols = this.getWhiteOnesCols();
                whiteCols = whiteCols.filter(col=>col.id <= 6);
                this.oppenentEatenCount--;
                this.num1 = null;
            }
            
            else if(this.num2 === +whiteCols[i].id && this.oppenentEatenCount){
                this.playerEatenCount++;
                this.removeEatenFromContainer('black');
                let blackTool = this.createTool('black');
                let tool = this.createTool('green');
                whiteCols[i].removeChild(whiteCols[i].children[0])
                this.eateanConteiner.append(tool);
                whiteCols[i].append(blackTool)
                whiteCols = this.getWhiteOnesCols();
                whiteCols = whiteCols.filter(col=>col.id <= 6);
                this.oppenentEatenCount--;
                this.num2 = null;
        }

    }   



    if(this.oppenentEatenCount)
        for(let i = 0; i < cols.length; i++){
            if(this.num1 === +cols[i].id){
                this.removeEatenFromContainer('black');
                let tool = this.createTool('black');
                cols[i].append(tool)
                this.num1 = null;
                this.oppenentEatenCount--;
                if(this.oppenentEatenCount === 0)
                break;
            }
            else if(this.num2 === +cols[i].id){
                this.removeEatenFromContainer('black');
                let tool = this.createTool('black');
                cols[i].append(tool);
                this.num2 = null;
                this.oppenentEatenCount--;
                if(this.oppenentEatenCount === 0)
                 break;
            }
        }


        if(this.isDouble){
            if(this.oppenentEatenCount){
                this.isDouble = false;
                this.num1 = num1;
                this.num2 = num2;
                this.checkForEmptyWhenEaten()
                console.log('1');
            }
            else{
                this.isDouble = false;
                if(!this.num1 && this.num2){
                    console.log('2');
                    this.num1 = num1;
                    this.chackforEmpty();
                    this.num1 = null;
                    this.num2 = num2;
                    this.chackforEmpty();
                }
                else if(!this.num2 && this.num1){
                    console.log('3');
                    this.num2 = num2;
                    this.chackforEmpty();
                    this.num2 = null;
                    this.num1 = num1;
                    this.chackforEmpty();
                    
                }
                else if(!this.num1 && !this.num2){
                    console.log('4');
                    this.num1 = num1;
                    this.num2 = num2;
                    this.chackforEmpty();
                }
            }
        }
        else if(!this.isDouble){
            if(!this.oppenentEatenCount){
                //check for no match in dice
                if(!this.num1 && !this.num2){
                    return;
                }
                else{
                    console.log('6');
                    this.chackforEmpty();
                }
            }
        }

    }

    addEatenToContainer(color){
        let tool = this.createTool(color)
        this.eateanConteiner.append(tool)

    }

    removeEatenFromContainer(color){
        let eatens = this.eateanConteiner.children;

        for(let eaten of eatens){
            if(eaten.style.backgroundColor === color){
                eaten.parentElement.removeChild(eaten);
                return;
            }
        }

    }

 

    chackforEmpty(){
        let emptyCols = this.getEmptyAndBlackCols();
        let blackCols = this.getBlackCols();
        let whiteCols = this.getWhiteOnesCols();
        let num1 = this.num1;
        let num2 = this.num2;


        //ceack for singles
        for(let i = 0; i < blackCols.length; i++){
            let blackCol = +blackCols[i].id;
            for(let j = 0; j < whiteCols.length; j++){
                let whiteCol = +whiteCols[j].id
                    if(this.num1 && blackCol + this.num1 === whiteCol){
                        this.playerEatenCount++;
                        this.eatanHandler('green', whiteCols[j])
                        this.dragged = blackCols[i];
                        this.dropped = whiteCols[j];
                        this.handleOppenentMovment()
                        blackCols = this.getBlackCols();
                        this.num1 = null;    
                    }
                    if(this.num2 && blackCol + this.num2 === whiteCol){
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



        for(let i = 0; i < blackCols.length && this.num1; i++){
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;

            let emptyCol = this.getColById(emptyCols,destiny);

            console.log(emptyCol);

            if(emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool'){
                this.eatanHandler('green', emptyCol);
            }
     
            if(emptyCol){
                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                this.handleOppenentMovment();
                this.num1 = null;
                break;  
            }
            
        }
        
 
        blackCols = this.getBlackCols();
        for(let i = 0; i < blackCols.length && this.num2; i++){
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num2;
          
            let emptyCol = this.getColById(emptyCols,destiny);

            console.log(emptyCol);
            
            if(emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool'){
                this.eatanHandler('green', emptyCol);
            }

            if(emptyCol){
                this.dropped = emptyCol;
                this.dragged = this.getColById(blackCols, blackPos);
                this.num2 = null;
                this.handleOppenentMovment();
                break;
            }  
        }
    

        blackCols = this.getBlackCols();
        for(let i = 0; i < blackCols.length && this.num1; i++){
                let blackPos = +blackCols[i].id;
                let destiny = blackPos + this.num1;
                console.log(destiny);
                let emptyCol = this.getColById(emptyCols,destiny);
        
            console.log(emptyCol);

                if(emptyCol && emptyCol.children.length === 1 && emptyCol.children[0].classList[1] === 'white-tool'){
                    this.eatanHandler('green', emptyCol);
                }

                if(emptyCol){
                    this.dragged = this.getColById(blackCols, blackPos);
                    this.dropped = emptyCol;
                    this.handleOppenentMovment();
                    this.num2 = null;
                    break;
                }
            }
    

        if(this.isDouble){
            this.isDouble = false;
            this.num1 = num1;
            this.num2 = num2;
            this.chackforEmpty();
        }
    }

    eatanHandler(color,col){

        let tool = this.createTool(color);
        console.log(col);
        col.removeChild(col.children[0])
        console.log(col);
        this.eateanConteiner.append(tool)
    }


    getColById(array,id){
      
        for(let i = 0; i < array.length; i++){
            if(+array[i].id === id){
                return array[i];
            }
        }

        return null;
       
    }

}




new Board().init()
