var RecordStore = require('../record_store');
var Record = require('../record');
// var Account = require('../bank').account;
var assert = require('chai').assert;


describe("Record Store", function(){

  beforeEach(function(){
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

  it('check record store has been initiated', function(){
    assert.deepEqual("Wonder Wall", wonderWall.title)
    assert.deepEqual("Linkin Park", inTheEnd.artist)
    assert.deepEqual(11, blink1985.price)
  })

})