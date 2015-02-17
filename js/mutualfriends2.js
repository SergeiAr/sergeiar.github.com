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
	VK.api('wall.post', {message: 'Объявления вашего города. Удобное решение Оставить Объявление У.Р.О.О http://vk.com/app4783055', attachments: 'photo-86833823_354174722, http://vk.com/app4783055'}, function(data) {

	});
}
// получаем результат первого запроса к api
var api_result = JSON.parse($_GET('api_result'));
var usertest = api_result.response[0].uid;
//alert( usertest);
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
var col = 100;
var smesh = 100;
	 for (var j=0; j<col; j++) {
	VK.api('wall.get', {owner_id:'-86833823', count:col ,offset:smesh, filter:'others', v: '5.28'}, function(r) {
		
			if(r.response) {
				
			
		//	alert(r.response.items.length);
					 console.log(r.response.items); 
					 
					 
					
					 
					 for (var i=0; i<r.response.items.length; i++) {
					//	alert(r.response.items[i].from_id);
					
						 if (r.response.items[i].from_id ==  usertest ){
						var html = ''
									+ '<li class="c-list" >'
										+ '<div class="contact-pic">'
											+ '<a href="#"><img src="'+ api_result.response[0].photo_50 + '" alt="" class="img-responsive"/></a>'
										+ '</div>'
										+ '<div class="contact-details">'
											+ '<div class="pull-left">'
												+ '<strong>' +r.response.items[i].text + '</strong>'
												+ '<small>номер: ' +r.response.items[i].id + '</small>'
											+ '</div>'
											+ '<div class="pull-right">'
												+ '<a href="http://vk.com/moreyroo?w=wall-86833823_' +r.response.items[i].id + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>'
											+ '</div>'
											+ '<div class="clearfix"></div>'
										+ '</div>'
									+ '</li>';
						$(html).hide().appendTo("#friends").delay(i * 1000/(i+1)).show("puff");
			

						}
						
					/*	document.getElementById('friends').innerHTML = ''
								+ '<li class="contact-alpha">'
									+ 'Общего <span class="label label-info pull-right">0</span>'
									+ '<div class="clearfix"></div>'
								+ '</li>'
									+ '<div class="progress progress-striped active">'
									  + '<div id="progress" class="progress-bar" role="progressbar" aria-valuenow="'+ i +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ (2/1000)*100 +'%">'
										+ '<span class="sr-only">'+ 2*100 +'% Complete</span>'
									 + '</div>'
									+ '</div>'
								+ '<div class="errorL">Идет загрузка подписчиков группы CLUB'+20+'. <br/>Загружено: '+ 50 + ' из ' + 1000 + ' подписчиков.</div>';
		*/
		}
				/*	$('#profiles').append(''
								+ '<li class="c-list user' + r.response.items[0].id + ' pulse animated">'
									+ '<div class="contact-pic">'
										+ '<a href="#"><img src="' + r.response.items[0].from_id + '" alt="" class="img-responsive"/></a>'
									+ '</div>'
									+ '<div class="contact-details">'
										+ '<div class="pull-left">'
											+ '<strong>' + r.response.items[0].owner_id, + ' ' + r.response.items[0].date + '</strong>'
										
										
										
										
										for (var i=0; i<user_info.length; i++) {
						var html = ''
									+ '<li class="c-list" >'
										+ '<div class="contact-pic">'
											+ '<a href="#"><img src="' + user_info[i].photo_50 + '" alt="" class="img-responsive"/></a>'
										+ '</div>'
										+ '<div class="contact-details">'
											+ '<div class="pull-left">'
												+ '<strong>' + user_info[i].first_name + ' ' + user_info[i].last_name + '</strong>'
												+ '<small>ID' + user_info[i].id + '</small>'
											+ '</div>'
											+ '<div class="pull-right">'
												+ '<a href="http://vk.com/id' + user_info[i].id + '" class="btn btn-success btn-xs" target="_blank"><span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>'
											+ '</div>'
											+ '<div class="clearfix"></div>'
										+ '</div>'
									+ '</li>';
						$(html).hide().appendTo("#friends").delay(i * 1000/(i+1)).show("puff");	
		}
            
		
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
					
*/
				
				
			} else {
				WriteError('Неверно указана ссылка!');
			}
	}
	smesh = smesh+100;
	 }
	
	 
	});
}






// Проба прогресс бар

/*


function getMembers20k(group_id, members_count) {
	var code =  'var members = API.wall.get({"group_id": ' + group_id + ', "v": "5.27", "sort": "id_asc", "count": "1000", "offset": ' + friends[count].length + '}).items;' // делаем первый запрос и создаем массив
			+	'var offset = 1000;' // это сдвиг по участникам группы
			+	'while (offset < 25000 && (offset + ' + friends[count].length + ') < ' + members_count + ')' // пока не получили 20000 и не прошлись по всем участникам
			+	'{'
				+	'members = members + "," + API.groups.getMembers({"group_id": ' + group_id + ', "v": "5.27", "sort": "id_asc", "count": "1000", "offset": (' + friends[count].length + ' + offset)}).items;' // сдвиг участников на offset + мощность массива
				+	'offset = offset + 1000;' // увеличиваем сдвиг на 1000
			+	'};'
			+	'return members;'; // вернуть массив members

	VK.api("execute", {code: code}, function(data) {
		if (data.response) {
			friends[count] = friends[count].concat(JSON.parse("[" + data.response + "]")); // запишем это в массив
			$('.member_ids').html('Загрузка: ' + friends[count].length + '/' + members_count);
			if (members_count >  friends[count].length) { // если еще не всех участников получили
				setTimeout(function() { getMembers20k(group_id, members_count); }, 350); // задержка 0.35 с. после чего запустим еще раз
				document.getElementById('friends').innerHTML = ''
								+ '<li class="contact-alpha">'
									+ 'Общего <span class="label label-info pull-right">0</span>'
									+ '<div class="clearfix"></div>'
								+ '</li>'
									+ '<div class="progress progress-striped active">'
									  + '<div id="progress" class="progress-bar" role="progressbar" aria-valuenow="'+ (friends[count].length/members_count)*100 +'" aria-valuemin="0" aria-valuemax="100" style="width: '+ (friends[count].length/members_count)*100 +'%">'
										+ '<span class="sr-only">'+ (friends[count].length/members_count)*100 +'% Complete</span>'
									 + '</div>'
									+ '</div>'
								+ '<div class="errorL">Идет загрузка подписчиков группы CLUB'+user_ids[count]+'. <br/>Загружено: '+ (friends[count].length) + ' из ' + members_count + ' подписчиков.</div>';
			} else // если конец то
				if (user_ids.length != ++count) GetFriend(); else MutualFriends();
		} else {
			alert(data.error.error_msg); // в случае ошибки выведем её
		}
	});
}





*/









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
