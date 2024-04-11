$(function(){
	initSetting.init(); //페이지기본이벤트
	$(".paging").val('500');
});

//gnb
$(function(){

    $(document).ready(function(){
		
		$('.gnb > nav > ul > li').on({
			mouseenter : function() {
				$('.sub_menu').addClass('visible');
				$('#header').addClass('expand');
				$(this).find('a').attr('aria-expanded',true);				
			},
			mouseleave : function() {
				$('.sub_menu').removeClass('visible');
				$('#header').removeClass('expand');
				$(this).find('a').attr('aria-expanded',false);				
			},
			focusin : function() {
				$('.sub_menu').addClass('visible');
				$('#header').addClass('expand');	
				$(this).find('a').attr('aria-expanded',true);				
			},
		});
		
		$('.gnb nav > ul > li:last-child > div.sub_menu > ul > li:last-child > a').blur(function(){
			$('.sub_menu').removeClass('visible');
			$('#header').removeClass('expand');	
			$('ul.hsection > li a.logout').focusIn();
		});
		
		


		$(".onlynum").on("keyup", function() {
			$(this).val($(this).val().replace(/[^0-9]/g,""));
	    });

	    $(".onlynum2").on("keyup", function() {
			var x = $(this).val().replace(/[^-\.0-9]/g,"");
			if(x && x.length > 0) {
				if(x.lastIndexOf("-") > 0) {
					if(x.indexOf("-") == 0) {
						x = "-" + x.replace(/[-]/gi,'');
					} else {
						x = x.replace(/[-]/gi,'');
					}
				}
			}
			if ((x.match(/\./g) || []).length > 1 ){
				x = x.replace('.', '');
			}
			$(this).val(x);
	    });
    });

    $(".useDatepicker.disabled").datepicker("option","disabled",true);

});




