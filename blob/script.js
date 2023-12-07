/**
 * @typedef {Object} SetTarget
 * @prop {number} temp_from_x
 * @prop {number} temp_from_y
 * @prop {number} x
 * @prop {number} y
 */

/**
 * @typedef {Object} CoolGlassesOption
 * @prop {CoolGlasses} CoolGlasses
 */

/**
 * @typedef {Object} CoolGlasses
 * @prop {number} hue
 */

/**
 * @typedef {Object} ChangeAppearance
 * @prop {number} body_hue
 * @prop {number} iris_hue
 * @prop {"None" | CoolGlassesOption} face_apparel
 */

/**
 * @typedef {Object} SyncRot
 * @prop {number} rot
 */

/**
 * @typedef {Object} ConsumePellet
 * @prop {string} id
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
 * @typedef {Object} ConsumePelletReq
 * @prop {ConsumePellet} ConsumePellet
 */

/**
 * @typedef {SetTargetReq | ChangeAppearanceReq | ConsumePelletReq} ClientRequest
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
 * @typedef {Object} SpawnPelletRes
 * @prop {SpawnPellet} SpawnPellet
 */

/**
 * @typedef {Object} SpawnPellet
 * @prop {PelletState} state
 */

/**
 * @typedef {Object} SetPathRes
 * @prop {SetPath} SetPath
 */

/**
 * @typedef {Object} SetPath
 * @prop {Path} path
 */

/**
 * @typedef {Object} DespawnPelletRes
 * @prop {Object} DespawnPellet
 */

/**
 * @typedef {Object} ClientResponse
 * @prop {number} id
 * @prop {ClientRequest | ClientLeftRes | ClientJoinedRes | SpawnPelletRes | DespawnPelletRes | SetPathRes} msg
 */

/**
 * @typedef {[number, number]} Position
 */

/**
 * @typedef {Position[]} Path
 */

/**
 * @typedef {Object} ClientState
 * @prop {number} x
 * @prop {number} y
 * @prop {number} path_index
 * @prop {Path?} path
 * @prop {number} rot
 * @prop {number} body_hue
 * @prop {number} iris_hue
 * @prop {number?} blink_handle
 * @prop {number?} blink_loop_handle
 */

/**
 * @typedef {Object} PelletState
 * @prop {number} x
 * @prop {number} y
 * @prop {number} hue
 */

/**
 * @type {Object.<string, ClientState>}
 */
const states = {};

/**
 * @type {Object.<string, PelletState>}
 */
const pelletStates = {};

let scale = 1.0;
let offsetX = 0.0;
const viewportElem = document.getElementById("container");

function setScale(v) {
  scale = v;
  viewportElem.style.scale = v;
  offsetX = Math.round(Math.max(0, visualViewport.width - v * 1280) / 2);
  viewportElem.style.left = `${offsetX}px`;
}

visualViewport.onresize = () => {
  const sx = visualViewport.width / 1280;
  const sy = visualViewport.height / 720;
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
  states[id] = structuredClone(state);
  blinkLoop(id);
  changeAppearance(id, state);
  setPosition(id, state.x, state.y);
  charElem.style.setProperty("--rotation", `${state.rot}deg`);
}

/**
 * @param {string} id
 * @param {ChangeAppearance} state
 */
function changeAppearance(id, state) {
  const charElem = getCharElem(id);
  const apparelElem = charElem.querySelector(".apparel");
  apparelElem.innerHTML = "";
  charElem.style.setProperty("--hue", state.body_hue);
  charElem.style.setProperty("--iris-hue", state.iris_hue);
  if (
    typeof state.face_apparel === "object" &&
    "CoolGlasses" in state.face_apparel
  ) {
    const tmpl = document.getElementById("cool-glasses");
    const elemFrag = tmpl.content.cloneNode(true);
    apparelElem.appendChild(elemFrag);

    charElem.style.setProperty(
      "--glasses-hue",
      state.face_apparel.CoolGlasses.hue,
    );
  }
}

/**
 * @param {string} id
 * @param {PelletState} state
 */
function spawnPellet(id, state) {
  const tmpl = document.getElementById("pellet");
  const elemFrag = tmpl.content.cloneNode(true);
  const charElem = elemFrag.querySelector(".pellet");
  charElem.id = `pellet-${id}`;
  viewportElem.appendChild(elemFrag);
  pelletStates[id] = structuredClone(state);
  charElem.style.setProperty("--hue", `${state.hue}deg`);
  charElem.style.setProperty("--pos-x", `${state.x}px`);
  charElem.style.setProperty("--pos-y", `${state.y}px`);
}

function despawnCharacter(id) {
  if (states[id].blink_handle !== undefined)
    clearTimeout(states[id].blink_handle);
  if (states[id].blink_loop_handle !== undefined)
    clearTimeout(states[id].blink_loop_handle);
  delete states[id];
  document.getElementById(`char-${id}`).remove();
}

function despawnPellet(id) {
  delete pelletStates[id];
  document.getElementById(`pellet-${id}`).remove();
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
  if (states[id].blink_handle !== undefined)
    clearTimeout(states[id].blink_handle);
  states[id].blink_handle = setTimeout(() => openEyes(id), 150);
}

