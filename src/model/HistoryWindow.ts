export default class HistoryWindow {
  readonly forName: string
  readonly visible: boolean

  constructor({forName, visible}:{forName: string,visible:boolean}) {
    this.forName = forName
    this.visible = visible
  }

  setVisible(visible:boolean):HistoryWindow {
    return new HistoryWindow({...Object(this), visible})
  }
}