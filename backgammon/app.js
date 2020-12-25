








class Board {
    board = document.querySelector('.board');
    container = document.querySelector('.container');
    cols = this.container.querySelectorAll('div ul');
    diceBtn = document.querySelector('.dice-btn');
    diceDivs = document.querySelector('.dice')
    num1 = null;
    num2 = null;
    tools = null;
    dragged = null;
    dropped =  null;
    isEaten = false;
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

        if(isLeftmove && !isBlack && isDice){
                let tool = this.createTool('green');
                this.dragged.removeChild(this.dragged.children[0]);
                this.dropped.appendChild(tool)
        }

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
        
        //if the player finished switch turn
        if(this.num1 === null && this.num2 === null){
            this.genrateRandomNumbers();
            this.opponentMove();
        }

    }

    opponentMove(){
        this.chackforEmpty();

       
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
                this.cols[i].children[0].classList[1] === 'black-tool'){
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

    chackforEmpty(){
        let emptyCols = this.getEmptyAndBlackCols();
        let blackCols = this.getBlackCols();

    
        for(let i = 0; i < blackCols.length && this.num1; i++){
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num1;
            console.log(destiny);
            let emptyCol = this.getColById(emptyCols,destiny);
    
            if(emptyCol){
                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                if(!this.isDouble)
                   this.num1 = null;
            }
            
        }
        
        this.handleOppenentMovment();
        blackCols = this.getBlackCols();
        for(let i = 0; i < blackCols.length && this.num2; i++){
            let blackPos = +blackCols[i].id;
            let destiny = blackPos + this.num2;
            console.log(destiny);
            let emptyCol = this.getColById(emptyCols,destiny);
            
            if(emptyCol){
                this.dragged = this.getColById(blackCols, blackPos);
                this.dropped = emptyCol;
                if(!this.isDouble)
                   this.num2 = null;
            }
            
        }
        
        this.handleOppenentMovment();
        blackCols = this.getBlackCols();
        if(this.num1){
            for(let i = 0; i < blackCols.length && this.num1; i++){
                let blackPos = +blackCols[i].id;
                let destiny = blackPos + this.num1;
                console.log(destiny);
                let emptyCol = this.getColById(emptyCols,destiny);
        
                if(emptyCol){
                    this.dragged = this.getColById(blackCols, blackPos);
                    this.dropped = emptyCol;
                    this.num1 = null;
                }
            }
        }

        if(this.isDouble){
            this.isDouble = false;
            this.num1 = null;
            this.num2 = null;
            this.chackforEmpty();
        }

    
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