var initSetting = {
	'init':function(){
		initSetting.tab();
		initSetting.datepicker();
		initSetting.wordLength();
		initSetting.popLayer.init();
		initSetting.attach.init();
	},
	'tab':function(){
		$(".tabbox > ul.tablist > li").click(function(){
			var now_tab = $(this).index();
			$(this).parent().find("li").removeClass("on");
			$(this).parent().parent().parent().find(".tab").addClass("hidden");

			$(this).parent().find("li").eq(now_tab).addClass("on");
			$(this).parent().parent().parent().find(".tab").eq(now_tab).removeClass("hidden");			
		});

	    $(".tabbox > ul.tablist.add > li").click(function(){
			var now_tab = $(this).index();
			$(this).parent().find("li").removeClass("on");
			$(this).parent().parent().parent().find(".tab1").addClass("hidden");

			$(this).parent().find("li").eq(now_tab).addClass("on");
			$(this).parent().parent().parent().find(".tab1").eq(now_tab).removeClass("hidden");
		});
	    //반응형 처리
		$('.tabbox > ul.tablist').each(function(){
			if( $(this).find('li').length > 4 ){
				$(this).addClass('responsive');
			}else if( $(this).hasClass('small') == true && $(this).find('li').length > 2 ){
				$(this).addClass('responsive');
			}
			
		});
	},
	lock:{
		sct: 0,
		stat: false,
		using:function(opt) {

			///var lockDiv = " .popLayer, .popConfirm" ;
			if (opt === true && this.stat === false ){
				this.stat = true;
				$('html').addClass('popLock');
				//$(lockDiv).bind('touchmove scroll', function(e){ e.preventDefault() });
			}
			if (opt === false) {
				this.stat = false;
				$('html').removeClass('popLock');
				//$(lockDiv).unbind('touchmove scroll');
			}
		}
	},
	popLayer:{
		init: function() {
			var _this = this;
			$(document).on('click', '.popLayer .popup_close', function() {
				var id = $(this).closest('.popLayer').attr('id');
				//console.log(id + ' close');
				_this.close(id);
			});
			$(document).on('click', '.popLayer .popup_close1', function() {
				var id = $(this).closest('.popLayer').attr('id');
				//console.log(id + ' close');
				_this.close1(id);
			});
			$(document).on('click', '.popLayer .popup_wrap', function(e) {
				e.stopPropagation();
			});
			$(window).on('load resize', this.resize);

			//console.log('=> init popLayer');
		},
		openPop:[],
		callbacks:{},
		open:function(id) {
			//console.log(id);
			$('#header').css('z-index', '1');
			_this = this;

			if ( $('#' + id).length  <= 0  ) return;

			_this.opt = $.extend({
				ocb: null ,
				ccb: null,
				zIndex: 10000,
			});

			_this.callbacks[id] = {} ;
			_this.callbacks[id].open  = _this.opt.ocb ? _this.opt.ocb : null ;
			_this.callbacks[id].close = _this.opt.ccb ? _this.opt.ccb : null ;

			initSetting.lock.using(true);

			$('#' + id).css({ zIndex: _this.opt.zindex });
			$('#' + id).fadeIn(100,function() {
				if(_this.callbacks[id].open)  _this.callbacks[id].open();
				$(this).addClass('on');
				/*
				if ($('.popLayer').hasClass('on') !== true) {
					$(this).addClass('on');
				}
				*/
			}).attr('tabindex','0').focus();
			/* 
			window.setTimeout(function() {
				_this.resize(id);
			});
			 */
		},
		close:function(id, set) {
			$('#header').css('z-index', '20');
			_this = this;
			$('.popLayer').removeClass('message');
			$('.valid_box').removeClass('on'); //창 닫을 때 알람 창 닫기
			$('#'+id).find('.form-fail').removeClass('form-fail'); //창 닫을 때 유효성 체크 input class 삭제
			$('#'+id).removeClass('on').fadeOut(150,function() {
				if( !$('.popLayer:visible').length ) initSetting.lock.using(false);
				try { _this.callbacks[id].close(); } catch (error) { }
			});
			console.log(id);
		},
		close1:function(id, set) {
			$('#header').css('z-index', '20');
			_this = this;
			$('.popLayer').removeClass('message');
			$('.valid_box').removeClass('on'); //창 닫을 때 알람 창 닫기
			$('#'+id).find('.form-fail').removeClass('form-fail'); //유효성 체크 input class 삭제
			$('#'+id).removeClass('on').fadeOut(150,function() {
				if( !$('.popLayer:visible').length ) initSetting.lock.using(false);
				try { _this.callbacks[id].close(); } catch (error) { }
			});
			console.log(id);
			$("#"+id).children().remove();
		},
		/*
		resize:function(id){
			var pctnH =  $('.popLayer:visible').outerHeight() ;
			pctnH = pctnH - ( $('.popLayer:visible .popup_wrap .pop_header').outerHeight() || 0 );
			
			$('.popLayer:visible .popup_wrap .pop_content').css({'max-height': pctnH});
		}
		*/
	},
	attach:{
		init:function(){
			//console.log('2222');
			$(document).on('change', '[data-ui="attach"].add__attach__file .fileButton .fileInput', function() {
				var fUrl = (this.value).split('\\'),
					fName = fUrl[fUrl.length - 1];
				var locVar = $(this).closest('.add__attach__file').find('.file').length;
				if (!locVar) {
					// console.log("132132");
					$(this).closest('.add__attach__file').addClass('on');
					$(this).closest('.add__attach__file').append(
						'<span class="file">'+
							'<span class="loc"></span>'+
							'<button type="button" class="delete">삭제</button>'+
						'</span>'
					);
				}
				$(this).closest('.add__attach__file').find('.file .loc').text(fName);
			});

			$('.uploadForm').each(function() {
				$(this).find('.add__attach').off('click').on('click',function() {
					var currentLeng = $(this).next('.add__attach__list').find('li').length;

					// $(this).next('.add__attach__list').append(
					// 	'<li>'+
					// 		'<span class="add__attach__file" data-ui="attach">'+
					// 			'<span class="btn__attach">'+
					// 				'<label class="fileButton">파일선택<input type="file" class="fileInput" accept="*/*"></label>'+
					// 			'</span>'+
					// 		'</span>'+
					// 	'</li>')
					// currentLeng ++;

					if (currentLeng < 5) {
						$(this).next('.add__attach__list').append(
							'<li>'+
								'<span class="add__attach__file" data-ui="attach">'+
									'<span class="btn__attach">'+
										'<label class="fileButton">파일선택<input type="file" class="fileInput" accept="*/*"></label>'+
									'</span>'+
								'</span>'+
							'</li>');
						currentLeng ++;
					} else {
						alert('※ 첨부파일은 5개만 등록할 수 있습니다.');
					}
				});

				$(document).on('click', '.delete', function() {
					var delLang = $(this).closest('.add__attach__list').find('li').length;

					if (delLang !== 1) {
						$(this).closest('.add__attach__file').removeClass('on');
						$(this).closest('.add__attach__file').find('.fileButton .fileInput').val('');
						$(this).closest('.add__attach__file').find('.file .loc').text('');
						$(this).closest('li').remove();
					} else {
						$(this).closest('.observer').removeClass('on')
						$(this).closest('.add__attach__file').removeClass('on');
						$(this).closest('.add__attach__file').find('.fileButton .fileInput').val('');
						$(this).closest('.add__attach__file').find('.file .loc').text('');
						$(this).closest('.add__attach__file').find('.file').remove();

					}
					delLang --
				});
			});

			// 옵저버상태체크
			var target = $('.add__attach__file');
			target.change(function() {
				$(this).closest('.observer').addClass('on');
			});

			//console.log('=> init attach');
		},
	},
	'datepicker':function(){
		var holidayData = [
			{'mmdd':'1-1','title':'신정'},
			{'mmdd':'3-1','title':'3.1절'},
			{'mmdd':'5-5','title':'어린이날'},
			{'mmdd':'5-10','title':'석가탄신일'},
			{'mmdd':'6-6','title':'현충일'},
			{'mmdd':'8-15','title':'광복절'},
			{'mmdd':'10-3','title':'개천절'},
			{'mmdd':'10-9','title':'한글날'},
			{'mmdd':'12-25','title':'크리스마스'}
		];

		$(".useDatepicker").each(function(){
			console.log($(this).hasClass("useDatepicker"));

			if(!$(this).hasClass("hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yyyy-mm-dd";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				var obj = $(this);
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
					dayNamesShort: ['일','월','화','수','목','금','토'],
					dayNamesMin: ['일','월','화','수','목','금','토'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					changeYear: true,
					changeMonth: true,
					yearSuffix: '&nbsp;',
					minDate: minDate,
					maxDate: maxDate,
					showOn:'both',
					buttonText:'',
					language: 'ko',
					autoClose: true,
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedDate){
						if(obj.hasClass("dateFrom")) {
							if(selectedDate != "" && obj.parent().children(".dateTo").val() != ""){
								if(selectedDate > obj.parent().children(".dateTo").val()){
									alert("시작날짜는 종료날짜보다 작아야 합니다.");
									obj.val("");
									return;
								}
							}
						}else if(obj.hasClass("dateTo")) {
							if(selectedDate != "" && obj.parent().children(".dataFrom").val() != ""){
								if(obj.parent().children(".dateFrom").val() > selectedDate){
									alert("종료날짜는 시작날짜보다 커야 합니다.");
									obj.val("");
									return;
								}
							}
						}
					},
					onClose: function(selectedDate){

					}
				});



			}
		});
		
		//사용x , 삭제 예정
		$(".useMonthpicker").each(function(){
			
			if(!$(this).hasClass("hasDatepicker")){
				var minDate = $(this).attr("data-minDate");
				var maxDate = $(this).attr("data-maxDate");
				var dateFormat = "yyyy-mm";
				if($(this).attr("data-format")){
					dateFormat = $(this).attr("data-format");
				}
				var obj = $(this);
				$(this).datepicker({
					prevText: '이전 달',
					nextText: '다음 달',
					monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					monthNamesShort: ['01','02','03','04','05','06','07','08','09','10','11','12'],
					dateFormat: dateFormat,
					showMonthAfterYear: true,
					changeYear: true,
					changeMonth: true,
					yearSuffix: '&nbsp;',
					minDate: minDate,
					maxDate: maxDate,
					showOn:'both',
					buttonText:'',
					language: 'ko',
					autoClose: true,
					beforeShowDay: function(date){
						var holidayCheck = false;
						var mmdd = (date.getMonth() + 1)+"-"+date.getDate();
						for(var i=0; i<holidayData.length; i++){
							if(holidayData[i].mmdd == mmdd){
								holidayCheck = true;
								return [true, "date-holiday", holidayData[i].title];
								break;
							}
						}
						if(holidayCheck == false){
							return [true, ""];
						}
					},
					onSelect: function(selectedMonth){
						if(obj.hasClass("dateFrom")) {
							if(selectedMonth != "" && obj.parent().children(".dateTo").val() != ""){
								if(selectedMonth > obj.parent().children(".dateTo").val()){
									alert("시작월은 종료월보다 작아야 합니다.");
									obj.val("");
									return;
								}
							}
						}else if(obj.hasClass("dateTo")) {
							if(selectedMonth != "" && obj.parent().children(".dataFrom").val() != ""){
								if(obj.parent().children(".dateFrom").val() > selectedMonth){
									alert("종료월은 시작월보다 커야 합니다.");
									obj.val("");
									return;
								}
							}
						}
					},
					onClose: function(selectedMonth){

					}
				});
			}
		});
	},
	'wordLength':function(){
		$("textarea").each(function(){
			if($(this).attr("data-limitByte")){
				var textName = "none";
				if($(this).attr("name")){
					textName = $(this).attr("name");
				}
				limitByte = parseInt($(this).attr("data-limitByte"));
				if($("wordCount_"+textName).length == 0){
					$(this).after('<span id="wordCount_'+textName+'" class="wordCount"><b>0</b> / '+limitByte+' Byte</span>');
				}
				$(this).keyup(function(){
					textName = $(this).attr("name");
					limitByte = parseInt($(this).attr("data-limitByte"));
					var totalByte = 0;
					var limitLength = 0;
					var message = $(this).val();
					for(var i =0; i < message.length; i++){
						var currentByte = message.charCodeAt(i);
						if(currentByte > 128) totalByte += 2;
						else totalByte++;
						if(totalByte > limitByte){
							limitLength = i;
							$(this).val(message.substring(0,limitLength));
							totalByte = limitByte;
							break;
							return;
						}
					}
					$("#wordCount_"+textName+" b").text(totalByte);
				});
			}
		});
	},
	loading: {
		show: function () {
			var els = '<div class="loading"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 125" width="70" height="55"><defs><style>.cls-1{fill:#B3CF0A;stroke:#B3CF0A;}.cls-1,.cls-2{stroke-miterlimit:10;}.cls-2{fill:#B3CF0A;stroke:#B3CF0A;}</style></defs><path class="cls-1 svg-elem-1" d="M240.52,450.32c-4.53-2.12-8.25-3.83-8.25-7.29,0-2.65,2.12-4.57,6.3-4.57a21.53,21.53,0,0,1,4.1.42,13.34,13.34,0,0,0,2,.21c3.66,0,5.72-2.18,7.09-6.31l.57-1.69A38.21,38.21,0,0,0,238,428.23c-12.38,0-18.92,7.94-18.91,16.18a13.93,13.93,0,0,0,3.34,9.54c2.62,3.05,6.36,5.05,9.86,6.76,5.1,2.5,9.71,4.35,9.71,8.06,0,3.29-3.4,5.16-8,5.16-6.23,0-11.68-3.56-12.37-4l-5.12,9.59c.91.52,7.5,4.7,18.35,4.7,11.55,0,20.3-6.63,20.3-16.83S247.09,453.5,240.52,450.32Z" transform="translate(-215.88 -356.28)"></path><path class="cls-1 svg-elem-2" d="M285.72,455.05l21-25.7H291.74L275,451.53h-.25V429.35H262.47V483.8h.73c5.32,0,11.66-2.47,11.66-11.36v-12.5h.25l17,23.18h15.67Z" transform="translate(-215.88 -356.28)"></path><path class="cls-1 svg-elem-3" d="M307.38,371c-4.34.82-10.76,4.75-10.74,11.71,0,6.31,5.18,10.14,5.2,18.42a14.67,14.67,0,0,1-7.12,12.75c1.5-.14,3.14-.22,4.95-.23a41.48,41.48,0,0,1,6.22.38l19.44-23.86A81,81,0,0,0,307.38,371Z" transform="translate(-215.88 -356.28)"></path><path class="cls-1 svg-elem-4" d="M323.71,435.47c2.45-3.81,2.76-9.88,3-16.07.22-5.77,1.43-10.11,9.15-10.14,1.71,0,3.34.23,6.28.23a45.55,45.55,0,0,0,23.28-6.5,80.65,80.65,0,0,0-40.06-12.78c-1.11,3.12-9.72,27.06-10.37,29a30.91,30.91,0,0,1,3.49,5.1A56.31,56.31,0,0,1,323.71,435.47Z" transform="translate(-215.88 -356.28)"></path><path class="cls-2 svg-elem-5" d="M282.64,415.91c-1,0-1.47-.64-1.6-1.78s-5-45.61-5.72-52.34c-.1-1-.34-2.79-.35-3.43a1.44,1.44,0,0,1,1.47-1.58c2.3,0,14.86,2.93,28.19,12.27-3.84,1.08-10.79,5.08-10.76,13.34,0,7.32,5.27,11.35,5.3,18.69C299.21,413,285.48,415.91,282.64,415.91Z" transform="translate(-215.88 -356.28)"></path><path class="cls-2 svg-elem-6" d="M324.83,438.64a7.72,7.72,0,0,0,.6,1.35,1.31,1.31,0,0,0,1.2.75,2.85,2.85,0,0,0,1.11-.29c1-.48,41.62-19.38,47.74-22.2.89-.43,2.57-1.18,3.13-1.5a1.51,1.51,0,0,0,.84-1.3,1.46,1.46,0,0,0-.24-.79c-.76-1.24-4.69-5.41-11.26-10-5.21,2.88-13.36,7.31-25.47,7.36-3,0-3.64-.19-5.66-.18-5.92,0-7.39,2.55-7.61,7.73,0,1,0,2.3-.11,3.74C328.91,428,328.36,434.37,324.83,438.64Z" transform="translate(-215.88 -356.28)"></path></svg></div>';
			$("body").prepend(els);

			var wrapper = $('.loading svg')
			function draw() {
				wrapper.addClass('active')
			}
			setTimeout(draw, 100);
			setInterval(function(){wrapper.toggleClass('active')}, 1600);
		},
		hide: function () {
			$('.loading').remove();
		}
	},
};

