// jquery validate

// 
// ================
// 

jQuery.extend($.fn, {
	// 传入要验证的数组, 和提交按钮的类名, 提示文字时间, 表单验证成功执行的函数
	getForm: function(rules, btn, time, successFun) {
		// 点击提交
		$("form").find("."+btn+"").on("click",function(e){
			e.preventDefault();
			// 获取到发生点击事件的当前表单
			var $form = $(this.form);
			if ($().checkRequired($form, time) && $().checkForm($form, rules, time) && $().confirmFun($form, time)){
				// 表单验证成功执行的函数
				successFun();
			} else {
				console.log("VALIDATE FAIL!!!");
			}
		})
	},

	// 清空其他错误提示 提示文字消失
	clearInfo: function($form){
		$form.find("[data-info]").slideUp();
	},

	// 验证required ------- start
	checkRequired: function($form, time) {
		var form = $form.get(0);
		// 验证状态 state 为true，成功
 		var state = true;
		for (var i = 0; i < form.length; i++){
			var input = form[i];
			var required = input.required; 
			if (required && $(input)[0].value == ""){
				// 含required属性 并且为空的
				$().clearInfo($form);
				$form.find("["+input.getAttribute("data-none")+"]").slideDown();
				window.setTimeout(function(){
					$().clearInfo($form)
				}, time); 
				state = false;
				return state;
			} else {
				$form.find("["+input.getAttribute("data-none")+"]").slideUp();
			}
		}
		return state;
	},

	// 表单规则验证
	checkForm: function($form, rules, time) {
        var state = true;
        var form = $form.get(0);
        var validObj;
        for(var i =0; i< rules.length; i++) {
        	validObj = $(form).find("[data-name="+rules[i].name+"]")[0];
        	if(!rules[i].rules.test(validObj.value)){
        		// 不正确
        		$().clearInfo($form);
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideDown();
        		window.setTimeout(function(){
					$().clearInfo($form)
				}, time); 
        		state = false;
        		return state;
        	} else {
        		// 正确
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideUp();
        	}
        }
        return state;
	},

	// 再次输入密码之类的验证
	confirmFun: function($form, time) {
		var state = true;
		var form = $form.get(0);
		var confirmObj = $form.find("input[data-confirm]"); // 数组 
		var confirmTarget;
		// console.log("CONFIRMOBJ : ", confirmObj);
		for(var i= 0; i< confirmObj.length; i++) {
			confirmTarget = $(confirmObj[i]).attr("data-confirm").split("-")[1];
			if($form.find("input[data-rules = "+confirmTarget+"]")[0].value != $(confirmObj[i])[0].value){
				// 不相同
				$().clearInfo($form);
				$form.find("["+$(confirmObj[i]).attr("data-confirm")+"]").slideDown();
				window.setTimeout(function(){
					$().clearInfo($form)
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



	
