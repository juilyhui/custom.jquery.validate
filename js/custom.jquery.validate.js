// jquery validate

// 点击提交按钮后验证
// ================
// 

jQuery.extend($.fn, {
	// 传入要验证的数组, 和提交按钮的类名, 提示文字时间, 表单验证成功执行的函数
	getForm: function(btn, submitState, successFun) {
		// 点击提交
		$("form").find("."+btn+"").on("click",function(e){
			e.preventDefault();
			// 获取到发生点击事件的当前表单
			var $form = $(this.form);
			var formRules = [];
			for(var i=0; i<$form.context.length; i++){
				// console.log($form.context[i]);
				if($($form.context[i]).attr("data-name")){
					formRules[i] = $($form.context[i]);
					formRules[i].name = $($form.context[i]).attr("data-name");
					formRules[i].rules = "/"+$($form.context[i]).attr("pattern")+"/";
				}
			}
			console.log("RULES ARRAY : ", formRules)
			if ($().checkRequired($form, btn) && $().checkForm($form, formRules, btn) && $().confirmFun($form, btn)){
				// 表单验证成功执行的函数
				successFun();
			} else {
				console.log("VALIDATE FAIL!!!");
			}
		})
	},

	// 清空其他错误提示 提示文字消失
	clearInfo: function($form){
		$form.find("[data-info]").attr("data-error",false);
	},

	// 验证required ------- start
	checkRequired: function($form, btn) {
		var form = $form.get(0);
		// 验证状态 state 为true，成功
 		var state = true;
		for (var i = 0; i < form.length; i++){
			var input = form[i];
			var required = input.required; 
			if (required && $(input)[0].value == ""){
				// 含required属性 并且为空的
				$().clearInfo($form);
				$form.find("[data-info="+input.getAttribute("data-required")+"]").attr("data-error",true);
				// window.setTimeout(function(){
				// 	$().clearInfo($form);
				// }, time); 
				state = false;
				return state;
			} else {
				$form.find("[data-info="+input.getAttribute("data-required")+"]").attr("data-error",false);
			}
		}
		return state;
	},

	// 表单规则验证
	checkForm: function($form, formRules, btn) {
        var state = true;
        var form = $form.get(0);
        var validObj;
        for(var i =0; i< formRules.length; i++) {
        	validObj = $(form).find("[data-name="+formRules[i].name+"]")[0];
        	if(!validObj.validity.valid){
        		$form.find("[data-info="+validObj.getAttribute("data-rules")+"]").attr("data-error",true);
        		state = false;
        		return state;
        	} else {
        		$form.find("[data-info="+validObj.getAttribute("data-rules")+"]").attr("data-error",false);
        	}
        }
        return state;
	},

	// 再次输入密码之类的验证
	confirmFun: function($form, btn) {
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
				$form.find("[data-info="+$(confirmObj[i]).attr("data-confirm")+"]").attr("data-error",true);
				state = false;
				return state;
			} else {
				// 相同
				$form.find("[data-info="+$(confirmObj[i]).attr("data-confirm")+"]").attr("data-error",false);
			}
		}
		return state;
	}

})



	
