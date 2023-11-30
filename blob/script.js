/**
 * @typedef {Object} SetTarget
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @typedef {Object} ChangeAppearance
 * @prop {number} body_hue
 * @prop {number} iris_hue
 */

/**
 * @typedef {Object} SyncRot
 * @prop {number} rot
 */

/**
 * @typedef {Object} SetTargetReq
 * @prop {SetTarget} SetTarget
 */

/**
 * @typedef {Object} ChangeAppearanceReq
 * @prop {ChangeAppearance} ChangeAppearance
 */

/**
 * @typedef {Object} SyncRotReq
 * @prop {SyncRot} SyncRot
 */

/**
 * @typedef {SetTargetReq | ChangeAppearanceReq} ClientRequest
 */

/**
 * @typedef {Object} ClientLeftRes
 * @prop {Object} ClientLeft
 */

/**
 * @typedef {Object} ClientJoinedRes
 * @prop {ClientJoined} ClientJoined
 */

/**
 * @typedef {Object} ClientJoined
 * @prop {ClientState} state
 * @prop {boolean} is_local
 */

/**
 * @typedef {Object} ClientResponse
 * @prop {number} id
 * @prop {ClientRequest | ClientLeftRes | ClientJoinedRes} msg
 */

/**
 * @typedef {Object} ClientState
 * @prop {number} x
 * @prop {number} y
 * @prop {number} tx
 * @prop {number} ty
 * @prop {number} rot
 * @prop {number} body_hue
 * @prop {number} iris_hue
 */

/**
 * @type {Object.<string, ClientState>}
 */
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
};
visualViewport.onresize();

/**
 * @param {string} id
 * @param {ClientState} state
 */
function spawnCharacter(id, state) {
  const tmpl = document.getElementById("char-tmpl");
  const elemFrag = tmpl.content.cloneNode(true);
  const charElem = elemFrag.querySelector(".character");
  charElem.id = `char-${id}`;
  viewportElem.appendChild(elemFrag);
  blinkLoop(id);
  states[id] = structuredClone(state);
  changeAppearance(id, state);
  charElem.style.setProperty("--rotation", `${state.rot}deg`);
}

/**
 * @param {string} id
 * @param {ChangeAppearance} state
 */
function changeAppearance(id, state) {
  const charElem = getCharElem(id);
  charElem.style.setProperty("--hue", state.body_hue);
  charElem.style.setProperty("--iris-hue", state.iris_hue);
}

function despawnCharacter(id) {
  delete states[id];
  document.getElementById(`char-${id}`).remove();
}

function getCharElem(id) {
  const elem = document.getElementById(`char-${id}`);
  if (!elem)
    throw new Error("Could not find element for character with ID " + id);
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
  if (!(id in states)) return;
  blink(id);
  setTimeout(() => blinkLoop(id), Math.random() * 10000);
}

function setPosition(id, x, y) {
  const elem = getCharElem(id);
  elem.style.setProperty("--pos-x", `${x}px`);
  elem.style.setProperty("--pos-y", `${y - 50}px`);
  elem.style.zIndex = Math.round(y);
}

let prevEt = 0;
const speed = 0.1;
let localId;
function updateOuter() {
  requestAnimationFrame((et) => {
    const dt = et - prevEt;

    for (const id in states) {
      const state = states[id];
      let dx = state.tx - state.x;
      let dy = state.ty - state.y;

      let dl = Math.sqrt(dx * dx + dy * dy);

      if (dl <= speed * dt) {
        if (localId === id && (state.x !== state.tx || state.y !== state.ty)) {
          sendMessage({ SyncRot: { rot: state.rot } });
        }
        state.x = state.tx;
        state.y = state.ty;
      } else {
        state.x += (dx / dl) * dt * speed;
        state.y += (dy / dl) * dt * speed;
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

/**
 * @param {ClientRequest} msg
 */
function sendMessage(msg) {
  ws.send(JSON.stringify(msg));
}

viewportElem.onclick = (ev) => {
  sendMessage({
    SetTarget: {
      x: Math.round(ev.x / scale),
      y: Math.round(ev.y / scale),
    },
  });
};

const ws = new WebSocket("ws://abc.matthewmeeks.xyz:8088/ws");
ws.onmessage = (ev) => {
  /**
   * @type {ClientResponse}
   */
  const response = JSON.parse(ev.data);

  if ("ClientJoined" in response.msg) {
    spawnCharacter(response.id, {
      ...response.msg.ClientJoined.state,
      tx: response.msg.ClientJoined.state.x,
      ty: response.msg.ClientJoined.state.y,
    });
    if (response.msg.ClientJoined.is_local) {
      localId = response.id;
    }
  } else if ("SetTarget" in response.msg) {
    const state = states[response.id];
    if (!state) return; // TODO
    state.tx = response.msg.SetTarget.x;
    state.ty = response.msg.SetTarget.y;
  } else if ("ClientLeft" in response.msg) {
    despawnCharacter(response.id);
  } else if ("ChangeAppearance" in response.msg) {
    changeAppearance(response.id, response.msg.ChangeAppearance);
  } else if ("SyncRot" in response.msg) {
    const state = states[response.id];
    if (!state) return; // TODO
    state.rot = response.msg.SyncRot.rot;
    getCharElem(response.id).style.setProperty("--rotation", `${state.rot}deg`);
  }
};

document.getElementById("btn-appearance").onclick = (ev) => {
  sendMessage({
    ChangeAppearance: {
      body_hue: Math.trunc(Math.random() * 360),
      iris_hue: Math.trunc(Math.random() * 360),
    },
  });
  ev.stopPropagation();
};
