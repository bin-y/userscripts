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
        $.real_dialog = $.dialog;
        $.fake_dialog = function(a, b, c) {
            if(a.title == '刷新成功！')
                return console.log(a);
            return $.real_dialog(a, b, c);
        };
        $.dialog = $.fake_dialog;
        document.querySelector('[data-selector="resume-refresh"]').click();
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
