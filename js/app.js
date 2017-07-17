(function(win) {
        var docEl = win.document.documentElement;
        var time;
        function refreshRem() {
                var width = docEl.getBoundingClientRect().width;
                var clientWith=win.document.documentElement.clientWidth||win.document.body.clientWidth;
                //if (width > 750) { // 最大宽度
                //        width = 750;
                //}
                console.log(width,clientWith);
                var rem = width / 10; // 将屏幕宽度分成10份， 1份为1rem
                docEl.style.fontSize = rem + 'px';
                ///rem用font-size:75px来进行换算
        }
        win.addEventListener('resize', function() {//用户调整页面大小时触发
                clearTimeout(time);
                time = setTimeout(refreshRem, 1);
        }, false);
        win.addEventListener('pageshow', function(e) {//在每次触发网页时触发该事件，与onload作用相同
                //但是onload当从缓存中获取到页面时不触发，但是pageshow事件可以触发
                if (e.persisted) {//判断页面是否保存在往返缓存中,若存在则是true，表示是从缓存中获取的数据，需要重新改变页面的font-size
                                clearTimeout(time);
                                time = setTimeout(refreshRem, 1);
                        }
        }, false);
        refreshRem();
})(window);
//getBoundingClientRect()；该方法获得页面中某个元素的左，上，右和下分别相对浏览器视窗的位置，他返回的是一个对象，即Object,有6个属性 top 、bottom、right、left、width和height
//以前getBoundingClientRect()是IE特有的，目前FF3+，opera9.5+，safari 4，都已经支持这个方法。
//onpageshow 事件类似于 onload 事件，onload 事件在页面第一次加载时触发， onpageshow 事件在每次加载页面时触发，即 onload 事件在页面从浏览器缓存中读取时不触发。
//为了查看页面是直接从服务器上载入还是从缓存中读取，可以使用 PageTransitionEvent 对象的 persisted 属性来判断。 如果页面从浏览器的缓存中读取该属性返回 true，否则返回 false