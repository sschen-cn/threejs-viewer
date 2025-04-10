import ThreeController from '../../utils/controller/three-controller'
import * as THREE from 'three'

export class DataCenterController {
  private threeController: THREE.WebGLRenderer
  constructor() {
    console.log('DataCenterController created')
    this.threeController = new ThreeController(
      'data-center-container'
    ).getRenderer()
  }
}
