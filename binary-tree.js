/** BinaryTreeNode: node for a general tree. */

class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth() {
    if (!this.root) return 0;

    const queue = [[this.root, 1]];

    while (queue.length) {
      const [node, depth] = queue.shift();
      if (!node.left && !node.right) return depth;
      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth() {
    if (!this.root) return 0;

    const queue = [[this.root, 1]];
    let maxDepth = 0;

    while (queue.length) {
      const [node, depth] = queue.shift();
      maxDepth = Math.max(maxDepth, depth);
      if (node.left) queue.push([node.left, depth + 1]);
      if (node.right) queue.push([node.right, depth + 1]);
    }

    return maxDepth;
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree. */
  maxSum() {
    let result = 0;

    function helper(node) {
      if (!node) return 0;

      const leftSum = helper(node.left);
      const rightSum = helper(node.right);

      result = Math.max(result, node.val + leftSum + rightSum);

      return Math.max(0, node.val + Math.max(leftSum, rightSum));
    }

    helper(this.root);
    return result;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    if (!this.root) return null;

    let result = null;
    const stack = [this.root];

    while (stack.length) {
      let current = stack.pop();

      if (current.val > lowerBound && (result === null || current.val < result)) {
        result = current.val;
      }

      if (current.left) stack.push(current.left);
      if (current.right) stack.push(current.right);
    }

    return result;
  }
}

module.exports = { BinaryTree, BinaryTreeNode };

