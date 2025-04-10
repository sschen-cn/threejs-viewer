import * as THREE from 'three'
import SkyboxController from './skybox-controller'
import FloorController from './floor-controller'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class ThreeController {
  public id: string
  public containerDom!: HTMLDivElement
  public renderer!: THREE.WebGLRenderer
  public scene!: THREE.Scene
  public camera!: THREE.PerspectiveCamera
  public controls!: OrbitControls
  public skybox!: SkyboxController
  public floor!: FloorController

  constructor(id: string) {
    this.id = id
    this.init()
  }

  private init() {
    this.initRenderer()
    this.initScene()
    this.initLight()
    this.initCamera()
    this.initControl()
    this.initSkybox()
    this.initFloor()
    this.addAxis()

    const animate = () => {
      requestAnimationFrame(animate)
      this.renderDom()
      this.updateDom()
    }
    animate()
  }

  /**
   * 初始化渲染器
   */
  private initRenderer() {
    this.containerDom = document.getElementById(this.id) as HTMLDivElement
    this.renderer = new THREE.WebGLRenderer({
      logarithmicDepthBuffer: true, // 设置深度缓存是否采用对数尺度
      antialias: true, // 设置抗锯齿
      alpha: true, // 设置背景色透明
      premultipliedAlpha: false, // 设置像素深度（用来度量图像的分辨率）
      precision: 'lowp', // 设置着色精度
      preserveDrawingBuffer: true, // 设置是否保留缓冲区
    })

    this.renderer.clearDepth() // 清除深度缓存

    this.renderer.shadowMap.enabled = true // 开启阴影
    // this.renderer.outputColorSpace = SRGBColorSpace // 可以看到更亮的材质，同时这也影响到环境贴图。
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap // 设置阴影类型
    this.renderer.setClearColor(new THREE.Color(0xffffff)) // 设置背景色
    this.containerDom.appendChild(this.renderer.domElement) // 将渲染器的dom元素添加到容器中
  }
  /**
   * 初始化场景
   */
  private initScene() {
    this.scene = new THREE.Scene()
  }
  /**
   * 初始化灯光
   */
  private initLight() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1) // 环境光
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 平行光
    directionalLight.castShadow = true // 开启阴影
    directionalLight.shadow.mapSize.width = 1024 // 设置阴影贴图大小
    directionalLight.shadow.mapSize.height = 1024
    directionalLight.shadow.camera.near = 0.5 // 设置阴影摄像机近端距离
    directionalLight.shadow.camera.far = 500 // 设置阴影摄像机远端距离
    directionalLight.shadow.camera.left = -50 // 设置阴影摄像机左侧距离
    directionalLight.shadow.camera.right = 50 // 设置阴影摄像机右侧距离
    directionalLight.shadow.camera.top = 50 // 设置阴影摄像机上侧距离
    directionalLight.shadow.camera.bottom = -50 // 设置阴影摄像机下侧距离
    directionalLight.position.set(0, 1, 0) // 设置平行光的位置
    // 设置mapSize属性可以使阴影更清晰，不那么模糊
    directionalLight.shadow.mapSize.set(1024, 1024)
    this.setDirectionalLight(directionalLight) // 设置平行光
  }
  /**
   * 初始化相机
   */
  private initCamera() {
    if (!this.camera) {
      // 渲染相机
      this.camera = new THREE.PerspectiveCamera(
        30,
        window.innerWidth / window.innerHeight,
        1,
        2000
      )
    }
  }
  /**
   * 初始化threejs控制器
   */
  private initControl() {
    this.controls = new OrbitControls(
      this.camera as THREE.Camera,
      this.renderer.domElement
    )
    this.controls.enableDamping = false
    this.controls.screenSpacePanning = false // 定义平移时如何平移相机的位置 控制不上下移动
    this.controls.minDistance = 2
    this.controls.maxDistance = 1000
    this.controls.enabled = true
    this.controls.addEventListener('change', () => {
      this.renderer.render(this.scene, this.camera)
    })
  }

  /**
   * 初始化天空盒
   */
  private initSkybox() {
    if (!this.skybox) this.skybox = new SkyboxController(this)
    this.skybox.addSkybox('daytime')
    this.skybox.addFog()
  }

  /**
   * 初始化地面
   */
  private initFloor() {
    this.floor = new FloorController(this)
  }

  /**坐标轴辅助 */
  public addAxis() {
    const axis = new THREE.AxesHelper(1000)
    this.scene?.add(axis)
  }

  // 设置平行光
  public setDirectionalLight(light: THREE.DirectionalLight) {
    this.scene.add(light)
  }
  // 渲染dom
  private renderDom() {
    this.renderer.render(this.scene, this.camera)
  }
  // 更新dom
  private updateDom() {
    this.renderer.setSize(
      this.containerDom.clientWidth,
      this.containerDom.clientHeight
    )
  }
}
