// 处理自动换行排版，返回用来进行行列布局字段数组。结构为嵌套数组，第一层为行，第二层为行内字段；会缓存字段在原卡片中的索引以便于更新字段值时回溯
export const getTypesettingFields = (srcFields) => {
  let distRows = []
  let threshold = 0 // 自动换行排版的阈值，该值达到或超过4时，将换行并清0

  srcFields.forEach((fieldData, fieldIndex) => {
    const { widthLevel } = fieldData
    const toPushFieldData = { ...fieldData, fieldIndex } // 记录各字段排版前的原始索引，便于更新字段属性时回溯更新
    if (threshold === 0) { // 若当前阈值为0，则新起一行
      if (widthLevel !== 4) { threshold += widthLevel } // 若当前新起一行的表单域宽度等级为4，那么依然将阈值置0，否则阈值累加
      distRows.push([ toPushFieldData ])
    } else { // 若当前阈值不为0，则继续在当前行排列或者超过阈值后换行。这个 else 中当前阈值只有可能是 1，2，3
      const accumulatedThreshold = threshold + widthLevel // 当前阈值累加 widthLevel

      if ((accumulatedThreshold - 4) > 0) { // 情况A：当前行放不下，需要换行
        threshold = widthLevel === 4 ? 0 : widthLevel // 若表单域 widthLevel 满4则阈值清0
        distRows.push([ toPushFieldData ])
      } else if ((accumulatedThreshold - 4) === 0) { // 情况B：当前行刚好放满，放满后阈值清0
        threshold = 0
        distRows[distRows.length - 1].push(toPushFieldData) // 在最后一行中添加表单域数据
      } else { // 情况C： (accumulatedThreshold - 4) < 0，添加表单域后仍不满一行
        threshold = accumulatedThreshold
        distRows[distRows.length - 1].push(toPushFieldData) // 在最后一行中添加表单域数据
      }
    }
  })

  return distRows
}
