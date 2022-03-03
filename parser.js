function scheduleHtmlParser(html) {
    //除函数名外都可编辑
    //传入的参数为上一步函数获取到的html
    //可使用正则匹配
    //可使用解析dom匹配，工具内置了$，跟jquery使用方法一样，直接用就可以了，参考：https://juejin.im/post/5ea131f76fb9a03c8122d6b9
    let $ = cheerio.load(html, {decodeEntities: false});
//以下为示例，您可以完全重写或在此基础上更改
    let result = new Array();

    for (let row = 2; row <= 6; row++) {
        let col=row%2==0?3:2;
        let colEnd=row%2==0?7:6;

        for (; col <= colEnd; col++) {

            const tdSelector = $("body > div > center > div > center > table > tbody > tr:nth-child(" + row + ") > td:nth-child(" + col + ")");
            /*   if (tdSelector.html() != "&nbsp;" ) {*/
            let re = {sections: [], weeks: []};
            re.name = tdSelector.html().split("<br>")[0];
            re.position = tdSelector.html().split("<br>")[3];
            re.teacher = tdSelector.html().split("<br>")[2];

            if(re.teacher!==undefined){
                if(tdSelector.html().split("<br>")[1].split("")[4]===")"){
                    for (let i = 1; i <= 16; i++) {
                        re.weeks.push(i);
                    }
                }else if(tdSelector.html().split("<br>")[1].split("")[5]==="单"){
                    for (let i = 1; i <= 16; i+=2) {
                        re.weeks.push(i);
                    }
                }else if(tdSelector.html().split("<br>")[1].split("")[5]==="双"){
                    for (let i = 2; i <= 16; i+=2) {
                        re.weeks.push(i);
                    }
                }
            }


            re.day=row % 2 === 0?col - 2:col - 1;
            /*    if (row % 2 === 0) {
                    re.day = col - 2;
                } else {
                    re.day = col - 1;
                }*/

            re.sections.push(row - 1);
            if(re.teacher!==undefined){
                result.push(re);
            }
            /* }*/
        }
        console.log(result);
    }
    return result;
}
