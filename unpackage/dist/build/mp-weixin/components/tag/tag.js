(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/tag/tag"],{"188b":function(n,t,e){"use strict";e.r(t);var u=e("9b0b"),a=e("a5f7");for(var i in a)"default"!==i&&function(n){e.d(t,n,(function(){return a[n]}))}(i);e("500b");var c,o=e("f0c5"),r=Object(o["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],c);t["default"]=r.exports},"500b":function(n,t,e){"use strict";var u=e("eeb9"),a=e.n(u);a.a},"9b0b":function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return i})),e.d(t,"a",(function(){return u}));var u={uniIcons:function(){return Promise.all([e.e("common/vendor"),e.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(e.bind(null,"732a"))}},a=function(){var n=this,t=n.$createElement;n._self._c},i=[]},a5f7:function(n,t,e){"use strict";e.r(t);var u=e("a769"),a=e.n(u);for(var i in u)"default"!==i&&function(n){e.d(t,n,(function(){return u[n]}))}(i);t["default"]=a.a},a769:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={name:"tag",props:{list:{type:Array,default:function(){return[]}},activeIndex:{type:Number,default:0}},data:function(){return{current:0}},watch:{activeIndex:function(n){this.current=n}},methods:{changeTag:function(n,t){this.$emit("tag",{tag:n,index:t})},setLabel:function(){n.navigateTo({url:"/pages/home-label/home-label"})}}};t.default=e}).call(this,e("543d")["default"])},eeb9:function(n,t,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/tag/tag-create-component',
    {
        'components/tag/tag-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("188b"))
        })
    },
    [['components/tag/tag-create-component']]
]);
