
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/login/register","pages/login/fogotpw","pages/login/retrievepw","pages/Index_Recommend/Index_Hot","pages/DynamicPage/DynamicPage","pages/MessageCenter/MessageCenter","pages/ContentReleasePage/ContentReleasePage","pages/MyPage/MyPage","pages/search/search","pages/search/searchRes","pages/Index_Recommend/Index_part","pages/PopCoser/PopCoser","pages/PopCoser/StayInCoserList","pages/PhotoSquare/AppoinentRecommend","pages/PhotoSquare/PhotographerList","pages/CostumeAndMakeup/CostumePage","pages/HotActivities/EventsPage","pages/HotActivities/EventDetailPage","pages/HotActivities/CosCollectionsPage","pages/HotActivities/CoserHirePage","pages/HotActivities/CollectionContentPage","pages/CostumeAndMakeup/MakeUpPage"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#00ff00"},"tabBar":{"color":"#101010","selectedColor":"#F85D9F","backgroundColor":"#FFFFFF","list":[{"pagePath":"pages/Index_Recommend/Index_Hot","text":"首页","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexed.png"},{"pagePath":"pages/DynamicPage/DynamicPage","text":"动态","iconPath":"static/tabbar/dynamic.png","selectedIconPath":"static/tabbar/dynamiced.png"},{"pagePath":"pages/MessageCenter/MessageCenter","text":"消息","iconPath":"static/tabbar/message.png","selectedIconPath":"static/tabbar/messaged.png"},{"pagePath":"pages/MyPage/MyPage","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/myed.png"}],"midButton":{"iconPath":"static/tabbar/released.png","height":"70px","iconWidth":"50px"}},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Ayaya","compilerVersion":"3.1.7","entryPagePath":"pages/HotActivities/EventsPage","entryPageQuery":"","realEntryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/fogotpw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/retrievepw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/Index_Recommend/Index_Hot","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/DynamicPage/DynamicPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/MessageCenter/MessageCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/ContentReleasePage/ContentReleasePage","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/MyPage/MyPage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/search/searchRes","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/Index_Recommend/Index_part","meta":{},"window":{"navigationStyle":"custom","enablePullDownRefresh":false,"navigationBarTitleText":""}},{"path":"/pages/PopCoser/PopCoser","meta":{},"window":{"navigationBarTitleText":"人气Cos榜","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/PopCoser/StayInCoserList","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/PhotoSquare/AppoinentRecommend","meta":{},"window":{"navigationBarTitleText":"约拍广场","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/PhotoSquare/PhotographerList","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/CostumeAndMakeup/CostumePage","meta":{},"window":{"navigationBarTitleText":"服妆","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","navigationBarTextStyle":"white"}},{"path":"/pages/HotActivities/EventsPage","meta":{},"window":{"navigationBarTitleText":"热门活动","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/HotActivities/EventDetailPage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/HotActivities/CosCollectionsPage","meta":{},"window":{"navigationBarTitleText":"热门活动","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/HotActivities/CoserHirePage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/HotActivities/CollectionContentPage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/CostumeAndMakeup/MakeUpPage","meta":{},"window":{"navigationBarTitleText":"服妆","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
