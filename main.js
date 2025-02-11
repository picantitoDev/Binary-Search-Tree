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

  insert(value, currentNode = this.root) {
    if (currentNode === null) {
      return new Node(value)
    }

    if (value <= currentNode.data) {
      currentNode.left = this.insert(value, currentNode.left)
    } else {
      currentNode.right = this.insert(value, currentNode.right)
    }

    return currentNode
  }

  deleteItem(value, currentNode = this.root) {
    if (currentNode === null) return null

    if (currentNode.data === value) {
      // 4 possible outcomes
      // It has no childs
      if (currentNode.left === null && currentNode.right === null) {
        return null
      }
      // It has a child to the left
      else if (currentNode.right === null) {
        return currentNode.left
      }
      // It has a child to the right
      else if (currentNode.left === null) {
        return currentNode.right
      }
      // It has two children
      else {
        let ptr = currentNode.right
        while (ptr.left) {
          ptr = ptr.left
        }
        currentNode.data = ptr.data
        currentNode.right = this.deleteItem(currentNode.data, currentNode.right)
        return currentNode
      }
    }

    if (value <= currentNode.data) {
      currentNode.left = this.deleteItem(value, currentNode.left)
    } else {
      currentNode.right = this.deleteItem(value, currentNode.right)
    }

    return currentNode
  }

  find(value) {
    let currentNode = this.root
    while (currentNode !== null) {
      if (value === currentNode.data) return currentNode
      currentNode =
        value > currentNode.data ? currentNode.right : currentNode.left
    }
    return null
  }

  findRec(value, currentNode = this.root) {
    if (currentNode === null) {
      return null
    }

    // Base Case
    if (currentNode.data === value) {
      return currentNode
    }

    // Recursive part

    if (value > currentNode.data) {
      return this.find(value, currentNode.right)
    }
    return this.find(value, currentNode.left)
  }

  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback function is required")
    }

    let queue = [this.root] // Start with root in queue

    while (queue.length > 0) {
      let node = queue.shift() // Dequeue first node
      if (node !== null) {
        callback(node) // Apply callback to current node
        if (node.left) queue.push(node.left) // Enqueue left child if exists
        if (node.right) queue.push(node.right) // Enqueue right child if exists
      }
    }
  }

  inOrder(node = this.root, callback) {
    if (arguments.length === 0) {
      throw new Error("No Callback Function Passed")
    }

    if (typeof callback !== "function") {
      throw new Error("Callback Function is required")
    }

    if (!node) return

    this.inOrder(node.left, callback) // Visit left subtree
    callback(node)
    this.inOrder(node.right, callback) // Visit right subtree
  }

  preOrder(node = this.root, callback) {
    if (arguments.length === 0) {
      throw new Error("No Callback Function Passed")
    }

    if (typeof callback !== "function") {
      throw new Error("Callback Function is required")
    }

    if (!node) return
    callback(node)
    this.preOrder(node.left, callback) // Visit left subtree
    this.preOrder(node.right, callback) // Visit right subtree
  }

  postOrder(node = this.root, callback) {
    if (arguments.length === 0) {
      throw new Error("No Callback Function Passed")
    }

    if (typeof callback !== "function") {
      throw new Error("Callback Function is required")
    }

    if (!node) return
    this.postOrder(node.left, callback) // Visit left subtree
    this.postOrder(node.right, callback) // Visit right subtree
    callback(node)
  }

  height(node = this.root) {
    if (!node) {
      return -1
    }

    let heightLeft = this.height(node.left)
    let heighRight = this.height(node.right)
    return Math.max(heightLeft, heighRight) + 1
  }

  depth(node) {
    let current = this.root
    let level = 0

    while (current) {
      if (current === node) {
        return level
      }
      current = node.value < current.value ? current.left : current.right
      level++
    }
    return -1
  }

  isBalanced() {
    let left = this.height(this.root.left)
    let right = this.height(this.root.right)
    return (
      Math.abs(left - right) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    )
  }

  rebalance() {
    let values = []
    this.inOrder(this.root, (node) => values.push(node.data))
    this.root = this.buildBalancedTree(values)
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

  let mid = Math.floor((start + end) / 2)
  const root = new Node(array[mid])
  root.left = buildTree(array, start, mid - 1)
  root.right = buildTree(array, mid + 1, end)

  return root
}

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
const bst = new BinarySearchTree(arr)
prettyPrint(bst.root)
const preOrder = []
const inOrder = []
const postOrder = []

const printNode1 = (node) => preOrder.push(node.data)
const printNode2 = (node) => inOrder.push(node.data)
const printNode3 = (node) => postOrder.push(node.data)

bst.preOrder(bst.root, printNode1)
bst.inOrder(bst.root, printNode2)
bst.postOrder(bst.root, printNode3)
console.log(preOrder)
console.log(inOrder)
console.log(postOrder)
console.log(bst.depth(bst.root))

function cleanArray(arr) {
  const cleanArray = arr
    .sort((a, b) => a - b)
    .filter((value, index) => arr.indexOf(value) === index)
  return cleanArray
}
