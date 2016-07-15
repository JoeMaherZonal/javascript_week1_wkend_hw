var RecordStore = function(params){
  this.name = params['name'],
  this.city = params['city'],
  this.balance = 0,
  this.records = []
}

RecordStore.prototype = {
  addRecord: function(record){
    this.records.push(record);
  },

  removeRecord: function(record_title){
    this.records.push(record);
  }

}

module.exports = RecordStore;