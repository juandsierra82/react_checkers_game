var Reader = class Reader {
  constructor(){
    this.reader = new FileReader()
  }

  readFile(file){
    var instance = this;
    return new Promise (function(resolve, reject){
      instance.reader.readAsText(file);
      instance.reader.onloadend = function(e){
        resolve(instance.reader.result);
      }
      instance.reader.onerror = function(e){
        reject('Unable to read file');
      }
    })
  }
  decodeString(string){
    let data = string.split('\n')
    return data.map(function(str){
      return str.split(',').map(function(char){
        return Number(char);
      })
    })
  }

};
export default Reader;
