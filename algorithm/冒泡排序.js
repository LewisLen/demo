const bubbleSort = (arr) => {
  let len = arr.length;
  for(let i = 0;i<len;i++){
    for(let j = 0;j<len -1 -i;j++){
      if (arr[j] > arr[j+1]) {        //相邻元素两两对比
          var temp = arr[j+1];        //元素交换
          arr[j+1] = arr[j];
          arr[j] = temp;
      }
    }
  }
  return arr;
}

// var arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
var arr = [3,  9,  2, 8, 6];
bubbleSort(arr);