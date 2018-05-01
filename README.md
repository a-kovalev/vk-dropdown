# Dropdown UI

## Usage

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8" />
    <title>Dropdown</title>
    <link rel="stylesheet" type="text/css" href="dropdown.min.css" />
</head>
<body>
    <div id="drdw"></div>
    <script type="text/javascript" src="dropdown.min.js"></script>
    <script>
        const data = [{...}];
        const dropdown = new Dropdown("#drdw", { 
            data: data,
            // options
        });
    </script>
</body>
</html>
```


## Options

<table width="100%">
	<tr>
		<th valign="top" width="120px" align="left">Параметр</th>
		<th valign="top" align="left">Описание</th>
		<th valign="top" width="60px" align="left">Тип</th>
		<th valign="top" width="60px" align="left">По умолчанию</th>
	</tr>
	<tr>
		<td valign="top"><code>items</code></td>
		<td valign="top">Исходный массив объектов</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>singleItem</code></td>
		<td valign="top">Выбор только одного элемента из списка</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>inputHiddenName</code></td>
		<td valign="top">Имя hidden поля, которое хранит id выбранных пользователей.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"dropdown"</code></td>
	</tr>
	<tr>
		<td valign="top"><code>searchFields</code></td>
		<td valign="top">Список полей, по которым будет проходить поиск</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>['name']</code></td>
	</tr>
	<tr>
		<td valign="top"><code>searchPlaceholder</code></td>
		<td valign="top">Placeholder на поле ввода</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"Введите имя друга или email"</code></td>
	</tr>
	<tr>
		<td valign="top"><code>noResultsText</code></td>
		<td valign="top">Сообщение, при пустом результате поиска</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"Пользователь не найден"</code></td>
	</tr>
		<tr>
		<td valign="top"><code>templateListItem</code></td>
		<td valign="top">Шаблон вывода элемента списка</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code></code></td>
	</tr>
		<tr>
		<td valign="top"><code>templateSelectedItem</code></td>
		<td valign="top">Шаблон вывода выбранного элемента</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code></code></td>
	</tr>
	<tr>
		<td valign="top"><code>serverSearch</code></td>
		<td valign="top">
			Настройки поиска на сервере:
			<table width="100%">
				<tr>
					<th valign="top" width="120px" align="left">Параметр</th>
					<th valign="top" align="left">Описание</th>
					<th valign="top" width="60px" align="left">Тип</th>
					<th valign="top" width="60px" align="left">По умолчанию</th>
				</tr>
				<tr>
					<td valign="top"><code>url</code></td>
					<td valign="top">API url</td>
					<td valign="top">string</td>
					<td valign="top">null</td>
				</tr>
				<tr>
					<td valign="top"><code>fields</code></td>
					<td valign="top">Список полей, по которым будет проходить поиск</td>
					<td valign="top">array</td>
					<td valign="top">[]</td>
				</tr>
				<tr>
					<td valign="top"><code>paramNameQuery</code></td>
					<td valign="top">Поле, в котором передается строка запроса</td>
					<td valign="top">string</td>
					<td valign="top">'q'</td>
				</tr>
				<tr>
					<td valign="top"><code>paramNameFields</code></td>
					<td valign="top">Поле, в котором передается массив полей для поиска</td>
					<td valign="top">string</td>
					<td valign="top">'fields'</td>
				</tr>
				<tr>
					<td valign="top"><code>loadingText</code></td>
					<td valign="top"></td>
					<td valign="top">string</td>
					<td valign="top">'Загрузка...'</td>
				</tr>
			</table>
		</td>
		<td valign="top"><code>object</code></td>
		<td valign="top"></td>
	</tr>
</table>


### Custom Builds

```
npm install
gulp
gulp build
gulp clean
```