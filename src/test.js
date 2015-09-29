var chai = require('chai')
chai.use(require('chai-as-promised'))
var should = chai.should()
var expect = chai.expect

/*global describe, it, before, beforeEach, after, afterEach */

describe('#module', () => {
    "use strict"
    it('should load the module', () => {

        var mod = require('..')
        should.exist(mod)

    })

    it('should parse the table', () => {
        var x =
            `
| a    | b     | c     |
| ---- | ----- | ----- |
| 1    | 2     | 3     |
`
        var tb = require('..').getTables(x)
        expect(tb).to.be.deep.equal([{
            "headers": [
                "a",
                "b",
                "c"
            ],
            "json": [{
                "a": "1",
                "b": "2",
                "c": "3"
            }]
        }])
    })
})
