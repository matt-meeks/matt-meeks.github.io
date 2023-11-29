const states = {};

let scale = 1.0;
const viewportElem = document.getElementById("container");

function setScale(v) {
  scale = v;
  viewportElem.style.scale = v;
}

visualViewport.onresize = () => {
  const sx = document.body.clientWidth / 1280;
  const sy = document.body.clientHeight / 720;
  setScale(Math.min(sx, sy));
}
visualViewport.onresize();

function spawnCharacter(id, state) {
  const tmpl = document.getElementById("char-tmpl");
  const elemFrag = tmpl.content.cloneNode(true);
  const charElem = elemFrag.querySelector(".character");
  charElem.id = `char-${id}`;
  charElem.style.setProperty("--hue", state.hue);
  charElem.style.setProperty("--iris-hue", state.irisHue);
  viewportElem.appendChild(elemFrag);
  blinkLoop(id);
  states[id] = structuredClone(state);
}

function getCharElem(id) {
  const elem = document.getElementById(`char-${id}`);
  if (!elem) throw new Error("Could not find element for character with ID " + id);
  return elem;
}

function openEyes(id) {
  getCharElem(id).style.setProperty("--eye-lid-state", 0.1);
}

function closeEyes(id) {
  getCharElem(id).style.setProperty("--eye-lid-state", 1);
}

function blink(id) {
  closeEyes(id);
  setTimeout(() => openEyes(id), 150);
}

function blinkLoop(id) {
  blink(id);
  setTimeout(() => blinkLoop(id), Math.random() * 10000);
}

function setPosition(id, x, y) {
  const elem = getCharElem(id);
  elem.style.setProperty("--pos-x", `${x}px`);
  elem.style.setProperty("--pos-y", `${y - 30}px`);
  elem.style.zIndex = Math.round(y);
}

function createState(pos, rot, hue, irisHue) {
  return {
    x: pos[0],
    y: pos[1],
    tx: pos[0],
    ty: pos[1],
    rot,
    hue,
    irisHue
  };
}


const localId = 0;
// spawnCharacter(localId, createState([150, 150], 0, 120, Math.random() * 360));

for (let i = 0; i < 10; i++) {
  spawnCharacter(i, createState([Math.random() * 1280, Math.random() * 720], Math.random() * 360, Math.random() * 360, Math.random() * 360));
}

let prevEt = 0;
const speed = 0.1;
function updateOuter() {
  requestAnimationFrame((et) => {
    const dt = et - prevEt;

    for (const idStr in states) {
      const id = Number(idStr);
      // console.log(id);
      const state = states[idStr];
      let dx = state.tx - state.x;
      let dy = state.ty - state.y;

      let dl = Math.sqrt(dx * dx + dy * dy);

      if (dl <= speed * dt) {
        state.x = state.tx;
        state.y = state.ty;

        if (id !== localId && Math.random() > 0.99) {
          state.tx = Math.random() * 1280;
          state.ty = Math.random() * 720;
        }
      } else {
        state.x += dx / dl * dt * speed;
        state.y += dy / dl * dt * speed;
        state.rot += dt * 0.3 * (dx / dl);
        getCharElem(id).style.setProperty("--rotation", `${state.rot}deg`);
      }
      setPosition(id, state.x, state.y);
    }

    prevEt = et;
    updateOuter();
  });
}

updateOuter();

document.onclick = (ev) => {
  console.log(ev);
  states[localId].tx = ev.x / scale;
  states[localId].ty = ev.y / scale;
}
