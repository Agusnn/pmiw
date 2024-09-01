//pmiw 
//comision2
//legajo:119099/1
//agustina nahir navarro
//https://youtu.be/xVxjuR6I48Q
let imagen;
let zoomEnProgreso = false;
let factorEscala = 1.0;
let velocidadZoom = 0.005;
let zoomAdentro = true; // indica si está haciendo zoom in
let escalaMaxima = 2.5; // escala máxima para el efecto de túnel
let escalaMinima = 1.0; // escala mínima para el efecto de túnel

function preload() {
  imagen = loadImage("data/imagen.jpeg"); 
}

function setup() {
  createCanvas(800, 400); 
}

function draw() {
  background(255);
  image(imagen, 0, 0, 400, 400); // dibuja la imagen en la mitad izquierda
  // dibuja el cuadrado de fondo
  dibujarcuadrado(400, 0, 400, 400);

  // dibuja el efecto de túnel en movimiento
  dibujarefectotunel(400, 0, 400, 400);
}

function dibujarcuadrado(x, y, ancho, alto) {
  push();
  translate(x + ancho / 2, y + alto / 2); 
  let pasos = 50; // 
  for (let i = 0; i < pasos; i++) { 
    let tamaño = map(i, 0, pasos, ancho, 0); 
    let alpha = map(i, 0, pasos, 255, 0); 
    if (i % 2 === 0) {
      fill(0, alpha); // alterna entre negro
    } else {
      fill(255, alpha); // y blanco
    }

    rectMode(CENTER);
    rect(0, 0, tamaño, tamaño); 
  }
  pop();
}

function dibujarefectotunel(x, y, ancho, alto) {
  push();
  translate(x + ancho / 2, y + alto / 2); 
  scale(factorEscala); 

  let pasos = 50; 
  for (let i = 0; i < pasos; i++) {
    let tamaño = map(i, 0, pasos, ancho, 0) * 0.9; // calcula el tamaño de cada rectángulo
    let alpha = map(i, 0, pasos, 255, 0); // calcula la transparencia de cada rectángulo
    if (i % 2 === 0) {
      if (mouseX > 400 && mouseX < 800 && mouseY > 0 && mouseY < 400) {
        fill(255, 0, 0, alpha); // cambia a rojo si el mouse está en la mitad derecha
      } else {
        fill(0, alpha); // negro si el mouse no está en la mitad derecha
      }
    } else {
      fill(255, alpha); // blanco para los otros rectángulos
    }

    rectMode(CENTER);
    if (tamaño * factorEscala <= ancho) { // asegura que los rectángulos no excedan los límites
      rect(0, 0, tamaño, tamaño); // dibuja el rectángulo
    }
  }
  pop();
  
  if (zoomEnProgreso) { // si el zoom está en progreso
    if (zoomAdentro) { // si estamos haciendo zoom in
      factorEscala += velocidadZoom; // 
      if (factorEscala >= escalaMaxima) { // límite de zoom in
        zoomAdentro = false; // cambia a zoom out
      }
    } else {
      factorEscala -= velocidadZoom; // decrementa el factor de escala
      if (factorEscala <= escalaMinima) { // límite de zoom out
        zoomAdentro = true; // cambia a zoom in
      }
    }
  }
}

function mousePressed() {
  if (!zoomEnProgreso) { 
    zoomEnProgreso = true; // inicia el zoom
    loop(); // inicia el bucle draw
  }
}

function keyPressed() {
  if (key === ' ') { // si se presiona la barra espaciadora
    resetearVariables(); // resetea las variables
    redraw();
    noLoop(); // detiene el bucle draw
  }
}

function resetearVariables() {
  factorEscala = 1.0; // reinicia el factor de escala
  zoomAdentro = true; // reinicia el estado de zoom
  zoomEnProgreso = false; // detiene el zoom
  return factorEscala; // variable de retorno
}
