$(document).ready(function() {
	fixedFooter();
	$(window).resize(function() {
		fixedFooter();
	});
});

// 테이블 자동 merge
mergeTable = function(target, index) {
	var loop = null;
	var start_idx = 0;
	var add_num = 1;
	$(target).find('tr').each(function (idx) {
		var target_text = $(this).find('th').eq(index).text();
		if (!loop) {
			loop = target_text;
			start_idx = idx;
		} else if (target_text == loop) {
			add_num++;
			if (idx == $(target).find('tr').length - 1) {
				$(target).find('tr').eq(start_idx).find('th').eq(index).attr('rowSpan', add_num).css('vertical-align', 'middle');
				for (var i = start_idx + 1; i < start_idx + add_num; i++) {
					$(target).find('tr').eq(i).find('th').eq(index).hide();
				}
			}
		} else {
			if (add_num != 1) {
				$(target).find('tr').eq(start_idx).find('th').eq(index).attr('rowSpan', add_num).css('vertical-align', 'middle');
				for (var i = start_idx + 1; i < start_idx + add_num; i++) {
					$(target).find('tr').eq(i).find('th').eq(index).hide();
				}
			}
			start_idx = idx;
			loop = target_text;
			add_num = 1;
		}
	});
}

fnJsExcelDownload = function(id, title) {
	var thStyle = "background: #eaf0f3; height: 30px;";
	thStyle += "mso-number-format: \'\@\';";

	var ttStyle = "background: #ffefe4; height: 30px;";

    var exportTable = $("#" + id).clone();
    exportTable.find("th").each(function (index, elem) {
    	if($(this).css("display") == "none") $(elem).remove();
    	$(this).attr("style", thStyle);
    });
    exportTable.find("tr").each(function (index, elem) {
    	if(index==2) $(this).children().attr("style", ttStyle);
    });

    var excelData = "";
    excelData += "<html xmlns:x='urn:schemas-microsoft-com:office:excel'>";
    excelData += "<head><meta http-equiv='content-type' content='application/vnd.ms-excel; charset=UTF-8'>";
    excelData += "<xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet>";
    excelData += "<x:Name>Sheet</x:Name>";
    excelData += "<x:WorksheetOptions><x:Panes></x:Panes></x:WorksheetOptions>";
    excelData += "</x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>";
    excelData += "</head>";
    excelData += "<body><table border='1px'>";
    excelData += exportTable.html();
    excelData += "</table></body></html>";

    var fileName = title + ".xls";
    var blob = new Blob([excelData], {
    	type: "application/csv;charset=utf-8;"
    });

    var e = window.document.createElement("a");
    e.href = window.URL.createObjectURL(blob);
    e.download = fileName;
    document.body.appendChild(e);
    e.click();
    document.body.removeChild(e);
}

setComma = function() {
	$("td.alignr").each(function(){
		if ($(this).html() != "") {
			var tmpval = parseFloat($(this).html()).toString();
			$(this).html(tmpval.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
		}
	});
}


fnCallExcelLoading = function(){
	initSetting.loading.show();
	FILEDOWNLOAD_INTERVAL = setInterval(function() {
		if ($.cookie("fileDownloadToken") != null) {
			$.removeCookie('fileDownloadToken', { path: '/' });
			/*
			$.cookie('fileDownloadToken', null, {
				expires : 0,
				path : location.pathname
			});
			*/
			clearInterval(FILEDOWNLOAD_INTERVAL);
			initSetting.loading.hide();
		}
	}, 1000);
}