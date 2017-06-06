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

let treeWithMaleTitles = {
    nodeName: 'Sarah',
    children: [
        {
            nodeName: 'Mr. Fred',
            children: [
                {
                    nodeName: 'Hilary',
                    children: []
                },
                {
                    nodeName: 'Jenny',
                    children: [
                        {
                            nodeName: 'Mr. James',
                            children: []
                        }
                    ]
                }
            ]
        },
        {
            nodeName: 'Mr. Paul',
            children: []
        }
    ]
};


let relationships = [
    [ 'June', 'Alex' ],
    [ 'June', 'Qing' ],
    [ 'Qing', 'Paul' ],
    [ 'Qing', 'Gareth' ]
];


['Sarah', 'Fred', 'Hilary', 'Jenny', 'James'].forEach(name => {
    it(`finds the employee ${name}`, () =>
        assert(findNode(name, tree)))
})

// it('makes a tree', () =>
//     assert.equal(makeTree(relationships), tree))

it('updates a tree', () =>
    assert.equal(traverse(tree, node => {
        console.log("NODE traversed is ", node.nodeName)
        // let n = node.nodeName
        // if (n == 'Fred' || n == 'James' || n == 'Paul') {
        //     return {nodeName: 'Mr. ' + n, children: node.children}
        // }
    }), tree))


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


function makeTree(list) {
    return list.reduce((acc, [manager, employee]) => {
        // console.log('ACC', acc)
        let maybeEmployee = findNode(manager, acc)

        switch(typeof maybeEmployee) {
            case 'object':
                console.log("YES! it's already in acc. add only the employee.", maybeEmployee)
                maybeEmployee =
                    {
                        nodeName: manager,
                        children: [ ...node.children, {
                            nodeName: employee,
                            children: []
                        }]
                    }
                return acc;
                // return [ ...acc,
                //     {
                //         nodeName: manager,
                //         children: [ ...node.children, {
                //             nodeName: employee,
                //             children: []
                //         }]
                //     }
                // ]

            default:
                console.log("it's not in acc. add relationship (both manager and employee).", maybeEmployee)
                return [ ...acc,
                    {
                        nodeName: manager,
                        children: [{
                            nodeName: employee,
                            children: []
                        }]
                    }
                ]
        }

    }, [])
}


function findNode(name, tree) {
    return tree.nodeName === name
        ? tree
        : tree.children
            ? tree.children.map(subTree =>
                findNode(name, subTree))
            : undefined
}

// function updateNode(name, newNode, tree) {
//     if (tree.nodeName === name) {
//         tree = newNode
//         return tree
//     } else if (tree.children) {
//         return tree.children.map(subTree =>
//                 updateNode(name, newNode, tree))
//     }
// }

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
        console.log('inside WHILE')
        for (var i = 0, length = node.children.length; i < length; i++) {
            queue.unshift(node.children[i]);
            // queue.enqueue(node.children[i]);
        }

        cb(node);
        node = queue.shift();
    }
    // return tree;
    // console.log('done!!!!!!!!!!!!')
}


// I need mapTree. But with breadth-first traversal.
// function mapTree(tree, fun) {

// }

// console.log(traverse(tree, node => { console.log('node traversed', node.nodeName)}))

