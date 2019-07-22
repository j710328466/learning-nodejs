// eslint-disable-next-line no-unused-vars
function appoint() {
	// eslint-disable-next-line no-unused-vars
	var info = 0,
		goodsName = 'act_预约商品名称',
		goodsId = 'act_预约商品Id',
		goodsPrice = 'act_预约商品价格' / 100,
		goodsInfoUrl = 'act_规格头图片',
		imgArr = act_预约商品图片列表,
		endTime = 'act_结束时间'.replace(/-/g, '/'),
		goodsInfo = act_预约商品信息,
		appointId = 'act_预约模块Id',
		// eslint-disable-next-line no-unused-vars
		activityBaseId = 'act_活动Id',
		data = {
			versionsName: 'act_规格一',
			versions: 'act_一内容'.split(','),
			colorName: 'act_规格二',
			color: 'act_二内容'.split(','),
			storageName: 'act_规格三',
			storage: 'act_三内容'.split(','),
			leaseNum: 'act_租期'.split(','),
		}
	// eslint-disable-next-line no-restricted-globals
	activityType = location.pathname
		.split('/')
		.pop()
		.split('.')[0]

	base.selectArr = [] //保存已选中规格参数

	//滑动切图
	new base.ImgSlider(imgArr)

	//商品名称
	$('.goods_name').text(goodsName)
	$('.price_num').text(goodsPrice + '元预约')
	//展示预约规格
	standardList(data, goodsInfoUrl)

	//显示默认选项
	defaultSelect()

	//获取预约活动基本信息
	getAppointNum()

	//设置倒计时
	var date = new Date(endTime)
	$('.start_time').text(
		date.getFullYear() +
			'年' +
			(date.getMonth() + 1) +
			'月' +
			date.getDate() +
			'日' +
			' ' +
			date.getHours() +
			':' +
			(date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()) +
			':' +
			(date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds())
	)
	getCountDown(+new Date(endTime))

	eventList()

	//获取预约活动基本信息
	function getAppointNum() {
		var url = base._4999 + '/api/crm/appointment/appointNum/' + appointId
		base.ajax(url, null, function(res) {
			if (res.code == 200) $('.called').text((res.data || 0) + '人已预约')
		})
	}
	//展示预约规格
	function standardList(data, headerUrl) {
		$('.preLease_modal .header').attr('src', headerUrl)
		var html = ''

		html += `
      <li>
        <span>${data.versionsName}</span>

        <ul class="standard_item" data-index="0">
          ${showItem(data.versions)}
        </ul>
      </li>
    `

		html += `
      <li>
        <span>${data.colorName}</span>

        <ul class="standard_item" data-index="1">
          ${showItem(data.color)}
        </ul>
      </li>
    `

		html += `
      <li>
        <span>${data.storageName}</span>

        <ul class="standard_item" data-index="2">
          ${showItem(data.storage)}
        </ul>
      </li>
    `

		html += `
      <li>
        <span>租期</span>

        <ul class="standard_item" data-index="3">
          ${showItem(data.leaseNum, 'duration')}
        </ul>
      </li>
    `
		$('.standard_list').html(html)

		$('.standard_item li').on('click', selectTab)
		function showItem(versionArr = [], set) {
			if (set === 'duration') {
				var html = ''
				versionArr.forEach(function(obj) {
					html += obj !== '' ? `<li>${obj}个月</li>` : ''
				})
				return html
			} else {
				return versionArr
					.map(function(obj) {
						return obj !== '' ? `<li>${obj}</li>` : ''
					})
					.join('')
			}
		}
	}

	//选择规格标签事件
	function selectTab() {
		//点击置灰和已被选中tab
		if ($(this).hasClass('gay') || $(this).hasClass('active')) {
			return
		}
		//变更选中状态视图
		$(this)
			.addClass('active')
			.siblings()
			.removeClass('active')

		//更新选中状态数据
		base.selectArr = []
		// eslint-disable-next-line array-callback-return
		$('.standard_item li.active').map(function(i, obj) {
			base.selectArr.push($(obj).text())
		})
		//更新置灰状态
		toGay()
	}

	//更新置灰状态
	function toGay() {
		$('.standard_item li:not(.gay,.active)').addClass('gay')
		var $lis = $('.standard_item li.gay')
		for (var i = 0; i < $lis.length; i++) {
			var index = $($lis[i])
					.parent()
					.data().index,
				newSelect = [].concat(base.selectArr)
			newSelect[index] = $($lis[i]).text()

			for (var j = 0; j < goodsInfo.length; j++) {
				var obj = goodsInfo[j]
				if (
					(!obj.ruleFirstContent || obj.ruleFirstContent === newSelect[0]) &&
					(!obj.ruleSecondContent || obj.ruleSecondContent === newSelect[1]) &&
					(!obj.ruleThirdContent || obj.ruleThirdContent === newSelect[2]) &&
					(!obj.leaseNum || obj.leaseNum + '个月' === newSelect[newSelect.length - 1])
				) {
					$($lis[i]).removeClass('gay')
				}
			}
		}
	}

	//显示默认选项
	function defaultSelect(data) {
		var obj = goodsInfo[0]
		// eslint-disable-next-line array-callback-return
		$('.standard_item li').map(function(i, ele) {
			var $text = ele.innerHTML
			if (
				$text === obj.ruleFirstContent ||
				$text === obj.ruleSecondContent ||
				$text === obj.ruleThirdContent ||
				// eslint-disable-next-line radix
				parseInt($text) === Number(obj.leaseNum)
			) {
				$(ele).addClass('active')
				base.selectArr.push($text)
			}
		})
		toGay()
	}

	//获取倒计时时间
	function getCountDown(date) {
		var now = +new Date(),
			timeline = Math.floor((date - now) / 1000),
			h = Math.floor(timeline / 3600),
			m = Math.floor((timeline % 3600) / 60),
			s = Math.floor(timeline % 60)
		if (timeline <= 0) {
			h = m = s = '0'
		}

		$('.hour').text(h >= 10 ? h : '0' + h)
		$('.minute').text(m >= 10 ? m : '0' + m)
		$('.second').html(s >= 10 ? s : '0' + s)

		if (h == 0 && m == 0 && s == 0) {
			base.canLease = true
			$('#showPreModal').text('立即开抢')
			return
		}
		base.timer = setTimeout(function() {
			getCountDown(date)
		}, 1000)
	}

	//确认预约
	function markOrder() {
		if (base.userId === '') {
			$('.login_model').css('display', 'block')
			return
		}
		var url = base._4999 + '/api/crm/appointment/joinAppoint',
			p = {
				goodsId: goodsId,
				appointId: appointId,
				activityType: activityType,
				goodsName: goodsName,
				goodsPrice: goodsPrice,
				ruleFirst: '',
				ruleFirstContent: base.selectArr[0] || '',
				ruleSecond: '',
				ruleSecondContent: base.selectArr[1] || '',
				ruleThird: '',
				ruleThirdContent: base.selectArr[2] || '',
				leaseNum: base.selectArr[3] || '',
				userId: base.userId,
				phone: base.phone,
				endTime: new Date(endTime),
				goodsUrl: imgArr[0],
			}
		base.ajax(url, p, function(res) {
			if (res.data !== 'false') {
				$('.result_model').addClass('show')
			} else {
				base.msg('你已预约过该商品！')
			}
		})
	}
	//注册事件
	function eventList() {
		//立即预约
		$('#showPreModal').on('click', function() {
			if (base.canLease) {
				//跳转详情页
				base.goDetail(goodsId)
				return
			}

			$('.preLease_modal').css('visibility', 'visible')
			$('.standard_box').removeClass('hide')
			base.openMask()
		})

		//确认预约
		$('#btn_mark').on('click', markOrder)

		//关闭规格模态框
		$('.preLease_modal').on('click', function(e) {
			if (e.target.className.indexOf('preLease_modal') !== -1) {
				$('.standard_box').addClass('hide')
				setTimeout(function() {
					$('.preLease_modal').css('visibility', 'hidden')
				}, 300)

				base.closeMask()
			}
		})

		//我的预约
		$('.btn_myOrder').on('click', function() {
			if (base.flavor == 1 || base.flavor == 2) {
				// eslint-disable-next-line no-restricted-globals
				location.href = 'https://product.jimistore.com/activity/temp/myPreOrder.html'
			} else {
				// eslint-disable-next-line no-restricted-globals
				location.href =
					'http://jmproduct.oss-cn-hangzhou.aliyuncs.com/activity/temp/myPreOrder.html'
			}
		})

		//继续逛逛
		$('.return_index').on('click', function() {
			// eslint-disable-next-line no-restricted-globals
			if (base.inApp() && history.length <= 1) {
				// eslint-disable-next-line no-restricted-globals
				location.href = 'exitWeb://'
			} else {
				// eslint-disable-next-line no-restricted-globals
				history.go(-1)
			}
		})
	}
}
