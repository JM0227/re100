$(document).ready(function() {
	fixedFooter();

	$(window).resize(function() {
		fixedFooter();
		if ($("#grid").length > 0)	{
			$("#grid").jqGrid('setGridWidth', $(".grid-content").width());
		}
		$("table[id^=grid_]").each(function(){
			if (!$(this).parents(".tab").hasClass("hidden")){
				var id = $(this).attr("id");
				var w = $("#content").width();
				setTimeout(function(){
					$("#"+id).jqGrid('setGridWidth', w);
				}, 1);
			}
		});
	});
});

fnTableAddRow = function(tableId, seqColumn, trHtml, limitCnt){
	if (tableId == null || tableId == undefined || tableId == "") return false;
	if (trHtml == null || trHtml == undefined || trHtml == "") return false;
	if (seqColumn == null || seqColumn == undefined || seqColumn == "") seqColumn = 0;
	if (limitCnt == null || limitCnt == undefined || limitCnt == "") limitCnt = 5;

	var trCnt = $("#"+tableId+" tbody tr").length;
	if (trCnt >= limitCnt) {
		alert("입력폼 추가는 "+limitCnt+"개 까지 가능합니다.");
		return false;
	}
	$("#"+tableId+" > tbody:last").append(trHtml);

	if (seqColumn > 0) fnTableNumbering(tableId, seqColumn);
}

fnTableDelRow = function(tableId, seqColumn, cbName){
	var chkFlag = true;

	if (cbName == null || cbName == undefined || cbName == "") cbName = "chk";
	$("[name="+cbName+"]").each(function(idx){
		if ($(this).prop("checked")){
			$(this).parents("tr").remove();
			chkFlag = false;
		}
	});

	if(chkFlag) {
		alert('선택된 항목이 없습니다.');
		return false;
	}

	if ($("[name="+cbName+"All]").length > 0) {
		$("[name="+cbName+"All]").prop("checked", false);
	}
	if (seqColumn > 0) fnTableNumbering(tableId, seqColumn);
}

fnTableNumbering = function(tableId, tableColumn){
	if (tableId == null || tableId == undefined || tableId == "") return false;
	if (tableColumn == null || tableColumn == undefined || tableColumn == "") return false;

	$("#"+tableId+" tbody tr").each(function(idx){
		$(this).children("td:nth-child("+tableColumn+")").html(idx+1);
	});
}

fnSetDataRename = function(tableId, startColumn){
	$("#"+tableId+" tbody tr").each(function(idx){
		var s = idx+1;
		var n = $(this).children("td").length;
		var o;
		var m;

		var v = "";
		var varr = fnGetArrForDataRename(tableId, n-startColumn);

		for (var i=startColumn; i<=n; i++){
			o = $(this).children("td:nth-child("+i+")").find("input, select");

			v = varr[i-startColumn];

			o.attr("id", v+"_"+s);
			o.attr("name", v+"_"+s);
		}
	});
}

fnGetArrForDataRename = function(tableId, option){
	var returnArray;
	switch (tableId) {
	case "tblObgtList" :
		returnArray = ["expctCmpnNm","expctObgtAmt","expctRecAmt","expctRemark"];
		break;
	case "tblExpctPlan" :
		returnArray = ["planNm","prcuType","beginYym","endYym","engSrc","fctsVol","useRate","wghtVal","dealRate"];
		break;
	case "tblTradeLtPlan" :
		returnArray = ["planNm"];
		for (var i=1; i<=option; i++){
		returnArray.push("data"+i.toString().padStart(2, "0"));
		}
		break;
	case "tblTradeStPlan" :
		returnArray = ["planNm"];
		for (var i=1; i<=option; i++){
		returnArray.push("plData"+i.toString().padStart(2, "0"));
		}
		break;
	case "tblSchCondi" :
		returnArray = ["optVal1", "optVal2"];
		break;
	}

	return returnArray;
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