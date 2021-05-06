/**
 * @File: 面包屑导航条工具函数
 */
//在数组中查找所有出现的x，并返回一个包含匹配索引的数组
export function findIndexes(list, target) {
  let results = []
  let index = 0
  while (index < list.length) {
    index = list.indexOf(target, index)
    if (index === -1) {
      //未找到就退出循环完成搜索
      break
    }
    results.push(index) //找到就存储索引
    index += 1 //并从下个位置开始搜索
  }
  return results
}

export function findAllIndex(list, targets) {
  targets = [...new Set(targets)]
  let results = []
  targets.forEach((item) => {
    results = results.concat(findIndexes(list, item))
  })
  return results
}
