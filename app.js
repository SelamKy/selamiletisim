(() => {
  "use strict";

  /* =========================================================
     AYARLAR — kur ve numara buradan güncellenir
  ========================================================= */
  const USD_RATE = 50.4;              // 1 USD karşılığı TL (sabit)
  const PHONE    = "905309162863";    // WhatsApp numarası
  const SHOP     = "Selam İletişim";

  /* =========================================================
     ÜRÜN VERİSİ
     price: USD (currency:"TRY" ise TL) · null = fiyat sorunuz
  ========================================================= */
  const PRODUCTS = [
    /* ---------- APPLE ---------- */
    { name:"İPHONE 17 PRO MAX 256 GB (ORİJİNAL)", spec:"256 GB", price:1420, brand:"iphone", kind:"original", image:"img/iphone-17-pro-max.jpeg" },
    { name:"İPHONE 17 PRO MAX (REPLİKA / YAN SANAYİ)", spec:"1TB", price:145, brand:"iphone", kind:"replica", image:"img/iphone-17-pro-max-replika.jpeg" },

    /* ---------- SAMSUNG / XIAOMI / TECNO / DİĞER ---------- */
    { name:"S26 ULTRA",          spec:"256/12", price:1010, brand:"samsung", tag:"YENİ" },
    { name:"S25 ULTRA",          spec:"256/12", price:905,  brand:"samsung" },
    { name:"Mİ 17 DÜZ",          spec:"12/512", price:825,  brand:"xiaomi" },
    { name:"Mİ 15 ULTRA",        spec:"16/512", price:1045, brand:"xiaomi", tag:"AMİRAL" },
    { name:"Mİ 17 PRO MAX",      spec:"512/12", price:1015, brand:"xiaomi" },
    { name:"Mİ 17 PRO MAX",      spec:"512/16", price:1065, brand:"xiaomi" },
    { name:"Mİ 17 PRO",          spec:"512/12", price:875,  brand:"xiaomi" },
    { name:"Mİ 17 ULTRA GLB",    spec:"16/512", price:1145, brand:"xiaomi", tag:"ZİRVE" },
    { name:"Mİ 15T PRO GLB",     spec:"256/12", price:635,  brand:"xiaomi" },
    { name:"Mİ 17T PRO",         spec:"512/12", price:715,  brand:"xiaomi", image:"img/17t.jpeg" },
    { name:"Mİ 17T GLB",         spec:"512/12", price:555,  brand:"xiaomi", image:"img/17t.jpeg" },
    { name:"Mİ 15",              spec:"512/12", price:665,  brand:"xiaomi" },
    { name:"Mİ 15T PRO",         spec:"512/12", price:null, brand:"xiaomi", tag:"SORUNUZ" },
    { name:"NOTE 15 PRO PLUS",   spec:"512/12", price:442,  brand:"redmi", image:"img/15pro.jpeg" },
    { name:"NOTE 14 PRO PLUS",   spec:"512/12", price:322,  brand:"redmi", image:"img/14proplus.jpeg" },
    { name:"NOTE 15 GLB",        spec:"256/8",  price:264,  brand:"redmi" },
    { name:"NOTE 14 PRO 5G",     spec:"256/8",  price:287,  brand:"redmi" },
    { name:"NOTE 15 PRO 4G",     spec:"256/8",  price:327,  brand:"redmi", image:"img/15pro.jpeg" },
    { name:"REDMİ 15C GLB",      spec:"128/4",  price:181,  brand:"redmi", image:"img/15c.jpeg" },
    { name:"REDMİ 15C GLB",      spec:"256/8",  price:202,  brand:"redmi", image:"img/15c.jpeg" },
    { name:"REDMİ 15 GLB",       spec:"256/8",  price:234,  brand:"redmi" },
    { name:"REDMİ 17 GLB",       spec:"256/8",  price:260,  brand:"redmi" },
    { name:"REDMİ 17 GLB",       spec:"128/6",  price:235,  brand:"redmi" },
    { name:"REDMİ 17 GLB",       spec:"128/4",  price:211,  brand:"redmi" },
    { name:"REDMİ 17C",          spec:"256/8",  price:224,  brand:"redmi" },
    { name:"REDMİ A5 GLB",       spec:"128/4",  price:161,  brand:"redmi" },
    { name:"REDMİ A3 PRO",       spec:"128/4",  price:158,  brand:"redmi" },
    { name:"REDMİ A7 PRO GLB",   spec:"128/4",  price:164,  brand:"redmi", image:"img/a7pro.jpeg" },
    { name:"POCO X8 PRO",        spec:"512/12", price:450,  brand:"poco", image:"img/x8promax.jpeg" },
    { name:"POCO X8 PRO",        spec:"512/8",  price:422,  brand:"poco", image:"img/x8pro.jpeg" },
    { name:"POCO C71",           spec:"128/4",  price:163,  brand:"poco" },
    { name:"SPARK Go3",          spec:"128/4",  price:163,  brand:"tecno", image:"img/sparkgo3.jpeg" },
    { name:"SMART 10",           spec:"128/4",  price:171,  brand:"tecno" },
    { name:"SMART 20",           spec:"64/4",   price:165,  brand:"tecno" },
    { name:"SMART 20",           spec:"128/4",  price:170,  brand:"tecno" },
    { name:"SMART 20",           spec:"256/4",  price:192,  brand:"tecno" },
    { name:"SMART 10 PLUS",      spec:"128/4",  price:180,  brand:"tecno" },
    { name:"F22 TUŞLU ANDROİD",  spec:"16GB",   price:121,  brand:"diger", tag:"🔥 ÇOK SATAN", image:"img/tuslu.jpeg" },
    { name:"QKUTEL C62",         spec:"128/12", price:170,  brand:"diger", image:"img/oukitel.jpeg" },
    { name:"A100C",              spec:"128/3",  price:163,  brand:"diger", image:"img/a100c.jpeg" },
    { name:"TAB 17 PRO MAX",     spec:"TABLET", price:120,  brand:"diger" },
    { name:"SAMSUNG A11 TABLET", spec:"64/4",   price:5600, currency:"TRY", brand:"samsung" }
  ];

  /* Marka etiketleri (kartta görünen) */
  const BRAND_LABEL = {
    iphone:"Apple", samsung:"Samsung", xiaomi:"Xiaomi", redmi:"Redmi",
    poco:"Poco", tecno:"Tecno", diger:"Diğer"
  };

  /* Orijinal / replika bilgisi */
  const KINDS = {
    original: { tag:"Orijinal", strong:true,  note:"Apple orijinal ürün — replika değildir." },
    replica:  { tag:"Replika",  strong:false, note:"Orijinal değildir — yan sanayi (replika) üretimdir." }
  };

  /* Filtreler — Mi, Redmi ve Poco "Xiaomi" altında toplanır */
  const FILTERS = [
    { key:"all",     label:"Tümü",          brands:null },
    { key:"apple",   label:"Apple",         brands:["iphone"],                 note:"iPhone · Orijinal ve replika" },
    { key:"samsung", label:"Samsung",       brands:["samsung"],                note:"Galaxy · Tablet" },
    { key:"xiaomi",  label:"Xiaomi",        brands:["xiaomi","redmi","poco"],  note:"Mi · Redmi · Poco" },
    { key:"diger",   label:"Tecno / Diğer", brands:["tecno","diger"],          note:"Tecno · Tuşlu · Tablet" }
  ];

  const BRAND_GROUP = {};
  FILTERS.forEach((f) => (f.brands || []).forEach((b) => { BRAND_GROUP[b] = f; }));
  const inFilter = (p, key) => key === "all" || (BRAND_GROUP[p.brand] && BRAND_GROUP[p.brand].key === key);

  /* =========================================================
     YARDIMCILAR
  ========================================================= */
  const $   = (s) => document.querySelector(s);
  const nf  = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
  const norm = (s) => String(s).toLocaleLowerCase("tr-TR")
    .replace(/i̇/g,"i").replace(/ı/g,"i").replace(/ş/g,"s").replace(/ğ/g,"g")
    .replace(/ü/g,"u").replace(/ö/g,"o").replace(/ç/g,"c").trim();
  const stripEmoji = (s) => String(s).replace(/\p{Extended_Pictographic}️?/gu, "").trim();

  /* Fiyatlar: TL ana fiyat, USD karşılığı */
  const tryValue = (p) => p.price === null ? null : (p.currency === "TRY" ? p.price : p.price * USD_RATE);
  const usdValue = (p) => p.price === null ? null : (p.currency === "TRY" ? p.price / USD_RATE : p.price);
  const fmtTRY = (v) => nf.format(Math.round(v)) + " ₺";
  const fmtUSD = (v, approx) => (approx ? "≈ " : "") + nf.format(Math.round(v)) + " USD";

  /* Görsel: ürüne verilmişse o, yoksa img/<model-adi>.jpeg denenir */
  const slug = (s) => norm(s).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const imgPath = (p) => p.image || ("img/" + slug(p.name) + ".jpeg");

  const waLink = (text) => "https://wa.me/" + PHONE + (text ? "?text=" + encodeURIComponent(text) : "");

  const WA_ICON = '<svg class="wa-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.22 8.22 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z"/></svg>';
  const PHONE_ICON = '<svg viewBox="0 0 22 34" aria-hidden="true"><rect x=".75" y=".75" width="20.5" height="32.5" rx="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M8 29h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>';

  /* =========================================================
     KART
  ========================================================= */
  function cardHTML(p, i){
    const brand = BRAND_LABEL[p.brand] || BRAND_LABEL.diger;
    const kind  = p.kind ? KINDS[p.kind] : null;
    const tl    = tryValue(p);
    const usd   = usdValue(p);
    const tag   = p.tag ? stripEmoji(p.tag) : "";

    const priceHTML = tl === null
      ? '<p class="price__try price__try--ask">Fiyat sorunuz</p>' +
        '<p class="price__usd">Güncel fiyat WhatsApp\'ta</p>'
      : '<p class="price__try">' + fmtTRY(tl) + '</p>' +
        '<p class="price__usd">' + fmtUSD(usd, p.currency === "TRY") + '</p>';

    const msg = "Merhaba, " + p.name + " (" + p.spec + ") için sipariş / bilgi almak istiyorum." +
                (tl === null ? "" : " Listedeki fiyat: " + fmtTRY(tl) + ".");

    return '' +
'<article class="card">' +
  '<div class="card__main">' +
    '<button type="button" class="thumb" data-view="' + i + '" aria-label="' + esc(p.name) + ' görselini büyüt">' +
      '<img src="' + esc(imgPath(p)) + '" alt="" loading="lazy" decoding="async" data-fallback>' +
    '</button>' +
    '<div>' +
      '<div class="card__head">' +
        '<span class="card__brand">' + esc(brand) + '</span>' +
        (kind ? '<span class="tag' + (kind.strong ? ' tag--strong' : '') + '">' + esc(kind.tag) + '</span>' : '') +
        (tag ? '<span class="tag">' + esc(tag) + '</span>' : '') +
      '</div>' +
      '<h3 class="card__title">' + esc(p.name) + '</h3>' +
      '<p class="card__spec">Hafıza <b>' + esc(p.spec) + '</b></p>' +
      (kind ? '<p class="card__note">' + esc(kind.note) + '</p>' : '') +
    '</div>' +
  '</div>' +
  '<div class="card__foot">' +
    '<div class="price">' + priceHTML + '</div>' +
    '<a class="btn" href="' + esc(waLink(msg)) + '" target="_blank" rel="noopener">' + WA_ICON + 'Sipariş ver</a>' +
  '</div>' +
'</article>';
  }

  /* Görsel yoksa: nötr yer tutucu */
  function toPlaceholder(img){
    const box = img.closest(".thumb");
    if (!box) return;
    const ph = document.createElement("div");
    ph.className = "thumb thumb--empty";
    ph.setAttribute("aria-hidden", "true");
    ph.innerHTML = PHONE_ICON;
    box.replaceWith(ph);
  }

  /* =========================================================
     DURUM + RENDER
  ========================================================= */
  const state = { filter:"all", query:"", sort:"default" };

  const filtersEl = $("#filters");
  const gridEl    = $("#grid");
  const emptyEl   = $("#empty");
  const infoEl    = $("#resultInfo");
  const searchEl  = $("#search");
  const clearEl   = $("#clearSearch");
  const sortEl    = $("#sort");

  let visible = [];

  function renderFilters(){
    filtersEl.innerHTML = FILTERS.map((f) => {
      const count = PRODUCTS.filter((p) => inFilter(p, f.key)).length;
      if (!count) return "";
      return '<button type="button" class="filter" data-filter="' + f.key + '" aria-pressed="' + (state.filter === f.key) + '">' +
               esc(f.label) + '<span class="filter__count">' + count + '</span>' +
             '</button>';
    }).join("");
  }

  function matches(p, terms){
    if (!terms.length) return true;
    const g = BRAND_GROUP[p.brand];
    const hay = norm([
      p.name, p.spec, BRAND_LABEL[p.brand] || "",
      g ? g.label + " " + (g.note || "") : "",
      p.kind === "original" ? "orijinal" : p.kind === "replica" ? "replika yan sanayi" : ""
    ].join(" "));
    return terms.every((t) => hay.includes(t));
  }

  function render(){
    const terms = norm(state.query).split(/\s+/).filter(Boolean);
    visible = PRODUCTS.filter((p) => inFilter(p, state.filter) && matches(p, terms));

    if (state.sort !== "default"){
      const dir = state.sort === "asc" ? 1 : -1;
      visible = visible.slice().sort((a, b) => {
        const va = usdValue(a), vb = usdValue(b);
        if (va === null) return 1;      // fiyatı olmayanlar her zaman sonda
        if (vb === null) return -1;
        return (va - vb) * dir;
      });
    }

    gridEl.innerHTML = visible.map(cardHTML).join("");
    gridEl.querySelectorAll("img[data-fallback]").forEach((img) => {
      if (img.complete && img.naturalWidth === 0) toPlaceholder(img);
      else img.addEventListener("error", () => toPlaceholder(img), { once:true });
    });

    emptyEl.hidden = visible.length !== 0;

    const f = FILTERS.find((x) => x.key === state.filter);
    infoEl.innerHTML = visible.length && visible.length !== PRODUCTS.length
      ?'<strong>' + visible.length + '</strong> ürün' + (f && f.note ? ' · ' + esc(f.note) : '')
      : "";
  }

  /* =========================================================
     OLAYLAR
  ========================================================= */
  let debounce = null;
  searchEl.addEventListener("input", () => {
    state.query = searchEl.value;
    clearEl.hidden = state.query.length === 0;
    clearTimeout(debounce);
    debounce = setTimeout(render, 80);
  });

  function clearSearch(){
    searchEl.value = ""; state.query = "";
    clearEl.hidden = true;
    render();
  }
  clearEl.addEventListener("click", () => { clearSearch(); searchEl.focus(); });

  document.addEventListener("keydown", (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement && document.activeElement.tagName);
    if (e.key === "/" && !typing){ e.preventDefault(); searchEl.focus(); }
    if (e.key === "Escape" && document.activeElement === searchEl && searchEl.value){ clearSearch(); }
  });

  filtersEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn || btn.dataset.filter === state.filter) return;
    state.filter = btn.dataset.filter;
    filtersEl.querySelectorAll("[data-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
    btn.scrollIntoView({ block:"nearest", inline:"nearest" });
    render();
  });

  sortEl.addEventListener("change", () => { state.sort = sortEl.value; render(); });

  $("#resetBtn").addEventListener("click", () => {
    state.filter = "all";
    sortEl.value = state.sort = "default";
    renderFilters();
    clearSearch();
  });

  /* Görsel önizleme */
  const viewer = $("#viewer");
  gridEl.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-view]");
    if (!btn) return;
    const p = visible[Number(btn.dataset.view)];
    if (!p) return;
    $("#viewerImg").src = imgPath(p);
    $("#viewerImg").alt = p.name;
    $("#viewerCaption").textContent = p.name + " · " + p.spec;
    if (typeof viewer.showModal === "function") viewer.showModal();
  });
  viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

  /* =========================================================
     BAŞLAT
  ========================================================= */
  const rateLabel = "1 USD = " + USD_RATE.toFixed(2) + " TRY";
  $("#rateText").textContent = rateLabel;
  document.querySelectorAll(".js-rate").forEach((el) => { el.textContent = rateLabel; });
  document.querySelectorAll(".js-wa").forEach((a) => { a.href = waLink("Merhaba " + SHOP + ", sipariş / toptan bilgi almak istiyorum."); });

  $("#statCount").textContent = PRODUCTS.length;
  const now = new Date();
  $("#statDate").textContent = now.toLocaleDateString("tr-TR", { day:"2-digit", month:"2-digit", year:"numeric" });
  $("#statDate").setAttribute("datetime", now.toISOString().slice(0, 10));
  $("#year").textContent = now.getFullYear();

  renderFilters();
  render();
})();
