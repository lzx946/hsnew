/*********配置********/
const isTest = process.env.NODE_ENV == 'test';
const config = {
	// IP:"http://192.168.1.105:8081",
	IP: isTest ? "http://y24584r997.zicp.vip" : "http://13.59.102.146:8080/hs",
	//DOMIN:"http://gjj.weixin.guojiajun.top",
	DOMIN:"http://y24584r997.zicp.vip",
	//IP: "http://121.40.130.50:8099/hs",
//	IP: "http://192.168.1.103:8080",
	PhoneIp:"http://www.ecebs.eu:8100"
//	PhoneIp:"http://localhost"
//	IP: "http://localhost:8080/"
	
}
/********************/

export {
	config
}