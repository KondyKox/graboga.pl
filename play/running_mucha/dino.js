import { checkLose, handleStart } from './skrypt.js';
import {
    incrementCustomProperty,
    getCustomProperty,
    setCustomProperty,
} from './updateCustomProperty.js';
//import { select } from './skins.js';

const JUMP_SPEED = 0.45;
const GRAVITY = 0.0015;
const DINO_FRAME_COUNT = 2;
const FRAME_TIME = 100;

const dinoElem = document.querySelector('[data-dino]');


if (sessionStorage.getItem("skin") === null){
    sessionStorage.setItem("skin", "assets/white");
    var skin = sessionStorage.getItem("skin");
}
else{
    var skin = sessionStorage.getItem("skin");
}

let isJumping;
let dinoFrame;
let currentFrameTime;
let yVelocity;

export function setupDino() {
    isJumping = false;
    dinoFrame = 0;
    currentFrameTime = 0;
    yVelocity = 0;

    setCustomProperty(dinoElem, '--bottom', 0);

    document.removeEventListener('keydown', onJump);
    document.addEventListener('keydown', onJump);
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale);
    handleJump(delta);
}

export function getDinoRects() {
    return dinoElem.getBoundingClientRect();
}

export function setDinoLose() {
    let lose = new Audio("../../sfx/lose.wav");
    lose.play();

    dinoElem.src = `./${skin}/ludzik-stoi.png`;
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = `./${skin}/ludzik-skacze.png`;
        return;
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT;
        dinoElem.src = `./${skin}/ludzik-biega-${dinoFrame}.png`;
        currentFrameTime -= FRAME_TIME;
    }

    currentFrameTime += delta * speedScale;
}

function handleJump(delta) {
    if (!isJumping) return;

    incrementCustomProperty(dinoElem, '--bottom', yVelocity * delta);

    if (getCustomProperty(dinoElem, '--bottom') <= 0) {
        setCustomProperty(dinoElem, '--bottom', 0);
        isJumping = false;
    }

    yVelocity -= GRAVITY * delta;
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
}

document.getElementById('jump').onclick = function() {
    if (!$(".start-screen").hasClass("hide")) {
        return handleStart();
    }
    if (isJumping) return;

    yVelocity = JUMP_SPEED;
    isJumping = true;
    
}