var _ = require('lodash');

Customer = function(cust_name){
  this.name = cust_name,
  this.records = [],
  this.money = 0
}

Customer.prototype = {
  addMoney: function(amount){
    this.money += amount
  },

  canAfford: function(record){
    if(this.money >= record.price){
      return true;
    }else{
      return false;
    }
  },

  giveRecord: function(record){
    this.records.push(record)
  },

  buyRecord: function(record){
    if(this.canAfford(record)){
      this.records.push(record)
      this.money -= record.price
    }else{
      return
    }
  },

  findRecord: function(record_title){
    for(record of this.records){
      if(record.title === record_title){
        return {"record": record, "index": this.records.indexOf(record)}
      }
    }
  },

  sellRecord: function(record_title){
    recordObject = this.findRecord(record_title)
    this.records.splice(recordObject['index'], 1)
    this.money += recordObject['record'].price
  },
}


module.exports = Customer;