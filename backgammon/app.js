
class Board{
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

    }

    fillCols(number,col, color){
        for(let i = 0; i < number ; i++){
            let tool = this.createTool(color)
            col.appendChild(tool);
        }
    }

    testMove(){

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
        if(dragged - dropped === this.num1){
            this.num1 = null;
        }
        else if(dragged - dropped === this.num2){
            this.num2 = null;
        }

      
    
    }

}



new Board().init()
