var txtUsername = document.getElementById('username');
var txtPass = document.getElementById('pass');
var txtChck = document.getElementById('chckId');
var fnChck = ()=>{
    let errs = {
		nameErr: "",
		passErr: "",
		chck: 0,
	};
    if (txtUsername.value.length < 6 || txtUsername.value.length > 30) {
		errs['nameErr'] = 'Username phải lớn 6 và nhỏ hơn 30 ký tự';
	}

    if (txtPass.value.length < 6 || txtPass.value.length > 30) {
		errs['passErr'] = 'Pass phải lớn 6 và nhỏ hơn 30 ký tự';
	}

    if (txtChck != 1) {
		errs['chck'] = 'Bạn phải đồng ý với điều khoản';
	}
    showErrs(errs)
    
}

var showErrs = (errs)=>{
    for (let [key, value] of Object.entries(errs)){
        let errSpan = document.getElementById(key)
        errSpan.innerText = value
        
    }
}

var validInputs = document.querySelectorAll('.validInput');
validInputs.forEach((input) => {
    input.onkeydown = e => {
        fnChck()
    }
});