function blinkLoop(id) {
  blink(id);
  if (states[id].blink_loop_handle !== undefined)
    clearTimeout(states[id].blink_loop_handle);
  states[id].blink_loop_handle = setTimeout(
    () => blinkLoop(id),
    Math.random() * 10_000,
  );
}

function setPosition(id, x, y) {
  const elem = getCharElem(id);
  elem.style.setProperty("--pos-x", `${x}px`);
  elem.style.setProperty("--pos-y", `${y - 30}px`);
  elem.style.zIndex = Math.round(y);
}

let prevEt = 0;
const speed = 0.1;
let localId;
function updateOuter() {
  requestAnimationFrame((et) => {
    const dt = et - prevEt;

    update(dt);

    prevEt = et;
    updateOuter();
  });
}

function update(dt) {
  for (const id in states) {
    const state = states[id];

    if (state.path) {
      const tx = state.path[state.path_index][0];
      const ty = state.path[state.path_index][1];
      let dx = tx - state.x;
      let dy = ty - state.y;

      let dl = Math.sqrt(dx * dx + dy * dy);

      if (dl <= speed * dt) {
        if (localId === id && (state.x !== tx || state.y !== ty)) {
          sendMessage({ SyncRot: { rot: state.rot } });
        }
        state.x = tx;
        state.y = ty;
        state.path_index++;
        if (state.path_index >= state.path.length) {
          delete state.path;
          delete state.path_index;
        }
      } else {
        state.x += (dx / dl) * dt * speed;
        state.y += (dy / dl) * dt * speed;
        state.rot += dt * 0.3 * (dx / dl);
        getCharElem(id).style.setProperty("--rotation", `${state.rot}deg`);
      }
      setPosition(id, state.x, state.y);
    }

    if (id === localId) {
      for (const pelletId in pelletStates) {
        const pelletState = pelletStates[pelletId];
        const dx = pelletState.x - state.x;
        const dy = pelletState.y - state.y;
        const dl = Math.sqrt(dx * dx + dy * dy);
        if (dl < 30) {
          despawnPellet(pelletId);
          sendMessage({
            ConsumePellet: {
              id: pelletId,
            },
          });
        }
      }
    }
  }
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
      x: Math.round((ev.x - offsetX) / scale),
      y: Math.round(ev.y / scale),
      temp_from_x: Math.round(states[localId].x),
      temp_from_y: Math.round(states[localId].y),
    },
  });
};

const ws = new WebSocket("wss://abc.matthewmeeks.xyz:8088/ws");
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
  } else if ("SetPath" in response.msg) {
    const state = states[response.id];
    if (!state) return; // TODO
    state.path = response.msg.SetPath.path;
    state.path_index = 0;
  } else if ("ClientLeft" in response.msg) {
    despawnCharacter(response.id);
  } else if ("ChangeAppearance" in response.msg) {
    changeAppearance(response.id, response.msg.ChangeAppearance);
  } else if ("SyncRot" in response.msg) {
    const state = states[response.id];
    if (!state) return; // TODO
    state.rot = response.msg.SyncRot.rot;
    getCharElem(response.id).style.setProperty("--rotation", `${state.rot}deg`);
  } else if ("SpawnPellet" in response.msg) {
    spawnPellet(response.id, response.msg.SpawnPellet.state);
  } else if ("DespawnPellet" in response.msg) {
    if (response.id in pelletStates) {
      despawnPellet(response.id);
    }
  }
};

document.getElementById("btn-appearance").onclick = (ev) => {
  sendMessage({
    ChangeAppearance: {
      body_hue: Math.trunc(Math.random() * 360),
      iris_hue: Math.trunc(Math.random() * 360),
      face_apparel:
        Math.random() < 0.15
          ? { CoolGlasses: { hue: Math.trunc(Math.random() * 360) } }
          : "None",
    },
  });
  ev.stopPropagation();
};

document.getElementById("btn-fullscreen").onclick = (ev) => {
  if (document.fullscreenElement) {
    document.exitFullscreen().then(() => screen.orientation.unlock());
  } else {
    document.body
      .requestFullscreen()
      .then(() => screen.orientation.lock("landscape"));
  }
  ev.stopPropagation();
};

async function spawnScene(id) {
  const res = await fetch(`assets/scenes/${id}/scene.json`);
  if (!res.ok) {
    throw new Error(`Failed to load scene manifest: ${res.statusText}`);
  }
  const manifest = await res.json();
  const sceneElem = document.getElementById("scene");
  sceneElem.innerHTML = "";
  sceneElem.style.background = manifest.background;

  for (const layer of manifest.layers) {
    const imgElem = document.createElement("img");
    imgElem.src = `assets/scenes/${id}/${layer.src}`;
    imgElem.style.width = "100%";
    imgElem.style.height = "100%";
    imgElem.style.position = "absolute";
    imgElem.style.zIndex = layer.z;
    imgElem.style.pointerEvents = "none";
    sceneElem.appendChild(imgElem);
  }
}

spawnScene("park");
