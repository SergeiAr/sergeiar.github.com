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

function Add(user_id) {
	count = 0;
	friends = [];
	if (user_id.indexOf("com/") >= 0)
		user_id = user_id.split('com/')[1];
	VK.api('utils.resolveScreenName', {screen_name: user_id, v: '5.27'}, function(r) {
		if(r.response) {
			if (r.response.type == 'user') {
				AddUser(user_id);
			} else {
				if (r.response.type == 'group') {
					getMembers(user_id);
				} else {
					WriteError('Неверно указана ссылка!');
				}
			}
		}
	});	
}



function AddUser(user_id) {
	var grup = -85071256;
	VK.api('wall.get', {owner_id:'-85071256', count:'50', filter:'others', v: '5.28'}, function(r) {
		alert("hello");
			if(r.response) {
				
				alert("hello2");
			alert(r.response);
					 console.log(r.response.items); 
					$('#profiles').append(''
								+ '<li class="c-list user' + r.response.items[0].id + ' pulse animated">'
									+ '<div class="contact-pic">'
										+ '<a href="#"><img src="' + r.response.items[0].from_id + '" alt="" class="img-responsive"/></a>'
									+ '</div>'
									+ '<div class="contact-details">'
										+ '<div class="pull-left">'
											+ '<strong>' + r.response.items[0].owner_id, + ' ' + r.response.items[0].date + '</strong>'
											+ '<small>ID' + r.response.items[0].text + '</small>'
										+ '</div>'
										+ '<div class="pull-right">'
											+ '<a href="http://vk.com/id' + r.response.items[0].id + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>'
											+ '<a onclick="Del(' + r.response.items[0].id + ');" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>'
										+ '</div>'
										+ '<div class="clearfix"></div>'
									+ '</div>'
								+ '</li>');
					document.getElementById('errorL').innerHTML = '';
					
					
				
				
			} else {
				WriteError('Неверно указана ссылка!');
			}
	});
}



// получаем информацию о группе и её участников
function getMembers(group_id) {
	VK.api('groups.getById', {group_id: group_id, fields: 'photo_50,members_count', v: '5.27'}, function(r) {
		if(r.response) {
			if (user_ids.join().indexOf(r.response[0].id) >= 0)
			{
				WriteError('Группа уже добавлена!');
			} else {
					user_ids_type[user_ids.length] = 'group';
					user_ids[user_ids.length] = r.response[0].id;
					user_ids_count[user_ids_count.length] = r.response[0].members_count;
					$('#profiles').append(''
								+ '<li class="c-list user' + r.response[0].id + ' pulse animated">'
									+ '<div class="contact-pic">'
										+ '<a href="#"><img src="' + r.response[0].photo_50 + '" alt="" class="img-responsive"/></a>'
									+ '</div>'
									+ '<div class="contact-details">'
										+ '<div class="pull-left">'
											+ '<strong>' + r.response[0].name + '</strong>'
											+ '<small>CLUB' + r.response[0].id + '</small>'
										+ '</div>'
										+ '<div class="pull-right">'
											+ '<a href="http://vk.com/' + r.response[0].screen_name + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>'
											+ '<a onclick="Del(' + r.response[0].id + ');" class="btn btn-warning btn-xs"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a>'
										+ '</div>'
										+ '<div class="clearfix"></div>'
									+ '</div>'
								+ '</li>');
					document.getElementById('errorL').innerHTML = '';
					document.getElementById('prof_count').innerHTML = user_ids.length + ' Профилей';
					if (user_ids.length > 1) {
						GetFriend();
						document.getElementById('friends').innerHTML = ''
								+ '<li class="contact-alpha">'
									+ 'Общего <span class="label label-info pull-right">0</span>'
									+ '<div class="clearfix"></div>'
								+ '</li>'
									+ '<div class="progress progress-striped active">'
									  + '<div id="progress" class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%">'
										+ '<span class="sr-only">0% Complete</span>'
									 + '</div>'
									+ '</div>'
								+ '<div class="errorL">Пожалуйста подождите...</div>';
					}
					else
						document.getElementById('friends').innerHTML = ''
								+ '<li class="contact-alpha">'
									+ 'Общие друзья <span class="label label-info pull-right">0 Общих друзей</span>'
									+ '<div class="clearfix"></div>'
								+ '</li><div class="errorL">Добавьте еще профилей для поиска общих друзей!</div>';
				//getMembers20k(group_id, r.response[0].members_count); // получем участников группы и пишем в массив membersGroups
			}
		}
	});
}
