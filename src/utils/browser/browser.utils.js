export const isPopupBlocked = () => {
  var popupWindow = window.open(null, "", "width=100", "height=100");

  try {
    popupWindow.close();
    return false;
  }
  
  catch (error) {
    return true;
  }
};