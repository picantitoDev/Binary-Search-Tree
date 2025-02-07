class Node {
  constructor(data) {
    this.data = data
    this.left = null
    this.right = null
  }
}

class BinarySearchTree {
  constructor(arr) {
    this.root = buildTree(cleanArray(arr))
  }
}

function prettyPrint(node, prefix = "", isLeft = true) {
  if (node === null) {
    return
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false)
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`)
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true)
  }
}

function buildTree(array = [], start = 0, end = array.length - 1) {
  if (start > end) {
    return null
  }

  console.log(array)
  let mid = Math.floor((start + end) / 2)
  const root = new Node(array[mid])
  root.left = buildTree(array, start, mid - 1)
  root.right = buildTree(array, mid + 1, end)

  return root
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new BinarySearchTree(arr)
console.log(bst.root.data)
prettyPrint(bst.root)

function cleanArray(arr) {
  const cleanArray = arr
    .sort((a, b) => a - b)
    .filter((value, index) => arr.indexOf(value) === index)
  return cleanArray
}
