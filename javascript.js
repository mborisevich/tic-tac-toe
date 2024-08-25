function GameBoard(){
    
    
    const board = [];
    const rows = 3;
    const columns = 3;
    let emptyGrids = rows * columns
    InitializeBoard(board, rows, columns);
    
    const GetBoard = () => board
    const PrintBoard = () => {
        const BoardValues = () => board.map((row) => row.map((cell) => cell.getValue()))
        console.log(BoardValues());

    }

    function InitializeBoard(board=board, rows=rows, columns=columns){
        emptyGrids = rows * columns
        for (i = 0; i < rows; i++){
            board[i] = [];
            for (j = 0; j < columns; j++){
                board[i].push(Cell())
            };
        }
    }
   /** function countEmptyCells(){
        board.forEach((row) => {
            let counter = 0;
            row.forEach((cell) => {

            })
        }) 

    } **/
    function Cell(){
        let value = " "
    
        const getValue = () => value;
        const printValue  = () => console.log(value);
        const setValue = function(player){
            value = player.getMark();
        }
        return {getValue, printValue, setValue}
    }
    function CheckBox(row, column, player){
        board[row][column].setValue(player);
        emptyGrids--;
    }
    function gridCounter(){
        return emptyGrids
    }

    return {GetBoard, PrintBoard, CheckBox, rows, columns, gridCounter, InitializeBoard};
}

function GameController(playerNameOne = "Player 1",
    playerNameTwo = "Player 2"){


    const players = [
        {
            name: playerNameOne,
            mark: "X",
            getMark: function(){
                return this.mark
            }
        },
        {
            name: playerNameTwo,
            mark: "O",
            getMark: function(){
                return this.mark
            }
        }
    ]

    let activePlayer = players[0]
    let winMessage;
    let winner;
    let draw;
    
    const gameboard = GameBoard()
    const displaycontrol = DisplayController()

    function PrintRound(){
        if (!winner && !draw){
            console.log(`${activePlayer.name}'s round starts!`)}
        gameboard.PrintBoard()
    }

    function SwitchPlayers(){
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0]
    }

    const GetActivePlayer = () => activePlayer
    const checkTie = () => {
        if (gameboard.gridCounter() == 0){
            draw = 1
            winMessage = "The game is tied!"
        }
    }

    const CheckWinner = function(player){
        checkTie();
        let temp = gameboard.GetBoard()
        let row1 = temp[0];
        let row2 = temp[1];
        let row3 = temp[2];
        let col1 = [temp[0][0], temp[1][0], temp[2][0]];
        let col2 = [temp[0][1], temp[1][1], temp[2][1]];
        let col3 = [temp[0][2], temp[1][2], temp[2][2]];
        let diag1 = [temp[2][0], temp[1][1], temp[0][2]];
        let diag2 = [temp[0][2], temp[1][1], temp[2][0]];
        winConditions = [row1, row2, row3, col1, col2, col3, diag1, diag2]
        winConditions.forEach((array) =>{
            let counter = 0
            array.forEach((cell) =>{
                cell.getValue() == player.getMark() ? counter++ : counter
                if (counter == 3){
                    winner = player
                    winMessage = `${winner.name} won!`
                    console.log(winMessage)
                } //this can be optimized
            })
        })
    }

    const askMove = () => {
        let row = prompt("Which row are you choosing? 0 is the top row.")
        let column  = prompt("Which column are you choosing? 0 is the leftmost column.") //add try-catch block
        if (gameboard.GetBoard()[row][column].getValue() == " " && row < 3 && column < 3){
            return [row, column]
        } else {
            console.log("Invalid move.")
            return askMove();
        }
    }
    const playRound = (row, column) =>{
        if (!winner && !draw){
            gameboard.CheckBox(row, column, GetActivePlayer())
            CheckWinner(GetActivePlayer())
            SwitchPlayers();
            PrintRound();
            displaycontrol.refreshDisplay();
            displaycontrol.refreshPlayer();
            displaycontrol.displayWinner();
        } else {
            console.log("Game is over")
        }
        
    }

    function clickHandlerGrid(event){
        colelement = event.target.id
            rowelement = event.target.parentElement.id
            col = colelement.split('-')[1]
            row = rowelement.split('-')[1]
            if (gameboard.GetBoard()[row][col].getValue() == " "){
                playRound(row, col)
            } else {
                console.log("Invalid move")
            }
    }

    function clickHandlerButton(){
        gameboard.InitializeBoard(gameboard.GetBoard(), gameboard.rows, gameboard.columns);
        winner = undefined
        draw = undefined
        displaycontrol.refreshDisplay()

    }

    



    function DisplayController(){
        container = document.querySelector(".container")
        button = document.querySelector("button.restart")
        container.addEventListener('click', clickHandlerGrid)
        button.addEventListener('click', clickHandlerButton)
        
        const refreshPlayer = () => {
            playerText = document.querySelector('p.player-text')
            playerText.textContent = GetActivePlayer().name
        }
        const displayWinner = () => {
            if (winner || draw){
                winElement = document.querySelector(".win-message")
                winElement.textContent = winMessage
            }
        }
        const refreshDisplay = () => {
            console.log("refreshing display")
            for (i = 0; i < gameboard.rows; i++){
                const gameboardRow = gameboard.GetBoard()[i]
                for (j = 0; j < gameboard.columns; j++){
                    const columnElement = document.querySelector(`#row-${i}>#col-${j}`)
                    const gameboardColumn = gameboardRow[j]
                    columnElement.textContent = gameboardColumn.getValue();
            }
        }
    }
        return {refreshDisplay, refreshPlayer, displayWinner}
    }
    

    console.log("Tic tac toe! type .playRound() to play a round.")
    PrintRound();
    return {playRound, GetActivePlayer, askMove}
    }



const game = GameController()
