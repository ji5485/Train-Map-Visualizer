type HeapNodeType = {
  weight: number
  node: number
}

export default class PriorityQueue {
  heap: HeapNodeType[]

  constructor() {
    this.heap = []
  }

  getLeftChildIndex = (parentIndex: number): number => parentIndex * 2 + 1
  getRightChildIndex = (parentIndex: number): number => parentIndex * 2 + 2
  getParentIndex = (childIndex: number): number =>
    Math.floor((childIndex - 1) / 2)

  peek = (): HeapNodeType => this.heap[0]

  enqueue = (weight: number, node: number): void => {
    this.heap.push({ weight, node })

    let index = this.heap.length - 1
    const lastInsertedNode = this.heap[index]

    while (index > 0) {
      const parentIndex = this.getParentIndex(index)

      if (this.heap[parentIndex].weight > lastInsertedNode.weight) {
        this.heap[index] = this.heap[parentIndex]
        index = parentIndex
      } else break
    }

    this.heap[index] = lastInsertedNode
  }

  dequeue = (): HeapNodeType | undefined => {
    const count = this.heap.length
    const rootNode = this.peek()

    if (count <= 0) return undefined
    else if (count === 1) this.heap = []
    else {
      this.heap[0] = this.heap.pop()!
      this.heapifyDown()
    }

    return rootNode
  }

  isEmpty = (): boolean => this.heap.length <= 0

  heapifyDown = (): void => {
    let index = 0
    const count = this.heap.length
    const rootNode = this.peek()

    while (this.getLeftChildIndex(index) < count) {
      const leftChildIndex = this.getLeftChildIndex(index)
      const rightChildIndex = this.getRightChildIndex(index)

      const smallerChildIndex =
        rightChildIndex < count &&
        this.heap[rightChildIndex].weight < this.heap[leftChildIndex].weight
          ? rightChildIndex
          : leftChildIndex

      if (this.heap[smallerChildIndex].weight <= rootNode.weight) {
        this.heap[index] = this.heap[smallerChildIndex]
        index = smallerChildIndex
      } else break
    }

    this.heap[index] = rootNode
  }
}
