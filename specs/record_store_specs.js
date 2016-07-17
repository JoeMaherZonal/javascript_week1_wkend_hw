var RecordStore = require('../record_store');
var Record = require('../record');
var Customer = require('../customer');
var assert = require('chai').assert;


describe("Record Store", function(){

  beforeEach(function(){
    customer1 = new Customer("Joe Maher")
    params = {'name': "Joe's Records", 'city': "Edinburgh"}
    recordStore = new RecordStore(params)
    params = {'artist': "Oasis", 'title': "Wonder Wall", 'price': 10}
    wonderWall = new Record(params)
    params = {'artist': "Linkin Park", 'title': "In the End", 'price': 8}
    inTheEnd = new Record(params)
    params = {'artist': "Blink 182", 'title': "1985", 'price': 11}
    blink1985 = new Record(params)
    params = {'artist': "Nickleback", 'title': "By the Way", 'price': 6}
    byTheWay = new Record(params)
  })

  it('check record store has been initiated', function(){
    assert.deepEqual("Joe's Records", recordStore.name)
    assert.deepEqual("Edinburgh", recordStore.city)
    assert.deepEqual(0, recordStore.records.length)
    assert.deepEqual(0, recordStore.balance)
  })

  it('Add record to store', function(){
    recordStore.addRecord(wonderWall)
    assert.deepEqual("Wonder Wall", recordStore.records[0].title)
  })

  it('remove record to store', function(){
    recordStore.addRecord(wonderWall)
    assert.deepEqual("Wonder Wall", recordStore.records[0].title)
    recordStore.removeRecord("Wonder Wall")
    assert.deepEqual(0, recordStore.records.length)
  })

  it('inventory list', function(){
    recordStore.addRecord(wonderWall)
    recordStore.addRecord(wonderWall)
    recordStore.addRecord(inTheEnd)
    recordStore.addRecord(byTheWay)
    recordStore.addRecord(blink1985)
    recordStore.listInventory()
    assert.deepEqual(4, recordStore.listInventory().length)
    wonderwallCount = recordStore.listInventory()[0][1]
    assert.deepEqual(2, wonderwallCount)
  })

  it('sell record', function(){
    customer1.addMoney(100)
    recordStore.addRecord(wonderWall)
    recordStore.sellRecord(wonderWall, customer1)
    assert.equal(10, recordStore.balance)
  })

  it('finances', function(){
    customer1.addMoney(100)
    recordStore.addRecord(wonderWall)
    recordStore.sellRecord(wonderWall, customer1)
    assert.equal(10, recordStore.balance)
  })

  it('customer can buy record', function(){
    customer1.addMoney(100)
    recordStore.sellRecord(wonderWall, customer1)
    assert.equal(10, recordStore.balance)
  })

  it('customer cant buy record without enough money', function(){
    customer1.addMoney(9)
    recordStore.sellRecord(wonderWall, customer1)
    assert.equal(0, recordStore.balance)
    assert.deepEqual([], customer1.records)
  })

  it('customer can sell record to store', function(){
    recordStore.addRecord(wonderWall);
    recordStore.addRecord(wonderWall);
    recordStore.addRecord(inTheEnd);
    recordStore.addRecord(byTheWay);
    recordStore.addRecord(blink1985);
    recordStore.balance = 19;
    customer1.giveRecord(wonderWall);
    recordStore.buyRecord("Wonder Wall", customer1);
    assert.equal(10, customer1.money);
    assert.deepEqual(9, recordStore.balance);
    assert.deepEqual(4, recordStore.records.length);
    assert.deepEqual([], customer1.records);
  })





})

//-----------------------RECORDS------------------------
describe("Records", function(){

  beforeEach(function(){
    params = {'artist': "Oasis", 'title': "Wonder Wall", 'price': 10}
    wonderWall = new Record(params)
    params = {'artist': "Linkin Park", 'title': "In the End", 'price': 8}
    inTheEnd = new Record(params)
    params = {'artist': "Blink 182", 'title': "1985", 'price': 11}
    blink1985 = new Record(params)
    params = {'artist': "Nickleback", 'title': "By the Way", 'price': 6}
    byTheWay = new Record(params)
  })

  it('check record has been initiated', function(){
    assert.deepEqual("Wonder Wall", wonderWall.title)
    assert.deepEqual("Linkin Park", inTheEnd.artist)
    assert.deepEqual(11, blink1985.price)
  })

})

//-----------------------CUSTOMERs------------------------
describe("Customers", function(){

  beforeEach(function(){
    params = {'artist': "Oasis", 'title': "Wonder Wall", 'price': 10}
    wonderWall = new Record(params)
    params = {'artist': "Linkin Park", 'title': "In the End", 'price': 8}
    inTheEnd = new Record(params)
    params = {'artist': "Blink 182", 'title': "1985", 'price': 11}
    blink1985 = new Record(params)
    params = {'artist': "Nickleback", 'title': "By the Way", 'price': 6}
    byTheWay = new Record(params)
    customer1 = new Customer("Joe Maher")
    customer1.money = 0;
    customer1.records = [];
  })

  it('check customer store has been initiated', function(){
    assert.deepEqual("Joe Maher", customer1.name)
    assert.deepEqual([], customer1.records)
    assert.deepEqual(0, customer1.money)
  })

  it('check customer can afford record', function(){
    customer1.addMoney(100)
    assert.deepEqual(true, customer1.canAfford(wonderWall))
  })

  it('check customer can be given a record', function(){
    assert.deepEqual(0, customer1.records.length)
    customer1.giveRecord(wonderWall)
    assert.deepEqual(1, customer1.records.length)
  })

  it('check customer can be buy a record', function(){
    customer1.addMoney(100)
    customer1.buyRecord(wonderWall)
    assert.deepEqual(90, customer1.money)
  })

  it('check customer cant be buy a record without enough money', function(){
    customer1.addMoney(9)
    customer1.buyRecord(wonderWall)
    assert.deepEqual([], customer1.records)
  })


  it('check customer can be sell a record', function(){
    customer1.giveRecord(wonderWall)
    customer1.sellRecord("Wonder Wall")
    assert.deepEqual(10, customer1.money)
    assert.deepEqual([], customer1.records)
  })

})