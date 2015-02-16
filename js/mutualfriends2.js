var user_ids =  [];
var user_ids_type =  [];
var friends = [];
var user_ids_count = [];
var count = 0;

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
function ClickAdd() {
	Add(document.getElementById('inputUser').value);
}
function invite() {
	VK.callMethod('showInviteBox');
}
function wall() {
	VK.api('wall.post', {message: 'Просмотр общих друзей и подписчиков у любых людей и сообществ! https://vk.com/app4236781', attachments: 'photo33610634_350256389, https://vk.com/app4236781'}, function(data) {

	});
}
// получаем результат первого запроса к api
var api_result = JSON.parse($_GET('api_result'));
$('.photo_result_api').html('<img src="' + api_result.response[0].photo_50 + '" alt="" class="img-responsive">');
$('.name_result_api').html('<strong>' + api_result.response[0].first_name + ' ' + api_result.response[0].last_name + '</strong><small>Это вы, чтобы добавить себя в список нажмите "+"</small>');
$('.add_result_api').html('<a onclick="Add(\'id' + api_result.response[0].uid + '\');" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></a>');

