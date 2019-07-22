var base = window.base
base.deviceId = '' // 设备编号

base.channelName = '' // 渠道编号
base.channel = '' //三方渠道
base.userId = '' //用户id
base.userName = '' //用户名
base.phone = '' //用户手机
base._4999 = '' //接口域名
base._3999 = ''
base._100 = ''
base.origin = ''
base.authExist = ''
base.shareFlag = true
if (base.flavor == 0) {
	base._4999 = 'http://common-api.test.jimistore.com'
	base._100 = 'http://lease-api.test.jimistore.com'
	base._user = 'http://jimi-user-api.test.jimistore.com'
	base.JIMIH5 = 'http://h5.test.jimistore.com'
	base.password = 'VnYtmBmVYzqGLHiYfV9tKLsQiTa4w2mL'
	//复租
	base.visitAddress = '/api/activityConfig/c2722e0a612f44ecb0b397bffbc39a7c'
} else if (base.flavor == 1) {
	base._4999 = 'https://common.jimistore.com'
	base._user = 'https://jimi-user-api.jimistore.com'
	base._100 = 'https://lease.jimistore.com'
	base.JIMIH5 = 'https://h5.jimistore.com'
	base.password = '9IrVERv1XM8wC581vlxegVFrzhtZ0MxI'
	//复租
	base.visitAddress = '/api/activityConfig/0ab8b5ca069448fca2cdd32a67d7ca20'
} else if (base.flavor == 2) {
	base._4999 = 'https://testcommon.jimistore.com'
	base._100 = 'https://testlease.jimistore.com'
	base._user = 'https://jimi-testuser.jimistore.com'
	base.visitAddress = '/api/activityConfig/0ab8b5ca069448fca2cdd32a67d7ca20'
	base.JIMIH5 = 'https://jimi-h5.jimistore.com'
	base.password = '9IrVERv1XM8wC581vlxegVFrzhtZ0MxI'
} else if (base.flavor == 3) {
	base._4999 = 'http://common-api.dev.jimistore.com'
	base._100 = 'http://lease-api.dev.jimistore.com'
	base._user = 'http://jimi-user-api.dev.jimistore.com'
	base.JIMIH5 = 'http://h5.dev.jimistore.com'
	base.password = 'VnYtmBmVYzqGLHiYfV9tKLsQiTa4w2mL'
}
// eslint-disable-next-line no-unused-vars
var $phone,
	// eslint-disable-next-line no-unused-vars
	$sms,
	$modal,
	$ = window.$

base.init = function() {
	$phone = $('#phone')
	$sms = $('#sms')
	$modal = $('.modal')
	base.channelName = base.getParams('channelName')
	base.hideHome = base.getParams('hideHome')
	if (base.isAliPay()) {
		base.authExist = base.getParams('authExist')
		base.openId = base.getParams('alipayUserId')
		base.channel = 'alipay'
	}
	if (base.isWeChat()) {
		base.authExist = base.getParams('authExist')
		base.openId = base.getParams('openid')
		base.channel = 'wx'
	}
	$modal.on('click', function(e) {
		if (e.target.className.indexOf('modal') != -1) {
			$modal.css('display', 'none')
			base.closeMask()
		}
	})
	//插入msg节点
	var $msgContainer = $('<div class="model_msg"></div>')
	$('.container').before($msgContainer)
	$msgContainer.css({
		position: 'fixed',
		top: '40%',
		left: '20%',
		width: '50%',
		padding: '0.533333rem',
		backgroundColor: 'rgba(0,0,0,.7)',
		color: '#fff',
		textAlign: 'center',
		borderRadius: '0.16rem',
		fontSize: '0.4rem',
		opacity: '1',
		transition: 'all 3s linear',
		display: 'none',
		zIndex: '1000',
	})
}

//验证码倒计时
base.setCount = function(obj, callback) {
	var self = obj,
		count = 60,
		t
	self.html(count + 's')
	self.off('click')

	t = setInterval(function() {
		if (count <= 1) {
			clearInterval(t)
			self.html('重新获取')
			self.on('click', function() {
				if (callback) {
					callback(self)
				} else {
					base.isLogined(self)
				}
			})
			return
		}
		self.html(--count + 's')
	}, 1000)
}

