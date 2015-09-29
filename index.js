"use strict";

var _ = require("lodash");
var parser = require("mdast");

function tableToJson(t) {
    var headerCellArray = t.children[0].children;
    var headers = _.map(headerCellArray, function (it) {
        return it.children[0].value;
    });
    // Remove head
    t.children.splice(0, 1);
    var matrix = _.map(t.children, function (row) {
        return _.map(row.children, function (cell) {
            if (!_.isUndefined(cell.children[0])) {
                return cell.children[0].value;
            } else {
                return "";
            }
        });
    });
    var json = _.map(matrix, function (row) {
        var o = {};
        _.map(row, function (cell, index) {
            o[headers[index]] = cell;
        });
        return o;
    });
    return {
        headers: headers, json: json
    };
}

function getTables(string) {
    var tokens = parser.parse(string);
    return _.map(_.filter(tokens.children, function (it) {
        return it.type === "table";
    }), tableToJson);
}

module.exports = { getTables: getTables, tableToJson: tableToJson };
