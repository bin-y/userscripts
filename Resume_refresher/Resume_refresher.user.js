// ==UserScript==
// @name        Resume refresher
// @namespace   https://github.com/Bin-Y
// @include     https://c.liepin.com/resume/regresume/*
// @include     https://i.zhaopin.com/
// @version     1
// @grant       none
// ==/UserScript==

'use strict';

(function () {
    unsafeWindow.alert = console.log;

    const domain_refresher_table = {
        'c.liepin.com': function () {
            document.querySelector('[data-selector="resume-refresh"]').click();
        },
        'i.zhaopin.com': function () {
            document.querySelector('.linkRefresh').click();
            setTimeout(function () { unsafeWindow.$(".dialog,.full_bg").remove(); }, 500);
        }
    };
    function refresh_resume() {
        domain_refresher_table[document.domain]();
        setTimeout(refresh_resume, 5 * 60 * 1000);
    };
    setTimeout(refresh_resume, 5 * 1000);
})();

