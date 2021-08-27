type HeapNodeType<Type> = {
  key: number
  value: Type
}

export default class PriorityQueue<Type> {
  heap: HeapNodeType<Type>[]

  constructor() {
    this.heap = []
  }

  getLeftChildIndex = (parentIndex: number): number => parentIndex * 2 + 1
  getRightChildIndex = (parentIndex: number): number => parentIndex * 2 + 2
  getParentIndex = (childIndex: number): number =>
    Math.floor((childIndex - 1) / 2)

  peek = (): HeapNodeType<Type> => this.heap[0]

  enqueue = (priority: number, value: Type): void => {
    this.heap.push({ key: priority, value })

    let index = this.heap.length - 1
    const lastInsertedNode = this.heap[index]

    while (index > 0) {
      const parentIndex = this.getParentIndex(index)

      if (this.heap[parentIndex].key > lastInsertedNode.key) {
        this.heap[index] = this.heap[parentIndex]
        index = parentIndex
      } else break
    }

    this.heap[index] = lastInsertedNode
  }

  dequeue = (): Type => {
    const count = this.heap.length
    const { value } = this.peek()

    if (count <= 0) return undefined

    if (count === 1) this.heap = []
    else {
      this.heap[0] = this.heap.pop()
      this.heapifyDown()
    }

    return value
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
        this.heap[rightChildIndex].key < this.heap[leftChildIndex].key
          ? rightChildIndex
          : leftChildIndex

      if (this.heap[smallerChildIndex].key <= rootNode.key) {
        this.heap[index] = this.heap[smallerChildIndex]
        index = smallerChildIndex
      } else break
    }

    this.heap[index] = rootNode
  }
}
