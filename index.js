class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    //if the tree is empty then this key being inserted is the root node of the tree
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    //If the tree already exist, then start at the root, 
    //and compare it to the key you want to insert
    // If the new key is less than the node's key 
    //then the new node needs to live in the left-hand branch.
    else if (key < this.key) {
      //if the existing node does not have any left child, 
      //meaning that if the `left` pointer is empty 
      //then we can just instantiate and insert the new node 
      //as the left child of that node, passing `this` as the parent.  
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      //if the node has an existing left child, 
      //then we recursively call the `insert` method 
      //so the node is added further down the tree.
      else {
        this.left.insert(key, value);
      }
    }
    //Similarly, if the new key is greater than the node's key 
    //then you do the same thing, but on the right-hand side.
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    //if the item is found at the root then return that value
    if (this.key == key) {
      return this.value;
    }
    //if the item you are looking for is less than the root 
    //then follow the left child
    //if there is an existing left child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    //if the item you are looking for is greater than the root 
    //then follow the right child
    //if there is an existing right child, 
    //then recursively check its left and/or right child
    //until you find the item.
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    //You have search the tree and the item is not in the tree
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  _findMax() {
    if (!this.right) {
      return this;
    }

    return this.right._findMax();
  }

 
}

function main() {
  let bst = new BinarySearchTree();
  const arr = [[3,'a'],[1,'b'],[4,'c'],[6,'d'],[9,'e'],[2,'f'],[5,'f'],[7,'g']];

  arr.forEach(element => {
    bst.insert(element[0], element[1]);
  });

  // console.log(bst.right._findMin());
  // console.log(bst.right._findMin());
  // console.log(bst._findMax());
  // console.log(bst.remove(5));
  // console.log(bst._bstHeight(bst));
  // console.log(bst.right.right.right.left);
}
// main();



const bstHeight = (bst, level=1)  => {

  // create base case
  if ( bst.left === null && bst.right === null) {
    return level;
  }

  // start at root
  // go to left 

  // level count ++
  level++;
  // then call function on this.right
  if(bst.left === null) {
    return bstHeight(bst.right, level);
  }
  // call function on this.left, 
  if(bst.right === null) {
    return bstHeight(bst.left, level);
  }

  // call both left and then right recursively
  return Math.max(bstHeight(bst.left, level), bstHeight(bst.right, level));

};

// console.log(bstHeight(bst));

const isBst = bst => {
  if(bst === null) {
    return true;
  } else if (bst.right !== null && bst.right.key < bst.key) {
    return false;
  } else if (bst.left !== null && bst.left.key > bst.key) {
    return false;
  } else {
    return isBst(bst.right) && isBst(bst.left);
  }
};

// console.log(isBst(bst));



let bst = new BinarySearchTree();
const arr = [[3,'a'],[1,'b'],[4,'c'],[6,'d'],[2,'f'],[9,'r'],[5,'f'],[7,'g']];

arr.forEach(element => {
  bst.insert(element[0], element[1]);
});


// console.log(bst._findMax());

const thirdLargest = (bst) => {
  let largest = bst._findMax();
  let secLargest = largest.parent;
  if(secLargest.left && secLargest.left.key > secLargest.parent.key) {
    return secLargest.left.key;
  } else {
    return secLargest.key;
  }

};

console.log(thirdLargest(bst));


let balBst = new BinarySearchTree();
const balArr = [[3,'a'],[2,'b'],[4,'c']];

balArr.forEach(element => {
  balBst.insert(element[0], element[1]);
});

const isBalanced = bst => {
  if(!bst) {
    return false;
  }
  let leftHeight = bstHeight(bst.left);
  let rightHeight = bstHeight(bst.right);

  // console.log(rightHeight);
  // console.log(leftHeight);

  if((leftHeight - rightHeight > 1)) {
    return false;
  }
  return true;

};

// console.log(isBalanced(bst));
// console.log(isBalanced(balBst));