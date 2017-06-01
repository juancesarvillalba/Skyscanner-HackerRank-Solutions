// the test framework
let assert = require('assert')

// the input
let stdin = `5
Singapore
Bangkok
Singapore
Bangkok
Singapore`
// the expectation
let expected = `Singapore`
// the input
let stdin2 = `6
Barcelona
Edinburgh
Barcelona
Miami
Miami
Barcelona`
// the expectation
let expected2 = `Barcelona`
// the test
it('meets the expectation', () =>
    assert.equal(main(stdin), expected))

it('meets the expectation 2', () =>
    assert.equal(main(stdin2), expected2))



// the code
function main(input) {
    let lines = input.split('\n'),
        destinations = lines.slice(1)

    let obj = destinations
        .reduce((acc, dest) => {
            acc[dest] === undefined
                ? acc[dest] = 1
                : acc[dest]++;
            return acc;
        }, {});

//     let destinationsWithCount = destinations
//         .reduce((acc, dest) =>
//             acc.has(dest)
//                 ? acc.set(dest, acc.get(dest)+1)
//                 : acc.set(dest, 1)
//             , new Map())

    let count = 0,
        result;

    for (let dest in obj) {
        if (obj[dest] > count) {
            count = obj[dest]
            result = dest
        }
    }
    return result;
}
