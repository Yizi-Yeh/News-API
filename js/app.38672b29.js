(function(e){function t(t){for(var c,u,o=t[0],l=t[1],i=t[2],d=0,f=[];d<o.length;d++)u=o[d],Object.prototype.hasOwnProperty.call(r,u)&&r[u]&&f.push(r[u][0]),r[u]=0;for(c in l)Object.prototype.hasOwnProperty.call(l,c)&&(e[c]=l[c]);s&&s(t);while(f.length)f.shift()();return a.push.apply(a,i||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],c=!0,o=1;o<n.length;o++){var l=n[o];0!==r[l]&&(c=!1)}c&&(a.splice(t--,1),e=u(u.s=n[0]))}return e}var c={},r={app:0},a=[];function u(t){if(c[t])return c[t].exports;var n=c[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=c,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var c in e)u.d(n,c,function(t){return e[t]}.bind(null,c));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var i=0;i<o.length;i++)t(o[i]);var s=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0468":function(e,t,n){"use strict";n("d3f5")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var c=n("7a23"),r=n("ca1e"),a=n.n(r),u={class:"load-box"},o=Object(c["m"])("img",{class:"load",src:a.a},null,-1);function l(e,t,n,r,a,l){var i=Object(c["M"])("router-view");return Object(c["D"])(),Object(c["i"])(c["b"],null,[Object(c["cb"])(Object(c["m"])("div",u,[o],512),[[c["Y"],!r.isLoad]]),Object(c["m"])(i)],64)}var i=n("5c40"),s=n("5502"),d={components:{},setup:function(){var e=Object(s["b"])(),t=Object(i["g"])({get:function(){return e.getters.isLoad},set:function(t){e.commit("setcurrIsLoad",t)}}),n=function(){console.log(1),e.dispatch("fetchNews").then(e.commit("setcurrIsLoad",!0),console.log(2))};return Object(i["E"])((function(){n()})),{isLoad:t}}};n("8351");d.render=l;var f=d,b=n("6c02"),m=(n("4e82"),n("a4d3"),n("e01a"),Object(c["fb"])("data-v-61cdc096"));Object(c["G"])("data-v-61cdc096");var j={class:"load-box"},O=Object(c["m"])("img",{class:"load",src:a.a},null,-1),p=Object(c["m"])("h1",{class:"title"},"News API",-1),g=Object(c["m"])("hr",null,null,-1),v={class:"block"},h=Object(c["l"])("查詢"),y={class:"block"},w=Object(c["l"])(" -- "),_=Object(c["l"])("篩選"),N={style:{padding:"14px"}},M={class:"title"},D=Object(c["m"])("br",null,null,-1),I={class:"content"},x=Object(c["m"])("br",null,null,-1),k=Object(c["l"])("See Details"),S={class:"bottom"},T={key:0},L=Object(c["m"])("br",null,null,-1),C=Object(c["m"])("h4",null,"Copyright 2021 all rights reserved",-1);Object(c["E"])();var z=m((function(e,t,n,r,a,u){var o=Object(c["M"])("el-header"),l=Object(c["M"])("el-pagination"),i=Object(c["M"])("el-col"),s=Object(c["M"])("el-row"),d=Object(c["M"])("el-input"),f=Object(c["M"])("el-button"),b=Object(c["M"])("el-date-picker"),z=Object(c["M"])("el-option"),V=Object(c["M"])("el-select"),q=Object(c["M"])("el-card"),B=Object(c["M"])("el-main"),P=Object(c["M"])("el-footer"),Y=Object(c["M"])("el-container"),A=Object(c["N"])("focus");return Object(c["D"])(),Object(c["i"])(c["b"],null,[Object(c["cb"])(Object(c["m"])("div",j,[O],512),[[c["Y"],!e.isLoad]]),Object(c["cb"])(Object(c["m"])(Y,null,{default:m((function(){return[Object(c["m"])(o,null,{default:m((function(){return[p,g]})),_:1}),Object(c["m"])(s,null,{default:m((function(){return[Object(c["m"])(i,null,{default:m((function(){return[Object(c["m"])(l,{medium:"",layout:"prev, pager, next",total:50,onCurrentChange:e.setPage},null,8,["onCurrentChange"])]})),_:1})]})),_:1}),Object(c["m"])(B,null,{default:m((function(){return[Object(c["m"])(s,{class:"search-wrapper",gutter:5},{default:m((function(){return[Object(c["m"])(i,{lg:6,md:8,sm:12,xs:24,justify:"center"},{default:m((function(){return[Object(c["m"])("div",v,[Object(c["cb"])(Object(c["m"])(d,{icon:"search",type:"text",placeholder:"請輸入關鍵字",modelValue:e.query,"onUpdate:modelValue":t[1]||(t[1]=function(t){return e.query=t})},null,8,["modelValue"]),[[A]]),Object(c["m"])(f,{type:"primary",size:"medium",icon:"search",onClick:t[2]||(t[2]=function(t){return e.submitInput()})},{default:m((function(){return[h]})),_:1})])]})),_:1}),Object(c["m"])(i,{lg:10,md:12,sm:12,xs:24},{default:m((function(){return[Object(c["m"])("div",y,[Object(c["m"])(b,{modelValue:e.date.startTime,"onUpdate:modelValue":t[3]||(t[3]=function(t){return e.date.startTime=t}),type:"date","value-format":e.yyyy-e.MM-e.dd,"disabled-date":e.disabledDate,placeholder:"選擇開始時間",format:"YYYY 年 MM 月 DD 日"},null,8,["modelValue","value-format","disabled-date"]),w,Object(c["m"])(b,{modelValue:e.date.endTime,"onUpdate:modelValue":t[4]||(t[4]=function(t){return e.date.endTime=t}),type:"date","value-format":e.yyyy-e.MM-e.dd,"disabled-date":e.disabledDate,format:"YYYY 年 MM 月 DD 日",placeholder:"選擇結束時間"},null,8,["modelValue","value-format","disabled-date"]),Object(c["m"])(f,{type:"primary",size:"medium",icon:"search",onClick:t[5]||(t[5]=function(t){return e.selectDate()})},{default:m((function(){return[_]})),_:1})])]})),_:1}),Object(c["m"])(i,{lg:4,md:6,sm:6,xs:24},{default:m((function(){return[Object(c["m"])(V,{modelValue:e.sort.data.value,"onUpdate:modelValue":t[6]||(t[6]=function(t){return e.sort.data.value=t}),placeholder:"選擇排序"},{default:m((function(){return[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(e.sort.data,(function(e){return Object(c["D"])(),Object(c["i"])(z,{key:e.value,label:e.label,value:e.value},null,8,["label","value"])})),128))]})),_:1},8,["modelValue"])]})),_:1})]})),_:1}),Object(c["m"])(s,{gutter:3},{default:m((function(){return[(Object(c["D"])(!0),Object(c["i"])(c["b"],null,Object(c["K"])(e.pagedNewsData,(function(t){return Object(c["D"])(),Object(c["i"])(i,{xs:24,sm:12,md:8,key:t},{default:m((function(){return[Object(c["m"])(q,{class:"card"},{default:m((function(){return[Object(c["m"])("img",{src:t.urlToImage,class:"card-img"},null,8,["src"]),Object(c["m"])("div",N,[Object(c["m"])("h3",M,Object(c["Q"])(t.title),1),D,Object(c["m"])("div",I,[Object(c["m"])("h4",null,Object(c["Q"])(t.description.substring(0,60))+" ...more",1),x,Object(c["m"])(f,{type:"text",small:"",onClick:function(n){return e.readMore(t.publishedAt)}},{default:m((function(){return[k]})),_:2},1032,["onClick"]),Object(c["m"])("div",S,[t.author?(Object(c["D"])(),Object(c["i"])("span",T,"Author："+Object(c["Q"])(t.author),1)):Object(c["j"])("",!0),Object(c["m"])("span",null,Object(c["Q"])(t.publishedAt.substring(0,10)),1),L])])])]})),_:2},1024)]})),_:2},1024)})),128))]})),_:1})]})),_:1}),Object(c["m"])(P,null,{default:m((function(){return[C]})),_:1})]})),_:1},512),[[c["Y"],e.isLoad]])],64)})),V=(n("99af"),n("fb6a"),n("a15b"),n("4de4"),n("caad"),n("2532"),n("ac1f"),n("5319"),n("4d63"),n("25f0"),n("bc3a")),q=n.n(V),B=n("3dd1"),P=n.n(B),Y=Object(c["n"])({name:"News",setup:function(){var e=Object(b["c"])(),t=Object(s["b"])(),n=Object(c["g"])({get:function(){return t.getters.isLoad},set:function(e){t.commit("setcurrIsLoad",e)}}),r=Object(c["g"])({get:function(){return t.getters.query},set:function(e){t.commit("setcurrQuery",e)}}),a=Object(c["g"])({get:function(){return t.getters.date},set:function(e){t.commit("setcurrDate",e),console.log(e)}}),u=Object(c["g"])({get:function(){return t.getters.sort},set:function(e){t.commit("setcurrSort",e)}}),o=Object(c["g"])({get:function(){return t.getters.currNewsId},set:function(e){t.commit("setcurrNewsId",e)}}),l=Object(c["g"])((function(){return t.getters.pageSize})),i=Object(c["g"])((function(){return t.getters.page})),d=Object(c["g"])((function(){return t.getters.pagedNewsData})),f=function(e){t.commit("setPages",e)};Object(c["Z"])((function(){return u.value.data.value}),(function(e){q.a.get("https://newsapi.org/v2/everything?q=".concat(r.value,"&pageSize=100&from=").concat(a.value.startTime,"&to=").concat(a.value.endTime,"&sortBy=").concat(e,"&apiKey=ee91784129d14f3aa19dd854211221a3")).then((function(e){e.data.status?(P.a.fire({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,icon:"success",title:"篩選成功"}),t.commit("setNews",e.data.articles)):console.log(e.data.message)})).catch((function(e){console.log(e.data.message)}))}));var m=function(e){return e.getTime()>Date.now()};function j(e){var t=new Date(e),n=("0"+(t.getMonth()+1)).slice(-2),c=("0"+t.getDate()).slice(-2);return[t.getFullYear(),n,c].join("-")}var O=function(){if(a.value.startTime&&a.value.endTime){var e=j(a.value.startTime),n=j(a.value.endTime);q.a.get("https://newsapi.org/v2/everything?q=".concat(r.value,"&pageSize=100&from=").concat(e,"&to=").concat(n,"&sortBy=").concat(u.value.value,"&apiKey=ee91784129d14f3aa19dd854211221a3")).then((function(c){c.data.status?(P.a.fire({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,icon:"success",title:"篩選成功"}),t.commit("setNews",c.data.articles),console.log(e),console.log(n)):console.log(c.data.message)})).catch((function(e){console.log(e.data.message)}))}else P.a.fire({toast:!0,position:"top",showConfirmButton:!1,timer:2e3,icon:"error",title:"請選擇時間區間"})},p=function(){if(r.value)return q.a.get("https://newsapi.org/v2/everything?q=".concat(r.value,"&pageSize=100&from=").concat(a.value.startTime,"&to=").concat(a.value.endTime,"&sortBy=").concat(u.value.value,"&apiKey=ee91784129d14f3aa19dd854211221a3")).then((function(e){e.data.status?(P.a.fire({toast:!0,position:"top",showConfirmButton:!1,timer:1e3,icon:"success",title:"查詢成功"}),t.commit("setNews",e.data.articles)):console.log(e.data.message)})).catch((function(e){console.log(e.data.message)}));P.a.fire({toast:!0,position:"top",showConfirmButton:!1,timer:2e3,icon:"error",title:"請輸入關鍵字"})},g=function(n){var c=n;console.log(c),t.commit("setcurrNewsId",c),e.push("/".concat(c))},v=Object(c["g"])((function(e){return d.value.filter((function(e){return e.title.includes(r)})),e.replace(new RegExp(r.value,"g"),'<h2 class="keyword">'.concat(r.value,"</h2>"))}));return{isLoad:n,query:r,sort:u,date:a,readMore:g,disabledDate:m,selectDate:O,submitInput:p,pageSize:l,page:i,setPage:f,pagedNewsData:d,currNewsId:o,queryHighlight:v}}});n("a42c");Y.render=z,Y.__scopeId="data-v-61cdc096";var A=Y,Q=(n("b0c0"),Object(c["fb"])("data-v-10064724"));Object(c["G"])("data-v-10064724");var K=Object(c["m"])("br",null,null,-1),E=Object(c["m"])("h1",null,"Title:",-1),U=Object(c["m"])("hr",null,null,-1),G=Object(c["m"])("br",null,null,-1),J=Object(c["m"])("br",null,null,-1);Object(c["E"])();var F=Q((function(e,t,n,r,a,u){var o=Object(c["M"])("el-page-header"),l=Object(c["M"])("el-header"),i=Object(c["M"])("el-col"),s=Object(c["M"])("el-row"),d=Object(c["M"])("el-main"),f=Object(c["M"])("el-container");return r.currNews?(Object(c["D"])(),Object(c["i"])(f,{key:0},{default:Q((function(){return[Object(c["m"])(l,{class:"header"},{default:Q((function(){return[Object(c["m"])(o,{onBack:r.goBack,content:"News Detail"},null,8,["onBack"])]})),_:1}),Object(c["m"])(d,null,{default:Q((function(){return[Object(c["m"])(s,{type:"flex",class:"row-bg",justify:"center"},{default:Q((function(){return[Object(c["m"])(i,{class:"main-title"},{default:Q((function(){return[Object(c["m"])("img",{src:r.currNews.urlToImage,class:"main-img"},null,8,["src"])]})),_:1})]})),_:1}),r.currNews.author?(Object(c["D"])(),Object(c["i"])(s,{key:0,type:"flex",class:"row-bg",justify:"center"},{default:Q((function(){return[Object(c["m"])(i,null,{default:Q((function(){return[Object(c["m"])("h3",null,"Author："+Object(c["Q"])(r.currNews.author),1)]})),_:1})]})),_:1})):Object(c["j"])("",!0),K,Object(c["m"])(s,{type:"flex",class:"row-bg",justify:"center"},{default:Q((function(){return[Object(c["m"])(i,null,{default:Q((function(){return[E,U,Object(c["m"])("h2",null,Object(c["Q"])(r.currNews.title),1),G]})),_:1})]})),_:1}),Object(c["m"])(s,{type:"flex",class:"row-bg",justify:"center"},{default:Q((function(){return[Object(c["m"])(i,{class:"main-content"},{default:Q((function(){return[Object(c["m"])("h3",null,Object(c["Q"])(r.currNews.content),1),J]})),_:1})]})),_:1}),Object(c["m"])(s,{type:"flex",class:"row-bg",justify:"space-around"},{default:Q((function(){return[Object(c["m"])(i,{class:"main-footer"},{default:Q((function(){return[Object(c["m"])("h4",null,"Source："+Object(c["Q"])(r.currNews.source.name),1),Object(c["m"])("h4",null,"PublishedAt："+Object(c["Q"])(r.currNews.publishedAt),1)]})),_:1})]})),_:1})]})),_:1})]})),_:1})):Object(c["j"])("",!0)})),H={name:"NewsId",setup:function(){var e=Object(b["c"])(),t=Object(s["b"])(),n=Object(c["g"])({get:function(){return t.getters.isLoad},set:function(e){t.commit("setcurrIsLoad",e)}}),r=Object(c["g"])((function(){return t.getters.currNews})),a=function(){e.go(-1)};return{isLoad:n,currNews:r,goBack:a}}};n("0468");H.render=F,H.__scopeId="data-v-10064724";var R=H,Z=[{path:"/",name:"News",component:A},{path:"/:id",name:"NewsId",component:R}],W=Object(b["a"])({history:Object(b["b"])(),routes:Z}),X=W,$=Object(s["a"])({state:{isLoad:"false",apikey:"72458e60882e4d5581df3c440a732340",url:"https://newsapi.org/v2/",query:"COVID-19",date:{startTime:"2021-07-04",endTime:"2021-07-06"},sort:{data:[{value:"publishedAt",label:"發布時間 publishedAt"},{value:"relevancy",label:"相關度 relevancy"},{value:"popularity",label:"人氣 popularity"}],value:""},pageSize:20,page:1,news:[],currNewsId:null},mutations:{setcurrIsLoad:function(e,t){console.log(t),e.isLoad=t},setcurrQuery:function(e,t){e.query=t},setcurrDate:function(e,t){e.date=t},setcurrSort:function(e,t){e.sort=t},setNews:function(e,t){e.news=t},setPages:function(e,t){e.page=t,console.log(t)},setcurrNewsId:function(e,t){console.log(t),e.currNewsId=t}},actions:{fetchNews:function(e){var t=e.commit;q.a.get("https://newsapi.org/v2/everything?q=COVID-19&pageSize=100&from=2021-07-04&to=2021-07-06&sortBy=publishedAt&apiKey=ee91784129d14f3aa19dd854211221a3").then((function(e){t("setNews",e.data.articles)}))}},getters:{isLoad:function(e){return e.isLoad},query:function(e){return e.query},date:function(e){return e.date},sort:function(e){return e.sort},news:function(e){return e.news},pageSize:function(e){return e.pageSize},page:function(e){return e.page},pagedNewsData:function(e){return e.news.slice(e.pageSize*e.page-e.pageSize,e.pageSize*e.page)},currNewsId:function(e){return e.currNewsId},currNews:function(e){var t=e.news;return t.filter((function(t){return t.publishedAt===e.currNewsId}))[0]}}}),ee=n("2106"),te=n.n(ee),ne=n("3fd4"),ce=(n("808b"),n("f9d5")),re=n.n(ce),ae=(n("4413"),Object(c["h"])(f));ae.directive("focus",{mounted:function(e){e.focus(),console.log(e)}}).use(X).use($).use(ne["a"]).use(re.a).use(te.a,q.a).mount("#app")},"808b":function(e,t,n){},8351:function(e,t,n){"use strict";n("f984")},a42c:function(e,t,n){"use strict";n("e1fd")},ca1e:function(e,t,n){e.exports=n.p+"img/load.431b7fae.gif"},d3f5:function(e,t,n){},e1fd:function(e,t,n){},f984:function(e,t,n){}});
//# sourceMappingURL=app.38672b29.js.map