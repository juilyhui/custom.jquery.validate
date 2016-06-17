// jquery validate

// 
// ================
// 要做的：1、必填以及别的验证不写先后顺序，用data-step控制
// 		   2、自定义验证哪些东西，不写死
// 		   3、多条提示同时出现，需要单条出现
// 		   4、出现错误后重新 输入，错误要消失，直到下次点击提交


$(function() {

	

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
		


	// 定义验证顺序的数组   id
	// var formOrder = ["usernameValid", "emailValid", "passwordValid", "confirmValid"];



	getForm(signRules);
	function getForm(rules) {
		// 点击提交
		$("form").find(".submitBtn").on("click",function(e){
			e.preventDefault();
			console.log("THIS : ", this);
			console.log("THISFORM : ", $(this.form));
			// 获取到发生点击事件的当前表单
			var $form = $(this.form);
			if (checkRequired($form)){
				// 如果验证required成功
				// console.log("VALIDATE SUCCESS!!!")
				if(checkForm($form, rules)){
					confirmFun($form);
				}
			} else {
				console.log("VALIDATE FAIL!!!")
			}
		})
	};

	

	// 验证表单的函数
	// --------------
	// 传入一个jquery表单对象,获得第一个值
	// function checkForm($form) {
	// 	var form = $form.get(0);
	// 	// 验证状态 state 为true，成功
	// 	var state = true;
	// 	for (var i = 0; i < form.length; i++){
	// 		var input = form[i];
	// 		var validity = input.validity; 
	// 		// input.validate.valid 为true，验证成功，为false，验证失败
	// 		if (!validity.valid){
	// 			// 验证失败
	// 			// find 搜索段落中的后代
				
	// 			$form.find("."+input.getAttribute("data-error")).slideDown();

	// 			// clearTime($form, input);
	// 			// 
	// 			state = false;
	// 			return state;
	// 		} else {
	// 			// 验证成功
	// 			$(input).removeClass("warning");
	// 			$form.find("."+input.getAttribute("data-error")).slideUp();
	// 		}
	// 	}
	// 	return state;
	// }

	// 提示文字消失时间
	function clearTime ($form, input){
		var t = setTimeout($form.find("."+input.getAttribute("data-error")).slideUp(), 20000);
	}
	

	// 验证required ------- start
	function checkRequired($form) {
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
				$form.find("["+input.getAttribute("data-none")+"]").slideDown();
				state = false;
				return state;
			} else {
				$(input).removeClass("warning");
				$form.find("["+input.getAttribute("data-none")+"]").slideUp();
			}
		}
		console.log("STATE : ", state)
		return state;
	}



	// 
	function checkForm($form, rules) {
		console.log("CHECKFORM", $form)
        var state = true;
        var form = $form.get(0);
        var validObj;
        // console.log("RULES : ", rules)
        for(var i =0; i< rules.length; i++) {
        	// console.log(rules[i].id, rules[i].rules)
        	validObj = $(form).find("#"+rules[i].name)[0];
        	// console.log("validObj : ", validObj)
        	if(!rules[i].rules.test(validObj.value)){
        		// 不正确
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideDown();
        		state = false;
        		return state;
        	} else {
        		// 正确
        		$form.find("["+validObj.getAttribute("data-rules")+"]").slideUp();
        	}
        }
        return state;


        // if(!rules.username.test(usernameValid.value)){
        //     $form.find("["+usernameValid.getAttribute("data-rules")+"]").slideDown();

        // }else{
        //     // 用户名正确
        //     $form.find("["+usernameValid.getAttribute("data-rules")+"]").slideUp();
        //     if(!rules.email.test(emailValid.value)){
        //     	$form.find("["+emailValid.getAttribute("data-rules")+"]").slideDown();
        //     } else {
        //     	$form.find("["+emailValid.getAttribute("data-rules")+"]").slideUp();
        //     }

        // }
         // //验证邮件
         // if( $(this).is('#email') ){
         //    if( this.value=="" || ( this.value!="" && !/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value) ) ){
         //          var errorMsg = '请输入正确的E-Mail地址.';
         //          $parent.append('<span class="formtips onError">'+errorMsg+'</span>');
         //    }else{
         //          var okMsg = '输入正确.';
         //          $parent.append('<span class="formtips onSuccess">'+okMsg+'</span>');
         //    }
         // }



	}


	// 再次输入密码之类的验证
	function confirmFun($form) {
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
				$form.find("["+$(confirmObj[i]).attr("data-confirm")+"]").slideDown();
				console.log("FALSE!!!!!!!")
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