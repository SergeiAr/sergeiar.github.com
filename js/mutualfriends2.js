VK.api("users.get", {fields:"photo_50"}, function(data) {
    // Действия с полученными данными
	  if (data.response) {
  // data.response is object
  
	var api_result = JSON.parse($_GET('data'));
	alert(api_result);
	$('.photo_result_api').html('<img src="' + api_result.response[0].photo_50 + '" alt="" class="img-responsive">');
	  }
}); 