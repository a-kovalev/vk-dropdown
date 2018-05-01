import { strToEl, runCallback, hasClass, extend, translit } from './lib/utils.js';
import 'promise-polyfill';
import 'whatwg-fetch';
import './lib/polyfills.js';

class Dropdown {
  constructor (element, userConfig = {}) {
    if (typeof element === 'string') {
      const elements = document.querySelectorAll(element);

      if (elements.length === 0) {
        console.error(`Dropdown: Селектор ${element} не найден!`);
        return;
      }

      if (elements.length > 1) {
        for (let i = 1; i < elements.length; i++) {
          new Dropdown(elements[i], userConfig);
        }
      }
    }

    const defaultConfig = {
      // Base
      items: [],
      singleItem: false,
      inputHiddenName: 'dropdown',

      // Search
      searchFields: ['name'],
      searchPlaceholder: 'Введите имя друга или email',
      noResultsText: 'Пользователь не найден',

      // Server
      serverSearch: {
        url: null,
        fields: [],
        paramNameQuery: 'q',
        paramNameFields: 'fields',
        loadingText: 'Загрузка...'
      },

      // CSS classes
      classNames: {
        container: 'dropdown',
        head: 'dropdown__head',
        selectedList: 'dropdown__selected',
        selectedItem: 'dropdown__s-item',
        removeButton: 'dropdown__remove-btn',
        addButton: 'dropdown__add-button',
        input: 'dropdown__input',
        arrow: 'dropdown__arrow',
        list: 'dropdown__list',
        listActive: 'dropdown__list_active',
        listItem: 'dropdown__item',
        listItemHighlight: 'dropdown__item_hover',
        message: 'dropdown__message'
      },

      // Render items
      templateListItem: item => {
        return `
          <div class="dropdown__item-inner">
            <span class="dropdown__avatar">
              <img class="dropdown__avatar-img" src="${item.avatar}">
            </span>
            
            <span class="dropdown__name">${item.name}</span>
          </div>
        `;
      },

      templateSelectedItem: item => {
        return item.name;
      },

      // Callbacks
      onInit: null,
      onDestroy: null,
      onShow: null,
      onHide: null,
      onSelect: null,
      onUnselect: null
    };

    this.config = extend(defaultConfig, userConfig);
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    this.elements = {};
    this.initialised = false;
    this.selected = [];

    // Bing
    this._onClick = this._onClick.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onFocus = this._onFocus.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onMouseOver = this._onMouseOver.bind(this);

    // Start
    this.init(this.config.init);
  }

  /************************
   *                      *
   *   Public functions   *
   *                      *
   ************************/

  /**
   * Init
   * @return
   * @public
  */
  init () {
    if (this.initialised === true) {
      return;
    }

    this._initTemplates();
    this._createTemplates();
    this._render();
    this._renderList();
    this._addEventListeners();

    this.initialised = true;

    // Callback
    runCallback(this.config.onInit, this);
  }

  /**
   * Destroy
   * @return
   * @public
  */
  destroy () {
    if (this.initialised === false) {
      return;
    }

    this.element.innerHTML = '';
    this.elements = [];
    this.selected = [];

    this._removeEventListeners();
    this.initialised = false;

    // Callback
    runCallback(this.config.onDestroy, this);
  }

  /**
   * Показать список
   * @return
   * @public
  */
  showList () {
    const { list, input } = this.elements;
    list.classList.add(this.config.classNames.listActive);
    input.focus();

    if (this.selected.length > 0) {
      this._showInput();
    }

    // Callback
    runCallback(this.config.onShow, this);
  }

  /**
   * Скрыть список
   * @return
   * @public
  */
  hideList () {
    const { list } = this.elements;
    list.classList.remove(this.config.classNames.listActive);

    if (this.selected.length > 0) {
      this._hideInput();
    }

    // TODO
    this.elements.input.value = '';
    this._renderList();

    // Callback
    runCallback(this.config.onHide, this);
  }

