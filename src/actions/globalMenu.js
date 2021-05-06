import * as actionTypes from '../constants/actionTypes'

export const saveSliderMenuCollapsed = (isCollapsed) => {
  return {
    type: actionTypes.SAVE_SLIDER_MENU_COLLAPSED,
    isCollapsed
  }
}
