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

let exampleTree = {
    nodeName: 'Sarah',
    children: [
        {
            nodeName: 'Fred',
            children: [
                {
                    nodeName: 'Hilary',
                    children: []
                },
                {
                    nodeName: 'Jenny',
                    children: [
                        {
                            nodeName: 'James',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            nodeName: 'Paul',
            children: []
        }
    ]
};

['Sarah', 'Fred', 'Hilary', 'Jenny', 'James'].forEach(name => {
    it(`finds the employee ${name}`, () =>
        assert(findNode(name, exampleTree)))
})


// the code
function main(input) {
    let lines = input.split('\n'),
        selectedEmployees = lines.slice(1, 3),
        relationships = lines.slice(3, lines.length)
            .map(rel => rel.split(' '))
            .reverse(),
        employee1 = [selectedEmployees[0]],
        employee2 = [selectedEmployees[1]],
        allUniqueEmployees = relationships
            .reduce((a,b) => a.concat(b))
            .filter((v,i,a) => a.indexOf(v) === i);

    for (let emp of [selectedEmployees[0], selectedEmployees[1]]) {
        relationships.forEach(([manager, employee]) => {
            if (employee === employee1[employee1.length-1]) {
                employee1.push(manager);
            }
            if (employee === employee2[employee2.length-1]) {
                employee2.push(manager);
            }
        })
    }

    for (let emp of allUniqueEmployees) {
        if (employee1.includes(emp) && employee2.includes(emp)) {
            return emp;
        }
    }
}

// not necessary but might be useful
function findNode(name, tree) {
    return tree.nodeName === name
        ? tree
        : tree.children
            ? tree.children.map(subTree =>
                findNode(name, subTree))
            : undefined
}

// depth-first traversal
function traverse(tree, cb) {
    (function walk(node) {
        for (let i = 0, j = 1, length = node.children.length; i < length; i++, j++) {
            console.log(j, "visited ", node.nodeName)
            walk(node.children[i]);
        }
        cb(node);
    })(tree);
}

// breadth-first traversal
function traverseBF(tree, cb) {
    let queue = [tree];
    let node = queue.shift();

    while (node) {
        for (var i = 0, length = node.children.length; i < length; i++) {
            queue.unshift(node.children[i]);
        }

        cb(node);
        node = queue.shift();
    }
}
