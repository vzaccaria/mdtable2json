var _ = require( 'lodash' )
var parser = require('mdast')

function tableToJson(t) {
    var headerCellArray = t.children[0].children
    var headers = _.map(headerCellArray, (it) => {
            return it.children.map(c => c.value).join('')
        })
        // Remove head
    t.children.splice(0, 1)
    var matrix = _.map(t.children, (row) => {
        return _.map(row.children, (cell) => {
            if (!_.isUndefined(cell.children[0])) {
                return cell.children.map(c => c.value).join('')
            } else {
                return ""
            }
        })
    })
    var json = _.map(matrix, (row) => {
        var o = {}
        _.map(row, (cell, index) => {
            o[headers[index]] = cell
        })
        return o
    })
    return {
        headers, json
    }
}


function getTables(string) {
    var tokens = parser.parse(string)
    return _.map(_.filter(tokens.children, it => {
        return it.type === 'table'
    }), tableToJson)
}

module.exports = { getTables, tableToJson }
