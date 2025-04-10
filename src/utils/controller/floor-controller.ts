import type ThreeController from './three-controller'
import * as THREE from 'three'

export default class FloorController {
  protected threeController: ThreeController
  public planeWidth: number = 500
  public planeHeight: number = 500
  constructor(threeController: ThreeController) {
    this.threeController = threeController
    this.initFloor()
  }

  private initFloor() {
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(this.planeWidth, this.planeHeight),
      new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    this.threeController.scene.add(ground)
  }
}
