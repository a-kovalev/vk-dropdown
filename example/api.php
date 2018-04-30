<?php
	$rest_json = file_get_contents("php://input");
	$_POST = json_decode($rest_json, true);

	if(isset($_POST['q']) && isset($_POST['fields'])) {
		$json = @file_get_contents("./data/server.json");
		$data = json_decode($json, true);

		if($json === FALSE) {
			exit;
		}

		$result = array_filter($data, function($item) {
			$findResult = false;

			foreach ($_POST['q'] as $q) {
				foreach ($_POST['fields'] as $field) {	
					$f = strpos(mb_strtolower($item[$field]), mb_strtolower($q));

					if($f === 0) {
						$findResult = true;
					}
				}
			}

			return $findResult;
		});

		echo json_encode(array_values($result));
	}
?>