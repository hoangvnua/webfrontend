$(document).ready(function(){
	function checknull(namecheck, start, end){
		for (var i = start; i < end; i++) {
			// console.log(end);
			namecheck.eq(i).on('blur', function(){
				// console.log(this)
				if ($(this).val() == '' || $(this).val().trim() == '') {
					var error = this.previousElementSibling.previousElementSibling;
					$(error).css({
						'display':'block',
					})
				} else {
					var error = this.previousElementSibling.previousElementSibling;
					$(error).css({
						'display':'none',
					})
					$(this).css({
						'background':'white',
					})
					// console.log(error)
				}
				checkPass();
			})
		}
	}

	function aio(namecheck, start, end){
		// debugger;
		var bool = true;
		var checknull = namecheck;
		for (var i = start; i < end; i++) {
			if (namecheck.eq(i).val() == '' || namecheck.eq(i).val().trim() == '') {
				// console.log($('.checknull'));
				var error = checknull[i].previousElementSibling.previousElementSibling;
				$(error).css({
					'display':'block',
				})
				namecheck.eq(i).css({
					'background':'#FEE2E4',
				})
				bool = false;
			} else {
				var error = checknull[i].previousElementSibling.previousElementSibling;
				$(error).css({
					'display':'none',
				})
			}
		}
		return bool;
		// console.log(bool);
	}

	function checkEmail(email) {
		var emaill = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return emaill.test(email);
	}

	function checkName(name){
		return /\d/.test(name);
	}

	function checkPass(){
		var bool = true;
		if($('#password').val() != $('#confirm').val()){
			$('#confirm').prev().prev().text('Please enter the same value again.')
			$('#confirm').prev().prev().css({
				'display':'block',
			})
			$('#confirm').css({
				'background':'#FEE2E4',
			})
			bool = false;
		}
		return bool;
	}

	function focus(count){
		$('.tag').eq(count-1).removeClass('er404');
		$('.tag').eq(count).removeClass('dis');
		$('.tag').eq(count).addClass('focus');
		$('.tag').eq(count-1).removeClass('focus');
		$('.tag').eq(count-1).addClass('dis');
	}
	function prevfocus(count){
		$('.tag').eq(count).removeClass('er404');
		$('.tag').eq(count-1).removeClass('dis');
		$('.tag').eq(count-1).addClass('focus');
		$('.tag').eq(count).removeClass('focus');
		$('.tag').eq(count).addClass('dis');
	}

	var count = 0;
	$('#prev').on('click', function(){
		debugger;
		if (count == 2) {
			$('#agree').prop('checked', false);
			prevfocus(count);
		}
		if (count == 1) {
			prevfocus(count);
		}
		// if (count == 3) {
		// 	prevfocus(count);
		// 	alert('aff');
		// 	count = 2;
		// }
		count--;
		if (count <= 0) {
			count = 0;
		}
		$('form').css({
			'display':'none',
		})
		$('form').eq(count).css({
			'display':'block',
		})
	})
	$('#next').on('click', function(){
		var start = end = 0;
		if (count == 0) {
			start = 0;
			end = 3;
		}
		if (count == 1) {
			start = 3;
			end = 8;
		}
		checknull($('.checknull'), start, end);
		if (aio($('.checknull'), start, end) == false || checkPass() == false) {
			count = 0;
		} else {
			if (count == 0) {
				focus(count+1);
			}
			// console.log(count);
			if (count == 2) {
				count = 1;
			}
			if (count == 1) {
				var age = parseInt($('#age').val());
				if (age < 18) {
					count = 1;
				} else {
					count = 2;
					focus(count);
				}
				if(checkName($('#fname').val())){
					$('#fname').prev().prev().text('Names cannot contain numbers.')
					$('#fname').prev().prev().css({
						'display':'block',
					})
					focus(1);
					count = 0;
				} else {
					$('#fname').prev().prev().css({
						'display':'none',
					})
				}
				if(checkName($('#lname').val())){
					$('#lname').prev().prev().text('Names cannot contain numbers.')
					$('#lname').prev().prev().css({
						'display':'block',
					})
					count = 0;
				} else {
					$('#lname').prev().prev().css({
						'display':'none',
					})
				}
				if(checkEmail($('#email').val())){
					$('#email').prev().prev().css({
						'display':'none',
					})
				} else {
					$('#email').prev().prev().text('Incorrect email format.')
					$('#email').prev().prev().css({
						'display':'block',
					})
					count = 0;
				}
			}
			count++;
			if (count == 2) {
				focus(count);
			}
			$('form').css({
				'display':'none',
			})
			$('form').eq(count).css({
				'display':'block',
			})
			if (count == 3) {
				$('#prev').on('click', function(){
					$('.tag').eq(count+2).removeClass('focus');
					$('.tag').eq(count+2).addClass('dis');
				})
				focus(count);
				$('.errorr').css({
					'display':'none',
				})
				if($('#agree').is(':checked')){
					alert('Submitted!');
					$('#agree').prop('checked', false);
					count = 0;
					$('form').css({
						'display':'none',
					})
					$('form').eq(count).css({
						'display':'block',
					})
					$('input').val('');
					$('.checknull').css({
						'background':'white',
					})
					$('.tag').removeClass('focus');
					$('.tag').removeClass('dis');
					$('.tag').eq(0).addClass('focus');
				} else {
					count = 2;
				}
			}
		}
	})
})