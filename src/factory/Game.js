export default class GameBoard {
   isEqual(arr1, arr2) {
     if (arr1.length === arr2.length) {
         for (let i = 0; i < arr1.length; i++) {
              if (arr1[i] !== arr2[i]) {
                  return false;
              }
         }
     } else {
         return false;
     }
      return true;
  }
    constructor(size) {
     var newBoard = function(size){
        var board = [];
       for (let i = 0; i<size; i++) {
         var row = []
         for (let j = 0; j<size; j++) {
           if (i < 3) {
             if (i%2 === 0 && j%2 !== 0) {
               row.push(1);
             } else if (i% 2 !== 0 && j%2 === 0) {
               row.push(1);
             } else {
                row.push(0);
             }
           } else if (i > 4) {
             if (i%2 === 0 && j%2 !== 0) {
               row.push(2);
             } else if (i% 2 !== 0 && j%2 === 0) {
               row.push(2);
             } else {
               row.push(0);
             }
           } else {
              row.push(0);
           }
         }
        board.push(row);
       }
       return board;
     }

     this.board = newBoard(size);
    }

    piece(col,row){
      return this.board[row]? this.board[row][col] : false;
    }
    determineWinner(){
      let player1 = 0;
      let player2 = 0;
      this.board.forEach(function(row){
          row.forEach(function(space){
            if (space === 1) {
                player1++;
            } else if (space === 2) {
                player2++;
            }
         })
      })
      if (player1 !== player2) {
         return {winner: player1 > player2 ? 1 : 2}
      } else {
          return 'tie'
      }
    }
     move(oldCol, oldRow, newCol, newRow) {
       var oldPiece = this.piece(oldCol, oldRow);
       this.board[oldRow][oldCol] = 0;
       this.board[newRow][newCol] = oldPiece;
       return oldPiece;
    }
    take(x,y) {
      const piece = this.piece(x,y);
      if (piece) {
         this.board[y][x] = 0;
         return piece;
      }  else {
          return false;
      }
    }

    boardStillhasMoves(){
       for (var i = 0; i < this.board.length; i++) {
          for (var j = 0; j < this.board.length; j++) {
             let piece = this.piece(j,i);
             let possibleMoves = []
             if (piece === 1) {
               if (this.piece(j-2, i+2) === 0) {
                  possibleMoves.push([j-2, i+2])
               }

               if (this.piece(j+2, i+2) === 0) {
                  possibleMoves.push([j+2, i+2])
               }

               if (this.piece(j-1, i+1) === 0) {
                  possibleMoves.push([j-1, i+1])
               }
               if (this.piece(j+1, i+1) === 0) {
                  possibleMoves.push([j-1, i+1])
               }

             } else if (piece === 2) {
               if (this.piece(j-2, i-2) === 0) {
                  possibleMoves.push([j-2, i+2])
               }

               if (this.piece(j+2, i-2) === 0) {
                  possibleMoves.push([j+2, i+2])
               }

               if (this.piece(j-1, i-1) === 0) {
                  possibleMoves.push([j-1, i+1])
               }
               if (this.piece(j+1, i-1) === 0) {
                  possibleMoves.push([j-1, i+1])
               }
             }
             for (var k = 0; k < possibleMoves.length; k++) {
                if (this.moveType(piece, [j,i], possibleMoves[k])) {
                    return true;
                }
             }
          }
       }
       return false;
    }

    boardStillhasOpponent(){
      let opponent = this.player === 1 ? 2:1;
      for (let i = 0; i < this.board.length; i++) {
        for (let j = 0; j <this.board[i].length; j++) {
          if (this.board[j][i] === opponent) {
            return true;
          }
        }
      }
      return false;
    }

    gameFinished(){
        if(this.boardStillhasMoves() && this.boardStillhasOpponent()) {
            return 'incomplete game'
        } else {
           let score = this.determineWinner();
           if (score === 'tie') {
               return 'tie'
           } else {
              if (score.winner === this.player) {
                return 'first'
              } else {
                return 'second'
              }
           }

        }
    }

    setPlayer(x,y){
      if (this.piece(x,y)){
          return this.player = this.piece(x,y)
      } else {
          return false;
      }
    }

    liftPiece(x0, y0, x1, y1){
       if (this.piece(x0,y0) && !this.piece(x1,y1)) {
           if (this.piece(x1,y1) === 0) {
              this.currentPlayer = this.piece(x0,y0)
              this.currentPosition = [x0,y0]
              this.intendedPosition = [x1,y1]
              let move = this.moveType(this.currentPlayer, this.currentPosition, this.intendedPosition);
              if (move) {
                if (move.type === 'jump') {
                  this.take(move.taken[0], move.taken[1]);
                }
                return this.move(x0, y0, x1, y1);
              } else {
                 return false;
              }
          } else {
            return false;
          }
       } else {
         return false;
       }

    }
    canJump(coordinates, direction, player){
      const position = player === 1 ? 1 : -1;
      if (direction === 'left') {
        return this.piece(coordinates[0] - 1, coordinates[1] + position) === 0;
      } else if (direction === 'right') {
        return this.piece(coordinates[0] + 1, coordinates[1] - position) === 0;
      }
    }
    moveType(player, current, intended) {
      if (player === 1) {
            // all moves are only forward
        if (intended[1] > current[1]) {
            let adjLeft = [current[0]-1, current[1]+1]
            let adjRight = [current[0]+1, current[1]+1]
            if (this.isEqual(adjLeft, intended) || this.isEqual(adjRight, intended)) {
                // cannot pass on a jump
                if (this.piece(adjLeft[0], adjLeft[1]) === 2 || this.piece(adjRight[0], adjRight[1]) === 2) {
                    if (this.piece(adjLeft[0], adjLeft[1]) === 2 && this.canJump(adjLeft,'left',player)) {
                      return false;
                    }
                    if (this.piece(adjRight[0, adjRight[1]]) === 2 && this.canJump(adjRight,'right',player)) {
                      return false;
                    }
                    return {type: 'slide'};
                } else {
                  return {type: 'slide'};
                }
            } else {
                // jumping
              if (this.piece(adjLeft[0], adjLeft[1]) === 2 || this.piece(adjRight[0], adjRight[1]) === 2) {
                 let takenPiece = intended[0] < current[0] ? [intended[0]+1, intended[1] - 1] : [intended[0]-1, intended[1]-1];
                 if (this.piece(takenPiece[0], takenPiece[1])) {
                    return {type: 'jump', taken: takenPiece};
                 } else {
                    return false;
                 }
              } else {
                  return false;
              }
            }
        } else {
            return false;
        }
      }  else if (player === 2) {
          if (intended[1] < current[1]) {
            let adjLeft = [current[0]-1, current[1]-1]
            let adjRight = [current[0]+1, current[1]-1]
            if (this.isEqual(adjLeft, intended) || this.isEqual(adjRight, intended)) {
                if (this.piece(adjLeft[0], adjLeft[1]) === 1 || this.piece(adjRight[0], adjRight[1]) === 1) {
                  if (this.piece(adjLeft[0], adjLeft[1]) === 1 && this.canJump(adjLeft, 'left', player)) {
                    return false;
                  }
                  if (this.piece(adjRight[0, adjRight[1]]) === 1 && this.canJump(adjRight, 'right', player)) {
                    return false;
                  }
                  return {type: 'slide'};
                } else {
                    return {type: 'slide'};
                }
            } else {
              if (this.piece(adjLeft[0], adjLeft[1]) === 1 || this.piece(adjRight[0], adjRight[1]) === 1) {
                  let takenPiece = intended[0] < current[0] ? [intended[0]+1, intended[1] + 1] : [intended[0]-1, intended[1] + 1];
                  if (this.piece(takenPiece[0], takenPiece[1])) {
                    return {type: 'jump', taken: takenPiece};
                  } else {
                      return false;
                  }
              } else {
                  return false;
              }
            }
          } else {
              return false;
          }

      } else {
          return false;
      }
    }

    allowedMove(player, current, intended) {
        return this.moveType(player, current, intended);
    }
}
