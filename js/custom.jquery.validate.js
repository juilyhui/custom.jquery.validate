// jquery validate

// 
// ================
// 

$(function() {

	
	// 自定义验证的东西和验证规则
	// --name-- 即id名
	// --rules-- 即验证规则，正则
	var signRules = [
		{
			"id" : "0",
			"name" : "usernameValid",
			"rules" : /^[\u4e00-\u9fa50-9A-Za-z_-]{2,20}$/,
		},
		{
			"id" : "1",
			"name" : "emailValid",
			"rules" : /^[0-9a-zA-Z]+@([0-9a-zA-Z]){2,20}$/,
		},
		{
			"id" : "2",
			"name" : "passwordValid",
			"rules" : /^[0-9A-Za-z]{6,20}$/,
		}
	]
	getForm(signRules, "submitBtn", "10000");







	// 传入要验证的数组, 和提交按钮的类名, 提示文字时间
	function getForm(rules, btn, time) {
		// 点击提交
		$("form").find("."+btn+"").on("click",function(e){
			e.preventDefault();
			console.log("THIS : ", this);
			console.log("THISFORM : ", $(this.form));
			// 获取到发生点击事件的当前表单
			var $form = $(this.form);
			if (checkRequired($form, time)){
				// 如果验证required成功
				if(checkForm($form, rules, time)){
					confirmFun($form, time);
				}
			} else {
				console.log("VALIDATE FAIL!!!")
			}
			
		})
	};

	

	// 清空其他错误提示 提示文字消失
	function clearInfo ($form){
		$form.find("[data-info]").slideUp();
	}

	// 验证required ------- start
	function checkRequired($form, time) {
		var form = $form.get(0);
		// 验证状态 state 为true，成功
 		var state = true;
		for (var i = 0; i < form.length; i++){
			var input = form[i];
			var required = input.required; 
			console.log("TEXT : ", $(input)[0].value)
			console.log(required)
			if (required && $(input)[0].value == ""){
				// 含required属性 并且为空的
				clearInfo($form);
				$form.find("["+input.getAttribute("data-none")+"]").slideDown();
				window.setTimeout(function(){
					clearInfo($form)
				}, time); 
				state = false;
				return state;
			} else {
				$form.find("["+input.getAttribute("data-none")+"]").slideUp();
			}
		}
		console.log("STATE : ", state)
		return state;
	}



	// 表单规则验证
	function checkForm($form, rules, time) {
		console.log("CHECKFORM", $form)
        var state = true;
        var form = $form.get(0);
        var validObj;
        for(var i =0; i< rules.length; i++) {
        	validObj = $(form).find("#"+rules[i].name)[0];
        	if(!rules[i].rules.test(validObj.value)){
        		// 不正确
        		clearInfo($form);
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideDown();
        		window.setTimeout(function(){
					clearInfo($form)
				}, time); 
        		state = false;
        		return state;
        	} else {
        		// 正确
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideUp();
        	}
        }
        return state;
	}


	// 再次输入密码之类的验证
	function confirmFun($form, time) {
		console.log("CONFIRM : ", $form);
		var state = true;
		var form = $form.get(0);
		var confirmObj = $form.find("input[data-confirm]"); // 数组 
		var confirmTarget;
		console.log("CONFIRMOBJ : ", confirmObj);
		for(var i= 0; i< confirmObj.length; i++) {
			confirmTarget = $(confirmObj[i]).attr("data-confirm").split("-")[1];
			if($form.find("input[data-rules = "+confirmTarget+"]")[0].value != $(confirmObj[i])[0].value){
				// 不相同
				clearInfo($form);
				$form.find("["+$(confirmObj[i]).attr("data-confirm")+"]").slideDown();
				window.setTimeout(function(){
					clearInfo($form)
				}, time); 
				state = false;
				return state;
			} else {
				// 相同
				$form.find("["+$(confirmObj[i]).attr("data-confirm")+"]").slideUp();
			}
		}
		return state;
	}







})