// параметры переданные через get будут обработаны тут
function $_GET(key) { return decodeURIComponent(window.location.search.match(new RegExp(key + '=([^&=]+)'))[1]); }
document.onkeyup = function (e) {
	e = e || window.event;
	if (e.keyCode === 13) {
		ClickAdd();
	}
	// Отменяем действие браузера
	return false;
}
function invite() {
	VK.callMethod('showInviteBox');
}

VK.api("users.get", {fields:"photo_50"}, function(data) {
    // Действия с полученными данными
	  if (data.response) {
  // data.response is object
  
	var api_result = JSON.parse($_GET('data'));
	alert(api_result);
	$('.photo_result_api').html('<img src="' + api_result.response[0].photo_50 + '" alt="" class="img-responsive">');
	  }
}); 