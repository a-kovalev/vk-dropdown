var Dropdown=function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n},function(t,e,n){"use strict";var i,r=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=n(2),s=n(3);(i=s)&&i.__esModule;function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function l(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}n(7),n(8);var c=function(){function t(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),"string"==typeof e){var i=document.querySelectorAll(e);if(0===i.length)return void console.error("Dropdown: Селектор "+e+" не найден!");if(i.length>1)for(var r=1;r<i.length;r++)new t(i[r],n)}this.config=(0,o.extend)({items:[],singleItem:!1,inputHiddenName:"dropdown",searchFields:["name"],searchPlaceholder:"Введите имя друга или email",noResultsText:"Пользователь не найден",serverSearch:{url:null,fields:[],paramNameQuery:"q",paramNameFields:"fields",loadingText:"Загрузка..."},classNames:{container:"dropdown",head:"dropdown__head",selectedList:"dropdown__selected",selectedItem:"dropdown__s-item",removeButton:"dropdown__remove-btn",addButton:"dropdown__add-button",input:"dropdown__input",arrow:"dropdown__arrow",list:"dropdown__list",listActive:"dropdown__list_active",listItem:"dropdown__item",listItemHighlight:"dropdown__item_hover",message:"dropdown__message"},templateListItem:function(t){return'\n\t\t\t\t\t<div class="dropdown__item-inner">\n\t\t\t\t\t\t<span class="dropdown__avatar">\n\t\t\t\t\t\t\t<img class="dropdown__avatar-img" src="'+t.avatar+'">\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\n\t\t\t\t\t\t<span class="dropdown__name">'+t.name+"</span>\n\t\t\t\t\t</div>\n\t\t\t\t"},templateSelectedItem:function(t){return t.name},onInit:null,onDestroy:null,onShow:null,onHide:null,onSelect:null,onUnselect:null},n),this.element="string"==typeof e?document.querySelector(e):e,this.elements={},this.initialised=!1,this.selected=[],this._onClick=this._onClick.bind(this),this._onKeyDown=this._onKeyDown.bind(this),this._onFocus=this._onFocus.bind(this),this._onChange=this._onChange.bind(this),this._onMouseOver=this._onMouseOver.bind(this),this.init(this.config.init)}return r(t,[{key:"init",value:function(){!0!==this.initialised&&(this._initTemplates(),this._createTemplates(),this._render(),this._renderList(),this._addEventListeners(),this.initialised=!0,(0,o.runCallback)(this.config.onInit,this))}},{key:"destroy",value:function(){!1!==this.initialised&&(this.element.innerHTML="",this.elements=[],this.selected=[],this._removeEventListeners(),this.initialised=!1,(0,o.runCallback)(this.config.onDestroy,this))}},{key:"showList",value:function(){var t=this.elements,e=t.list,n=t.input;e.classList.add(this.config.classNames.listActive),n.focus(),this.selected.length>0&&this._showInput(),(0,o.runCallback)(this.config.onShow,this)}},{key:"hideList",value:function(){this.elements.list.classList.remove(this.config.classNames.listActive),this.selected.length>0&&this._hideInput(),this.elements.input.value="",this._renderList(),(0,o.runCallback)(this.config.onHide,this)}},{key:"selectItem",value:function(t){0===this.selected.length&&this._hideInput(),this.config.singleItem?this.selected[0]=t:this.selected.push(t),this._renderList(),this._renderSelected(),this._updateSubmitInput(),(0,o.runCallback)(this.config.onSelect,this)}},{key:"unselectItem",value:function(t){this.selected=this.selected.filter(function(e){return e!==t}),this._renderList(),this._renderSelected(),this._updateSubmitInput(),0===this.selected.length&&this._showInput(),(0,o.runCallback)(this.config.onUnselect,this)}},{key:"_initTemplates",value:function(){var t=this.config,e=t.classNames,n=t.searchPlaceholder,i=t.inputHiddenName,r=t.templateListItem,s=t.templateSelectedItem,a={container:function(){return(0,o.strToEl)('\n\t\t\t\t\t<div class="'+e.container+'"></div>\n\t\t\t\t')},head:function(){return(0,o.strToEl)('\n\t\t\t\t\t<div class="'+e.head+'"></div>\n\t\t\t\t')},list:function(){return(0,o.strToEl)('\n\t\t\t\t\t<ul class="'+e.list+'"></ul>\n\t\t\t\t')},selectedList:function(){return(0,o.strToEl)('\n\t\t\t\t\t<div class="'+e.selectedList+'"></div>\n\t\t\t\t')},input:function(){return(0,o.strToEl)('\n\t\t\t\t\t<input type="text" class="'+e.input+'" placeholder="'+n+'" />\n\t\t\t\t')},hidden:function(){return(0,o.strToEl)('\n\t\t\t\t\t<input type="hidden" name="'+i+'" />\n\t\t\t\t')},arrow:function(){return(0,o.strToEl)('\n\t\t\t\t\t<span class="'+e.arrow+'"></span>\n\t\t\t\t')},addButton:function(){return(0,o.strToEl)('\n\t\t\t\t\t<div class="'+e.addButton+'">Добавить</div>\n\t\t\t\t')},message:function(t){return(0,o.strToEl)('<li class="'+e.message+'">'+t+"</li>")},listItem:function(t){return(0,o.strToEl)('\n\t\t\t\t\t<li class="'+e.listItem+'" data-id="'+t.id+'">\n\t\t\t\t\t\t'+r(t)+"\n\t\t\t\t\t</li>\n\t\t\t\t")},selectedItem:function(t){return(0,o.strToEl)('\n\t\t\t\t\t<div class="'+e.selectedItem+'" data-id="'+t.id+'">\n\t\t\t\t\t\t'+s(t)+'\n\t\t\t\t\t\t<button class="'+e.removeButton+'"></button>\n\t\t\t\t\t</div>\n\t\t\t\t')}};this.config.templates=a}},{key:"_getTemplate",value:function(t){if(!t)return null;for(var e=this.config.templates,n=arguments.length,i=Array(n>1?n-1:0),r=1;r<n;r++)i[r-1]=arguments[r];return e[t].apply(e,i)}},{key:"_createTemplates",value:function(){var t=this;["container","head","list","selectedList","input","hidden","arrow"].forEach(function(e){t.elements[e]=t._getTemplate(e)})}},{key:"_render",value:function(){var t=this.elements,e=(t.target,t.container),n=t.head,i=t.list,r=t.selectedList,o=t.input,s=t.hidden,a=t.arrow;n.appendChild(r),n.appendChild(o),n.appendChild(s),n.appendChild(a),e.appendChild(n),e.appendChild(i),this.element.appendChild(e)}},{key:"_renderList",value:function(){var t=this,e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:this.config.items,n=this.elements.list;n.innerHTML="",e.forEach(function(e){if(!(t.selected.indexOf(e.id)>=0)){var i=t._getTemplate("listItem",e);n.append(i)}}),n.children.length||this._renderMessage(this.config.noResultsText)}},{key:"_renderMessage",value:function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.elements.list,i=this._getTemplate("message",t);e&&(n.innerHTML=""),n.prepend(i)}},{key:"_renderSelected",value:function(){var t=this,e=this.elements.selectedList;e.innerHTML="",this.selected.forEach(function(n){var i=t.config.items.filter(function(t){return t.id==n})[0],r=t._getTemplate("selectedItem",i);e.append(r)}),this.selected.length&&!this.config.singleItem&&e.append(this._getTemplate("addButton"))}},{key:"_addEventListeners",value:function(){document.addEventListener("click",this._onClick),document.addEventListener("keydown",this._onKeyDown),this.elements.input.addEventListener("focus",this._onFocus),this.elements.input.addEventListener("input",this._onChange),this.elements.list.addEventListener("mouseover",this._onMouseOver)}},{key:"_removeEventListeners",value:function(){document.removeEventListener("click",this._onClick),document.removeEventListener("keydown",this._onKeyDown),this.elements.input.removeEventListener("focus",this._onFocus),this.elements.input.removeEventListener("input",this._onChange),this.elements.list.removeEventListener("mouseover",this._onMouseOver)}},{key:"_onClick",value:function(t){var e=this.elements,n=e.container,i=e.list,r=this.config.classNames,s=n.contains(t.target),a=i.classList.contains(r.listActive);if(s){var l=t.target,c=l.closest("."+r.listItem);if(c&&(l=c),(0,o.hasClass)(l,r.arrow)&&((0,o.hasClass)(this.elements.list,r.listActive)?this.hideList():(this.showList(),this.elements.input.focus())),((0,o.hasClass)(l,r.input)||(0,o.hasClass)(l,r.head)||(0,o.hasClass)(l,r.selectedList)||(0,o.hasClass)(l,r.addButton))&&(this.showList(),this.elements.input.focus()),c){var u=+l.getAttribute("data-id");this.selectItem(u),this.hideList()}if((0,o.hasClass)(l,r.removeButton)){var h=+l.closest("."+r.selectedItem).getAttribute("data-id");this.unselectItem(h),this.hideList()}}else a&&this.hideList()}},{key:"_onKeyDown",value:function(t){var e=this,n=this.elements.list.classList.contains(this.config.classNames.listActive);if(n){var i,r=function(n){t.preventDefault();var i=e.elements.list.children,r="down"===n?1:-1,o=void 0;[].concat(l(i)).forEach(function(t,n){t.classList.contains(e.config.classNames.listItemHighlight)&&(e._unhighlightElement(t),o=i[n+r]?i[n+r]:i[n])}),o||(o=i[0]),e._highlightElement(o),e._scrollToElem(o,r)};switch(t.keyCode){case 27:n&&(this.hideList(),this.elements.input.blur());break;case 9:this.hideList();break;case 38:r("up");break;case 40:r("down");break;case 13:i=e.elements.list.children,[].concat(l(i)).forEach(function(t){if(t.classList.contains(e.config.classNames.listItemHighlight)){var n=+t.getAttribute("data-id");return e.selectItem(n),void e.hideList()}})}}}},{key:"_onFocus",value:function(t){this.elements.list.classList.contains(this.config.classNames.listActive)||this.showList()}},{key:"_onChange",value:function(t){this._searchItems(t.target.value)}},{key:"_onMouseOver",value:function(t){var e=t.target.closest("."+this.config.classNames.listItem);this._unhighlightAll(),e&&this._highlightElement(e)}},{key:"_searchItems",value:function(t){var e=this;if(""!==t){var n=(0,o.translit)(t);t=t.toLowerCase();var i=this.config.items.filter(function(t){return e.config.searchFields.some(function(e){if(e=t[e]){var i=(e=e.toLowerCase()).split(" ");return i.push(e),i.some(function(t){return n.some(function(e){return!t.indexOf(e)})})}})});this._renderList(i),0===i.length&&"string"==typeof this.config.serverSearch.url&&this._searchServer(n)}else this._renderList(data)}},{key:"_searchServer",value:function(t){var e,n=this,i=this.config.serverSearch,r=i.url,o=i.fields,s=i.paramNameQuery,l=i.paramNameFields,c=i.loadingText;this._renderMessage(c),fetch(r,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify((e={},a(e,s,t),a(e,l,o),e))}).then(function(t){return 200===t.status&&t.json()}).then(function(t){t&&n._renderList(t)})}},{key:"_showInput",value:function(){this.elements.input.style.display="block"}},{key:"_hideInput",value:function(){this.elements.input.style.display="none"}},{key:"_updateSubmitInput",value:function(){this.elements.hidden.value=this.selected.join(",")}},{key:"_highlightElement",value:function(t){t.classList.add(this.config.classNames.listItemHighlight)}},{key:"_unhighlightElement",value:function(t){t.classList.remove(this.config.classNames.listItemHighlight)}},{key:"_unhighlightAll",value:function(){var t=this,e=this.elements.list.children;[].concat(l(e)).forEach(function(e){e.classList.contains(t.config.classNames.listItemHighlight)&&t._unhighlightElement(e)})}},{key:"_scrollToElem",value:function(t,e){var n=this.elements.list,i=t.offsetTop,r=t.offsetTop+t.offsetHeight,o=this.elements.list.scrollTop,s=this.elements.list.offsetHeight;e>0&&r>s?n.scrollTop=r-s:e<0&&s+i<s+o&&(n.scrollTop=i)}}]),t}();t.exports=c},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},r=e.getType=function(t){return Object.prototype.toString.call(t).slice(8,-1).toLowerCase()},o=e.isType=function(t,e){var n=r(e);return void 0!==e&&null!==e&&n===t.toLowerCase()};e.strToEl=function(t){var e=document.createElement("div");return e.innerHTML=t.trim(),e.firstChild},e.runCallback=function(t,e){o("function",t)&&t.call(e)},e.hasClass=function(t,e){if("object"===(void 0===t?"undefined":i(t))||"string"==typeof e)return t.classList.contains(e)},e.extend=function t(){for(var e=arguments.length,n=Array(e),i=0;i<e;i++)n[i]=arguments[i];var r={};return n.forEach(function(e){o("Object",e)&&function(e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(o("Object",e[n])?r[n]=t(!0,r[n],e[n]):r[n]=e[n])}(e)}),r},e.translit=function(t){var e={ru:"щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g),en:"shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g),ruBad:"o i x w . z \\ ; ] s ' f , d u l t p b q r k v y j g h c n e a [ m".split(/ +/g)},n=[];return t=t.toLowerCase(),[["ru","en"],["en","ru"],["ruBad","ru"],["ru","ruBad"],["ru","ruBad","en","ru"],["ruBad","ru","ru","en"]].forEach(function(i){for(var r=t,o=0;o<i.length;o+=2)for(var s=e[i[o]],a=e[i[o+1]],l=0,c=e.ru.length;l<c;l++)r=r.split(s[l]).join(a[l]);n.push(r)}),n}},function(t,e,n){"use strict";(function(e){var n=setTimeout;function i(){}function r(t){if(!(this instanceof r))throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],c(t,this)}function o(t,e){for(;3===t._state;)t=t._value;0!==t._state?(t._handled=!0,r._immediateFn(function(){var n=1===t._state?e.onFulfilled:e.onRejected;if(null!==n){var i;try{i=n(t._value)}catch(t){return void a(e.promise,t)}s(e.promise,i)}else(1===t._state?s:a)(e.promise,t._value)})):t._deferreds.push(e)}function s(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var n=e.then;if(e instanceof r)return t._state=3,t._value=e,void l(t);if("function"==typeof n)return void c((i=n,o=e,function(){i.apply(o,arguments)}),t)}t._state=1,t._value=e,l(t)}catch(e){a(t,e)}var i,o}function a(t,e){t._state=2,t._value=e,l(t)}function l(t){2===t._state&&0===t._deferreds.length&&r._immediateFn(function(){t._handled||r._unhandledRejectionFn(t._value)});for(var e=0,n=t._deferreds.length;e<n;e++)o(t,t._deferreds[e]);t._deferreds=null}function c(t,e){var n=!1;try{t(function(t){n||(n=!0,s(e,t))},function(t){n||(n=!0,a(e,t))})}catch(t){if(n)return;n=!0,a(e,t)}}r.prototype.catch=function(t){return this.then(null,t)},r.prototype.then=function(t,e){var n=new this.constructor(i);return o(this,new function(t,e,n){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=n}(t,e,n)),n},r.prototype.finally=function(t){var e=this.constructor;return this.then(function(n){return e.resolve(t()).then(function(){return n})},function(n){return e.resolve(t()).then(function(){return e.reject(n)})})},r.all=function(t){return new r(function(e,n){if(!t||void 0===t.length)throw new TypeError("Promise.all accepts an array");var i=Array.prototype.slice.call(t);if(0===i.length)return e([]);var r=i.length;function o(t,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var a=s.then;if("function"==typeof a)return void a.call(s,function(e){o(t,e)},n)}i[t]=s,0==--r&&e(i)}catch(t){n(t)}}for(var s=0;s<i.length;s++)o(s,i[s])})},r.resolve=function(t){return t&&"object"==typeof t&&t.constructor===r?t:new r(function(e){e(t)})},r.reject=function(t){return new r(function(e,n){n(t)})},r.race=function(t){return new r(function(e,n){for(var i=0,r=t.length;i<r;i++)t[i].then(e,n)})},r._immediateFn="function"==typeof e&&function(t){e(t)}||function(t){n(t,0)},r._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},t.exports=r}).call(e,n(4).setImmediate)},function(t,e,n){(function(t){var i=void 0!==t&&t||"undefined"!=typeof self&&self||window,r=Function.prototype.apply;function o(t,e){this._id=t,this._clearFn=e}e.setTimeout=function(){return new o(r.call(setTimeout,i,arguments),clearTimeout)},e.setInterval=function(){return new o(r.call(setInterval,i,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t&&t.close()},o.prototype.unref=o.prototype.ref=function(){},o.prototype.close=function(){this._clearFn.call(i,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},n(5),e.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==t&&t.setImmediate||this&&this.setImmediate,e.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==t&&t.clearImmediate||this&&this.clearImmediate}).call(e,n(0))},function(t,e,n){(function(t,e){!function(t,n){"use strict";if(!t.setImmediate){var i,r,o,s,a,l=1,c={},u=!1,h=t.document,f=Object.getPrototypeOf&&Object.getPrototypeOf(t);f=f&&f.setTimeout?f:t,"[object process]"==={}.toString.call(t.process)?i=function(t){e.nextTick(function(){p(t)})}:!function(){if(t.postMessage&&!t.importScripts){var e=!0,n=t.onmessage;return t.onmessage=function(){e=!1},t.postMessage("","*"),t.onmessage=n,e}}()?t.MessageChannel?((o=new MessageChannel).port1.onmessage=function(t){p(t.data)},i=function(t){o.port2.postMessage(t)}):h&&"onreadystatechange"in h.createElement("script")?(r=h.documentElement,i=function(t){var e=h.createElement("script");e.onreadystatechange=function(){p(t),e.onreadystatechange=null,r.removeChild(e),e=null},r.appendChild(e)}):i=function(t){setTimeout(p,0,t)}:(s="setImmediate$"+Math.random()+"$",a=function(e){e.source===t&&"string"==typeof e.data&&0===e.data.indexOf(s)&&p(+e.data.slice(s.length))},t.addEventListener?t.addEventListener("message",a,!1):t.attachEvent("onmessage",a),i=function(e){t.postMessage(s+e,"*")}),f.setImmediate=function(t){"function"!=typeof t&&(t=new Function(""+t));for(var e=new Array(arguments.length-1),n=0;n<e.length;n++)e[n]=arguments[n+1];var r={callback:t,args:e};return c[l]=r,i(l),l++},f.clearImmediate=d}function d(t){delete c[t]}function p(t){if(u)setTimeout(p,0,t);else{var e=c[t];if(e){u=!0;try{!function(t){var e=t.callback,i=t.args;switch(i.length){case 0:e();break;case 1:e(i[0]);break;case 2:e(i[0],i[1]);break;case 3:e(i[0],i[1],i[2]);break;default:e.apply(n,i)}}(e)}finally{d(t),u=!1}}}}}("undefined"==typeof self?void 0===t?this:t:self)}).call(e,n(0),n(6))},function(t,e){var n,i,r=t.exports={};function o(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(t){if(n===setTimeout)return setTimeout(t,0);if((n===o||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:o}catch(t){n=o}try{i="function"==typeof clearTimeout?clearTimeout:s}catch(t){i=s}}();var l,c=[],u=!1,h=-1;function f(){u&&l&&(u=!1,l.length?c=l.concat(c):h=-1,c.length&&d())}function d(){if(!u){var t=a(f);u=!0;for(var e=c.length;e;){for(l=c,c=[];++h<e;)l&&l[h].run();h=-1,e=c.length}l=null,u=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===s||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function p(t,e){this.fun=t,this.array=e}function m(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];c.push(new p(t,e)),1!==c.length||u||a(d)},p.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=m,r.addListener=m,r.once=m,r.off=m,r.removeListener=m,r.removeAllListeners=m,r.emit=m,r.prependListener=m,r.prependOnceListener=m,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}},function(t,e){!function(t){"use strict";if(!t.fetch){var e={searchParams:"URLSearchParams"in t,iterable:"Symbol"in t&&"iterator"in Symbol,blob:"FileReader"in t&&"Blob"in t&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in t,arrayBuffer:"ArrayBuffer"in t};if(e.arrayBuffer)var n=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],i=function(t){return t&&DataView.prototype.isPrototypeOf(t)},r=ArrayBuffer.isView||function(t){return t&&n.indexOf(Object.prototype.toString.call(t))>-1};u.prototype.append=function(t,e){t=a(t),e=l(e);var n=this.map[t];this.map[t]=n?n+","+e:e},u.prototype.delete=function(t){delete this.map[a(t)]},u.prototype.get=function(t){return t=a(t),this.has(t)?this.map[t]:null},u.prototype.has=function(t){return this.map.hasOwnProperty(a(t))},u.prototype.set=function(t,e){this.map[a(t)]=l(e)},u.prototype.forEach=function(t,e){for(var n in this.map)this.map.hasOwnProperty(n)&&t.call(e,this.map[n],n,this)},u.prototype.keys=function(){var t=[];return this.forEach(function(e,n){t.push(n)}),c(t)},u.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),c(t)},u.prototype.entries=function(){var t=[];return this.forEach(function(e,n){t.push([n,e])}),c(t)},e.iterable&&(u.prototype[Symbol.iterator]=u.prototype.entries);var o=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];y.prototype.clone=function(){return new y(this,{body:this._bodyInit})},m.call(y.prototype),m.call(g.prototype),g.prototype.clone=function(){return new g(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new u(this.headers),url:this.url})},g.error=function(){var t=new g(null,{status:0,statusText:""});return t.type="error",t};var s=[301,302,303,307,308];g.redirect=function(t,e){if(-1===s.indexOf(e))throw new RangeError("Invalid status code");return new g(null,{status:e,headers:{location:t}})},t.Headers=u,t.Request=y,t.Response=g,t.fetch=function(t,n){return new Promise(function(i,r){var o=new y(t,n),s=new XMLHttpRequest;s.onload=function(){var t,e,n={status:s.status,statusText:s.statusText,headers:(t=s.getAllResponseHeaders()||"",e=new u,t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var n=t.split(":"),i=n.shift().trim();if(i){var r=n.join(":").trim();e.append(i,r)}}),e)};n.url="responseURL"in s?s.responseURL:n.headers.get("X-Request-URL");var r="response"in s?s.response:s.responseText;i(new g(r,n))},s.onerror=function(){r(new TypeError("Network request failed"))},s.ontimeout=function(){r(new TypeError("Network request failed"))},s.open(o.method,o.url,!0),"include"===o.credentials?s.withCredentials=!0:"omit"===o.credentials&&(s.withCredentials=!1),"responseType"in s&&e.blob&&(s.responseType="blob"),o.headers.forEach(function(t,e){s.setRequestHeader(e,t)}),s.send(void 0===o._bodyInit?null:o._bodyInit)})},t.fetch.polyfill=!0}function a(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function l(t){return"string"!=typeof t&&(t=String(t)),t}function c(t){var n={next:function(){var e=t.shift();return{done:void 0===e,value:e}}};return e.iterable&&(n[Symbol.iterator]=function(){return n}),n}function u(t){this.map={},t instanceof u?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function h(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function f(t){return new Promise(function(e,n){t.onload=function(){e(t.result)},t.onerror=function(){n(t.error)}})}function d(t){var e=new FileReader,n=f(e);return e.readAsArrayBuffer(t),n}function p(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function m(){return this.bodyUsed=!1,this._initBody=function(t){if(this._bodyInit=t,t)if("string"==typeof t)this._bodyText=t;else if(e.blob&&Blob.prototype.isPrototypeOf(t))this._bodyBlob=t;else if(e.formData&&FormData.prototype.isPrototypeOf(t))this._bodyFormData=t;else if(e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t))this._bodyText=t.toString();else if(e.arrayBuffer&&e.blob&&i(t))this._bodyArrayBuffer=p(t.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer]);else{if(!e.arrayBuffer||!ArrayBuffer.prototype.isPrototypeOf(t)&&!r(t))throw new Error("unsupported BodyInit type");this._bodyArrayBuffer=p(t)}else this._bodyText="";this.headers.get("content-type")||("string"==typeof t?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):e.searchParams&&URLSearchParams.prototype.isPrototypeOf(t)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},e.blob&&(this.blob=function(){var t=h(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?h(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(d)}),this.text=function(){var t,e,n,i=h(this);if(i)return i;if(this._bodyBlob)return t=this._bodyBlob,e=new FileReader,n=f(e),e.readAsText(t),n;if(this._bodyArrayBuffer)return Promise.resolve(function(t){for(var e=new Uint8Array(t),n=new Array(e.length),i=0;i<e.length;i++)n[i]=String.fromCharCode(e[i]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},e.formData&&(this.formData=function(){return this.text().then(v)}),this.json=function(){return this.text().then(JSON.parse)},this}function y(t,e){var n,i,r=(e=e||{}).body;if(t instanceof y){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new u(t.headers)),this.method=t.method,this.mode=t.mode,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"omit",!e.headers&&this.headers||(this.headers=new u(e.headers)),this.method=(n=e.method||this.method||"GET",i=n.toUpperCase(),o.indexOf(i)>-1?i:n),this.mode=e.mode||this.mode||null,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function v(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var n=t.split("="),i=n.shift().replace(/\+/g," "),r=n.join("=").replace(/\+/g," ");e.append(decodeURIComponent(i),decodeURIComponent(r))}}),e}function g(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new u(e.headers),this.url=e.url||"",this._initBody(t)}}("undefined"!=typeof self?self:this)},function(t,e,n){"use strict";var i;[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(t){t.hasOwnProperty("append")||Object.defineProperty(t,"append",{configurable:!0,enumerable:!0,writable:!0,value:function(){var t=Array.prototype.slice.call(arguments),e=document.createDocumentFragment();t.forEach(function(t){var n=t instanceof Node;e.appendChild(n?t:document.createTextNode(String(t)))}),this.appendChild(e)}})}),[Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(t){t.hasOwnProperty("prepend")||Object.defineProperty(t,"prepend",{configurable:!0,enumerable:!0,writable:!0,value:function(){var t=Array.prototype.slice.call(arguments),e=document.createDocumentFragment();t.forEach(function(t){var n=t instanceof Node;e.appendChild(n?t:document.createTextNode(String(t)))}),this.insertBefore(e,this.firstChild)}})}),(i=Element.prototype).closest=i.closest||function(t){for(var e=this;e;){if(e.matches(t))return e;e=e.parentElement}return null},function(t){var e=t.matches||t.matchesSelector||t.webkitMatchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector;t.matches=t.matchesSelector=e||function(t){var e=document.querySelectorAll(t),n=this;return Array.prototype.some.call(e,function(t){return t===n})}}(Element.prototype),Array.from||(Array.from=function(t){return[].slice.call(t)})}]);