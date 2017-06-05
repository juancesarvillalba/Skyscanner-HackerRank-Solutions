// the test framework
let assert = require('assert')

// the input
let stdin = `6
Hilary
James
Sarah Fred
Sarah Paul
Fred Hilary
Fred Jenny
Jenny James`
// the expectation
let expected = `Fred`
// the input
let stdin2 = `4
Simon
Claudiu
Sarah Claudiu
Sarah Paul
Claudiu Simon`
// the expectation
let expected2 = `Claudiu`
// the input
let stdin3 = `5
Gareth
Alex
June Alex
June Qing
Qing Paul
Qing Gareth`
// the expectation
let expected3 = `June`
// the test
it('meets the expectation', () =>
    assert.equal(main(stdin), expected))

it('meets the expectation 2', () =>
    assert.equal(main(stdin2), expected2))

it('meets the expectation 3', () =>
    assert.equal(main(stdin3), expected3))

let tree = {
    nodeName: "Sarah",
    children: [
        {
            nodeName: "Fred",
            children: [
                {
                    nodeName: "Hilary",
                    children: []
                },
                {
                    nodeName: "Jenny",
                    children: [
                        {
                            nodeName: "James",
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            nodeName: "Paul",
            children: []
        }
    ]
};

['Sarah', 'Fred', 'Hilary', 'Jenny', 'James'].forEach(name => {
    it(`finds the employee ${name}`, () =>
        assert(findEmployee(name, tree)))
})


// the code
function main(input) {
    let lines = input.split('\n'),
        employeesNumber = lines[0],
        selectedEmployees = lines.slice(1, 3),
        relationships = lines.slice(3, lines.length)
}

function findEmployee(name, tree) {
    return tree.nodeName === name
        ? tree
        : tree.children.map(subTree =>
            findEmployee(name, subTree))
}
