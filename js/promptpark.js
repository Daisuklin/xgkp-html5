/*
 *页面提示弹窗公共文件
 * */
//弹窗错误提示
$(document).ready(function() {
	$('body').append('<div class="park_prompt ishide" id="showError"><p class="fontsize27 bord-radiu5" id="errorTxt"></p></div>');
})
//window.onload = function() {
//	var body = document.body;
//	var texts = '<div class="park_prompt ishide" id="showError"><p class="fontsize27 bord-radiu5" id="errorTxt"></p></div>'
//	body.innerHTML += texts;
//}

function showError(txt) {
	document.getElementById('showError').style.display = 'block';
	document.getElementById('errorTxt').innerHTML = txt;
	setTimeout(function() {
		document.getElementById('showError').style.display = 'none';
		document.getElementById('errorTxt').innerHTML = '';
	}, 2000)
}