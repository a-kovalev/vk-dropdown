"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Dropdown = function () {
	'use strict';

	/**
  * Создает HTML элемент заданного типа с заданным CSS классом
  *
  * @param {string} type тип создаваемого HTML элемента
  * @param {string} className CSS класс
  * @param {string} [text] текст
  * @returns {HTMLElement} HTML элемент
  */

	function createElement(type, className, text) {
		var elem = document.createElement(type);
		elem.className = className;

		if (text) {
			elem.innerText = text;
		}

		return elem;
	}

	/**
  * Проверяет, есть ли данный класс у элемента
  *
  * @param {HTMLElement} HTML элемента на котором проверяем класс
  * @param {string} className Искомый CSS класс
  * @returns {boolean}
  */
	function hasClass(el, className) {
		if ((typeof el === "undefined" ? "undefined" : _typeof(el)) !== "object" && typeof className !== "string") return;
		return el.classList.contains(className);
	}

	/**
  * Преобразует строку в заданную систему письма [кириллица/латиница].
  * ru2en: "рого -> "rogo"
  * en2ru: "rogo" -> "рого"
  * enBad2ru: "hjuj" -> "рого"
  * ruBad2en2ru: "кщпщ" -> "rogo" -> "рого"
  *
  * @param {string} Исходная строка
  * @param {string} Тип
  * @returns {string} Исправленная строка
  */
	function translit(text, type) {
		if (!type) {
			return text;
		}

		var ru = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g);
		var en = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
		var ruBad = "o i x w . z \\ ; ] s ' f , d u l t p b q r k v y j g h c n e a [ m".split(/ +/g);

		switch (type) {
			case 'ru2en':
				for (var i = 0; i < ru.length; i++) {
					text = text.split(ru[i]).join(en[i]);
				}

				return text;

			case 'en2ru':
				for (var _i = 0; _i < ru.length; _i++) {
					text = text.split(en[_i]).join(ru[_i]);
				}

				return text;

			case 'enBad2ru':
				for (var _i2 = 0; _i2 < ru.length; _i2++) {
					text = text.split(ruBad[_i2]).join(ru[_i2]);
				}

				return text;

			case 'ruBad2en2ru':
				for (var _i3 = 0; _i3 < ru.length; _i3++) {
					text = text.split(ru[_i3]).join(ruBad[_i3]);
				}

				return translit(text, 'en2ru');
		}

		return text;
	}

	/**
  * Dropdown
  * @constructor
  * @param {object} selector -  Селектор целевого элемента
  * @param {object} settings - Пользовательские настройки
  */

	var Dropdown = function () {
		function Dropdown(elem) {
			var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			_classCallCheck(this, Dropdown);

			if (typeof elem === "string") {
				var elements = document.querySelectorAll(elem);

				if (elements.length === 0) {
					console.error("Dropdown: \u0421\u0435\u043B\u0435\u043A\u0442\u043E\u0440 " + elem + " \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D!");
					return false;
				}

				if (elements.length > 1) {
					for (var i = 1; i < elements.length; i++) {
						new Dropdown(elements[i], settings);
					}
				}
			}

			var config = {
				avatar: true,
				data: null,
				singleItem: false,
				placeholder: "Введите имя друга или email",
				inputName: "dropdown",
				serverSearch: {
					url: null,
					fields: []
				}
			};

			this.element = typeof elem === 'string' ? document.querySelector(elem) : elem;
			this.options = Object.assign({}, config, settings);
			this.elements = { target: this.element };
			this.selected = [];

			// Bind
			this._onClick = this._onClick.bind(this);
			this._onChange = this._onChange.bind(this);
			this._onClickDocument = this._onClickDocument.bind(this);

			// Init
			this._init();
		}

		_createClass(Dropdown, [{
			key: "_init",
			value: function _init() {
				this._createLayout();
				this._render();
				this._renderList();
				this._addEventListeners();
			}
		}, {
			key: "_createLayout",
			value: function _createLayout() {
				var elements = this.elements;

				elements.wrapper = createElement('div', 'dropdown');
				elements.head = createElement('div', 'dropdown__head');
				elements.list = createElement('ul', 'dropdown__list');
				elements.tags = createElement('div', 'dropdown__tags');

				// UI input
				elements.input = createElement('input', 'dropdown__input');
				elements.input.setAttribute('placeholder', this.options.placeholder);
				elements.input.setAttribute('type', 'text');

				// Hidden input
				elements.hidden = createElement("input");
				elements.hidden.setAttribute('name', this.options.inputName);
				elements.hidden.setAttribute('type', 'hidden');

				elements.arrow = createElement('span', 'dropdown__arrow');
				elements.addButton = createElement('button', 'dropdown__add-button', "Добавить");
			}
		}, {
			key: "_createItem",
			value: function _createItem(item) {
				var element = void 0,
				    span = void 0;

				if (item) {
					element = createElement('li', 'dropdown__item');
					span = createElement('span', 'dropdown__name', item.name);

					element.setAttribute("data-id", item.id);

					if (this.options.avatar) {
						var avatar = createElement('img', 'dropdown__avatar');
						avatar.setAttribute('src', item.avatar);
						element.appendChild(avatar);
					}

					element.appendChild(span);
				} else {
					element = createElement('li', 'dropdown__error', "Пользователь не найден");
				}

				return element;
			}
		}, {
			key: "_createTag",
			value: function _createTag(obj) {
				var element = createElement("div", "dropdown__tag", obj.name),
				    button = createElement('button', "dropdown__btn-remove");

				element.setAttribute("data-id", obj.id);
				element.appendChild(button);

				return element;
			}
		}, {
			key: "_render",
			value: function _render() {
				var _elements = this.elements,
				    target = _elements.target,
				    wrapper = _elements.wrapper,
				    head = _elements.head,
				    tags = _elements.tags,
				    input = _elements.input,
				    hidden = _elements.hidden,
				    arrow = _elements.arrow,
				    addButton = _elements.addButton,
				    list = _elements.list;


				wrapper.appendChild(head);
				wrapper.appendChild(list);

				head.appendChild(tags);
				head.appendChild(arrow);
				head.appendChild(input);
				head.appendChild(hidden);

				target.appendChild(wrapper);
			}
		}, {
			key: "_renderList",
			value: function _renderList() {
				var _this = this;

				var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.options.data;
				var list = this.elements.list,
				    fragment = document.createDocumentFragment();


				list.innerHTML = "";

				data.forEach(function (item) {
					if (_this.selected.indexOf(item.id) >= 0) return;
					var element = _this._createItem(item);
					fragment.appendChild(element);
				});

				list.appendChild(fragment);

				if (!list.children.length) {
					var element = this._createItem(false);
					list.appendChild(element);
				}
			}
		}, {
			key: "_showListLoader",
			value: function _showListLoader() {
				var list = this.elements.list;

				var element = createElement('li', 'dropdown__error', "Загрузка...");
				list.innerHTML = "";
				list.appendChild(element);
			}
		}, {
			key: "_renderTags",
			value: function _renderTags() {
				var _this2 = this;

				var tags = this.elements.tags;


				tags.innerHTML = "";

				this.selected.forEach(function (id) {
					var obj = _this2.options.data.filter(function (obj) {
						return obj.id == id;
					})[0];
					tags.appendChild(_this2._createTag(obj));
				});

				if (this.selected.length && !this.options.singleItem) {
					tags.appendChild(this.elements.addButton);
				}
			}
		}, {
			key: "_selectItem",
			value: function _selectItem(id) {
				if (this.selected.length === 0) {
					this._hideInput();
				}

				this.elements.input.value = '';
				this.selected.push(id);
				this._renderList();
				this._renderTags();
				this._updateHiddenInput();
			}
		}, {
			key: "_unselect",
			value: function _unselect(id) {
				this.selected = this.selected.filter(function (obj) {
					return obj !== id;
				});
				this._renderList();
				this._renderTags();
				this._updateHiddenInput();

				if (this.selected.length === 0) {
					this._showInput();
				}
			}
		}, {
			key: "_addEventListeners",
			value: function _addEventListeners() {
				var _elements2 = this.elements,
				    wrapper = _elements2.wrapper,
				    input = _elements2.input;

				wrapper.addEventListener("click", this._onClick);
				input.addEventListener("input", this._onChange);
				document.addEventListener("click", this._onClickDocument);
			}
		}, {
			key: "_onClick",
			value: function _onClick(e) {
				var target = e.target,
				    item = target.closest(".dropdown__item");

				if (item) {
					target = item;
				}

				if (hasClass(target, "dropdown__arrow")) {
					if (hasClass(this.elements.list, "active")) {
						this.hideList();
					} else {
						this.showList();
					}
				}

				if (hasClass(target, "dropdown__input") || hasClass(target, "dropdown__head") || hasClass(target, "dropdown__tags")) {
					this.showList();
				}

				if (item) {
					var id = +target.getAttribute("data-id");
					this._selectItem(id);
					this.hideList();
				}

				if (hasClass(target, "dropdown__btn-remove")) {
					var element = target.closest(".dropdown__tag");
					var _id = +element.getAttribute('data-id');
					this._unselect(_id);
				}

				if (hasClass(target, "dropdown__add-button")) {
					this.showList();
				}
			}
		}, {
			key: "_onClickDocument",
			value: function _onClickDocument(e) {
				var wrapper = this.elements.wrapper,
				    isClickInside = wrapper.contains(e.target);


				if (!isClickInside) {
					this.hideList();
				}
			}
		}, {
			key: "_onChange",
			value: function _onChange(e) {
				this._filterList(e.target.value);
			}
		}, {
			key: "_showInput",
			value: function _showInput() {
				this.elements.input.style.display = "block";

				if (!this.options.singleItem) {
					this.elements.addButton.style.display = "none";
				}
			}
		}, {
			key: "_hideInput",
			value: function _hideInput() {
				this.elements.input.style.display = "none";

				if (!this.options.singleItem) {
					this.elements.addButton.style.display = "inline-block";
				}
			}
		}, {
			key: "_updateHiddenInput",
			value: function _updateHiddenInput() {
				this.elements.hidden.value = this.selected.join(",");
			}
		}, {
			key: "_filterList",
			value: function _filterList(input) {
				if (input === "") {
					this._renderList(data);
					return;
				}

				var data = this.options.data,
				    search = input.toLowerCase(),
				    arrStringSearch = [];


				arrStringSearch.push(search, translit(search, 'ru2en'), translit(search, 'en2ru'), translit(search, 'enBad2ru'), translit(search, 'ruBad2en2ru'));

				var result = data.filter(function (item) {
					var fullName = item.name.toLowerCase(),
					    arrNames = fullName.split(' ');

					arrNames.push(fullName);

					return arrNames.some(function (item) {
						return arrStringSearch.some(function (str) {
							return !item.indexOf(str);
						});
					});
				});

				if (result.length === 0) {
					if (typeof this.options.serverSearch.url === "string") {
						var self = this,
						    xhr = new XMLHttpRequest(),
						    query = encodeURIComponent(arrStringSearch.join(",")),
						    fields = encodeURIComponent(this.options.serverSearch.fields.join(",")),
						    params = "q=" + query + "&fields=" + fields;

						xhr.open('GET', "api.php?" + params, true);

						xhr.onloadstart = function () {
							self._showListLoader();
						};

						xhr.onload = function () {
							if (this.status >= 200 && this.status < 400) {
								var _data = JSON.parse(this.response);
								self._renderList(_data);
							}
						};

						xhr.onerror = function (error) {
							console.error(error);
						};

						xhr.send();
						return;
					}
				}

				this._renderList(result);
			}
		}, {
			key: "showList",
			value: function showList() {
				if (this.options.singleItem && this.selected > 0) return;

				var _elements3 = this.elements,
				    list = _elements3.list,
				    input = _elements3.input;

				list.classList.add('active');
				input.focus();

				if (this.selected.length > 0) {
					this._showInput();
				}
			}
		}, {
			key: "hideList",
			value: function hideList() {
				var list = this.elements.list;

				list.classList.remove('active');

				if (this.selected.length > 0 && this.elements.input.value === "") {
					this._hideInput();
				}
			}
		}]);

		return Dropdown;
	}();

	return Dropdown;
}();