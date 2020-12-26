class Board {
    board = document.querySelector('.board');
    container = document.querySelector('.container');
    cols = this.container.querySelectorAll('div ul');
    diceBtn = document.querySelector('.dice-btn');
    diceDivs = document.querySelector('.dice')
    eateanConteiner = document.querySelector('.eaten-container');
    num1 = null;
    num2 = null;
    numbers =[];
    tools = null;
    dragged = null;
    dropped =  null;
    playerEatenCount = 0;
    oppenentEatenCount = 0;
    isDouble  = false;
    countMove = 0;
    

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
                this.handleDragAndDrop();    
            });
        })
      
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
                    case 6:
                        this.fillCols(5,col,'green')
                        break;
                    case 8: 
                      this.fillCols(3,col, 'green');
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
                        this.fillCols(5,col,'black');
                        break;
                    case 24:
                        this.fillCols(2,col,'green');
                        break;
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
        this.num1 = 4;
        this.num2 = 4;
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

    handleDragAndDrop(){
        const dropped = +this.dropped.id;
        const dragged = +this.dragged.id;
        const isLeftmove = dropped <= dragged;
        let isBlack = this.dropped.children;
     
        //check if the move is currect with the dice number
        const isDice = (dragged - dropped) === this.num1 || (dragged - dropped) === this.num2;

        if(isBlack[0] && isBlack[0].classList[1] === 'black-tool' && isBlack.length > 1){
            isBlack = true;
        }
        else{
            isBlack = false;
        }
      
   
        //handle black eaten 
         if(this.dropped && this.dropped.children.length === 1 && this.dropped.children[0].classList[1] === 'black-tool'){
            this.eatanHandler('black', this.dropped);
            this.oppenentEatenCount++;

        }

        if(isLeftmove && !isBlack && isDice){
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
        }

        
        //if the player finished switch turn
        if(this.num1 === null && this.num2 === null){
            this.genrateRandomNumbers();
            this.opponentMove();
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


    handleOppenentMovment (){
        let tool = this.createTool('black');
        this.dragged.removeChild(this.dragged.children[0]);
        this.dropped.appendChild(tool)
    }

    checkForEmptyWhenEaten(){

        let cols = this.getEmptyAndBlackCols();
        cols = cols.filter(col=>col.id <= 6);
       
      
        let num1 = this.num1
        let num2 = this.num2

        for(let i = 0; i < cols.length; i++){
            if(this.num1 === +cols[i].id){
                this.removeEatenFromConrainer('black');
                let tool = this.createTool('black');
                if(cols[i] && cols[i].children.length > 0 && cols[i].children[0].classList[1] === 'white-tool'){
                    cols[i].removeChild(cols[i].children[0])
                    let tool = this.createTool('green');
                    this.eateanConteiner.append(tool)

                }
                cols[i].append(tool);
                console.log(cols[i]);
                this.num1 = null;
                this.oppenentEatenCount--;
                if(this.oppenentEatenCount === 0)
                break;
            }
            else if(this.num2 === +cols[i].id){
                this.removeEatenFromConrainer('black');
                let tool = this.createTool('black');
                if(cols[i] && cols[i].children.length > 0 && cols[i].children[0].classList[1] === 'white-tool'){
                    let tool = this.createTool('green');
                    this.eateanConteiner.append(tool)
                    cols[i].removeChild(cols[i].children[0])
                }

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
                    this.chackforEmpty();
                }
                else if(!this.num2 && this.num1){
                    console.log('3');
                    this.num2 = num2;
                    this.chackforEmpty();
                    this.num2 = null;
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

    removeEatenFromConrainer(color){
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

        console.log(this.num1, this.num2);
    
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
                if(!this.isDouble)
                   this.num1 = null;
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
                this.handleOppenentMovment();
                if(!this.isDouble)
                   this.num2 = null;
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
                    this.num1 = null;
                    this.handleOppenentMovment();
                }
            }
    

        if(this.isDouble){
            this.isDouble = false;
            this.chackforEmpty();
            this.num1 = null;
            this.num2 = null;
        }
    }

    eatanHandler(color,col){

        let tool = this.createTool(color);
        col.removeChild(col.children[0])
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
