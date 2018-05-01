/**
 * Получает тип объекта
 * @param {Object} obj Объект, для которого нужно получить тип
 * @return {String}
 */
export const getType = obj => {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

/**
 * Проверяет, соответствует ли объект заданному типу
 * @param  {String} t Проверяемый тип
 * @param  {Object} obj Целевой объект
 * @return {Boolean}
 */
export const isType = (t, obj) => {
  const type = getType(obj);
  return obj !== undefined && obj !== null && type === t.toLowerCase();
};

/**
 * Возвращает HMTL элемент из строки
 * @param {String} str
 * @return {HTMLElement}
 */
export const strToEl = str => {
  const div = document.createElement('div');
  div.innerHTML = str.trim();
  return div.firstChild;
};

/**
 * Запуск callback функции
 * @param {Function} fn
 * @param {Object} context
 * @return
 */
export const runCallback = (fn, context) => {
  if (isType('function', fn)) {
    fn.call(context);
  }
};

/**
 * Проверяет, есть ли данный класс у элемента
 *
 * @param {HTMLElement} HTML элемента на котором проверяем класс
 * @param {string} className Искомый CSS класс
 * @returns {boolean}
 */
export const hasClass = (el, className) => {
  if (typeof el !== 'object' && typeof className !== 'string') return;
  return el.classList.contains(className);
};

/**
 * Слияние объектов
 * @param {Objects}
 * @return {Object} Новый объект
 */
export const extend = (...args) => {
  let extended = {};

  let merge = obj => {
    for (let prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        if (isType('Object', obj[prop])) {
          extended[prop] = extend(true, extended[prop], obj[prop]);
        } else {
          extended[prop] = obj[prop];
        }
      }
    }
  };

  args.forEach(obj => {
    if (isType('Object', obj)) {
      merge(obj);
    }
  });

  return extended;
};

/**
 * Возвращает массив вариантов интерпретации строки
 *
 * @param {String} Исходная строка
 * @returns {Array} Массив вариантов
 */
export const translit = text => {
  const alphabet = {
    ru: 'щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь'.split(/ +/g),
    en: "shh sh ch cz yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f x `".split(/ +/g),
    ruBad: "o i x w . z \\ ; ] s ' f , d u l t p b q r k v y j g h c n e a [ m".split(/ +/g)
  };

  const transforms = [
    ['ru', 'en'],
    ['en', 'ru'],
    ['ruBad', 'ru'],
    ['ru', 'ruBad'],
    ['ru', 'ruBad', 'en', 'ru'],
    ['ruBad', 'ru', 'ru', 'en']
  ];

  const relults = [];
  text = text.toLowerCase();

  transforms.forEach(variant => {
    let res = text;

    for (let i = 0; i < variant.length; i += 2) {
      const from = alphabet[variant[i]],
        to = alphabet[variant[i + 1]];

      for (let i = 0, length = alphabet.ru.length; i < length; i++) {
        res = res.split(from[i]).join(to[i]);
      }
    }

    relults.push(res);
  });

  return relults;
};
