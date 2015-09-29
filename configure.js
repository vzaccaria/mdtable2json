var {
  generateProject
} = require('diy-build')

var path = require('path')

generateProject(_ => {

  _.babel = (dir, ...deps) => {
    var command = (_) => `./node_modules/.bin/babel ${_.source} -o ${_.product}`
    var product = (_) => `./lib/${path.basename(_.source)}`
    _.compileFiles(...([command, product, dir].concat(deps)))
  }

  _.verb = (verbfile, deps) => {
    var command = (_) => `./node_modules/.bin/verb`
    var product = (_) => `./readme.md`
    _.compileFiles(...([command, product, verbfile].concat(deps)))
  }

  _.collectSeq("all", _ => {
    _.collect("build", _ => {
      _.babel("src/*.js")
    })
    _.cmd("cp ./lib/index.js ./index.js")
    _.cmd("./node_modules/.bin/markdox ./index.js -o docs/api.md")
    _.verb("./verbfile.js", "docs/*.md")
  })

  _.collect("test", _ => {
    _.cmd("make all")
    _.cmd("./node_modules/.bin/mocha ./lib/test.js")
  })

  _.collect("update", _ => {
    _.cmd("make clean && ./node_modules/.bin/babel configure.js | node")
  });

  ["major", "minor", "patch"].map(it => {
    _.collect(it, _ => {
      _.cmd(`make all`)
      _.cmd(`./node_modules/.bin/xyz -i ${it}`)
    })
  })

})