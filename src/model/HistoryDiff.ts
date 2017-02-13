import Page from './Page'

export default class HistoryDiff {
  readonly same: Page[]
  readonly removed: Page[]
  readonly added: Page[]
  readonly oldCurrentIndex: number
  readonly newCurrentIndex: number

  constructor({same=[], removed=[], added=[], oldCurrentIndex, newCurrentIndex}:
              {same?:Page[], removed?:Page[], added?:Page[],
                oldCurrentIndex:number, newCurrentIndex:number}) {
    this.same = same
    this.removed = removed
    this.added = added
    this.oldCurrentIndex = oldCurrentIndex
    this.newCurrentIndex = newCurrentIndex
  }

  get oldIndexFromEnd():number {
    return this.same.length + this.removed.length - 1 - this.oldCurrentIndex
  }

  get newIndexFromEnd():number {
    return this.same.length + this.added.length - 1 - this.newCurrentIndex
  }

  get indexDelta():number {
    return this.newCurrentIndex - this.oldCurrentIndex
  }
}