function fn_sendEmail(type){
	var idArry = $("#grid").getGridParam( "selarrrow" );
	if(idArry.length == 0){
		alert("데이터를 선택해 주세요.");
		return false;
	}
	var arrInfo = new Array();
	var objInfo;

	var temp = "";
	for(var i = 0; i < idArry.length;i++){
		var rowdata = $('#grid').getRowData(idArry[i]);
		objInfo = new Object();
		if(type == "01"){
			objInfo.idx = rowdata.ctrtId;
		}else if(type == "02"){
			objInfo.idx = rowdata.bizRegNo;
		}else if(type == "03"){
			objInfo.idx = rowdata.pwrpltId;
		}else{
			objInfo.idx = rowdata.ctrtId;
		}

		arrInfo.push(objInfo);
	}
	var objInfo2;
	var resultArr = new Array();
	var tempArr = new Array();
	for(var i = 0 ; i < arrInfo.length; i++){
		if($.inArray(arrInfo[i].idx, tempArr) === -1){
			objInfo2 = new Object();
			objInfo2.idx = arrInfo[i].idx;
			tempArr.push(arrInfo[i].idx);
			resultArr.push(objInfo2);
		}
	}
	var jsonInfo = JSON.stringify(resultArr);

	console.log(jsonInfo);
	ajaxModal("layer_email","/com/smsEmail/selectEmailInfoPop.do",{"jsonData":jsonInfo,"cType":type});
}

