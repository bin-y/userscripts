// ==UserScript==
// @name        doubi life helper
// @namespace   https://github.com/Bin-Y
// @include     http://www.msgjug.com/p_life/page.html#
// @version     1
// @grant       none
// ==/UserScript==

window.avoidTags = ['差生', '死亡', '上门修电脑专家', '口臭', '肥胖', '痔疮', '玻璃心', '多病', '菊花残', '被狗日', '近视眼', '败家'];
game.realUserSelect = game.userSelect;
game.userSelect = function (id) {
  game.realUserSelect(id);

  var buttons = document.querySelectorAll('#happen button');
  console.log(game.happen.id, game.happen.title);

  function selectOptionbyId(id) {
    console.log(buttons[id].innerText);
    buttons[id].click();
  }

  function clickRandom() {
    var select = parseInt(Math.random() * buttons.length);
    selectOptionbyId(select);
  }

  function clickRandomExclude(excludes) {
    var select;
    while(1) {
      select = parseInt(Math.random() * buttons.length);
      var selectOk = true;
      for (var i = 0; i < excludes.length; i++) {
        if (excludes[i] == select) {
          selectOk = false;
        }
      }

      if (selectOk) {
        break;
      }
    } 
  }
    
  switch(game.happen.id){
    case 872:
      selectOptionbyId(2);
      break;
  }
  function jointDelTag(tag) {
    if (tag.length) {
      text += '-';
      text += tag;
      text += ' ';
    }
  }
  
  function jointAddTag(tag, button) {
    var avoid = false;
    if (tag.length) {
      text += '+';
      text += tag;
      text += ' ';

      console.log(tag, window.avoidTags);
      for (var i = 0; i < window.avoidTags.length; i++) {
        if (tag == window.avoidTags[i]) {
          avoid = true;
          break;
        }
      }
    }
    return avoid;
  }
  var clickButton = 0;
  for (var i = 0; i < buttons.length; i++) {
    var comment = document.createElement("div");
    var text = '';
    var aff = game.happen.aff[i];
    var avoid = false;
    console.log(i, aff);
    
    jointDelTag(aff.delAff);
    jointDelTag(aff.delBG);
    jointDelTag(aff.delCBG);
    
    avoid |= jointAddTag(aff.plusAff);
    avoid |= jointAddTag(aff.plusBG);
    avoid |= jointAddTag(aff.plusCBG);
    
    if(avoid) {
      buttons[i].disabled = true;
      comment.style.color = '#d90080'
    }
    else {
      if (clickButton == 0)
         clickButton = buttons[i];
      else clickButton = null;
    }
    
    if (text.length) {
      comment.innerText = text;
      comment.title = aff.text;
    }
    else {
      comment.innerText = aff.text;
    }
    buttons[i].parentNode.insertBefore(comment, buttons[i].nextSibling);
    
    if (aff.target != -1) {
      var target = document.createElement("div");
      var targetEvent;
      for (var j = 0; j < EvtLib.length; j++) {
        if (EvtLib[j].id == aff.target) {
          targetEvent = EvtLib[j];
        }
      }
      target.innerText += targetEvent.text;
      target.className = 'aff_node_s';
      comment.parentNode.insertBefore(target, comment.nextSibling);
    }
  }
  if (clickButton != null && clickButton != 0) {
    selectOptionbyId(clickButton.id);
  }
  if (clickButton == 0) {
    buttons[0].disabled = false;
  }
}

