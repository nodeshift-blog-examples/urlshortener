<?php
require 'vendor/autoload.php';

$route = isset($_SERVER["REQUEST_URI"]) ? $_SERVER["REQUEST_URI"] : "";

if ($route == "/health") {
  echo json_encode(["msg" => "OK"]);
  exit();
}
$MONGO_USER = $_ENV["MONGO_USER"];
$MONGO_PASSWORD = $_ENV["MONGO_PASSWORD"];
$MONGO_SERVER = $_ENV["MONGO_SERVER"];
$MONGO_DB = "urls";
$MONGO_COLLECTION = "routes";

$client = new MongoDB\Client(
    'mongodb://' . $MONGO_USER . ':' . $MONGO_PASSWORD . '@' . $MONGO_SERVER
);
$coll = $client->$MONGO_DB->$MONGO_COLLECTION;

// $coll->insert($document);
$result = $coll->findOne([ "route" => $route ]);

if ($result != null) {
  header("Location: ".$result["url"]);
  exit();
}
?>
No matching URL found for <? echo $route ?>