function fn_sendSms(type){
	var idArry = $("#grid").getGridParam( "selarrrow" );
	if(idArry.length == 0){
		alert("데이터를 선택해 주세요.");
		return false;
	}
	var arrInfo = new Array();
	var objInfo;

	var temp = "";
	for(var i = 0; i < idArry.length;i++){
		var rowdata = $('#grid').getRowData(idArry[i]);
		objInfo = new Object();
		if(type == "01"){
			objInfo.idx = rowdata.ctrtId;
		}else if(type == "02"){
			objInfo.idx = rowdata.bizRegNo;
		}else if(type == "03"){
			objInfo.idx = rowdata.pwrpltId;
		}else if(type == "04"){
			objInfo.idx = rowdata.pmntId;
		}else{
			objInfo.idx = rowdata.ctrtId;
		}

		arrInfo.push(objInfo);
	}
	var objInfo2;
	var resultArr = new Array();
	var tempArr = new Array();
	for(var i = 0 ; i < arrInfo.length; i++){
		if($.inArray(arrInfo[i].idx, tempArr) === -1){
			objInfo2 = new Object();
			objInfo2.idx = arrInfo[i].idx;
			tempArr.push(arrInfo[i].idx);
			resultArr.push(objInfo2);
		}
	}
	var jsonInfo = JSON.stringify(resultArr);

	console.log(jsonInfo);
	if(type == "04"){
		ajaxModal("layer_sms","/com/smsEmail/selectSmsInfoForSplyAmtPop.do",{"jsonData":jsonInfo,"cType":type});
	}else{
		ajaxModal("layer_sms","/com/smsEmail/selectSmsInfoPop.do",{"jsonData":jsonInfo,"cType":type});
	}
}