  /**
   * Выбор элемента
   * @return
   * @public
   */
  selectItem (id) {
    if (this.selected.length === 0) {
      this._hideInput();
    }

    if (!this.config.singleItem) {
      this.selected.push(id);
    } else {
      this.selected[0] = id;
    }

    this._renderList();
    this._renderSelected();
    this._updateSubmitInput();

    // Callback
    runCallback(this.config.onSelect, this);
  }

  /**
   * Отменить выбор
   * @return
   * @private
   */
  unselectItem (id) {
    this.selected = this.selected.filter(obj => obj !== id);
    this._renderList();
    this._renderSelected();
    this._updateSubmitInput();

    if (this.selected.length === 0) {
      this._showInput();
    }

    // Callback
    runCallback(this.config.onUnselect, this);
  }

  /*************************
   *                       *
   *   Private functions   *
   *                       *
   ************************/

  /**
   * Инициализация шаблонов
   * @return
   * @private
   */
  _initTemplates () {
    const { classNames, searchPlaceholder, inputHiddenName, templateListItem, templateSelectedItem } = this.config;

    const templates = {
      container: () => {
        return strToEl(`
          <div class="${classNames.container}"></div>
        `);
      },

      head: () => {
        return strToEl(`
          <div class="${classNames.head}"></div>
        `);
      },

      list: () => {
        return strToEl(`
          <ul class="${classNames.list}"></ul>
        `);
      },

      selectedList: () => {
        return strToEl(`
          <div class="${classNames.selectedList}"></div>
        `);
      },

      input: () => {
        return strToEl(`
          <input type="text" class="${classNames.input}" placeholder="${searchPlaceholder}" />
        `);
      },

      hidden: () => {
        return strToEl(`
          <input type="hidden" name="${inputHiddenName}" />
        `);
      },

      arrow: () => {
        return strToEl(`
          <span class="${classNames.arrow}"></span>
        `);
      },

      addButton: () => {
        return strToEl(`
          <div class="${classNames.addButton}">Добавить</div>
        `);
      },

      message: (text) => {
        return strToEl(`<li class="${classNames.message}">${text}</li>`);
      },

      listItem: (item) => {
        return strToEl(`
          <li class="${classNames.listItem}" data-id="${item.id}">
            ${templateListItem(item)}
          </li>
        `);
      },

      selectedItem: (item) => {
        return strToEl(`
          <div class="${classNames.selectedItem}" data-id="${item.id}">
            ${templateSelectedItem(item)}
            <button class="${classNames.removeButton}"></button>
          </div>
        `);
      }
    };

    this.config.templates = templates;
  }

  /**
   * Получить шаблон по названию
   * @param {String} Название шаблона
   * @param {...} args Аргументы
   * @return {HTMLElement} HTML элемент
   * @private
   */
  _getTemplate (template, ...args) {
    if (!template) {
      return null;
    }

    const templates = this.config.templates;
    return templates[template](...args);
  }

  /**
   * Создание базовой разметки
   * @return
   * @private
   */
  _createTemplates () {
    const templates = ['container', 'head', 'list', 'selectedList', 'input', 'hidden', 'arrow'];

    templates.forEach(item => {
      this.elements[item] = this._getTemplate(item);
    });
  }

  /**
   * Рендер дропдауна
   * @return
   * @private
   */
  _render () {
    const { container, head, list, selectedList, input, hidden, arrow } = this.elements;

    head.appendChild(selectedList);
    head.appendChild(input);
    head.appendChild(hidden);
    head.appendChild(arrow);

    container.appendChild(head);
    container.appendChild(list);

    this.element.appendChild(container);
  }

  /**
   * Вывод списка
   * @return
   * @private
   */
  _renderList (items = this.config.items) {
    const { list } = this.elements;

    list.innerHTML = '';

    items.forEach(item => {
      if (this.selected.indexOf(item.id) >= 0) return;
      const element = this._getTemplate('listItem', item);
      list.append(element);
    });

    if (!list.children.length) {
      this._renderMessage(this.config.noResultsText);
    }
  }

