const Dropdown = (function() {
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
		const elem = document.createElement(type);
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
		if(typeof el !== "object" && typeof className !== "string") return;
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

		const ru = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(/ +/g);
		const en = "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g);
		const ruBad = "o i x w . z \\ ; ] s ' f , d u l t p b q r k v y j g h c n e a [ m".split(/ +/g);

		switch (type) {
			case 'ru2en':
				for (let i = 0; i < ru.length; i++) {
					text = text.split(ru[i]).join(en[i]);
				}

				return text;

			case 'en2ru':
				for (let i = 0; i < ru.length; i++) {
					text = text.split(en[i]).join(ru[i]);
				}

				return text;

			case 'enBad2ru':
				for (let i = 0; i < ru.length; i++) {
					text = text.split(ruBad[i]).join(ru[i]);
				}

				return text;

			case 'ruBad2en2ru':
				for (let i = 0; i < ru.length; i++) {
					text = text.split(ru[i]).join(ruBad[i]);
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
	class Dropdown {
		constructor(elem, settings = {}) {
			if(typeof elem === "string") {
				const elements = document.querySelectorAll(elem);

				if(elements.length === 0) {
					console.error(`Dropdown: Селектор ${ elem } не найден!`);
					return false;
				}

				if (elements.length > 1) {
					for (let i = 1; i < elements.length; i++) {
						new Dropdown(elements[i], settings);
					}
				}
			}

			const config = {
				avatar: true,
				data: null,
				singleItem: false,
				placeholder: "Введите имя друга или email",
				inputName: "dropdown"
			}

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

		_init() {
			this._createLayout();
			this._render();
			this._renderList();
			this._addEventListeners();
		}

		_createLayout() {
			const elements = this.elements;

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

		_createItem(item) {
			let element, span;

			if(item) {
				element = createElement('li', 'dropdown__item');
				span = createElement('span', 'dropdown__name', item.name);
				
				element.setAttribute("data-id", item.id);

				if(this.options.avatar) {
					const avatar = createElement('img', 'dropdown__avatar');
					avatar.setAttribute('src', item.avatar);
					element.appendChild(avatar);
				}

				element.appendChild(span);
			} else {
				element = createElement('li', 'dropdown__error', "Пользователь не найден");
			}

			return element;
		}

		_createTag(obj) {
			const element = createElement("div", "dropdown__tag", obj.name),	
						button = createElement('button', "dropdown__btn-remove");

			element.setAttribute("data-id", obj.id);
			element.appendChild(button);

			return element;
		}

		_render() {
			const { target, wrapper, head, tags, input, hidden, arrow, addButton, list } = this.elements;

			wrapper.appendChild(head);
			wrapper.appendChild(list);

			head.appendChild(tags);
			head.appendChild(arrow);
			head.appendChild(input);
			head.appendChild(hidden);

			target.appendChild(wrapper);
		}

		_renderList(data = this.options.data) {
			const { list } = this.elements,
						fragment = document.createDocumentFragment();

			list.innerHTML = "";

			data.forEach(item => {
				if(this.selected.indexOf(item.id) >= 0) return;
				const element = this._createItem(item);
				fragment.appendChild(element);
			});

			list.appendChild(fragment);

			if(!list.children.length) {
				const element = this._createItem(false);
				list.appendChild(element);
			}
		}

		_renderTags() {
			const { tags } = this.elements;

			tags.innerHTML = "";

			this.selected.forEach(id => {
				const obj = this.options.data.filter(obj => obj.id == id)[0];
				tags.appendChild(this._createTag(obj));
			});

			if(this.selected.length && !this.options.singleItem) {
				tags.appendChild(this.elements.addButton);
			}
		}

		_selectItem(id) {
			if(this.selected.length === 0) {
				this._hideInput();
			}

			this.elements.input.value = '';
			this.selected.push(id);
			this._renderList();
			this._renderTags();
			this._updateHiddenInput();
		}

		_unselect(id) {
			this.selected = this.selected.filter(obj => obj !== id);
			this._renderList();
			this._renderTags();
			this._updateHiddenInput();

			if(this.selected.length === 0) {
				this._showInput();
			}
		}

		_addEventListeners() {
			const { wrapper, input } = this.elements;
			wrapper.addEventListener("click", this._onClick);
			input.addEventListener("input", this._onChange);
			document.addEventListener("click", this._onClickDocument);
		}

		_onClick(e) {
			let target = e.target,
					item = target.closest(".dropdown__item");
			
			if(item) {
				target = item;
			}

			if(hasClass(target, "dropdown__arrow")) {
				if(hasClass(this.elements.list, "active")) {
					this.hideList();	
				} else {
					this.showList();
				}
			}

			if(hasClass(target, "dropdown__input") || hasClass(target, "dropdown__head") || hasClass(target, "dropdown__tags")) {
				this.showList();
			}

			if(item) {
				const id = +target.getAttribute("data-id");
				this._selectItem(id);
				this.hideList();
			}

			if(hasClass(target, "dropdown__btn-remove")) {
				const element = target.closest(".dropdown__tag");
				const id = +element.getAttribute('data-id');
				this._unselect(id);
			}

			if(hasClass(target, "dropdown__add-button")) {
				this.showList();
			}
		}

		_onClickDocument(e) {
			const { wrapper } = this.elements,
						isClickInside = wrapper.contains(e.target);

			if (!isClickInside) {
				this.hideList();
			}
		}

		_onChange(e) {
			this._filterList(e.target.value);
		}

		_showInput() {
			this.elements.input.style.display = "block";

			if(!this.options.singleItem) {
				this.elements.addButton.style.display = "none";
			}
		}

		_hideInput() {
			this.elements.input.style.display = "none";

			if(!this.options.singleItem) {
				this.elements.addButton.style.display = "inline-block";
			}
		}

		_updateHiddenInput() {
			this.elements.hidden.value = this.selected.join(",");
		}

		_filterList(input) {
			if(input === "") {
				this._renderList(data);
				return;
			}

			const { data } = this.options,
						search = input.toLowerCase(),
						qRu2en = translit(search, 'ru2en'),
						qEn2ru = translit(search, 'en2ru'),
						qEnBad2ru = translit(search, 'enBad2ru'),
						qRuBad2en2ru = translit(search, 'ruBad2en2ru');

			const result = data.filter((item, i) => {
				let fullName = item.name.toLowerCase(),
						nameArr = fullName.split(' '),
						findResult = false;

				findResult = !fullName.indexOf(search) 			 ||
										 !fullName.indexOf(qRu2en) 			 ||
										 !fullName.indexOf(qEn2ru) 			 ||
										 !fullName.indexOf(qEnBad2ru) 	 ||
										 !fullName.indexOf(qRuBad2en2ru);

				if(!findResult) {
					for (let i = 1; i < nameArr.length; i++) {
						const item = nameArr[i];

						findResult = !item.indexOf(search) 		||
												 !item.indexOf(qRu2en) 		||
												 !item.indexOf(qEn2ru) 		||
												 !item.indexOf(qEnBad2ru) ||
												 !item.indexOf(qRuBad2en2ru);

						if(findResult) {
							return findResult;
						}
					};
				}

				return findResult;
			});

			this._renderList(result);
		}

		showList() {
			if(this.options.singleItem && this.selected > 0) return;
			
			const { list, input } = this.elements;
			list.classList.add('active');
			input.focus();

			if(this.selected.length > 0) {
				this._showInput();
			}
		}

		hideList() {
			const { list } = this.elements;
			list.classList.remove('active');

			if(this.selected.length > 0 && this.elements.input.value === "") {
				this._hideInput();
			}
		}
	}

	return Dropdown;
})();