function fixedFooter() {
	var winH = $(window).height();
	var headerH = $('#header').outerHeight();
	var footerH = $('#footer').outerHeight();
	var containerH = $('#container').outerHeight();
	var containerH = winH - headerH - footerH;
	var contentH = $('#content').outerHeight();

	if ((contentH  == containerH )) {
		// console.log('같아');
		$('#container').css('height' , containerH);
		$('#footer').addClass('fixed');
	}

	if ((contentH  < containerH )) {
		// console.log('작아');
		$('#container').css('height' , containerH);
		$('#footer').addClass('fixed');
	}

	if ((contentH   > containerH )) {
		// console.log('커');
		$('#footer').removeClass('fixed')
		$('#container').css('height' , winH - headerH);
	}

	$('.ui-jqgrid-sortable').each(function(){
		var status = $(this).find('.s-ico').css('display');
		//console.log(status)

		if (status == 'none') {
			$(this).closest('.ui-jqgrid-sortable').css('cursor','default')
		} else {
			$(this).closest('.ui-jqgrid-sortable').css('cursor','pointer')
		}
	});
	
	$("table[id^=grid]").each(function(index, item){
    	var gridBox = $(item).closest(".grid-container").outerWidth();
        $(item).closest(".grid-container").addClass('li_0' + index);
        $(item).jqGrid('setGridWidth', gridBox);
    });
}

