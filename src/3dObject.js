// IMPORT ALL NEEDED STUFF
import gsap from 'gsap';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MathUtils } from 'three';


// var stats = new Stats();
// stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// document.body.appendChild( stats.dom );

//TEXTURES
const textureLoader = new THREE.TextureLoader();
const ironOcclusion = textureLoader.load('../src/assets/3d_assets/textures/Iron_ambientOcclusion.jpg');
const ironBaseColor = textureLoader.load('../src/assets/3d_assets/textures/Iron_basecolor.jpg');
const ironMetallic = textureLoader.load('../src/assets/3d_assets/textures/Iron_metallic.jpg');
const ironNormal = textureLoader.load('../src/assets/3d_assets/textures/Iron_normal.jpg');
const ironRoughness = textureLoader.load('../src/assets/3d_assets/textures/Iron_roughness.jpg');



//SCENE, CAMERA AND RENDERER
const canvas = document.querySelector('canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ 
    powerPreference: "high-performance",
    canvas: canvas,
    alpha: true, 
    antialias: true 
});
renderer.setPixelRatio(window.devicePixelRatio);
camera.position.set(0, 0, 21);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.minPolarAngle = Math.PI/2.5;
controls.maxPolarAngle = Math.PI/2.5;
controls.enableZoom = false;
controls.rotateSpeed = .15;
controls.target.set(0, 0, 0);



//RESIZE CANVAS
function fitSize () {
    camera.aspect = 1;
    camera.updateProjectionMatrix();
    if(window.matchMedia('(max-width: 1000px)').matches) {
        renderer.setSize(window.innerWidth * 3 / 4, window.innerWidth * 3 / 4);
    }else {
        renderer.setSize(window.innerWidth / 2, window.innerWidth / 2);
    }
    renderer.setPixelRatio(window.devicePixelRatio);
    const fov = 35;
    const planeAspectRatio = 1;

	if (camera.aspect > planeAspectRatio) {
		// window too large
		camera.fov = fov;
	} else {
		// window too narrow
		const cameraHeight = Math.tan(MathUtils.degToRad(fov / 2));
		const ratio = camera.aspect / planeAspectRatio;
		const newCameraHeight = cameraHeight / ratio;
		camera.fov = MathUtils.radToDeg(Math.atan(newCameraHeight)) * 2;
	}
};
window.addEventListener('resize', fitSize);
window.addEventListener('load', fitSize);
fitSize();



//SOME REDSTAPLER MAGIC
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.15;



//LIGHT
const light = new THREE.AmbientLight( 0xffffff, .7 );
scene.add( light );



//CREATE OBJECT
let envmaploader = new THREE.PMREMGenerator(renderer);
let cube;
let group = new THREE.Group();
const loader = new OBJLoader();
loader.load('../src/assets/3d_assets/object/Fcube.obj', (object) => {
    new RGBELoader().setPath('../src/assets/3d_assets/envMap/').load('neon.hdr', function(hdrmap) {
        let envmap = envmaploader.fromCubemap(hdrmap);
        let ballMaterial = {
          map: ironBaseColor,
          clearcoat: 1.0,
          clearcoatRoughness:0.1,
          metalnessMap: ironMetallic,
          metalness: 0.96,
          roughnessMap: ironRoughness,
          roughness:0.3,
          aoMap: ironOcclusion,
          color: 0xffffff,
          normalMap: ironNormal,
          normalScale: new THREE.Vector2(0.15,0.15),
          envMap: envmap.texture
        };   
        
        object.traverse( child => {
            if ( child.material ) child.material = new THREE.MeshPhysicalMaterial(ballMaterial);
        });
        cube = object;
        cube.position.set(0, 0, 0);
        scene.add(object);
        group.add(cube);
        scene.add(group);
        animate();
    });
});



//MOUSE MOVEMENT
let mouse = {
    x: undefined,
    y: undefined
};

addEventListener('mousemove', e => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1;
    mouse.y = (e.clientY / innerHeight) * 2 - 1;
});



//ANIMATE OBJECT
let canvasInView = true;
function animate() {
    // stats.begin();
    if (!canvasInView) {
        return
    } else {
        requestAnimationFrame(animate);
        if (cube) {
            const timer = Date.now() * 0.01;
            cube.rotation.y = timer * -0.006;
        };
        controls.update();
        renderer.render( scene, camera );
        // stats.end();
    }
}


//CANVAS OBSERVER
const observer = new IntersectionObserver( 
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                canvasInView = true;
                animate();
            } else {
                canvasInView = false;
            }
        })
    }, 
    {
        threshold: 0.4
    }
)

observer.observe(canvas);