/* Ajax */
function ajaxModal(id,url,parameter){
	console.log(parameter);
    $.ajax({
        type:"POST",
        url:url,
        dataType:"text",
        data:parameter,
        timeout:10000,
        success:function(data){
        	$("#"+id).html("");
            $("#"+id).html(data);
           initSetting.popLayer.open(id);
        },
        error: function(response){
            ajaxError(response);
        	console.log(response);
        }
    });
}

function ajaxError(response){
	alert("에러가 발생했습니다. 관리자에게 문의하십시요.\n::"+response);
}

// 사업자 번호 체크
function BizNOChk(b1,b2,b3){
    // 사업자 등록번호는 000-00-00000 의 구조
    // 123 : 국세청과 세무서별 코드
    // 45 : 개인, 법인 구분
    // 6789 : 과세사업자나 면세사업자 또는 법인사업자별로 등록 또는 지정일자를 일련번호로 나타낸 것
    // 0 : 맨끝 자리 수는 전산시스템으로 오류를 검증하기 위해 부여되는 검증번호
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다. 
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1); 
    var tmpBizID, i, chkSum=0, c2, remander; 
    var bizID = b1+b2+b3; 
 
    if (trim(bizID)=="") return false;
    for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i); 
    c2 = "0" + (checkID[8] * bizID.charAt(8)); 
    c2 = c2.substring(c2.length - 2, c2.length); 
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1)); 
    remander = (10 - (chkSum % 10)) % 10 ; 
 
    if (Math.floor(bizID.charAt(9)) == remander) 
        return true ; // OK! 
    else
        return false; 
}

function checkBizID(bizID){
	// bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
	var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
	var tmpBizID, i, chkSum=0, c2, remander;
	bizID = bizID.replace(/-/gi,'');
	for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
	c2 = "0" + (checkID[8] * bizID.charAt(8));
	c2 = c2.substring(c2.length - 2, c2.length);
	chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
	remander = (10 - (chkSum % 10)) % 10 ;

	if (Math.floor(bizID.charAt(9)) == remander) return true ; // OK!
	return false;
}
 
// 법인번호 검사
function isRegNo(sRegNo) {
    var re = /-/g;
    sRegNo = sRegNo.replace('-','');
 
    if (sRegNo.length != 13){
        return false;
    }
 
    var arr_regno  = sRegNo.split("");
    var arr_wt   = new Array(1,2,1,2,1,2,1,2,1,2,1,2);
    var iSum_regno  = 0;
    var iCheck_digit = 0;
 
    for (i = 0; i < 12; i++){
        iSum_regno +=  eval(arr_regno[i]) * eval(arr_wt[i]);
    }
 
    iCheck_digit = 10 - (iSum_regno % 10);
 
    iCheck_digit = iCheck_digit % 10;
 
    if (iCheck_digit != arr_regno[12]){
        return false;
    }
    return true;
}
 
 
//주민등록번호 체크
//111111-1111118
function chkJumin(jumin) {
    if(jumin.match(/^\d{2}[0-1]\d[0-3]\d-[1-4]\d{6}$/) == null) {
        return false;
    }
 
    var chk = 0;
    var i;
    var last_num = jumin.substring(13, 14);
    var chk_num = '234567-892345';
 
    for(i = 0; i < 13; i++) {
        if(jumin.charAt(i) != '-')
            chk += ( parseInt(chk_num.charAt(i)) * parseInt(jumin.charAt(i)) );
    }
 
    chk = (11 - (chk % 11)) % 10;
 
    if (chk != last_num) return false;
    return true;
}


 
// 숫자만 입력 체크
// 사용법 : <input type=text name=id onKeyPress="return IsNumChk()">
function IsNumChk(objWord) {
    var InputValue = objWord.value;
    for(var i=0; i<InputValue.length; i++) {
        if(isNaN(InputValue.charAt(i))) {
            window.alert("숫자만 입력하세요!");
            objWord.vlaue = "";
            for(var j=0; j < i; j++) {
                objWord.vale += InputValue.charAt(j);
            }
            return;
        }
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}