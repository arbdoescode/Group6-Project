export const convertToDropDown = (par) => {
  var ret = [];
  var paramArray = par;

  for (var i in paramArray) {
    var objItem = { value: "", label: "" };
    objItem.value = paramArray[i];
    objItem.label = paramArray[i];
    ret.push(objItem);
  }

  return ret;
};

export const thousands_separators = (num) => {
  var num_parts = num.toString().split(".");
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return num_parts.join(".");
};
