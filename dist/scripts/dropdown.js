var Dropdown=function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),r=n(2);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}n(3),n(8),n(9);var a=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),"string"==typeof t){var i=document.querySelectorAll(t);if(0===i.length)return void console.error("Dropdown: Селектор "+t+" не найден!");if(i.length>1)for(var o=1;o<i.length;o++)new e(i[o],n)}this.config=(0,r.extend)({items:[],singleItem:!1,inputHiddenName:"dropdown",searchFields:["name"],searchPlaceholder:"Введите имя друга или email",noResultsText:"Пользователь не найден",serverSearch:{url:null,fields:[],paramNameQuery:"q",paramNameFields:"fields",loadingText:"Загрузка..."},classNames:{container:"dropdown",head:"dropdown__head",selectedList:"dropdown__selected",selectedItem:"dropdown__s-item",removeButton:"dropdown__remove-btn",addButton:"dropdown__add-button",input:"dropdown__input",arrow:"dropdown__arrow",list:"dropdown__list",listActive:"dropdown__list_active",listItem:"dropdown__item",listItemHighlight:"dropdown__item_hover",message:"dropdown__message"},templateListItem:function(e){return'\n          <div class="dropdown__item-inner">\n            <span class="dropdown__avatar">\n              <img class="dropdown__avatar-img" src="'+e.avatar+'">\n            </span>\n            \n            <span class="dropdown__name">'+e.name+"</span>\n          </div>\n        "},templateSelectedItem:function(e){return e.name},onInit:null,onDestroy:null,onShow:null,onHide:null,onChange:null,onSelect:null,onUnselect:null},n),this.element="string"==typeof t?document.querySelector(t):t,this.elements={},this.initialised=!1,this.selected=[],this._onClick=this._onClick.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onFocus=this._onFocus.bind(this),this._onChange=this._onChange.bind(this),this._onMouseOver=this._onMouseOver.bind(this),this.init()}return i(e,[{key:"init",value:function(){!0!==this.initialised&&(this._initTemplates(),this._createTemplates(),this._render(),this._renderList(),this._addEventListeners(),this.initialised=!0,(0,r.runCallback)(this.config.onInit,this))}},{key:"destroy",value:function(){!1!==this.initialised&&(this.element.innerHTML="",this.elements=[],this.selected=[],this._removeEventListeners(),this.initialised=!1,(0,r.runCallback)(this.config.onDestroy,this))}},{key:"showList",value:function(){var e=this.elements,t=e.list,n=e.input;t.classList.add(this.config.classNames.listActive),n.focus(),this.selected.length>0&&this._showInput(),(0,r.runCallback)(this.config.onShow,this)}},{key:"hideList",value:function(){this.elements.list.classList.remove(this.config.classNames.listActive),this.selected.length>0&&this._hideInput(),this.elements.input.value="",this._renderList(),(0,r.runCallback)(this.config.onHide,this)}},{key:"selectItem",value:function(e){0===this.selected.length&&this._hideInput(),this.config.singleItem?this.selected[0]=e:this.selected.push(e),this._renderList(),this._renderSelected(),this._updateSubmitInput(),(0,r.runCallback)(this.config.onSelect,this),(0,r.runCallback)(this.config.onChange,this)}},{key:"unselectItem",value:function(e){this.selected=this.selected.filter(function(t){return t!==e}),this._renderList(),this._renderSelected(),this._updateSubmitInput(),0===this.selected.length&&this._showInput(),(0,r.runCallback)(this.config.onUnselect,this),(0,r.runCallback)(this.config.onChange,this)}},{key:"_initTemplates",value:function(){var e=this.config,t=e.classNames,n=e.searchPlaceholder,i=e.inputHiddenName,o=e.templateListItem,s=e.templateSelectedItem,a={container:function(){return(0,r.strToEl)('\n          <div class="'+t.container+'"></div>\n        ')},head:function(){return(0,r.strToEl)('\n          <div class="'+t.head+'"></div>\n        ')},list:function(){return(0,r.strToEl)('\n          <ul class="'+t.list+'"></ul>\n        ')},selectedList:function(){return(0,r.strToEl)('\n          <div class="'+t.selectedList+'"></div>\n        ')},input:function(){return(0,r.strToEl)('\n          <input type="text" class="'+t.input+'" placeholder="'+n+'" />\n        ')},hidden:function(){return(0,r.strToEl)('\n          <input type="hidden" name="'+i+'" />\n        ')},arrow:function(){return(0,r.strToEl)('\n          <span class="'+t.arrow+'"></span>\n        ')},addButton:function(){return(0,r.strToEl)('\n          <div class="'+t.addButton+'">Добавить</div>\n        ')},message:function(e){return(0,r.strToEl)('<li class="'+t.message+'">'+e+"</li>")},listItem:function(e){return(0,r.strToEl)('\n          <li class="'+t.listItem+'" data-id="'+e.id+'">\n            '+o(e)+"\n          </li>\n        ")},selectedItem:function(e){return(0,r.strToEl)('\n          <div class="'+t.selectedItem+'" data-id="'+e.id+'">\n            '+s(e)+'\n            <button class="'+t.removeButton+'"></button>\n          </div>\n        ')}};this.config.templates=a}},{key:"_getTemplate",value:function(e){if(!e)return null;for(var t=this.config.templates,n=arguments.length,i=Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return t[e].apply(t,i)}},{key:"_createTemplates",value:function(){var e=this;["container","head","list","selectedList","input","hidden","arrow"].forEach(function(t){e.elements[t]=e._getTemplate(t)})}},{key:"_render",value:function(){var e=this.elements,t=e.container,n=e.head,i=e.list,r=e.selectedList,o=e.input,s=e.hidden,a=e.arrow;n.appendChild(r),n.appendChild(o),n.appendChild(s),n.appendChild(a),t.appendChild(n),t.appendChild(i),this.element.appendChild(t)}},{key:"_renderList",value:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config.items,n=this.elements.list;n.innerHTML="",t.forEach(function(t){if(!(e.selected.indexOf(t.id)>=0)){var i=e._getTemplate("listItem",t);n.append(i)}}),n.children.length||this._renderMessage(this.config.noResultsText)}},{key:"_renderMessage",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.elements.list,i=this._getTemplate("message",e);t&&(n.innerHTML=""),n.prepend(i)}},{key:"_renderSelected",value:function(){var e=this,t=this.elements.selectedList;t.innerHTML="",this.selected.forEach(function(n){var i=e.config.items.filter(function(e){return e.id===n})[0],r=e._getTemplate("selectedItem",i);t.append(r)}),this.selected.length&&!this.config.singleItem&&t.append(this._getTemplate("addButton"))}},{key:"_addEventListeners",value:function(){document.addEventListener("click",this._onClick),document.addEventListener("keydown",this._onKeyDown),this.elements.input.addEventListener("focus",this._onFocus),this.elements.input.addEventListener("input",this._onChange),this.elements.list.addEventListener("mouseover",this._onMouseOver)}},{key:"_removeEventListeners",value:function(){document.removeEventListener("click",this._onClick),document.removeEventListener("keydown",this._onKeyDown),this.elements.input.removeEventListener("focus",this._onFocus),this.elements.input.removeEventListener("input",this._onChange),this.elements.list.removeEventListener("mouseover",this._onMouseOver)}},{key:"_onClick",value:function(e){var t=this.elements,n=t.container,i=t.list,o=this.config.classNames,s=n.contains(e.target),a=i.classList.contains(o.listActive);if(s){var l=e.target,c=l.closest("."+o.listItem);if(c){var u=+c.getAttribute("data-id");this.selectItem(u),this.hideList()}if((0,r.hasClass)(l,o.arrow)&&((0,r.hasClass)(this.elements.list,o.listActive)?this.hideList():a||(this.showList(),this.elements.input.focus())),((0,r.hasClass)(l,o.input)||(0,r.hasClass)(l,o.head)||(0,r.hasClass)(l,o.selectedList)||(0,r.hasClass)(l,o.addButton))&&(a||(this.showList(),this.elements.input.focus())),(0,r.hasClass)(l,o.removeButton)){var h=+l.closest("."+o.selectedItem).getAttribute("data-id");this.unselectItem(h),a&&this.hideList()}}else a&&this.hideList()}},{key:"_onKeyDown",value:function(e){var t=this,n=this.elements.list.classList.contains(this.config.classNames.listActive);if(n){var i,r=function(n){e.preventDefault();var i=t.elements.list.children,r="down"===n?1:-1,o=void 0;[].concat(s(i)).forEach(function(e,n){e.classList.contains(t.config.classNames.listItemHighlight)&&(t._unhighlightElement(e),o=i[n+r]?i[n+r]:i[n])}),o||(o=i[0]),o.classList.contains(t.config.classNames.message)||(console.log(o),t._highlightElement(o),t._scrollToElem(o,r))};switch(e.keyCode){case 27:n&&(this.hideList(),this.elements.input.blur());break;case 9:this.hideList();break;case 38:r("up");break;case 40:r("down");break;case 13:i=t.elements.list.children,[].concat(s(i)).forEach(function(e){if(e.classList.contains(t.config.classNames.listItemHighlight)){var i=+e.getAttribute("data-id");t.selectItem(i),n&&(t.hideList(),t.elements.input.blur())}})}}}},{key:"_onFocus",value:function(e){this.elements.list.classList.contains(this.config.classNames.listActive)||this.showList()}},{key:"_onChange",value:function(e){this._searchItems(e.target.value)}},{key:"_onMouseOver",value:function(e){var t=e.target.closest("."+this.config.classNames.listItem);this._unhighlightAll(),t&&this._highlightElement(t)}},{key:"_searchItems",value:function(e){var t=this;if(""!==e){var n=(0,r.translit)(e);e=e.toLowerCase();var i=this.config.items.filter(function(e){return t.config.searchFields.some(function(t){if(t=e[t]){var i=(t=t.toLowerCase()).split(" ");return i.push(t),i.some(function(e){return n.some(function(t){return!e.indexOf(t)})})}})});this._renderList(i),0===i.length&&"string"==typeof this.config.serverSearch.url&&this._searchServer(n)}else this._renderList()}},{key:"_searchServer",value:function(e){var t,n=this,i=this.config.serverSearch,r=i.url,s=i.fields,a=i.paramNameQuery,l=i.paramNameFields,c=i.loadingText;this._renderMessage(c),fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify((t={},o(t,a,e),o(t,l,s),t))}).then(function(e){return 200===e.status&&e.json()}).then(function(e){e&&n._renderList(e)})}},{key:"_showInput",value:function(){this.elements.input.style.display="block"}},{key:"_hideInput",value:function(){this.elements.input.style.display="none"}},{key:"_updateSubmitInput",value:function(){this.elements.hidden.value=this.selected.join(",")}},{key:"_highlightElement",value:function(e){e.classList.add(this.config.classNames.listItemHighlight)}},{key:"_unhighlightElement",value:function(e){e.classList.remove(this.config.classNames.listItemHighlight)}},{key:"_unhighlightAll",value:function(){var e=this,t=this.elements.list.children;[].concat(s(t)).forEach(function(t){t.classList.contains(e.config.classNames.listItemHighlight)&&e._unhighlightElement(t)})}},{key:"_scrollToElem",value:function(e,t){var n=this.elements.list,i=e.offsetTop,r=e.offsetTop+e.offsetHeight,o=this.elements.list.scrollTop,s=this.elements.list.offsetHeight;t>0&&r>s?n.scrollTop=r-s:t<0&&s+i<s+o&&(n.scrollTop=i)}}]),e}();e.exports=a},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},r=t.getType=function(e){return Object.prototype.toString.call(e).slice(8,-1).toLowerCase()},o=t.isType=function(e,t){var n=r(t);return void 0!==t&&null!==t&&n===e.toLowerCase()};t.strToEl=function(e){var t=document.createElement("div");return t.innerHTML=e.trim(),t.firstChild},t.runCallback=function(e,t){o("function",e)&&e.call(t)},t.hasClass=function(e,t){if("object"===(void 0===e?"undefined":i(e))||"string"==typeof t)return e.classList.contains(t)},t.extend=function e(){for(var t=arguments.length,n=Array(t),i=0;i<t;i++)n[i]=arguments[i];var r={};return n.forEach(function(t){o("Object",t)&&function(t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(o("Object",t[n])?r[n]=e(!0,r[n],t[n]):r[n]=t[n])}(t)}),r},t.translit=function(e){var t={ru:"щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),en:"shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g),ruBad:"o i x w . z \\ ; ] s ' f , d u l t p b q r k v y j g h c n e a [ m".split(/ +/g)},n=[];return e=e.toLowerCase(),[["ru","en"],["en","ru"],["ruBad","ru"],["ru","ruBad"],["ru","ruBad","en","ru"],["ruBad","ru","ru","en"]].forEach(function(i){for(var r=e,o=0;o<i.length;o+=2)for(var s=t[i[o]],a=t[i[o+1]],l=0,c=t.ru.length;l<c;l++)r=r.split(s[l]).join(a[l]);n.push(r)}),n}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){var t=n(4),i=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==e)return e;throw new Error("unable to locate global object")}();i.Promise||(i.Promise=t.a)}.call(t,n(0))},function(e,t,n){"use strict";(function(e){var n=setTimeout;function i(){}function r(e){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof e)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(e,this)}function o(e,t){for(;3===e._state;)e=e._value;0!==e._state?(e._handled=!0,r._immediateFn(function(){var n=1===e._state?t.onFulfilled:t.onRejected;if(null!==n){var i;try{i=n(e._value)}catch(e){return void a(t.promise,e)}s(t.promise,i)}else(1===e._state?s:a)(t.promise,e._value)})):e._deferreds.push(t)}function s(e,t){try{if(t===e)throw new TypeError("A promise cannot be resolved with itself.");if(t&&("object"==typeof t||"function"==typeof t)){var n=t.then;if(t instanceof r)return e._state=3,e._value=t,void l(e);if("function"==typeof n)return void c((i=n,o=t,function(){i.apply(o,arguments)}),e)}e._state=1,e._value=t,l(e)}catch(t){a(e,t)}var i,o}function a(e,t){e._state=2,e._value=t,l(e)}function l(e){2===e._state&&0===e._deferreds.length&&r._immediateFn(function(){e._handled||r._unhandledRejectionFn(e._value)});for(var t=0,n=e._deferreds.length;t<n;t++)o(e,e._deferreds[t]);e._deferreds=null}function c(e,t){var n=!1;try{e(function(e){n||(n=!0,s(t,e))},function(e){n||(n=!0,a(t,e))})}catch(e){if(n)return;n=!0,a(t,e)}}r.prototype.catch=function(e){return this.then(null,e)},r.prototype.then=function(e,t){var n=new this.constructor(i);return o(this,new function(e,t,n){this.onFulfilled="function"==typeof e?e:null,this.onRejected="function"==typeof t?t:null,this.promise=n}(e,t,n)),n},r.prototype.finally=function(e){var t=this.constructor;return this.then(function(n){return t.resolve(e()).then(function(){return n})},function(n){return t.resolve(e()).then(function(){return t.reject(n)})})},r.all=function(e){return new r(function(t,n){if(!e||void 0===e.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(e);if(0===i.length)return t([]);var r=i.length;function o(e,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(t){o(e,t)},n)}i[e]=s,0==--r&&t(i)}catch(e){n(e)}}for(var s=0;s<i.length;s++)o(s,i[s])})},r.resolve=function(e){return e&&"object"==typeof e&&e.constructor===r?e:new r(function(t){t(e)})},r.reject=function(e){return new r(function(t,n){n(e)})},r.race=function(e){return new r(function(t,n){for(var i=0,r=e.length;i<r;i++)e[i].then(t,n)})},r._immediateFn="function"==typeof e&&function(t){e(t)}||function(e){n(e,0)},r._unhandledRejectionFn=function(e){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",e)},t.a=r}).call(t,n(5).setImmediate)},function(e,t,n){(function(e){var i=void 0!==e&&e||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function o(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new o(r.call(setTimeout,i,arguments),clearTimeout)},t.setInterval=function(){return new o(r.call(setInterval,i,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n(6),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(t,n(0))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var i,r,o,s,a,l=1,c={},u=!1,h=e.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(e);f=f&&f.setTimeout?f:e,"[object process]"==={}.toString.call(e.process)?i=function(e){t.nextTick(function(){p(e)})}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((o=new MessageChannel).port1.onmessage=function(e){p(e.data)},i=function(e){o.port2.postMessage(e)}):h&&"onreadystatechange"in h.createElement("script")?(r=h.documentElement,i=function(e){var t=h.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,r.removeChild(t),t=null},r.appendChild(t)}):i=function(e){setTimeout(p,0,e)}:(s="setImmediate$"+Math.random()+"$",a=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(s)&&p(+t.data.slice(s.length))},e.addEventListener?e.addEventListener("message",a,!1):e.attachEvent("onmessage",a),i=function(t){e.postMessage(s+t,"*")}),f.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var r={callback:e,args:t};return c[l]=r,i(l),l++},f.clearImmediate=d}function d(e){delete c[e]}function p(e){if(u)setTimeout(p,0,e);else{var t=c[e];if(t){u=!0;try{!function(e){var t=e.callback,i=e.args;switch(i.length){case 0:t();break;case 1:t(i[0]);break;case 2:t(i[0],i[1]);break;case 3:t(i[0],i[1],i[2]);break;default:t.apply(n,i)}}(t)}finally{d(e),u=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(t,n(0),n(7))},function(e,t){var n,i,r=e.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(e){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(e){i=s}}();var l,c=[],u=!1,h=-1;function f(){u&&l&&(u=!1,l.length?c=l.concat(c):h=-1,c.length&&d())}function d(){if(!u){var e=a(f);u=!0;for(var t=c.length;t;){for(l=c,c=[];++h<t;)l&&l[h].run();h=-1,t=c.length}l=null,u=!1,function(e){if(i===clearTimeout)return clearTimeout(e);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(e);try{i(e)}catch(t){try{return i.call(null,e)}catch(t){return i.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function m(){}r.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||u||a(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(e){return[]},r.binding=function(e){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(e){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(e,t){!function(e){"use strict";if(!e.fetch){var t={searchParams:"URLSearchParams"in e,iterable:"Symbol"in e&&"iterator"in Symbol,blob:"FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),formData:"FormData"in e,arrayBuffer:"ArrayBuffer"in e};if(t.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=function(e){return e&&DataView.prototype.isPrototypeOf(e)},r=ArrayBuffer.isView||function(e){return e&&n.indexOf(Object.prototype.toString.call(e))>-1};u.prototype.append=function(e,t){e=a(e),t=l(t);var n=this.map[e];this.map[e]=n?n+","+t:t},u.prototype.delete=function(e){delete this.map[a(e)]},u.prototype.get=function(e){return e=a(e),this.has(e)?this.map[e]:null},u.prototype.has=function(e){return this.map.hasOwnProperty(a(e))},u.prototype.set=function(e,t){this.map[a(e)]=l(t)},u.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},u.prototype.keys=function(){var e=[];return this.forEach(function(t,n){e.push(n)}),c(e)},u.prototype.values=function(){var e=[];return this.forEach(function(t){e.push(t)}),c(e)},u.prototype.entries=function(){var e=[];return this.forEach(function(t,n){e.push([n,t])}),c(e)},t.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);var o=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},m.call(y.prototype),m.call(g.prototype),g.prototype.clone=function(){return new g(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},g.error=function(){var e=new g(null,{status:0,statusText:""});return e.type="error",e};var s=[301,302,303,307,308];g.redirect=function(e,t){if(-1===s.indexOf(t))throw new RangeError("Invalid status code");return new g(null,{status:t,headers:{location:e}})},e.Headers=u,e.Request=y,e.Response=g,e.fetch=function(e,n){return new Promise(function(i,r){var o=new y(e,n),s=new XMLHttpRequest;s.onload=function(){var e,t,n={status:s.status,statusText:s.statusText,headers:(e=s.getAllResponseHeaders()||"",t=new u,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(e){var n=e.split(":"),i=n.shift().trim();if(i){var r=n.join(":").trim();t.append(i,r)}}),t)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var r="response"in s?s.response:s.responseText;i(new g(r,n))},s.onerror=function(){r(new TypeError("Network request failed"))},s.ontimeout=function(){r(new TypeError("Network request failed"))},s.open(o.method,o.url,!0),"include"===o.credentials?s.withCredentials=!0:"omit"===o.credentials&&(s.withCredentials=!1),"responseType"in s&&t.blob&&(s.responseType="blob"),o.headers.forEach(function(e,t){s.setRequestHeader(t,e)}),s.send(void 0===o._bodyInit?null:o._bodyInit)})},e.fetch.polyfill=!0}function a(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function l(e){return"string"!=typeof e&&(e=String(e)),e}function c(e){var n={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return t.iterable&&(n[Symbol.iterator]=function(){return n}),n}function u(e){this.map={},e instanceof u?e.forEach(function(e,t){this.append(t,e)},this):Array.isArray(e)?e.forEach(function(e){this.append(e[0],e[1])},this):e&&Object.getOwnPropertyNames(e).forEach(function(t){this.append(t,e[t])},this)}function h(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function f(e){return new Promise(function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}})}function d(e){var t=new FileReader,n=f(t);return t.readAsArrayBuffer(e),n}function p(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(e){if(this._bodyInit=e,e)if("string"==typeof e)this._bodyText=e;else if(t.blob&&Blob.prototype.isPrototypeOf(e))this._bodyBlob=e;else if(t.formData&&FormData.prototype.isPrototypeOf(e))this._bodyFormData=e;else if(t.searchParams&&URLSearchParams.prototype.isPrototypeOf(e))this._bodyText=e.toString();else if(t.arrayBuffer&&t.blob&&i(e))this._bodyArrayBuffer=p(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!t.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(e)&&!r(e))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(e)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var e=h(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?h(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(d)}),this.text=function(){var e,t,n,i=h(this);if(i)return i;if(this._bodyBlob)return e=this._bodyBlob,t=new FileReader,n=f(t),t.readAsText(e),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),i=0;i<t.length;i++)n[i]=String.fromCharCode(t[i]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}function y(e,t){var n,i,r=(t=t||{}).body;if(e instanceof y){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new u(e.headers)),this.method=e.method,this.mode=e.mode,r||null==e._bodyInit||(r=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"omit",!t.headers&&this.headers||(this.headers=new u(t.headers)),this.method=(n=t.method||this.method||"GET",i=n.toUpperCase(),o.indexOf(i)>-1?i:n),this.mode=t.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function v(e){var t=new FormData;return e.trim().split("&").forEach(function(e){if(e){var n=e.split("="),i=n.shift().replace(/\+/g," "),r=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(i),decodeURIComponent(r))}}),t}function g(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new u(t.headers),this.url=t.url||"",this._initBody(e)}}("undefined"!=typeof self?self:this)},function(e,t,n){"use strict";var i;[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(e){e.hasOwnProperty("append")||Object.defineProperty(e,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(String(e)))}),this.appendChild(t)}})}),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(e){e.hasOwnProperty("prepend")||Object.defineProperty(e,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(String(e)))}),this.insertBefore(t,this.firstChild)}})}),(i=Element.prototype).closest=i.closest||function(e){for(var t=this;t;){if(t.matches(e))return t;t=t.parentElement}return null},function(e){var t=e.matches||e.matchesSelector||e.webkitMatchesSelector||e.mozMatchesSelector||e.msMatchesSelector||e.oMatchesSelector;e.matches=e.matchesSelector=t||function(e){var t=document.querySelectorAll(e),n=this;return Array.prototype.some.call(t,function(e){return e===n})}}(Element.prototype),Array.from||(Array.from=function(e){return[].slice.call(e)})}]);