window.onload = function(){
	fixedFooter();
}

$(window).on('resize', function() {
	fixedFooter();
});

function pageLink(curPage, totalPages, funName) {
	var pageUrl = "";

	var pageLimit = 10;
	var startPage = parseInt((curPage - 1) / pageLimit) * pageLimit + 1;
	var endPage = startPage + pageLimit - 1;

	if (totalPages < endPage) {
	    endPage = totalPages;
	}

	var nextPage = endPage + 1;
	console.log(curPage,"curPage,",startPage,"startPage,",endPage,"endPage,",nextPage,"nextPage")

	//맨 첫 페이지
	pageUrl += "<a class='first' href='javascript:" + funName + "(1);'><span>처음페이지로 가기</span></a>";
	//이전 페이지
	pageUrl += " <a class='prev' href='javascript:" + funName + "(" + (startPage == 1 ? 1 : startPage - 1) + ");'><span>전페이지로 가기</span></a>";
	//~pageLimit 맞게 페이지 수 보여줌
	for (var i = startPage; i <= endPage; i++) {
	    //현재페이지면 진하게 표시
	    if (i == curPage) {
	        pageUrl += " <strong>" + i + "</strong>"
	    } else {
	        pageUrl += " <a href='javascript:" + funName + "(" + i + ");'> " + i + " </a>";
	    }
	}
	//다음 페이지
	pageUrl += "<a class='next' href='javascript:" + funName + "(" + (nextPage < totalPages ? nextPage : totalPages) + ");'><span>다음페이지로 가기</span></a>";
	//맨 마지막 페이지
	pageUrl += "<a class='last' href='javascript:" + funName + "(" + totalPages + ");'><span>마지막페이지로 가기</span></a>";
	//console.log(pageUrl);

	return pageUrl;
}

