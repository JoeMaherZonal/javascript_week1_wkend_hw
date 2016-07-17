var _ = require('lodash');
var Customer = require('./customer');

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
    _.forEach(this.records, function(record, index){
      if(record.title === record_title){
        this.records.splice(index, 1);
      };
    }.bind(this));
  },

  listInventory: function(){
    result = []
    lookup = []
    for(outerRecord of this.records){
      var count = 0;
      for(innerRecord of this.records){
        if(innerRecord === outerRecord){
          count += 1;
        }
      }
      index = lookup.indexOf(outerRecord.name + outerRecord.title)
      if(index === -1){
        result.push([outerRecord, count])
      }
      lookup.push(outerRecord.name + outerRecord.title);
    }

    return result;
  },

  sellRecord: function(record, customer){
    if(customer.canAfford(record)){
    index = this.records.indexOf(record)
    this.balance += record.price
    this.records.splice(index, 1)
    customer.buyRecord(record)
    }else{
      return
    }
  },

  finances: function(){
    var result = {stockvalue: 0, balace: 0};
    result['balance'] = this.balance;
    var total = 0
    for(record of this.records){
      total += record.price
    }
    result['stockvalue'] = total;
    console.log(result)
    return result
  },

  findRecord: function(record_title){
    for(record of this.records){
      if(record.title === record_title){
        return {"record": record, "index": this.records.indexOf(record)}
      }
    }
  },

  buyRecord: function(record_title, customer){
    recordObject = this.findRecord(record_title)
    customer.sellRecord(record_title)
    this.balance -= recordObject['record'].price
    this.records.splice(recordObject['index'], 1)
  }

}

module.exports = RecordStore;