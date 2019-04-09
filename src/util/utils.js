/**
 * 邮箱格式验证
 */
var tsamaEmailReg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
var tsamaPhoneReg= new RegExp("^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8}$");
var CheckObject = {
	tsamaEmailReg: tsamaEmailReg,
	tsamaPhoneReg: tsamaPhoneReg
}
export {
	CheckObject
}