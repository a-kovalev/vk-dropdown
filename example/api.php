<?php
	$dataString = file_get_contents("./data.json");
	$data = json_decode($dataString, true);

	if(empty($_GET['q']) || empty($_GET['fields'])) {
		$allowedFields = array('id', 'name', 'avatar');
		$result = array();
		
		foreach ($data as $i => $item) {
			foreach ($item as $field => $value) {
				if (in_array($field, $allowedFields)) {
					$result[$i][$field] = $value;
				}
			}
		}

		echo json_encode($result);
		exit;
	}

	$query = explode("--", $_GET['q']);
	$fields = explode("--", $_GET['fields']);


	$result = array_filter($data, function($item) {
		global $query, $fields;
		$findResult = false;

		if(!$findResult) {
			foreach ($query as $q) {
				foreach ($fields as $field) {	
					$f = strpos(mb_strtolower($item[$field]), mb_strtolower($q));
			
					if($f === 0) {
						$findResult = true;
					}
				}
			}
		}

		return $findResult;
	});

	echo json_encode(array_values($result));
?>