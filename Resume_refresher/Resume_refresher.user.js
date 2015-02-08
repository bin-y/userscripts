// ==UserScript==
// @name        Resume refresher
// @namespace   https://github.com/Bin-Y
// @include     http://c.liepin.com/resume/getdefaultresume/
// @include     http://i.zhaopin.com/
// @version     1
// @grant       none
// ==/UserScript==

window.alert = console.log;

document.RefreshFuncTable = {
    'c.liepin.com': function () {
        document.querySelector('a[data-selector="resume-refresh"]').click();
        setTimeout('document.querySelector(\'.aui-btn-primary\').click();', 1000);
    },
    'i.zhaopin.com': function () {
        document.querySelector('.ico_refresh a').click();
    }
};

document.RefreshResume = function () {
    document.RefreshFuncTable[document.domain]();
    setTimeout(document.RefreshResume, 5 * 60 * 1000);
};

setTimeout(document.RefreshResume, 5 * 1000);