  /**
   * Вывод сообщения в список
   * @return
   * @private
   */
  _renderMessage (message, isClean = true) {
    const { list } = this.elements;
    const element = this._getTemplate('message', message);

    if (isClean) {
      list.innerHTML = '';
    }

    list.prepend(element);
  }

  /**
   * Вывод выбранных элементов
   * @return
   * @private
   */
  _renderSelected () {
    const { selectedList } = this.elements;

    selectedList.innerHTML = '';

    this.selected.forEach(id => {
      const obj = this.config.items.filter(obj => obj.id === id)[0];
      const element = this._getTemplate('selectedItem', obj);
      selectedList.append(element);
    });

    if (this.selected.length && !this.config.singleItem) {
      selectedList.append(this._getTemplate('addButton'));
    }
  }

  /**
   * Назначить обработчики событий
   * @return
   * @private
   */
  _addEventListeners () {
    document.addEventListener('click', this._onClick);
    document.addEventListener('keydown', this._onKeyDown);
    this.elements.input.addEventListener('focus', this._onFocus);
    this.elements.input.addEventListener('input', this._onChange);
    this.elements.list.addEventListener('mouseover', this._onMouseOver);
  }

  /**
   * Удалить обработчики событий
   * @return
   * @private
   */
  _removeEventListeners () {
    document.removeEventListener('click', this._onClick);
    document.removeEventListener('keydown', this._onKeyDown);
    this.elements.input.removeEventListener('focus', this._onFocus);
    this.elements.input.removeEventListener('input', this._onChange);
    this.elements.list.removeEventListener('mouseover', this._onMouseOver);
  }

  /**
   * Обработчики событий
   * @return
   * @private
   */
  _onClick (e) {
    const { container, list } = this.elements;
    const { classNames } = this.config;
    const isDropdown = container.contains(e.target);
    const isActive = list.classList.contains(classNames.listActive);

    if (isDropdown) {
      let target = e.target;
      let item = target.closest(`.${classNames.listItem}`);

      // List item
      if (item) {
        const id = +item.getAttribute('data-id');
        this.selectItem(id);
        this.hideList();
      }

      // Arrow
      if (hasClass(target, classNames.arrow)) {
        if (hasClass(this.elements.list, classNames.listActive)) {
          this.hideList();
        } else {
          if (!isActive) {
            this.showList();
            this.elements.input.focus();
          }
        }
      }

      // Input / Head / SelectedList / addButton
      if (
        hasClass(target, classNames.input) ||
        hasClass(target, classNames.head) ||
        hasClass(target, classNames.selectedList) ||
        hasClass(target, classNames.addButton)
      ) {
        if (!isActive) {
          this.showList();
          this.elements.input.focus();
        }
      }

      // Remove button
      if (hasClass(target, classNames.removeButton)) {
        const element = target.closest(`.${classNames.selectedItem}`);
        const id = +element.getAttribute('data-id');
        this.unselectItem(id);

        if (isActive) {
          this.hideList();
        }
      }
    } else {
      if (isActive) {
        this.hideList();
      }
    }
  }

  _onKeyDown (e) {
    const isActive = this.elements.list.classList.contains(this.config.classNames.listActive);

    if (!isActive) {
      return;
    }

    const onEnter = () => {
      const list = this.elements.list.children;
      [...list].forEach(item => {
        if (item.classList.contains(this.config.classNames.listItemHighlight)) {
          const id = +item.getAttribute('data-id');
          this.selectItem(id);

          if (isActive) {
            this.hideList();
            this.elements.input.blur();
          }
        }
      });
    };

    const onArrowKey = direction => {
      e.preventDefault();

      const list = this.elements.list.children;
      const dir = (direction === 'down' ? 1 : -1);

      let activeItem;

      [...list].forEach((item, i) => {
        if (item.classList.contains(this.config.classNames.listItemHighlight)) {
          this._unhighlightElement(item);

          if (list[i + dir]) {
            activeItem = list[i + dir];
          } else {
            activeItem = list[i];
          }
        }
      });

      if (!activeItem) {
        activeItem = list[0];
      }

      this._highlightElement(activeItem);
      this._scrollToElem(activeItem, dir);
    };

    switch (e.keyCode) {
      case 27: // esc
        if (isActive) {
          this.hideList();
          this.elements.input.blur();
        }
        break;
      case 9: // tab
        this.hideList();
        break;
      case 38: // up
        onArrowKey('up');
        break;
      case 40: // down
        onArrowKey('down');
        break;
      case 13: // enter
        onEnter();
        break;
    }
  }

