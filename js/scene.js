// =====================================================
// scene.js вЂ” С…СЂРѕРјРѕРІС‹Рµ Р·РІС‘Р·РґС‹ РЅР° РїРµСЂРІРѕРј СЌРєСЂР°РЅРµ (Three.js)
// Р—РІРµР·РґР° вЂ” С‡РµС‚С‹СЂС‘С…Р»СѓС‡РµРІРѕР№ РєРѕРЅС‚СѓСЂ СЃ РІРѕРіРЅСѓС‚С‹РјРё СЃС‚РѕСЂРѕРЅР°РјРё, РІС‹РґР°РІР»РµРЅРЅС‹Р№ РІ РѕР±СЉС‘Рј.
// РҐСЂРѕРј РїРѕР»СѓС‡Р°РµС‚СЃСЏ РёР· РѕС‚СЂР°Р¶РµРЅРёР№ В«С„РѕС‚РѕСЃС‚СѓРґРёРёВ»: С‚С‘РјРЅР°СЏ РєРѕРјРЅР°С‚Р° Рё СЏСЂРєРёРµ РїРѕР»РѕСЃС‹-Р»Р°РјРїС‹.
// =====================================================

(function () {
  const canvas = document.getElementById('stars');
  if (!window.THREE || !canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  } catch (e) { return; }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 12);

  // ---------- РћРєСЂСѓР¶РµРЅРёРµ РґР»СЏ РѕС‚СЂР°Р¶РµРЅРёР№ ----------
  function makeEnvironment() {
    const studio = new THREE.Scene();
    studio.add(new THREE.Mesh(new THREE.SphereGeometry(30, 24, 12), new THREE.MeshBasicMaterial({ color: 0x050505, side: THREE.BackSide })));
    function lamp(brightness, w, h, x, y, z) {
      const m = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide });
      m.color.setScalar(brightness);
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(w, h), m);
      mesh.position.set(x, y, z);
      mesh.lookAt(0, 0, 0);
      studio.add(mesh);
    }
    lamp(12, 3, 20, -12, 4, 8);   // СѓР·РєР°СЏ РїРѕР»РѕСЃР° СЃР»РµРІР° вЂ” СЂРµР·РєРёР№ Р±Р»РёРє
    lamp(8, 2, 18, 13, -2, 6);    // РїРѕР»РѕСЃР° СЃРїСЂР°РІР°
    lamp(6, 18, 3, 0, 14, 4);     // СЃРІРµС‚ СЃРІРµСЂС…Сѓ
    lamp(3, 10, 10, 0, 0, 18);    // РјСЏРіРєРёР№ СЃРІРµС‚ СЃРїРµСЂРµРґРё
    lamp(1.5, 4, 14, 6, 0, -14);  // РєРѕРЅС‚СЂРѕРІРѕР№ СЃРІРµС‚ СЃР·Р°РґРё
    const gen = new THREE.PMREMGenerator(renderer);
    const tex = gen.fromScene(studio, 0.02).texture;
    gen.dispose();
    return tex;
  }
  try { scene.environment = makeEnvironment(); } catch (e) { /* Р±РµР· РѕС‚СЂР°Р¶РµРЅРёР№ Р·РІС‘Р·РґС‹ Р±СѓРґСѓС‚ РїСЂРѕС‰Рµ */ }

  // ---------- Р“РµРѕРјРµС‚СЂРёСЏ Р·РІРµР·РґС‹ ----------
  // В«РќР°РґСѓС‚Р°СЏВ» Р·РІРµР·РґР°: Р±РµСЂС‘Рј С€Р°СЂ Рё СЃР¶РёРјР°РµРј РµРіРѕ РїРѕ РєРѕРЅС‚СѓСЂСѓ Р°СЃС‚СЂРѕРёРґС‹ (РєСЂРёРІР°СЏ СЃ С‡РµС‚С‹СЂСЊРјСЏ РѕСЃС‚СЂС‹РјРё Р»СѓС‡Р°РјРё).
  // РџРѕРІРµСЂС…РЅРѕСЃС‚СЊ РїРѕР»СѓС‡Р°РµС‚СЃСЏ РІС‹РїСѓРєР»РѕР№, РїРѕСЌС‚РѕРјСѓ С…СЂРѕРј Р»РѕРІРёС‚ Р±Р»РёРєРё, Р° РЅРµ РѕС‚СЂР°Р¶Р°РµС‚ РѕРґРёРЅ СЃРµСЂС‹Р№ С†РІРµС‚.
  function starGeometry(power) {
    const geo = new THREE.SphereGeometry(1, 160, 80);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      const a = Math.atan2(y, x);
      // СЂР°РґРёСѓСЃ Р°СЃС‚СЂРѕРёРґС‹ РІ РЅР°РїСЂР°РІР»РµРЅРёРё СѓРіР»Р° a: С‡РµРј Р±РѕР»СЊС€Рµ power, С‚РµРј С‚РѕРЅСЊС€Рµ Р»СѓС‡Рё
      const r = Math.pow(Math.pow(Math.abs(Math.cos(a)), power) + Math.pow(Math.abs(Math.sin(a)), power), -1 / power);
      pos.setXYZ(i, x * r, y * r, z * 0.32);
    }
    geo.computeVertexNormals();
    return geo;
  }

  const chrome = new THREE.MeshPhysicalMaterial({ color: 0xFFFFFF, metalness: 1, roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 });

  const stars = [
    { mesh: new THREE.Mesh(starGeometry(0.72), chrome), base: [1.1, 0.4, 0], scale: 1.65, speed: 0.35, phase: 0 },
    { mesh: new THREE.Mesh(starGeometry(0.72), chrome), base: [-1.7, 2.2, -1], scale: 0.8, speed: -0.5, phase: 1.7 },
    { mesh: new THREE.Mesh(starGeometry(0.72), chrome), base: [2.6, -2.1, 0.5], scale: 0.55, speed: 0.6, phase: 3.1 }
  ];
  stars.forEach(function (st) { st.mesh.scale.setScalar(0.001); scene.add(st.mesh); });

  // ---------- Р Р°Р·РјРµСЂ Рё РјС‹С€СЊ ----------
  let mobile = false;
  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    mobile = window.innerWidth < 760;
  }
  window.addEventListener('resize', resize);
  resize();

  const mouse = { x: 0, y: 0 };
  window.addEventListener('mousemove', function (e) {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (e.clientY / window.innerHeight) * 2 - 1;
  });

  // ---------- РђРЅРёРјР°С†РёСЏ ----------
  const clock = new THREE.Clock();
  let intro = reduceMotion ? 1 : 0;
  let running = true;
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running) { clock.getDelta(); requestAnimationFrame(frame); }
  });

  function frame() {
    if (!running) return;
    requestAnimationFrame(frame);
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (intro < 1) intro = Math.min(1, intro + dt / 1.6);
    const grow = 1 - Math.pow(1 - intro, 3);

    // РљРѕРіРґР° РїРµСЂРІС‹Р№ СЌРєСЂР°РЅ СѓРµР·Р¶Р°РµС‚ вЂ” РЅРµ СЂРёСЃСѓРµРј Р·СЂСЏ
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom < 0) return;
    const scroll = Math.max(0, -rect.top) / window.innerHeight;

    stars.forEach(function (st, i) {
      const m = st.mesh;
      const sc = st.scale * (mobile ? 0.8 : 1) * grow;
      m.scale.setScalar(Math.max(sc, 0.001));
      // На телефоне звёзды занимают только верх экрана: маленькую поднимаем, чтобы не наезжала на заголовок
      const bx = mobile ? (i === 2 ? 1.9 : st.base[0] * 0.6) : st.base[0];
      const by = mobile && i === 2 ? 2.4 : st.base[1];
      m.position.set(
        bx + mouse.x * 0.25 * (i + 1) * 0.5,
        by + Math.sin(t * 0.9 + st.phase) * 0.15 - mouse.y * 0.2 + scroll * 2 * (i + 1),
        st.base[2]
      );
      if (!reduceMotion) m.rotation.y += dt * st.speed + (1 - grow) * 0.08;
      m.rotation.x = 0.25 + mouse.y * 0.3;
      m.rotation.z = Math.sin(t * 0.4 + st.phase) * 0.12;
    });

    renderer.render(scene, camera);
  }
  requestAnimationFrame(frame);
})();

