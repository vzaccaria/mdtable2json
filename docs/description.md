# What is it

Takes a markdown string and extracts tables in json form contained in it.

## Example

``` js
var x =`
| a    | b     | c     |
| ---- | ----- | ----- |
| 1    | 2     | 3     |
`

var tb = require('mdtable2json').getTables(x)

/* tb =

[{
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
        }]

*/
```