//签名请求
base.ajax = function(url, params, suc, err, async) {
	var m_password = base.password,
		m_appid = 'jimih5',
		m_userId = base.userId || '',
		m_deviceId = localStorage.deviceId || base.createUuid(),
		m_OSVersion = navigator.platform,
		// eslint-disable-next-line radix
		m_timestamp = parseInt(new Date().getTime() / 1000),
		m_sceneType = base.sceneType()
	var type = params ? 'POST' : 'GET'
	if (typeof params != 'string') {
		params = JSON.stringify(params)
	}
	if (url.indexOf('?') >= 0) {
		url = url + '&t=' + new Date().getTime()
	} else {
		url = url + '?t=' + new Date().getTime()
	}
	// eslint-disable-next-line no-array-constructor
	var source = new Array()
	source.push(m_appid + '=appId')
	source.push(m_password + '=password')
	source.push(m_timestamp + '=timestamp')
	source.push(m_userId + '=userId')
	source.push(m_deviceId + '=deviceId')
	source.push(m_OSVersion + '=OSVersion')
	source.sort()

	var m_signature = $.md5(source.join('&'))
	var headers = {
		'Content-Type': 'application/json;charset=utf-8',
		appId: m_appid,
		deviceId: m_deviceId,
		userId: m_userId,
		OSVersion: m_OSVersion,
		timestamp: m_timestamp,
		signature: m_signature,
		sceneType: m_sceneType,
		verifyVersion: '2.0',
		token: localStorage.token || '',
	}
	if (base.inApp() && navigator.userAgent.indexOf('jimiVersion2.0') === -1) {
		headers.verifyVersion = '1.0'
	}
	if (base.getParams('debug') == 'true') {
		alert(JSON.stringify(headers))
	}
	$.ajax({
		url: url,
		type: type,
		dataType: 'json',
		headers: headers,
		async: async != 'false',
		data: params,
		success: function(data) {
			if (suc) {
				var msg = data.code ? data : typeof data === 'object' ? data : $.parseJSON(data)

				if (msg.code == 200) {
					base.debug(msg, url)
					suc(msg)
				} else {
					if (err) {
						err(msg)
					} else {
						base.debug(msg, url)
					}
				}
			}
		},
		error: function(data) {
			if (base.getParams('debug') === 'true') {
				alert(url + JSON.stringify(data))
			} else {
				base.msg('网络异常')
			}
		},
	})
}
//获取url中的参数
base.getParams = function(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		results = regex.exec(window.location.search)
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '))
}

//3.2新接口获取验证码
base.getSms = function(dom) {
	var self = $(dom),
		phone = $('#phone')
			.val()
			.replace(/\s*/g, ''),
		url = base._user + '/api/user/service/getSmsVerifyCode/v1',
		params = { phone: phone, smsVerifyType: 'login' }
	if (!phone) {
		base.msg('请输入手机号', 2000)
		return
	}
	if (!base.isPhone(phone)) {
		base.msg('请输入正确手机号', 2000)
		return false
	}
	params = JSON.stringify(params)
	base.ajax(
		url,
		params,
		function(data) {
			if (data.code == '200') {
				// console.dir(data);
				base.msg('验证码已发送', 2000)
				// self.off('click');
				base.setCount(self, base.getSms)
			} else {
				base.msg(data.message, 2000)
			}
		},
		function(data) {
			console.log(data)
		}
	)
}

//验证码登录
base.toLogin = function(callback) {
	var dom = $('.login_model')
	var self = $(this),
		url = base._user + '/api/user/service/login/sms/v2',
		phone = $('#phone')
			.val()
			.replace(/\s*/g, ''),
		code = $('#sms').val() || '',
		params = {
			phone: phone,
			smsVerifyCode: code,
			channel: base.channelName,
		}
	if (base.inApp() && navigator.userAgent.indexOf('jimiVersion2.0') === -1) {
		url = base._user + '/api/user/service/login/sms/v1'
	}
	//第三方注册
	if (base.authExist == '0') {
		url = base._user + '/api/user/service/thirdpartyRegister/v2'
		params = {
			phone: phone,
			code: code,
			channelName: base.channelName,
			channel: base.channel,
			openid: base.openId,
			nickName: base.getParams('name'),
			headImg: base.getParams('headImageUrl'),
		}
	}
	self.off('click')
	params = JSON.stringify(params)

	if (!phone) {
		base.msg('请输入手机号', 2000)
		return
	}
	if (!base.isPhone(phone)) {
		base.msg('请输入正确手机号', 2000)
		return false
	}
	if (code == '') {
		base.msg('请输入验证码', 2000)
		return false
	}
	base.ajax(url, params, function(data) {
		if (data.code === '200') {
			base.userId = data.data.userId || ''
			base.userName = data.data.name || ''
			base.phone = data.data.phone || ''
			dom && dom.css('display', 'none')
			base.closeMask()
			localStorage.deviceId = data.data.deviceId || ''
			localStorage.token = data.data.token || ''
			var params = {
				userID: base.userId,
				deviceID: localStorage.deviceId,
				token: localStorage.token,
			}
			if (base.inApp()) {
				if (navigator.userAgent.indexOf('jimiVersion2.0') > -1) {
					base.appHandle('setUserLoginV2', JSON.stringify(params))
				} else {
					window.location.href = 'register://' + base.userId + '&' + localStorage.deviceId
				}
			}
			var str = JSON.stringify({
				userId: base.userId,
				phone: phone,
				userName: data.data.name,
			})
			str = encodeURIComponent(str)
			document.cookie = 'userInfo=' + str + ';path=/;'
			localStorage.userInfo = JSON.stringify(data.data)

			callback && callback(data.data.isRegist)
		} else {
			base.msg(data.message, 2000)
		}
	})
	return true
}

