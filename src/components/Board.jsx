import React, { Component } from 'react';

function Square(props) {
    return (
        <button className="square" onClick={props.onClick} style={{ backgroundColor: props.fill }}>
            {props.value}
        </button>
    );
}

function ToggleLetter(props) {
    return (
        <button className="btn btn-success" onClick={props.onClick}>
            Change Letter
        </button>
    );
}

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(props.row).fill(null).map(x => Array(props.column).fill(null)),
            color: Array(props.row).fill('').map(x => Array(props.column).fill('')),
            isLetterS: true,
            isPlayerOne: true,
            playerOneScore: 0,
            playerTwoScore: 0,
            isBoardFull: false
        };
    }

    renderToggleLetter() {
        return (
            <ToggleLetter onClick={() => this.handleButtonClick()} />
        );
    }

    handleButtonClick() {
        this.setState({
            isLetterS: !this.state.isLetterS,
        });
    }

    renderSquare(i, j) {
        return (
            <Square
                value={this.state.squares[i][j]}
                fill={this.state.color[i][j]}
                onClick={() => this.handleSquareClick(i, j)}
            />
        );
    }

    handleSquareClick(i, j) {
        const squares = this.state.squares.slice();
        if (squares[i][j] == null) {
            squares[i][j] = this.state.isLetterS ? 'S' : 'O';
            this.setState({
                squares: squares,
            });

            this.checkSOS(i, j);
            this.checkIfFull();
        }
    }

    checkSOS(row, column) {
        const lines = [
            [row, column, row, column + 1, row, column + 2],
            [row, column, row + 1, column, row + 2, column],
            [row, column, row + 1, column + 1, row + 2, column + 2],
            [row, column, row + 1, column - 1, row + 2, column - 2],
            [row, column, row, column - 1, row, column - 2],
            [row, column, row - 1, column, row - 2, column],
            [row, column, row - 1, column - 1, row - 2, column - 2],
            [row, column, row - 1, column + 1, row - 2, column + 2],

            [row, column - 1, row, column, row, column + 1],
            [row - 1, column, row, column, row + 1, column],
            [row - 1, column - 1, row, column, row + 1, column + 1],
            [row - 1, column + 1, row, column, row + 1, column - 1],
        ];

        let currentScore = this.state.isPlayerOne ? this.state.playerOneScore : this.state.playerTwoScore;
        let scoreIncremented = false;

        for (let i = 0; i < lines.length; i++) {
            const [rowA, columnA, rowB, columnB, rowC, columnC] = lines[i];

            if ((rowA >= 0 && rowA <= this.props.row - 1) && (rowB >= 0 && rowB <= this.props.row - 1) && (rowC >= 0 && rowC <= this.props.row - 1)) {

                const pattern = this.state.squares[rowA][columnA] + this.state.squares[rowB][columnB] + this.state.squares[rowC][columnC];
                if (pattern === 'SOS') {
                    currentScore += 1;
                    scoreIncremented = true;

                    const fill = this.state.color;
                    fill[rowA][columnA] = this.state.isPlayerOne ? 'red' : 'blue';
                    fill[rowB][columnB] = this.state.isPlayerOne ? 'red' : 'blue';
                    fill[rowC][columnC] = this.state.isPlayerOne ? 'red' : 'blue';

                    this.setState({
                        color: fill
                    })
                }
            }
        }

        if (this.state.isPlayerOne) {
            this.setState({
                playerOneScore: currentScore
            })
        } else {
            this.setState({
                playerTwoScore: currentScore
            })
        }

        if (!scoreIncremented) {
            this.setState({
                isPlayerOne: !this.state.isPlayerOne
            })
        }
    }

    checkIfFull() {
        const grid = this.state.squares;
        let nullIndex = [];

        for (let i = 0; i < grid.length; i++) {
            let rowIndexOFNull = grid[i].indexOf(null);
            nullIndex.push(rowIndexOFNull);
        }

        const findIndexOfNull = nullIndex.find(index => {
            return index > -1
        })

        if (typeof findIndexOfNull === 'undefined') {
            this.setState({
                isBoardFull: true
            })
        }
    }

    render() {
        const status = 'Player ' + (this.state.isPlayerOne ? '1\'s' : '2\'s') + ' turn: ' + (this.state.isLetterS ? 'S' : 'O');
        const playerOneScore = 'Player 1: ' + (this.state.playerOneScore);
        const playerTwoScore = 'Player 2: ' + (this.state.playerTwoScore);

        const grid = this.state.squares;

        const board = grid.map((row, i) => {
            return (
                <div className="board-row">
                    {row.map((column, j) => {
                        return this.renderSquare(i, j)
                    })}
                </div>
            )
        })

        const full = this.state.isBoardFull;
        const scoreOne = this.state.playerOneScore;
        const scoreTwo = this.state.playerTwoScore;
        let declareWinner = '';

        if (full) {
            if (scoreOne > scoreTwo) {
                declareWinner = 'Player One wins'
            }
            if (scoreOne < scoreTwo) {
                declareWinner = 'Player Two wins'
            }
            if (scoreOne === scoreTwo) {
                declareWinner = 'It\'s a draw'
            }
        }

        return (
            <div>
                <div className="s">
                    <div className="status"><h4>{status}</h4> {this.renderToggleLetter()}</div>
                    <div>
                        <h5>Scores</h5>
                        <div className="score">{playerOneScore}</div>
                        <div className="score">{playerTwoScore}</div>
                    </div>
                </div>
                <div className="game">
                    <div className="board">{board}</div>
                </div>
                <div className="winner">{declareWinner}</div>
            </div>
        );
    }
}

export default Board;