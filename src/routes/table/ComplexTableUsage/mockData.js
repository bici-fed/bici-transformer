/**
 * @File: 复杂表格用例 模拟数据
 */

// 第 1~10 条模拟表格行数据
const queueData10 = [{
  detectionTime: '2018-03-01',
  deadDate: '2018-03-08',
  detectionNo: '24-202-1139',
  address: '成都',
  detectionTech: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十',
  budget: 102498235.34,
  weight: 4512983832.123,
  person: 'Roc.an',
	status: '未检测',
	detectionRange: 6,
  result: '失败',
  operation: '待定'
}, {
  detectionTime: '2018-03-02',
  deadDate: '2018-03-04',
  detectionNo: '21-110-8431',
  address: '北京',
  detectionTech: '病原学检测技术，病原体分离培养与接种技术',
  budget: 0,
  weight: 0,
  person: 'Tom',
	status: '已检测',
	detectionRange: 2,
  result: '成功',
  operation: '待定'
}, {
  detectionTime: '2018-03-03',
  deadDate: '2018-03-10',
  detectionNo: '46-920-8421',
  address: '北京',
  detectionTech: '病原学检测技术，病原体分离培养与接种技术',
  budget: 100.23,
  weight: 2000.323,
  person: 'Tom',
	status: '已检测',
	detectionRange: 1,
  result: '成功',
  operation: '待定'
}, {
  detectionTime: '2018-03-04',
  deadDate: '2018-03-12',
  detectionNo: '98-104-9872',
  address: '武汉',
  detectionTech: '消毒与灭菌技术，培养基的制备技术，病原微生物培养与接种技术',
  budget: 2342.23,
  weight: 982123.323,
  person: 'Tom',
	status: '未检测',
	detectionRange: 8,
  result: '失败',
  operation: '待定'
}, {
  detectionTime: '2018-03-05',
  deadDate: '2018-05-21',
  detectionNo: '62-824-8212',
  address: '天津',
  detectionTech: '消毒与灭菌技术',
  budget: 3464562.00,
  weight: 123325.843,
  person: 'Roc.an',
	status: '已检测',
	detectionRange: 6,
  result: '失败',
  operation: '待定'
}, {
  detectionTime: '2018-03-06',
  deadDate: '2018-09-01',
  detectionNo: '62-324-1212',
  address: '杭州',
  detectionTech: '消毒与灭菌技术，病原体分离培养与接种技术',
  budget: 0.00,
  weight: 0.000,
  person: 'Ben',
	status: '已检测',
	detectionRange: 6,
  result: '成功',
  operation: '待定'
}, {
  detectionTime: '2018-03-07',
  deadDate: '2019-10-10',
  detectionNo: '32-989-5532',
  address: '杭州',
  detectionTech: '',
  budget: 0.00,
  weight: 0.000,
  person: 'Roc.An',
	status: '未检测',
	detectionRange: 8,
  result: '成功',
  operation: '待定'
}, {
  detectionTime: '2018-03-08',
  deadDate: '2019-10-12',
  detectionNo: '88-032-4542',
  address: '绵阳',
  detectionTech: '病原学检测技术，病原体分离培养与接种技术',
  budget: 320.10,
  weight: 9193333.810,
  person: 'Ben',
	status: '未检测',
	detectionRange: 6,
  result: '失败',
  operation: '待定'
}, {
  detectionTime: '2018-03-09',
  deadDate: '2018-01-01',
  detectionNo: '62-912-9381',
  address: '北京',
  detectionTech: '病原学检测技术',
  budget: 464.22,
  weight: 284728749.000,
  person: 'Ben',
	status: '已检测',
	detectionRange: 6,
  result: '失败',
  operation: '待定'
}, {
  detectionTime: '2018-03-10',
  deadDate: '2018-03-04',
  detectionNo: '92-112-3491',
  address: '北京',
  detectionTech: '消毒与灭菌技术，培养基的制备技术，病原微生物培养与接种技术',
  budget: 214.22,
  weight: 749.120,
  person: 'Tom',
	status: '已检测',
	detectionRange: 10,
  result: '失败',
  operation: '待定'
}]

// 获取第 11~20、21~30、31~40 条数据
function getQueueData(flag) {
  let lastDetectionDate, month, baseNum
  switch (flag) {
    case 2:
      lastDetectionDate = '2018-03-20'
      month = 3
      baseNum = 1
      break
    case 3:
      lastDetectionDate = '2018-03-30'
      month = 3
      baseNum = 2
      break
    case 4:
      lastDetectionDate = '2018-04-10'
      month = 4
      baseNum = 0
      break
    default:
  }
  return queueData10.map((item, index) => {
    return {
      ...item,
      detectionTime: index === 9 ? lastDetectionDate : `2018-0${month}-${baseNum}${index + 1}`
    }
  })
}

// 临时
export const dataSource = queueData10

// 第 11~20、21~30、31~40 条模拟表格行数据
const queueData20 = getQueueData(2)
const queueData30 = getQueueData(3)
const queueData40 = getQueueData(4)

export const dataSource10 = queueData10
export const dataSource20 = queueData10.concat(queueData20)
export const dataSource30 = queueData10.concat(queueData20, queueData30)
export const dataSource40 = queueData10.concat(queueData20, queueData30, queueData40)

// 负责人 筛选数据
export const personFilters = [{
  name: 'Roc.an',
  id: 'p1'
}, {
  name: 'Tom',
  id: 'p2'
}, {
  name: 'Tony',
  id: 'p3'
}, {
  name: 'Ben',
  id: 'p4'
}]

// export const personFilters = ['Roc.an', 'Tom', 'Tony', 'Ben']

// 检测状态 筛选数据
export const statusFilters = [{
  text: '未检测',
  value: 0
}, {
  text: '检测中',
  value: 1
}, {
  text: '已检测',
  value: 2
}]

// 检测地点 筛选数据
export const addressSelectData = [{
  id: 0,
  name: '北京'
}, {
  id: 1,
  name: '天津'
}, {
  id: 2,
  name: '成都'
}, {
  id: 3,
  name: '武汉'
}, {
  id: 4,
  name: '乌鲁木齐'
}, {
  id: 5,
  name: '海南'
}]
