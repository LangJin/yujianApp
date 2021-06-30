
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/account/login/Login","pages/mine/index","pages/account/login/VerificationCode","pages/account/userInfo/ChooseSex","pages/account/userInfo/UserInfo","pages/index/personal/Personal","pages/index/inform/Inform","pages/index/inform/InformType","pages/dynamic/index","pages/dynamic/addDynamic/AddDynamic","pages/vip/VipCenter","pages/vip/rechargeRecord/RecordList","pages/setting/index","pages/setting/agreement/Agreement","pages/setting/updateInfo/UpdateInfo","pages/setting/interest/Interests","pages/mine/feedback/Feedback","pages/mine/callcenter/CallCenter","pages/mine/myDynamic/MyDynamic","pages/mine/wallet/Wallet","pages/setting/accountSecurity/AccountSecurity","pages/message/index","pages/message/favorite/Favorite","pages/message/giveALike/GiveALike","pages/message/system/SystemNotice","pages/message/dialog/DialogBox","pages/message/peopleOfSeeMe/PeopleOfSeeMe","pages/invite/InviteCenter","pages/invite/withdraw/WithdrawDeposit","pages/invite/withdrawRecords/WithdrawCashRecords","pages/invite/shareQRCode/QRCode","pages/invite/introPosters/IntroPosters","pages/download/WeChatDownload","pages/download/RegisterAndDownload"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#666666","selectedColor":"#333333","backgroundColor":"#FFFFFF","borderStyle":"white","list":[{"pagePath":"pages/index/index","iconPath":"static/images/mine/shouye_grey.png","selectedIconPath":"static/images/home/icon_shouye.png","text":"首页"},{"pagePath":"pages/dynamic/index","iconPath":"static/images/home/icon_xuexi.png","selectedIconPath":"static/images/mine/active_xuexi.png","text":"动态"},{"pagePath":"pages/message/index","iconPath":"static/images/home/icon_xiaoxi.png","selectedIconPath":"static/images/mine/active_xiaoxi.png","text":"消息"},{"pagePath":"pages/mine/index","iconPath":"static/images/home/icon_wode.png","selectedIconPath":"static/images/mine/active_wode.png","text":"我的"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"遇见","compilerVersion":"3.1.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/account/login/Login","meta":{},"window":{"navigationBarTitleText":"","navigationStyle":"custom"}},{"path":"/pages/mine/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/account/login/VerificationCode","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/account/userInfo/ChooseSex","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/account/userInfo/UserInfo","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/index/personal/Personal","meta":{},"window":{"navigationBarTitleText":"个人主页","navigationStyle":"custom"}},{"path":"/pages/index/inform/Inform","meta":{},"window":{"navigationBarTitleText":"举报","navigationStyle":"custom"}},{"path":"/pages/index/inform/InformType","meta":{},"window":{"navigationBarTitleText":"举报类型","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/dynamic/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"动态","navigationStyle":"custom","enablePullDownRefresh":true}},{"path":"/pages/dynamic/addDynamic/AddDynamic","meta":{},"window":{"navigationBarTitleText":"发布动态","navigationStyle":"custom"}},{"path":"/pages/vip/VipCenter","meta":{},"window":{"navigationBarTitleText":"VIP中心","navigationStyle":"custom"}},{"path":"/pages/vip/rechargeRecord/RecordList","meta":{},"window":{"navigationBarTitleText":"充值记录","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white","enablePullDownRefresh":true}},{"path":"/pages/setting/index","meta":{},"window":{"navigationBarTitleText":"设置","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/setting/agreement/Agreement","meta":{},"window":{"navigationBarTitleText":"软件协议","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/setting/updateInfo/UpdateInfo","meta":{},"window":{"navigationBarTitleText":"修改资料","navigationStyle":"custom"}},{"path":"/pages/setting/interest/Interests","meta":{},"window":{"navigationBarTitleText":"选择兴趣","navigationStyle":"custom"}},{"path":"/pages/mine/feedback/Feedback","meta":{},"window":{"navigationBarTitleText":"问题反馈","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/callcenter/CallCenter","meta":{},"window":{"navigationBarTitleText":"客服中心","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white","softinputMode":"adjustResize"}},{"path":"/pages/mine/myDynamic/MyDynamic","meta":{},"window":{"navigationBarTitleText":"我的动态","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/mine/wallet/Wallet","meta":{},"window":{"navigationBarTitleText":"钱包","navigationStyle":"custom"}},{"path":"/pages/setting/accountSecurity/AccountSecurity","meta":{},"window":{"navigationBarTitleText":"账号设置","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/message/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"消息","navigationBarBackgroundColor":"#FFFFFF","enablePullDownRefresh":true}},{"path":"/pages/message/favorite/Favorite","meta":{},"window":{"navigationBarTitleText":"我喜欢","navigationStyle":"custom"}},{"path":"/pages/message/giveALike/GiveALike","meta":{},"window":{"navigationBarTitleText":"点赞","navigationStyle":"custom"}},{"path":"/pages/message/system/SystemNotice","meta":{},"window":{"navigationBarTitleText":"遇见官方通知","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/message/dialog/DialogBox","meta":{},"window":{"navigationBarTitleText":"消息对话","navigationStyle":"custom","softinputMode":"adjustResize"}},{"path":"/pages/message/peopleOfSeeMe/PeopleOfSeeMe","meta":{},"window":{"navigationBarTitleText":"看过我的人","navigationBarBackgroundColor":"#FFFFFF"}},{"path":"/pages/invite/InviteCenter","meta":{},"window":{"navigationBarTitleText":"遇见 - 我的邀请","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white"}},{"path":"/pages/invite/withdraw/WithdrawDeposit","meta":{},"window":{"navigationBarTitleText":"支付宝提现","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white","titleNView":{"buttons":[{"text":"记录","fontSize":"14px"}]}}},{"path":"/pages/invite/withdrawRecords/WithdrawCashRecords","meta":{},"window":{"navigationBarTitleText":"提现记录","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white"}},{"path":"/pages/invite/shareQRCode/QRCode","meta":{},"window":{"navigationBarTitleText":"遇见 - 分享海报","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white"}},{"path":"/pages/invite/introPosters/IntroPosters","meta":{},"window":{"navigationBarTitleText":"遇见 - 如何分享","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white"}},{"path":"/pages/download/WeChatDownload","meta":{},"window":{"navigationBarTitleText":"微信下载","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white","titleNView":{"titleText":"遇见 - 交友APP","autoBackButton":"false","buttons":[{"type":"close","float":"left"}]}}},{"path":"/pages/download/RegisterAndDownload","meta":{},"window":{"navigationBarTitleText":"","navigationBarBackgroundColor":"#29282E","navigationBarTextStyle":"white"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});