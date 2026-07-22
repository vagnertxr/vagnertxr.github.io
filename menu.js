/* Shared behaviour: language modal (PT only), mobile drawer, scroll reveal. */
(function () {
    'use strict';

    // ── language modal (present on PT page only) ──
    var modal = document.getElementById('lang-modal');
    if (modal) {
        var store = function (v) { try { localStorage.setItem('vt-lang', v); } catch (e) {} };
        var read  = function ()  { try { return localStorage.getItem('vt-lang'); } catch (e) { return 'pt'; } };

        if (!read()) modal.classList.remove('hidden');

        var pick = function (lang) { store(lang); modal.classList.add('hidden'); };
        var pt = document.getElementById('pick-pt');
        var en = document.getElementById('pick-en');
        var skip = document.getElementById('pick-skip');
        if (pt)   pt.addEventListener('click', function () { pick('pt'); });
        if (skip) skip.addEventListener('click', function () { pick('pt'); });
        if (en)   en.addEventListener('click', function () { store('en'); }); // follows its href
    }

    // remember EN choice when landing on the English page
    if (document.documentElement.lang && document.documentElement.lang.indexOf('en') === 0) {
        try { localStorage.setItem('vt-lang', 'en'); } catch (e) {}
    }

    // ── mobile drawer ──
    var burger = document.getElementById('burger');
    var drawer = document.getElementById('drawer');
    var scrim  = document.getElementById('scrim');
    var close  = document.getElementById('drawer-close');
    var open  = function () { drawer.classList.add('open'); scrim.classList.add('open'); };
    var shut  = function () { drawer.classList.remove('open'); scrim.classList.remove('open'); };
    if (burger) burger.addEventListener('click', open);
    if (close)  close.addEventListener('click', shut);
    if (scrim)  scrim.addEventListener('click', shut);
    if (drawer) drawer.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', shut); });

    // ── scroll reveal ──
    var els = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
            });
        }, { threshold: 0.12 });
        els.forEach(function (el) { io.observe(el); });
    } else {
        els.forEach(function (el) { el.classList.add('in'); });
    }
})();
