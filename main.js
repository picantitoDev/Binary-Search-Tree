import BinarySearchTree from "./bst.js"

function generateRandomArray(size, max = 100) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * max))
}

const printNode = (node) => process.stdout.write(node.data + " ")

let randomArray = generateRandomArray(10) // Create random array of 10 numbers
console.log("Generated Array:", randomArray)

let tree = new BinarySearchTree(randomArray) // Create BST

console.log("\nInitial Tree:")
tree.prettyPrint(tree.root)

console.log("\nIs the tree balanced?", tree.isBalanced())

console.log("\nTraversals:")
console.log("Level Order:", [])
tree.levelOrder(printNode)

console.log("\nIn Order:", [])
tree.inOrder(tree.root, printNode)

console.log("\nPre Order:", [])
tree.preOrder(tree.root, printNode)

console.log("\nPost Order:", [])
tree.postOrder(tree.root, printNode)

// Insert elements > 100 to unbalance the tree
tree.insert(150)
tree.insert(120)
tree.insert(130)
tree.insert(110)
tree.insert(160)

console.log("\nAfter Insertions (Unbalanced Tree):")
tree.prettyPrint(tree.root)
console.log("\nIs the tree balanced?", tree.isBalanced())

// Rebalance the tree
tree.rebalance()

console.log("\nAfter Rebalancing:")
tree.prettyPrint(tree.root)
console.log("\nIs the tree balanced?", tree.isBalanced())

console.log("\nIn Order:", [])
tree.inOrder(tree.root, printNode)

console.log("\nPre Order:", [])
tree.preOrder(tree.root, printNode)

console.log("\nPost Order:", [])
tree.postOrder(tree.root, printNode)
console.log("\n")
