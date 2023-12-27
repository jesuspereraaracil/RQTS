import { RQTSTubeManager } from './RQTSTubeManager'

export class RQTSManager {
  private static instance: RQTSManager
  private readonly tubes: Map<string, RQTSTubeManager>

  private constructor () {
    this.tubes = new Map<string, RQTSTubeManager>()
  }

  public static getInstance (): RQTSManager {
    if (RQTSManager.instance === undefined) {
      RQTSManager.instance = new RQTSManager()
    }

    return RQTSManager.instance
  }

  public getTube (tubeName: string): RQTSTubeManager {
    let tube = this.tubes.get(tubeName)
    if (tube == null) {
      tube = new RQTSTubeManager()
      this.tubes.set(tubeName, tube)
    }

    return tube
  }

  public static getTubeByName (tubeName: string): RQTSTubeManager {
    return RQTSManager.getInstance().getTube(tubeName)
  }
}