  _onFocus (e) {
    const isActive = this.elements.list.classList.contains(this.config.classNames.listActive);

    if (!isActive) {
      this.showList();
    }
  }

  _onChange (e) {
    this._searchItems(e.target.value);
  }

  _onMouseOver (e) {
    const item = e.target.closest(`.${this.config.classNames.listItem}`);
    this._unhighlightAll();

    if (item) {
      this._highlightElement(item);
    }
  }

  /**
   * Поиск элементов списка
   * @return
   * @private
   */
  _searchItems (input) {
    if (input === '') {
      this._renderList();
      return;
    }

    // Массив вариантов
    const variants = translit(input);
    input = input.toLowerCase();

    // Client-side
    let result = this.config.items.filter(item => {
      return this.config.searchFields.some(field => {
        field = item[field];

        if (field) {
          field = field.toLowerCase();
          const partField = field.split(' ');
          partField.push(field);

          return partField.some(item => {
            return variants.some(str => !item.indexOf(str));
          });
        }
      });
    });

    this._renderList(result);

    // Server-side
    if (result.length === 0) {
      if (typeof this.config.serverSearch.url === 'string') {
        this._searchServer(variants);
      }
    }
  }

  /**
   * Поиск на стороне сервера
   * @return
   * @private
   */
  _searchServer (variants) {
    const { url, fields, paramNameQuery, paramNameFields, loadingText } = this.config.serverSearch;
    this._renderMessage(loadingText);

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [paramNameQuery]: variants,
        [paramNameFields]: fields
      })
    }).then(response => {
      if (response.status !== 200) {
        return false;
      }

      return response.json();
    }).then(items => {
      if (items) {
        this._renderList(items);
      }
    });
  }

  /**
   * Показать поле ввода
   * @return
   * @private
   */
  _showInput () {
    this.elements.input.style.display = 'block';
  }

  /**
   * Скрыть поле ввода
   * @return
   * @private
   */
  _hideInput () {
    this.elements.input.style.display = 'none';
  }

  /**
   * Обновить input[type="hidden"]
   * @return
   * @private
   */
  _updateSubmitInput () {
    this.elements.hidden.value = this.selected.join(',');
  }

  /**
   * Подсветка акативного элемента
   * @return
   * @private
   */
  _highlightElement (item) {
    item.classList.add(this.config.classNames.listItemHighlight);
  }

  /**
   * Удалить подсветку
   * @return
   * @private
   */
  _unhighlightElement (item) {
    item.classList.remove(this.config.classNames.listItemHighlight);
  }

  /**
   * Удалить подсветку у всех элементов
   * @return
   * @private
   */
  _unhighlightAll () {
    const list = this.elements.list.children;

    [...list].forEach(item => {
      if (item.classList.contains(this.config.classNames.listItemHighlight)) {
        this._unhighlightElement(item);
      }
    });
  }

  /**
   * Прокрутка к элементу
   * @return
   * @private
   */
  _scrollToElem (element, dir) {
    const { list } = this.elements;
    const itemTop = element.offsetTop;
    const itemBottom = element.offsetTop + element.offsetHeight;
    const scrollTop = this.elements.list.scrollTop;
    const listHeight = this.elements.list.offsetHeight;

    if (dir > 0 && itemBottom > listHeight) {
      list.scrollTop = itemBottom - listHeight;
    } else if (dir < 0 && (listHeight + itemTop < listHeight + scrollTop)) {
      list.scrollTop = itemTop;
    }
  }
}

module.exports = Dropdown;