function customAlert(message, title, width) {

	if ($("div#customAlert").length) return false;

	var alertDiv = document.createElement("div");

//	alertDiv.setAttribute("id", "customAlert");
//	alertDiv.setAttribute("class", "popLayer");

//	document.body.append(alertDiv);

	$(alertDiv).attr("id", "customAlert");
	$(alertDiv).addClass("popLayer");

	$("body").append(alertDiv);

	if (title == "" || title == undefined) title = "알림";
	if (width == "" || width == undefined) {
		width = "360px";
	} else {
		width = width + "px";
	}

	var html = "";

    html += "<div class=\"popup_wrap alert\" style=\"width: "+width+";\"> ";
	html += "	<div class=\"pop_header\"> ";
	html += "		<div class=\"pop_title_area\"> ";
	html += "			<h2>"+title+"</h2> ";
	html += "		</div> ";
	html += "		<button id=\"popup_close\" class=\"alert_close\">닫기</button> ";
	html += "	</div> ";
	html += "	<div class=\"pop_content\"> ";
	html += "		<p class=\"notice_memo alignc\">"+message+"</p> ";
	html += "	</div> ";
	html += "	<div class=\"pop_footer alignc\"> ";
	html += "		<button class=\"btn line alert_close\"> ";
	html += "			<span>확인</span> ";
	html += "		</button> ";
	html += "	</div> ";
	html += "</div>	";

	//alertDiv.style.display = "block";
	//alertDiv.innerHTML = html;

	$(alertDiv).show();
	$(alertDiv).html(html);
	$(alertDiv).find(".alert_close").click(function(){
		//p = alertDiv.parentElement;
		//p.removeChild(alertDiv);
		$(alertDiv).html("");
		$(alertDiv).remove();
	});
}

