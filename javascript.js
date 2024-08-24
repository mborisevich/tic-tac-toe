function GameBoard(){
    
    
    const board = [];
    const rows = 3;
    const columns = 3;
    InitializeBoard(board, rows, columns);
    
    const GetBoard = () => board
    const PrintBoard = () => {
        const BoardValues = () => board.map((row) => row.map((cell) => cell.getValue()))
        console.log(BoardValues());

    }

    function InitializeBoard(board, rows, columns){
        for (i = 0; i < rows; i++){
            board[i] = [];
            for (j = 0; j < columns; j++){
                board[i].push(Cell())
            };
        }
    }
    
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
    }

    return {GetBoard, PrintBoard, CheckBox, rows, columns};
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
    let winner;
    const gameboard = GameBoard()
    const displaycontrol = DisplayController()

    function PrintRound(){
        if (!winner){
            console.log(`${activePlayer.name}'s round starts!`)}
        gameboard.PrintBoard()
    }

    function SwitchPlayers(){
        activePlayer == players[0] ? activePlayer = players[1] : activePlayer = players[0]
    }

    const GetActivePlayer = () => activePlayer

    const CheckWinner = function(player){
        let temp = gameboard.GetBoard()
        const row1 = temp[0];
        const row2 = temp[1];
        const row3 = temp[2];
        const col1 = [temp[0][0], temp[1][0], temp[2][0]];
        const col2 = [temp[0][1], temp[1][1], temp[2][1]];
        const col3 = [temp[0][2], temp[1][2], temp[2][2]];
        const diag1 = [temp[2][0], temp[1][1], temp[0][2]];
        const diag2 = [temp[0][2], temp[1][1], temp[2][0]];
        winConditions = [row1, row2, row3, col1, col2, col3, diag1, diag2]
        winConditions.forEach((array) =>{
            let counter = 0
            array.forEach((cell) =>{
                cell.getValue() == player.getMark() ? counter++ : counter
                if (counter == 3){
                    winner = player
                    console.log(`${winner.name} won!`)
                }
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
        gameboard.CheckBox(row, column, GetActivePlayer())
        CheckWinner(GetActivePlayer())
        SwitchPlayers();
        PrintRound();
        displaycontrol.refreshDisplay();
    }
    function clickHandler(event){
        colelement = event.target.id
            rowelement = event.target.parentElement.id
            col = colelement.split('-')[1]
            row = rowelement.split('-')[1]
            playRound(row, col)
    }
    function DisplayController(){
        container = document.querySelector(".container")
        document.addEventListener('click', clickHandler)
    
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
        return {refreshDisplay}
    }
    

    console.log("Tic tac toe! type .playRound() to play a round.")
    PrintRound();
    return {playRound, GetActivePlayer, askMove}
    }



const game = GameController()
