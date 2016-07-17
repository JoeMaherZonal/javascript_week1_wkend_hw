var _ = require('lodash');

Record = function(params){
  this.artist = params['artist'],
  this.title = params['title'],
  this.price = params['price']
}

Record.prototype = {

}

module.exports = Record;