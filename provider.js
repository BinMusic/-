

function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {//函数名不要动
    // 以下可编辑
    alert("如果显示上一学期课程，清除小爱的应用数据即可");
    document.cookie = "jcrj%5Fxueqi=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    const ifrs = dom.getElementsByTagName("iframe");
    const frs = dom.getElementsByTagName("frame");
    if (ifrs.length) {
        for (let i = 0; i < ifrs.length; i++) {
            const dom = ifrs[i].contentDocument.body.parentElement;
            iframeContent += getPageHtml(iframeContent, frameContent, dom);
        }
    }
    if (frs.length) {
        for (let i = 0; i < frs.length; i++) {
            const dom = frs[i].contentDocument.body.parentElement;
            frameContent += getPageHtml(iframeContent, frameContent, dom);
        }
    }
    if (!ifrs.length && !frs.length) {
        return dom.querySelector('body').outerHTML
    }
    if (dom === document) {
        return document.getElementsByTagName('html')[0].innerHTML + iframeContent + frameContent
    }
    return iframeContent + frameContent;
}


