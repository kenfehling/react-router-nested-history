export default class HistoryWindow {
  readonly forName: string
  //readonly x?: number
  //readonly y?: number

  //constructor({forName, x, y}:{forName:string, x?:number, y?:number}) {
  constructor({forName}:{forName: string}) {
    this.forName = forName
    //this.x = x
    //this.y = y
  }
}