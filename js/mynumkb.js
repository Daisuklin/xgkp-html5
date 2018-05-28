/**
 * 鏁板瓧閿洏鎻掍欢 js锛堝熀浜巎query)
 * Date:2018-02-02
 * author:wanglei
 * email:717554579@qq.com
 */

(function($) {
	var _count = 0;
	var Mynumkb = function(element, options) {
		_count++;
		this.count = _count;
		this.$element = $(element);
		this.$element.attr("data-count", this.count);
		this.options = $.extend({}, $.fn.mynumkb.defaults, options);
		this.init();
	}
	Mynumkb.prototype = {
		constructor: Mynumkb,
		init: function() {
			var me = this;
			me.render();
			me.bind();
			me.initHtml();
		},
		render: function() {
			var me = this;
			me.$eparentNode = me.$element.parent();
		},
		bind: function() {
			var me = this;
			me.$element.on("click", $.proxy(me['_eClick'], me));
			me.$element.on("blur", $.proxy(me['_eBlur'], me));
			$(document).on("mousedown", "#mykeyboard" + me.count + " li", $.proxy(me['_limousedown'], me));
			$(document).on("mouseup", "#mykeyboard" + me.count + " li", $.proxy(me['_limouseup'], me));
			$(document).on("click", "#mykeyboard" + me.count + " li", $.proxy(me['_liclick'], me));
			$(document).on("click", "#mykeyboard" + me.count + " #del", $.proxy(me['_delclick'], me));
			$(document).on("click", "#mykeyboard" + me.count + " #sure", $.proxy(me['_sureclick'], me));
		},
		initHtml: function() {
			var me = this;
			var _html = [
				'<div class="content_box" id="content_box">',
				'<div class="mykb-box" id="mykeyboard' + me.count + '">',
				'<ul class="num-key clearfix">',
				'<li class="num">1</li>',
				'<li class="num">2</li>',
				'<li class="num">3</li>',
				'<li class="num">4</li>',
				'<li class="num">5</li>',
				'<li class="num">6</li>',
				'<li class="num">7</li>',
				'<li class="num">8</li>',
				'<li class="num">9</li>',
				'<li class="num">.</li>',
				'<li class="num">0</li>',
				'<li class="func exit"></li>',
				'</ul>',
				'<div class="num_key_right" id="num_key_right">',
				'<div class="func del" id="del"></div>',
				'<div class="func sure" id="sure">确定</div>',
				'</div>',
				'</div>',
				'</div>',
			].join("");

			$("body").append(_html);
			me.setPosition();
		},
		setPosition: function() {
			var me = this;
			var parentNode = me.$eparentNode;
			var $element = me.$element;
			$("body").css("position", "relative");
			var height = $element.outerHeight();
			var width = $element.outerWidth();
			var position = $element.position();
			var $keyboard = $("#mykeyboard" + me.count);
			var ulWidth = $keyboard.outerWidth();
			var ulHeight = $keyboard.outerHeight();
			var left = position.left;
			//          $keyboard.css({
			//              bottom:"0px",
			//              left:"0px"
			//          });
		},
		_eClick: function(e) {
			var me = this;
			if( me.$element.html()==""){
                $(me.$eparentNode).addClass("on")
            }
			var count = me.$element.data("count");
			var $keyboard = $("#mykeyboard" + count);
			$keyboard.fadeIn(100).siblings(".mykb-box").hide();
			$keyboard.parent().fadeIn(100);
		},
		_liclick: function(e) {
			var me = this;
			var $target = $(e.target);

			if($target.hasClass("del")) {
				//				me.setValue("del");
			} else if($target.hasClass("exit")) {
				me.close();
			} else if($target.hasClass("clearall")) {
				//				me.$element.val("");
			} else {
				var str = $target.text();
                if(me.$element.html()==""&&str=="."){
                    me.$element.html("0.")
				}
				me.setValue("add", str);
			}
		},
		_delclick: function(e) {
			var me = this;
			var $target = $(e.target);
			me.setValue("del");
		},
		_sureclick: function(e) {
			var me = this;
			var $target = $(e.target);
			me.close();
		},
		_limousedown: function(e) {
			var me = this;
			var val = $(e.target).html();
			$(e.target).addClass("active").siblings().removeClass("active");
		},
		_limouseup: function(e) {
			var me = this;
			var val = $(e.target).html();
			$(e.target).removeClass("active");

		},
		setValue: function(type, str) {
			var me = this;
			var curpos = me.getCursorPosition();
			var val = me.$element.html();
			var newstr = "";
			if(type == 'add') {
				$(me.$eparentNode).removeClass("on")
				newstr = me.insertstr(val, str, curpos);
				//***************** 判断输入值 ******************
				var regStrs = [
					['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
					['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
					['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
					['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
				];
				for(i = 0; i < regStrs.length; i++) {
					var reg = new RegExp(regStrs[i][0]);
					newstr = newstr.replace(reg, regStrs[i][1]);
				}
				if(newstr.length > 2) {
					if(newstr < 0.2) {
						showError('金额不能小于0.2，请重新输入');
						newstr = '';
					} else if(newstr > 50000) {
						showError('金额不能大于50000，请重新输入');
						newstr = '50000';
					}
				}
				//***************** 判断输入值 ******************
				me.$element.html(newstr); //给输入框赋值
				me.$element.textFocus(curpos + 1);
			} else if(type == 'del') {
				newstr = me.delstr(val, curpos);
				me.$element.html(newstr);
				if( me.$element.html()==""){
                    $(me.$eparentNode).addClass("on")
				}
				me.$element.textFocus(curpos - 1);
			}

		},
		//弹窗错误提示
		showError: function(txt) {
			document.getElementById('showError').style.display = 'block';
			document.getElementById('errorTxt').innerHTML = txt;
			setTimeout(function() {
				document.getElementById('showError').style.display = 'none';
				document.getElementById('errorTxt').innerHTML = '';
			}, 2000)
		},
		insertstr: function(str, insertstr, pos) {
			var str = str.toString();
			console.info("str.toString():"+str)
			var newstr = str.substr(0, pos) + '' + insertstr + '' + str.substr(pos);
			return newstr;
		},
		delstr: function(str, pos) {
			var str = str.toString();
			var newstr = "";
			if(pos != 0) {
				newstr = str.substr(0, pos - 1) + str.substr(pos);
			} else {
				newstr = str;
			}
			return newstr;
		},
		getCursorPosition: function() {
			var me = this;
			var $element = me.$element[0];
			var cursurPosition = -1;
			// if($element.selectionStart != undefined && $element.selectionStart != null) { //闈濱E娴忚鍣�
			// 	cursurPosition = $element.selectionStart;
			// } else { //IE
			// 	var range = document.selection.createRange();
			// 	range.moveStart("character", -$element.value.length);
			// 	cursurPosition = range.text.length;
			// }
			return cursurPosition;
		},
		_eBlur: function() {
			var me = this;
			//			me.close();
		},
		close: function() {
			var me = this;
			var count = me.$element.data("count");
			var $keyboard = $("#mykeyboard" + count);
			$keyboard.fadeOut(100);
			$keyboard.parent().fadeOut(100);
			me.$element.attr("isshowkb", "false");
		}
	};
	$.fn.mynumkb = function(option) {
		return this.each(function() {
			var options = typeof option == 'object' ? option : {};
			var data = new Mynumkb(this, options);
		})
	}
	$.fn.mynumkb.defaults = {

	};
	$.fn.mynumkb.Constructor = Mynumkb;

})(jQuery);
(function($) {
	$.fn.textFocus = function(v) {
		var range, len, v = v === undefined ? 0 : parseInt(v);
		this.each(function() {
			if(navigator.userAgent.msie) {
				range = this.createTextRange();
				v === 0 ? range.collapse(false) : range.move("character", v);
				range.select();
			} else {
				// len = this.value.length;
				// v === 0 ? this.setSelectionRange(len, len) : this.setSelectionRange(v, v);
			}
			this.focus();
		});
		return this;
	}
})(jQuery);