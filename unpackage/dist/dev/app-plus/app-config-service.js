
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/login/login","pages/login/register","pages/login/fogotpw","pages/login/retrievepw","pages/Index_Recommend/Index_Hot","pages/DynamicPage/dynamic","pages/MessageCenter/MessageCenter","pages/Mypage/mypage","pages/Mypage/identificationPage/identification","pages/Mypage/identificationPage/identificate1","pages/Mypage/identificationPage/coserIdenticate","pages/Mypage/identificationPage/photoIdentificate","pages/Mypage/myStarList/myStarList","pages/Mypage/myPic/myPic","pages/Mypage/reset/reset","pages/Mypage/homePage/homePage","pages/DynamicPage/dynamic","pages/Mypage/myWishList/myWishList","pages/works/myWish","pages/ContentReleasePage/ContentReleasePage","pages/search/search","pages/search/searchRes","pages/ContentReleasePage/postDynamic","pages/ContentReleasePage/postWorks","pages/MessageCenter/collectmsg","pages/MessageCenter/newattentionmsg","pages/MessageCenter/commitandat","pages/pictureOrder/addorder","pages/PopCoser/PopCoser","pages/MessageCenter/dialogpage","pages/MessageCenter/cos-dialog-ordermsg","pages/pictureOrder/coser/cosorder","pages/pictureOrder/photographer/phorder","pages/PopCoser/PopCoser","pages/PopCoser/StayInCoserList","pages/PhotoSquare/AppoinentRecommend","pages/PhotoSquare/PhotographerList","pages/CostumeAndMakeup/CostumePage","pages/HotActivities/EventsPage","pages/HotActivities/EventDetailPage","pages/HotActivities/CosCollectionsPage","pages/HotActivities/CoserHirePage","pages/HotActivities/CollectionContentPage","pages/CostumeAndMakeup/MakeUpPage","pages/works/works"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F2A3C3","backgroundColor":"rgba(240, 240, 240, 0.4)"},"tabBar":{"color":"#737373","selectedColor":"#F85D9F","iconWidth":"22px","backgroundColor":"#FFFFFF","borderStyle":"white","list":[{"pagePath":"pages/Index_Recommend/Index_Hot","text":"首页","iconPath":"static/tabbar/index.png","selectedIconPath":"static/tabbar/indexed.png"},{"pagePath":"pages/DynamicPage/dynamic","text":"动态","iconPath":"static/tabbar/dynamic.png","selectedIconPath":"static/tabbar/dynamiced.png"},{"pagePath":"pages/MessageCenter/MessageCenter","text":"消息","iconPath":"static/tabbar/message.png","selectedIconPath":"static/tabbar/messaged.png"},{"pagePath":"pages/Mypage/mypage","text":"我的","iconPath":"static/tabbar/my.png","selectedIconPath":"static/tabbar/myed.png"}],"midButton":{"iconPath":"static/tabbar/released.png","width":"90px","height":"56px","iconWidth":"35px"}},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"Ayaya","compilerVersion":"3.1.4","entryPagePath":"pages/login/login","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/login/login","meta":{"isQuit":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/register","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/fogotpw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/login/retrievepw","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3"}},{"path":"/pages/Index_Recommend/Index_Hot","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","navigationStyle":"custom","enablePullDownRefresh":false}},{"path":"/pages/DynamicPage/dynamic","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的关注"}},{"path":"/pages/MessageCenter/MessageCenter","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息中心","enablePullDownRefresh":false}},{"path":"/pages/Mypage/mypage","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationStyle":"custom","background":"#FBFBFB"}},{"path":"/pages/Mypage/identificationPage/identification","meta":{},"window":{"navigationBarTitleText":"身份认证","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Mypage/identificationPage/identificate1","meta":{},"window":{"navigationBarTitleText":"实名认证","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Mypage/identificationPage/coserIdenticate","meta":{},"window":{"navigationBarTitleText":"Coser认证","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Mypage/identificationPage/photoIdentificate","meta":{},"window":{"navigationBarTitleText":"摄影师认证","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Mypage/myStarList/myStarList","meta":{},"window":{"navigationBarTitleText":"我的收藏夹","navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleColor":"#272727"}}},{"path":"/pages/Mypage/myPic/myPic","meta":{},"window":{"titleNView":{"searchInput":{"placeholder":"搜索我的订单","disabled":"true","borderRadius":"90rpx","backgroundColor":"#F9F9F9"}}}},{"path":"/pages/Mypage/reset/reset","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/Mypage/homePage/homePage","meta":{},"window":{"navigationStyle":"custom"}},{"path":"/pages/Mypage/myWishList/myWishList","meta":{},"window":{"navigationBarTitleText":"我的心愿"}},{"path":"/pages/works/myWish","meta":{},"window":{"navigationBarTitleText":"我的心愿"}},{"path":"/pages/ContentReleasePage/ContentReleasePage","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"backgroundColor":"transparent","titleNView":false}},{"path":"/pages/search/search","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/search/searchRes","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false,"navigationStyle":"custom"}},{"path":"/pages/ContentReleasePage/postDynamic","meta":{},"window":{"navigationBarTitleText":"动态","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleSize":"20px","buttons":[{"float":"right","text":"发布","fontSize":"16px"}]}}},{"path":"/pages/ContentReleasePage/postWorks","meta":{},"window":{"navigationBarTitleText":"作品","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleSize":"20px","buttons":[{"float":"right","text":"发布","fontSize":"16px"}]}}},{"path":"/pages/MessageCenter/collectmsg","meta":{},"window":{"navigationBarTitleText":"赞和收藏","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleSize":"20px"}}},{"path":"/pages/MessageCenter/newattentionmsg","meta":{},"window":{"navigationBarTitleText":"新增关注","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleSize":"20px"}}},{"path":"/pages/MessageCenter/commitandat","meta":{},"window":{"navigationBarTitleText":"评论和@","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","titleNView":{"titleSize":"20px"}}},{"path":"/pages/pictureOrder/addorder","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/PopCoser/PopCoser","meta":{},"window":{"navigationBarTitleText":"人气Cos榜","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/MessageCenter/dialogpage","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/MessageCenter/cos-dialog-ordermsg","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/pictureOrder/coser/cosorder","meta":{},"window":{"navigationStyle":"custom","background":"rgba(240, 240, 240, 0.4)"}},{"path":"/pages/pictureOrder/photographer/phorder","meta":{},"window":{"navigationStyle":"custom","background":"rgba(240, 240, 240, 0.4)"}},{"path":"/pages/PopCoser/StayInCoserList","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/PhotoSquare/AppoinentRecommend","meta":{},"window":{"navigationBarTitleText":"约拍广场","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/PhotoSquare/PhotographerList","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/CostumeAndMakeup/CostumePage","meta":{},"window":{"navigationBarTitleText":"服妆","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","navigationBarTextStyle":"white"}},{"path":"/pages/HotActivities/EventsPage","meta":{},"window":{"navigationBarTitleText":"热门活动","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/HotActivities/EventDetailPage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/HotActivities/CosCollectionsPage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/HotActivities/CoserHirePage","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false}},{"path":"/pages/HotActivities/CollectionContentPage","meta":{},"window":{"navigationBarTitleText":"热门活动","navigationBarBackgroundColor":"#F2A3C3","enablePullDownRefresh":false,"navigationBarTextStyle":"white"}},{"path":"/pages/CostumeAndMakeup/MakeUpPage","meta":{},"window":{"navigationBarTitleText":"服妆","enablePullDownRefresh":false,"navigationBarBackgroundColor":"#F2A3C3","navigationBarTextStyle":"white"}},{"path":"/pages/works/works","meta":{},"window":{"navigationStyle":"custom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
