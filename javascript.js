const Gameboard = (function() {
    const validMoves = ['a-1', 'a-2', 'a-3', 'b-1', 'b-2', 'b-3', 'c-1', 'c-2', 'c-3'];
    const gameboard = ['a-1', 'a-2', 'a-3', 'b-1', 'b-2', 'b-3', 'c-1', 'c-2', 'c-3'];
    const winCondition1 = ['a-1', 'a-2', 'a-3']
    const winCondition2 = ['b-1', 'b-2', 'b-3']
    const winCondition3 = ['c-1', 'c-2', 'c-3']
    const winCondition4 = ['c-1', 'b-2', 'a-3']
    const winCondition5 = ['a-1', 'b-2', 'c-3']
    const winConditions = [winCondition1, winCondition2, winCondition3, winCondition4, winCondition5];
    let winner;
    let move;

    const player1 = makePlayer('bob')
    const player2= makePlayer('john')

    function makePlayer(name){
        return {
            name: name,
            choice: [],
            printChoice: () => {
                console.log(choice);
            }
        }
    }
    let active = player1;

    /**const flowControl = () => {
        displayController();
        let active = player1
        while (!winner && gameboard.length>0){
            console.log(`${active.name}'s turn!`)
            getMove();
            active.choice.push(move)
            checkChoice(active);
            active == player1 ? active = player2 : active = player1
        }
        if (winner){
            return console.log(`${winner} won!`)
        } else {
            return console.log("The round ended in a draw!")
        }
    }
    const getMove = () => {
        while (gameboard.includes(move) == false){
            move = prompt("Select a box, do this by typing the row-column format like (a-1) or (b-2)")
        }
        console.log("valid input")
        gameboard.splice(gameboard.indexOf(move), 1)
        console.log(move)
    } **/
    const flowControl = () => {
        displayInitialize();

    }

    const checkChoice = (player) => {
            winConditions.forEach((condition) => {
                if (!winner){
                let counter = 0
                condition.forEach((grid) =>{
                    player.choice.forEach((move) => {grid.includes(move) ? counter++ : counter})
                    if (counter == 3){
                        winner = player.name
                    }
                })
            }
        })
    }
    const displayInitialize = () => {
        const body = document.querySelector("body");
        const container = document.createElement("div")
        container.classList.add("container")
        body.appendChild(container);

        const createGrids = function(num=3){
            let rows = ['a','b','c']
            for (i = 0; i < num; i++){
                let row = document.createElement("div")
                container.appendChild(row)
                row.classList.add(`row`)
                row.setAttribute("id", `${i}`)
                for (j = 0; j < num; j++){
                    let col = document.createElement("div")
                    col.classList.add("col")
                    col.setAttribute("id", `${rows[i]}-${j}`)
                    row.appendChild(col);
            }
        }}();

        const createEventListener = function(){
            const allColumns = document.querySelectorAll(".col")
            allColumns.forEach((element) => {
                element.addEventListener("click", function handler(){
                    active.choice.push(element.id)
                    gameboard.splice(gameboard.indexOf(element.id), 1)
                    displayController()
                    checkChoice(active)
                    active == player1 ? active = player2 : active = player1
                    element.removeEventListener('click', handler)
                })
            })
        }()
        const displayController = function(){
            for (i = 0; i < active.choice.length; i++){
                let selectCol = document.querySelector('#' + `${active.choice[i]}`)
                active == player1 ? selectCol.textContent = "X" : selectCol.textContent = "O"
            }
        }
    }
    
    return flowControl()


})();