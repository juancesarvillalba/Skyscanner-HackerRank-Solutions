// the test framework
let assert = require('assert')

// the test
it('meets the expectation',   () => assert.equal(main('total'),  'o'))
it('meets the expectation 2', () => assert.equal(main('teeter'), 'r'))

// the code
function main(str) {
    let obj = {}

    for (let i=0; i < str.length; i++) {
        let key = str.charAt(i)

        obj[key] === undefined
            ? obj[key] = 1
            : obj[key]++
    }

    for (let k in obj) {
        if (obj[k] === 1) return k
    }
}
