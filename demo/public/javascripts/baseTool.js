//是否为 app
base.inApp = function() {
	console.log('正在判断是否为App')
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/z11/i) == 'z11') {
		return true
	} else {
		return false
	}
}

//是否在微信中
base.isWeChat = function() {
	console.log('正在判断是否为微信')
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true
	} else {
		return false
	}
}

//是否在支付宝中
base.isAliPay = function() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/alipayclient/i) == 'alipayclient') {
		return true
	} else {
		return false
	}
}
// 是否在支付宝小程序中
base.isAliPayMini = function() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/alipayclient/i) == 'alipayclient' && ua.match(/miniprogram/i) == 'miniprogram') {
		return true
	} else {
		return false
	}
}

//手机号验证
base.isPhone = function(str) {
	var pattern = /^\d{11}$/
	if (pattern.test(str)) {
		return true
	} else {
		return false
	}
}

base.isJRApp = function() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.match(/jdjr/i) === 'jdjr') {
		return true
	}
	if (ua.match(/jdapp/i) === 'jdapp') {
		return true
	} else {
		return false
	}
}
base.isThirdApp = function() {
	var ua = navigator.userAgent.toLowerCase()
	if (ua.indexOf('jimi-thirdapp-') > -1) {
		return true
	} else {
		return false
	}
}

//是否是安卓
base.isAndroid = function() {
	var u = navigator.userAgent,
		isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 //android终端
	console.log('安卓机：' + isAndroid)
	return isAndroid
}

//请求报错
base.err = function(data) {
	console.log(data)
	base.msg('系统异常，请稍候再试！！')
}
//跳转详情页
base.goDetail = function(goodsId, orderId) {
	if (base.inApp()) {
		// eslint-disable-next-line no-restricted-globals
		location.href = 'leasegoods://' + goodsId
	} else {
		localStorage.goChoose = 3
		// eslint-disable-next-line no-restricted-globals
		location.href =
			base.JIMIH5 +
			'?channelName=' +
			base.channelName +
			'#/tab/leaseChoose/' +
			goodsId +
			'/' +
			(orderId || '')
	}
	return
}
base.ImgSlider = function(arr) {
	arr = arr || []
	var _parentNode = document.querySelector('.config_slider_box'),
		self = this
	if (!_parentNode) {
		alert('imgSlider html中必须有类为config_slider_box的父容器')
		return false
	}
	if (!arr instanceof Array) {
		alert('imgSlider入参必须为图片数组')
		return false
	}

	this.imgArr = arr //图片数组
	this.childHtml = '<ul class="img_list">' //子节点字符串表示
	this.touchHand = null //当前手指触点
	this.childImg = null //图片子节点集合
	this.childNum = null //索引子节点集合

	for (var i = 0; i < arr.length; i++) {
		if (i === 0)
			this.childHtml += `
        <li class="active"><img src="${arr[i]}"></li>
      `
		else
			this.childHtml += `
          <li><img src="${arr[i]}"></li>
      `
	}
	this.childHtml += '</ul><ul class="num_list"><li class="active"></li></ul>'

	_parentNode.innerHTML = this.childHtml

	//把父容器高度设置为第一张图片的高度
	var img = new Image()
	img.src = this.imgArr[0]
	img.onload = function() {
		var imgList = document.querySelector('.img_list'),
			height = (img.height * _parentNode.clientWidth) / img.width
		imgList.style.height = height + 'px'
	}

	this.getIndex = function() {
		for (var i = 0; i < this.childImg.length; i++) {
			if (this.childImg[i].className.indexOf('active') !== -1) {
				return i
			}
		}
	}

	this.childImg = document.querySelectorAll('.config_slider_box .img_list li')
	this.childNum = document.querySelector('.config_slider_box .num_list li')

	this.childNum.style.width = 100 / this.childImg.length + '%'

	//触碰开始
	function _onTouchStart(e, self) {
		e.preventDefault()
		// console.log('touchstart',e)
		self.touchStartX = e.changedTouches[0].clientX
		console.log(self.touchStartX)
	}

	//触碰移动
	// eslint-disable-next-line no-unused-vars
	function _onTouchMove(e) {
		e.preventDefault()
		// console.log('touchmove',e);
		// eslint-disable-next-line no-unused-vars
		var touchHand = e.changedTouches[0]
	}

	//触碰结束
	function _onTouchEnd(e, self) {
		e.preventDefault()
		// console.log('touchend',e,self);
		var touchEnd = e.changedTouches[0],
			startX = self.touchStartX,
			endX = touchEnd.clientX,
			showIndex = self.getIndex(),
			totalLength = self.childImg.length
		if (totalLength <= 1) {
			return
		}
		if (endX - startX >= 50) {
			//手指右移动，图片切左
			if (showIndex === 0) {
				self.childImg[showIndex].className = self.childImg[showIndex].className
					.split('active')
					.join('')
				self.childImg[totalLength - 1].className =
					self.childImg[totalLength - 1].className + ' active'

				self.childNum.style.marginLeft = 100 - 100 / totalLength + '%'
			} else {
				self.childImg[showIndex].className = self.childImg[showIndex].className
					.split('active')
					.join('')
				self.childImg[showIndex - 1].className =
					self.childImg[showIndex - 1].className + ' active'

				self.childNum.style.marginLeft = (100 / totalLength) * (showIndex - 1) + '%'
			}
		} else if (endX - startX <= -50) {
			//手指左移，图片切右
			if (showIndex === totalLength - 1) {
				self.childImg[showIndex].className = self.childImg[showIndex].className
					.split('active')
					.join('')
				self.childImg[0].className = self.childImg[0].className + ' active'

				self.childNum.style.marginLeft = 0
			} else {
				self.childImg[showIndex].className = self.childImg[showIndex].className
					.split('active')
					.join('')
				self.childImg[showIndex + 1].className =
					self.childImg[showIndex + 1].className + ' active'

				self.childNum.style.marginLeft = (100 / totalLength) * (showIndex + 1) + '%'
			}
		}
	}

	_parentNode.addEventListener(
		'touchstart',
		function(e) {
			_onTouchStart(e, self)
		},
		false
	)
	_parentNode.addEventListener(
		'touchend',
		function(e) {
			_onTouchEnd(e, self)
		},
		false
	)
}
