export default class Player {
  output(message, error){
    return error ? {message: message, className:'danger'} : {message: message, className: 'success'};
  }
  playGame(data, game, instance){
    let err;
    for (let i = 0; i < data.length; i++){
      if (i === 0){
        game.setPlayer(data[i][0], data[i][1]);
      }

      if (game.player) {
        if (game.liftPiece(data[i][0], data[i][1], data[i][2], data[i][3]) === false) {
            if (i < data.length - 1) {
              err = true;
              return this.output(`Line ${i+1} illegal move ${data[i]}`, 'error')
            }
          }
      } else {
        return instance.output('No player in location', 'error')
      }
    }
    if (!err) {
      return instance.output(game.gameFinished())
    }
  }
}