//showMsg黑色弹框
base.msg = function(str, time) {
	console.warn('进入baseMsg')
	var msg = $('.model_msg')
	msg.html(str).css('display', 'block')
	setTimeout(function() {
		msg.css('display', 'none')
	}, time || 2000)
}
//是否登录
base.isLogin = function() {
	if (base.userId === '') {
		return false
	} else {
		return true
	}
}
//处理cookie
base.getCookie = function(str) {
	var useObj = {}
	var cArr = document.cookie.split(';')
	for (var i = 0; i < cArr.length; i++) {
		var key = cArr[i].split('=')[0].replace(' ', '')
		var value = cArr[i].split('=')[1]
		useObj[key] = value
	}
	return useObj[str]
}
//第三方标识
base.sceneType = function() {
	var sceneType
	if (base.inApp()) {
		sceneType = base.isAndroid() ? 'jimiAndroid' : 'jimiIos'
	} else {
		if (base.isThirdApp()) {
			sceneType = 'thirdpartyApp'
		} else if (base.isJRApp()) {
			sceneType = 'jdJr'
		} else if (base.isAliPayMini()) {
			sceneType = 'alipayMiniPrograms'
		} else if (base.isAliPay()) {
			sceneType = 'alipayClient'
		} else if (base.isWeChat()) {
			sceneType = 'wxClient'
		} else {
			sceneType = 'wap'
		}
	}
	return sceneType
}
//app注册事件
base.appHandle = function(name, callback) {
	//注册获取用户信息事件并执行
	if (navigator.userAgent.search(/Android|Adr/gi) > -1) {
		//Android
		window.MiGuJsInjectCore[name](callback)
	} else {
		//IOS
		window.webkit.messageHandlers[name].postMessage(callback)
	}
}
//自己生成uuid
base.createUuid = function() {
	var d = new Date().getTime()
	var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random() * 16) % 16 | 0
		d = Math.floor(d / 16)
		return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
	})
	localStorage.deviceId = uuid
	return uuid
}
//获取渠道名和userId
base.getMessage = function(callback) {
	if (base.isWeChat()) {
		//微信静默登录
		localStorage.wxOid = base.getParams('wxOid')
		base.channelName = base.getParams('channelName') || 'weixin'
		if (base.authExist === '') {
			//微信授权
			var url = base._user + '/api/user/auth/getUserInfoGrantUrl/v2',
				params = {
					channel: 'wx',
					callback: window.location.href,
				}
			base.ajax(
				url,
				params,
				function(res) {
					base.debug(res)
					if (res.code === '200') {
						window.location.href = res.data
					}
				},
				null,
				'true'
			)
			return
		} else {
			base.userId = base.getParams('userId')
			base.openId = base.getParams('openid')
			base.authExist = base.getParams('authExist')
			base.uid = base.getParams('openid')
			base.phone = base.getParams('phone')
			base.userName = base.getParams('name')
			base.headImgUrl = base.getParams('headImgUrl')
			localStorage.deviceId = base.getParams('deviceId')
			localStorage.token = base.getParams('token')
			var str = JSON.stringify({
				userId: base.userId,
				phone: base.phone,
				openId: base.openId,
				uid: base.uid,
				authExist: base.authExist,
				deviceId: localStorage.deviceId,
				userName: base.userName,
				headImageUrl: base.headImageUrl,
			})
			str = encodeURIComponent(str)
			document.cookie = 'userInfo=' + str + ';path=/;'
			callback && callback()
		}
	}
	// else if(base.isAliPay()){
	//
	//   //支付宝静默登录
	//   base.channelName = base.getParams('channelName') || 'xysh';
	//   if(base.authExist === ''){
	//     //支付宝授权
	//     var url = base._user + '/api/user/auth/getUserInfoGrantUrl/v1',
	//       params = {
	//         channel:'alipay',
	//         callback:location.href
	//       };
	//     base.ajax(url,params,function(res){
	//       base.debug(res);
	//       if(res.code === '200'){
	//         location.href = res.data;
	//       }
	//     },null,'true');
	//     return
	//   }else {
	//       base.userId = base.getParams('userId');
	//       callback && callback()
	//   }
	// }
	else if (base.isAliPayMini()) {
		base.channelName = base.getParams('channelName') || 'alipayminiprogram'
		my.postMessage({ type: 'requestUserInfo' })
		my.onMessage = function(data) {
			// ** 判断用户是否授权 **
			if (data.user && data.user.userId) {
				// ** 已授权 **
				base.userId = data.user.userId || ''
				base.userName = data.user.name || ''
				base.phone = data.user.phone || ''
				localStorage.deviceId = data.user.deviceId || ''
				localStorage.token = data.user.token || ''
				var str = JSON.stringify({
					userId: base.userId,
					phone: data.user.phone,
					userName: data.user.name,
				})
				str = encodeURIComponent(str)
				document.cookie = 'userInfo=' + str + ';path=/;'
				localStorage.userInfo = JSON.stringify(data.user)
			} else {
				// ** 未授权 **
			}
			callback && callback()
		}
	} else if (base.inApp()) {
		//获取app用户信息
		base.channelName = base.getParams('channelName') ? base.getParams('channelName') : 'app'
		//
		var promise = new Promise(function(resolve, reject) {
			base.getAppUser = function(res) {
				res = JSON.parse(res || '{}')
				base.debug(res)
				if (res.code === '200') {
					var data = res.data || {}
					base.userId = data.userId || ''
					base.phone = data.phone
					localStorage.setItem('deviceId', data.deviceId)
					localStorage.token = data.token || ''
					resolve()
				} else {
					reject()
				}
			}
			//注册获取用户信息事件并执行
			if (navigator.userAgent.indexOf('jimiVersion2.0') > -1) {
				base.appHandle('requestUserInfoV2', '{"callback":"base.getAppUser"}')
			} else {
				base.appHandle('requestUserInfo', '{"callback":"base.getAppUser"}')
			}
		})
		promise.then(
			function() {
				callback && callback()
			},
			function() {
				alert('获取app用户信息报错')
			}
		)
	} else {
		//h5获取cookie用户信息
		base.channelName = base.getParams('channelName') ? base.getParams('channelName') : 'h5'
		//判断浏览器是否启用了cookie
		if (navigator.cookieEnabled) {
			var userInfo = base.getCookie('userInfo')
		} else {
			window.alert('你的浏览器不支持cookie') //提示浏览器不支持cookie
			// eslint-disable-next-line no-redeclare
			var userInfo = ''
		}

		if (userInfo) {
			userInfo = decodeURIComponent(userInfo)
			userInfo = JSON.parse(userInfo)
			base.userId = typeof userInfo === 'object' ? userInfo.userId : ''
			base.userName = typeof userInfo === 'object' ? userInfo.userName : ''
			base.phone = typeof userInfo === 'object' ? userInfo.userPhone : ''
		}

		callback && callback()
	}
	localStorage.channelName = base.channelName
}

//解放窗口
base.closeMask = function(top) {
	console.log('closeMask')
	$('body').css({
		position: 'static',
	})
	window.scrollTo(0, top || base.top)
}

//固定窗口
base.openMask = function() {
	console.log('openMask')
	base.top = window.pageYOffset
	$('body').css({
		position: 'fixed',
		top: '-' + base.top + 'px',
	})
}

//自定义log
base.debug = function(data, url) {
	if (base.getParams('debug') == 'true') {
		alert(url + JSON.stringify(data))
		return
	} else {
		if (data.code != 200) {
			base.msg(data.message || '网络异常，请稍后再试')
		}
	}
	if (data.code === '403' || data.code === '40101') {
		base.msg(data.message || '网络异常，请稍后再试')
		base.openMask()
		$('.login_model').css('display', 'block')
		$('.login').css('display', 'block')
		return
	}
	if (base.flavor !== 1) {
		console.log(url)
		console.log(data)
	}
}
