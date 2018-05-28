// JavaScript Document
/**
 * DropdownBoxPlugin: 兼容 IE6+  and ff and chrome
 * 作者: Jin Cao
 * 邮箱:czp1987819@163.com
 * 调用样式：
 <script>
 $('.dropdownBoxPlugin').dropDownBox(
 {
     ClickCallBack:function(){alert(1111)},
     BtnCss:{'background':'url(js/dropdownBox/img/btn_dropdown.jpg) no-repeat','border':'none'}
 }

 );
 </script>
 */
(
    function($){
        $.fn.moneyKeyBoard=function(options){

            var ops=$.extend({},$.fn.moneyKeyBoard.defaluts,options);
            //this 是指当前调用的对象
            createMoneyKeyBoard(ops);
            $(this).bind("click",function(){
                $("#content_box").fadeToggle();
            })
            $(this).bind("tap",function(){
                $("#content_box").fadeToggle();
            })
        }


        $.fn.moneyKeyBoard.defaluts={
            ClickCallBack:function(){},//点击后回调方法
        }
        /**
         * 文本框
         **/
        function createMoneyKeyBoard(ops){
            var _html = $([
                '<div class="content_box" id="content_box">',
                '<div class="mykb-box" id="mykeyboard">',
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
            ].join(""));
            $("body").append(_html);
            $(document).delegate("#content_box .num","click", ops.ClickCallBack)
            $(document).delegate("#content_box .sure,#content_box .exit","click",function(){
                $("#content_box").toggle();
            })
            $(document).delegate("#content_box .del","click",ops.deleteCallBack)
        }
    }

)(jQuery)