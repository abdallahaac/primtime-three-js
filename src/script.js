import * as THREE from "three";
import { Mesh } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Create the particles
var particleCount = 500;
var particlePositions = new Float32Array(particleCount);
var particleColors = new Float32Array(particleCount * 3);
var particleSizes = new Float32Array(particleCount);

var color = new THREE.Color();

for (var i = 0; i < particleCount; i++) {
	particlePositions[i * 3 + 0] = (Math.random() - 0.5) * 10;
	particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
	particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10;

	color.setHSL(i / particleCount, 1.0, 0.5);

	particleColors[i * 3 + 0] = color.r;
	particleColors[i * 3 + 1] = color.g;
	particleColors[i * 3 + 2] = color.b;

	particleSizes[i] = 0.01;
}

var particleGeometry = new THREE.BufferGeometry();
particleGeometry.setAttribute(
	"position",
	new THREE.BufferAttribute(particlePositions, 3)
);
particleGeometry.setAttribute(
	"color",
	new THREE.BufferAttribute(particleColors, 3)
);
particleGeometry.setAttribute(
	"size",
	new THREE.BufferAttribute(particleSizes, 1)
);

var particleMaterial = new THREE.PointsMaterial({
	size: 0.04,
	vertexColors: THREE.VertexColors,
});

var particleSystem = new THREE.Points(particleGeometry, particleMaterial);
particleSystem.sortParticles = true;
scene.add(particleSystem);

// light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// texture
const texture = new THREE.TextureLoader().load("/moon.jpg");

// creating my first figure
const firstGeo = new THREE.SphereGeometry();
const firstGeoMaterial = new THREE.MeshPhongMaterial({
	shininess: 400,
	reflectivity: 1,
	color: 0x0000ff,
	normalMap: texture,
});
const firstGeoMesh = new THREE.Mesh(firstGeo, firstGeoMaterial);

scene.add(firstGeoMesh);
const sizes = {
	width: window.innerWidth,
	height: window.innerHeight,
};

window.addEventListener("resize", () => {
	// Update sizes
	sizes.width = window.innerWidth;
	sizes.height = window.innerHeight;

	// Update camera
	camera.aspect = sizes.width / sizes.height;
	camera.updateProjectionMatrix();

	// Update renderer
	renderer.setSize(sizes.width, sizes.height);
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
	75,
	sizes.width / sizes.height,
	0.1,
	100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
	canvas: canvas,

	antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
	const elapsedTime = clock.getElapsedTime();

	// Update controls
	controls.update();

	// Render
	renderer.render(scene, camera);

	// Call tick again on the next frame
	window.requestAnimationFrame(tick);
};

tick();
