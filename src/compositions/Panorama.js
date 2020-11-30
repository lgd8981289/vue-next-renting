import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TextureLoader,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector3,
  BackSide,
  MathUtils
} from 'three';

// 配置对象
let opt = {
  // 展示元素
  el: null,
  // 展示宽度
  width: 0,
  // 展示高度
  height: 0,
  // 展示资源
  src: '',
  // 球体半径
  radius: 1000,
  // 球体水平分段数（沿着经线分段）
  widthSegments: 88,
  // 球体垂直分段数（沿着纬线分段）
  heightSegments: 88,
  // 是否自动动画
  isAutoAnim: true,
  // 加载完成的回调
  complete: null,
  // 是否横向展示
  isHorizontal: false
};
// 自动动画对象
let autoInterval = null;
// 动画执行序列
let requestAnimationHandler;
// 获取 DOM 元素
let element;
// 定义 场景，相机，渲染器变量，三维点
let scene, camera, renderer, vector3;
// 标记用户拖动
let isUserInteracting = false;
// 标记用户按下的点
let onPointerDownPointerX = 0,
  onPointerDownPointerY = 0;
// 标记当用户按下时，当前全景的经纬度
let onPointerDownLon = 0,
  onPointerDownLat = 0;
// 标记用户拖动时，当前全景的经纬度
let onPointerMoveLon = 0,
  onPointerMoveLat = 0;

/**
 * 初始化函数
 */
function init() {
  initElement();
  initScene();
  initCamera();
  loadPanorama();
  initRenderer();
}

/**
 * 初始化 dom 元素，并获取宽高
 */
function initElement() {
  element = opt.el;
  element.innerHTML = '';
  opt.height = element.clientHeight;
  opt.width = element.clientWidth;
  element.addEventListener('touchstart', onTouchStart, false);
  element.addEventListener('touchmove', onTouchMove, false);
  element.addEventListener('touchend', onTouchEnd, false);
}

/**
 * 初始化场景
 */
function initScene() {
  // 定义一个场景
  scene = new Scene();
}
/**
 * 初始化相机
 */
function initCamera() {
  // 定义透视相机
  camera = new PerspectiveCamera(50, opt.width / opt.height);
  // 设置观测点
  camera.position.set(0, 0, 0);
  vector3 = new Vector3(0, 0, 0);
}

/**
 * 设置全景图片
 */
function loadPanorama() {
  // 资源（图片）加载类
  let loader = new TextureLoader();
  // 加载图片
  loader.load(
    opt.src,
    // onLoad
    (texture) => {
      // 构建物体
      var mesh = new Mesh(
        // 将全景图构建为球体
        new SphereGeometry(opt.radius, opt.widthSegments, opt.heightSegments),
        // 构建材质
        new MeshBasicMaterial({ map: texture, side: BackSide })
      );
      // 将构建出的物体添加到场景中
      scene.add(mesh);
      opt.complete();
    }
  );
}

/**
 * 初始化渲染器
 */
function initRenderer() {
  // 定义场景渲染器
  renderer = new WebGLRenderer();
  // 设置大小
  renderer.setSize(opt.width, opt.height);
  // 渲染到指定容器中
  element.appendChild(renderer.domElement);
}

/**
 * 循环场景渲染
 */
function animate() {
  requestAnimationHandler = requestAnimationFrame(animate);
  computePosition();
  renderer.render(scene, camera);
}

function autoAnim() {
  if (autoInterval) {
    clearInterval(autoInterval);
  }
  autoInterval = setInterval(() => {
    onPointerMoveLon += 0.07;
  });
}

/**
 * 计算摄像的视角
 */
function computePosition() {
  onPointerMoveLat = Math.max(-85, Math.min(85, onPointerMoveLat));
  var phi = MathUtils.degToRad(90 - onPointerMoveLat);
  var theta = MathUtils.degToRad(onPointerMoveLon);
  vector3.x = opt.radius * Math.sin(phi) * Math.cos(theta);
  vector3.y = opt.radius * Math.cos(phi);
  vector3.z = opt.radius * Math.sin(phi) * Math.sin(theta);
  camera.lookAt(vector3);
}

/**
 * 工具函数，合并对象
 */
function extend(o, n, override) {
  for (var key in n) {
    if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
      o[key] = n[key];
    }
  }
  return o;
}

/**
 * 事件函数
 */
function onTouchStart(event) {
  const touch = event.changedTouches[0];
  event.preventDefault();
  isUserInteracting = true;
  onPointerDownPointerX = touch.clientX;
  onPointerDownPointerY = touch.clientY;
  onPointerDownLon = onPointerMoveLon;
  onPointerDownLat = onPointerMoveLat;
}

function onTouchMove(event) {
  // 用户拖动则停止动画
  if (autoInterval) {
    clearInterval(autoInterval);
  }
  const touch = event.changedTouches[0];
  if (isUserInteracting) {
    // 横向操作判断
    if (opt.isHorizontal) {
      onPointerMoveLon = (onPointerDownPointerY - touch.clientY) * 0.2 + onPointerDownLon;
      onPointerMoveLat = (onPointerDownPointerX - touch.clientX) * 0.2 + onPointerDownLat;
    } else {
      onPointerMoveLon = (onPointerDownPointerX - touch.clientX) * 0.2 + onPointerDownLon;
      onPointerMoveLat = (touch.clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
    }
  }
}

function onTouchEnd() {
  isUserInteracting = false;
}

export function renderPanorama(options) {
  opt = extend(opt, options, true);
  if (!opt.el) return;
  init();
  animate();
  if (opt.isAutoAnim) {
    autoAnim();
  }
}

export function onDestory() {
  cancelAnimationFrame(requestAnimationHandler);
  element.innerHTML = '';
  renderer.dispose();
  // scene = camera = renderer = vector3 = null;
}
