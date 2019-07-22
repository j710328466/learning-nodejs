//微信分享
base.wxConfig = function(callback) {
	$('.container').append(
		$(
			'<img src="https://product.jimistore.com/manual/b3c2jjtwY6rGeGDT7KfRKmGijSfAN7kS" class="shareModel" style="position:fixed;top:0;left:0;display:none">'
		)
	)
	$('.shareModel').on('click', function() {
		$(this).css('display', 'none')
	})
	var url = base._4999 + '/api/weixin/jsConfig'
	base.ajax(url, null, function(data) {
		base.debug(data, url)
		if (data.code == 200) {
			// shareUrl = data.url;
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: data.data.appId, // 必填，公众号的唯一标识
				timestamp: data.data.timestamp, // 必填，生成签名的时间戳
				nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
				signature: data.data.signature, // 必填，签名，见附录1
				jsApiList: [
					'checkJsApi', // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					'onMenuShareTimeline',
					'onMenuShareAppMessage',
					'onMenuShareQQ',
					'onMenuShareWeibo',
					'hideMenuItems',
				],
			})
			// if(base.getParams('debug') == 'true') {
			//     wx.checkJsApi({
			//         jsApiList: [
			//             'checkJsApi',  // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			//             'onMenuShareTimeline',
			//             'onMenuShareAppMessage',
			//             'onMenuShareQQ',
			//             'onMenuShareWeibo',
			//             'hideMenuItems'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
			//         success: function (res) {
			//             alert(res);
			//             alert(3);
			//             // 以键值对的形式返回，可用的api值true，不可用为false
			//             // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
			//         },
			//         complete: function (res) {
			//             alert('chekComp')
			//         }
			//     });
			// }
			callback && callback()
		}
	})
}
//分享回调
base.shareSuc = function(res) {
	if (base.flavor == 1 || base.flavor == 2) {
		if (base.isAliPay()) {
			if (res.shareResult === true) {
				base.msg('分享成功')
			}
		} else if (base.isWeChat()) {
			base.msg('完成分享')
		} else if (base.inApp()) {
		}
	} else {
		alert('分享回调：' + JSON.stringify(res))
	}
}
//分享配置
base.shareConfig = function(title, desc, detail, imgUrl, origin, alipayTitle) {
	if (base.isAliPay()) {
		// alert('进入支付宝配置');
		//支付宝分享配置
		base.alipayShareParams = {
			title: alipayTitle || title, //分享标题
			content: desc, //分享内容
			// eslint-disable-next-line no-restricted-globals
			url: location.origin + location.pathname + '?channelName=xysh&origin=' + origin, //分享链接
			image: imgUrl, //分享图片链接
			showToolBar: false, //是否显示第二排
		}
	}
	if (base.isWeChat()) {
		base.wxConfig()
		wx.ready(function() {
			wx.hideMenuItems({
				menuList: [
					'menuItem:copyUrl', //复制链接
					'menuItem:openWithSafari', //在safari发开
					'menuItem:openWithQQBrowser', //在QQ浏览器中打开
					'',
				], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
			})

			wx.onMenuShareTimeline({
				title: detail,
				link:
					// eslint-disable-next-line no-restricted-globals
					location.origin +
					// eslint-disable-next-line no-restricted-globals
					location.pathname +
					'?channelName=weixinShare&origin=' +
					origin,
				imgUrl: imgUrl,
				success: base.shareSuc,
			})
			wx.onMenuShareAppMessage({
				title: title,
				desc: desc,
				link:
					// eslint-disable-next-line no-restricted-globals
					location.origin +
					// eslint-disable-next-line no-restricted-globals
					location.pathname +
					'?channelName=weixinShare&origin=' +
					origin,
				imgUrl: imgUrl,
				success: base.shareSuc,
			})
			wx.onMenuShareQQ({
				title: title,
				desc: desc,
				link:
					// eslint-disable-next-line no-restricted-globals
					location.origin +
					// eslint-disable-next-line no-restricted-globals
					location.pathname +
					'?channelName=weixinShare&origin=' +
					origin,
				imgUrl: imgUrl,
			})
			wx.onMenuShareWeibo({
				title: title,
				desc: desc,
				link:
					// eslint-disable-next-line no-restricted-globals
					location.origin +
					// eslint-disable-next-line no-restricted-globals
					location.pathname +
					'?channelName=weixinShare&origin=' +
					origin,
				imgUrl: imgUrl,
				success: base.shareSuc,
			})
			wx.onMenuShareQZone({
				title: title,
				desc: desc,
				link:
					// eslint-disable-next-line no-restricted-globals
					location.origin +
					// eslint-disable-next-line no-restricted-globals
					location.pathname +
					'?channelName=weixinShare&origin=' +
					origin,
				imgUrl: imgUrl,
				success: base.shareSuc,
			})
		})
	}
	if (base.inApp()) {
		//app分享
		// eslint-disable-next-line no-restricted-globals
		var url = location.origin + location.pathname + '?channelName=appShare&origin=' + origin,
			component =
				'{"url":"' +
				url +
				'","title":"' +
				title +
				'","content":"' +
				desc +
				'","thumbnail":"' +
				imgUrl +
				'"}'
		// var component = '{"url":"' + url + '","title":"' + title + '","content":"' + content + '","thumbnail":"'+thumbnail+'","callback":"base.alt"}';
		base.appCode = encodeURIComponent(component)
	}
}
//分享处理
base.doShare = function() {
	if (base.inApp()) {
		//app分享
		window.location.assign('toshare://' + base.appCode)
	} else if (base.isWeChat()) {
		//微信分享
		$('.shareModel').css('display', 'block')
		base.openMask()
	} else if (base.isAliPay()) {
		// alert(JSON.stringify(base.alipayShareParams));
		ap.share(base.alipayShareParams, function(res) {
			base.shareSuc(res)
		})
	} else {
		//外部浏览器
		// eslint-disable-next-line no-restricted-globals
		location.href = 'https://www.jimistore.com/download.html'
	}
}
