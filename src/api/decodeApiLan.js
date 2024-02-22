const decodeApiLan = function (resp, lanArr) {
  if(typeof resp == "object" && resp != null && resp != undefined)
    {
      Object.keys(resp).forEach(function(index){
        let item = resp[index];
        if(typeof item == "object")
        {
          resp[index] = decodeApiLan(item, lanArr);
        }else if(typeof item == "string")
        {
          if(item.indexOf("KEY#") != -1)
          {
            let value = item.substring(4, item.length);
            if(value.indexOf("|") != -1) //需要替换值
            {
              let arr = value.split("|");
              let key = arr[0];
              let source = lanArr[key];
              if(source != undefined)
              {
                resp[index] = source;
                for (let i = 0; i < (arr.length - 1); i++) {
                  let v = arr[i+1];
                  if(v.indexOf("KEY#") != -1)
                  {
                    let k = v.substring(4, v.length)
                    resp[index] = resp[index].replace("#{"+i+"}", lanArr[k]);
                  }else {
                    resp[index] = resp[index].replace("#{"+i+"}", v);
                  }
                }
              }
            }else
            {
              resp[index] = lanArr[value];
            }
            
          }
        }
      });
    }

    return resp;
}
export default decodeApiLan;