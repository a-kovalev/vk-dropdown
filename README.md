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
        const dropdown = new Dropdown("selector", { 
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
		<td valign="top"><code>data</code></td>
		<td valign="top">Исходный массив объектов [Обязательный параметр!]</td>
		<td valign="top"><code>array</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
	<tr>
		<td valign="top"><code>avatar</code></td>
		<td valign="top">Показ аватарок пользователей</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>true</code></td>
	</tr>
	<tr>
		<td valign="top"><code>singleItem</code></td>
		<td valign="top">Выбор одного элемента из списка</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
	<tr>
		<td valign="top"><code>placeholder</code></td>
		<td valign="top">Placeholder на поле поиска</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"Введите имя друга или email"</code></td>
	</tr>
	<tr>
		<td valign="top"><code>inputName</code></td>
		<td valign="top">Имя hidden поля. При сабмите формы содержит ID выбранных юзеров.</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"dropdown"</code></td>
	</tr>
	<tr>
		<td valign="top"><code>serverSearch</code></td>
		<td valign="top">
			Настройки поиска на сервере
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