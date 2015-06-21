    // fix 2015年6月22日
	var sFactory = (function(prototype, ownProperty, undefined){

		function isObject(o) {
			return typeof o === 'object';
		}

		function isFunction(f){
			return typeof f === 'function';
		}

		function BareConstructor() {};

		function sFactory(_superclass /* = object */, definition) {
			//如果传一个参数，没有指定父类
			if(definition === undefined){
				definition = _superclass;
				_superclass = Object;
			}

			//C为我们要返回的子类，definition中的init为用户构造器
			function C() {
				var self = new Bare;
				console.log(self.init)
				if(isFunction(self.init)) self.init.apply(self, arguments);
				return self;
			}

			function Bare() {
				//这个构造器目的为了让C不用new就能返回实例而设
			}

			C.Bare = Bare;
			//为防止子类影响到父类，我们将父类的原型赋给一个中介者BareConstructor，然后再将这中介者的实例作为子类的原型

			var _super = BareConstructor[prototype] = _superclass[prototype];
			var proto = Bare[prototype] = C[prototype] = new BareConstructor;
			//然后与C和Bare都共享一个原型，最后修正子类的构造器指向自身
			proto.constructor = C;
			//类方法mixin，不过def对象里边的属性与方法糅杂到原型里边去。
			C.mixin = function(def) {
				Bare[prototype] = C[prototype] = P(C, def)[prototype]; 
			}

			//definition 最后延迟到这里才起作用
			return (C.open = function(def) {
				var extensions = {};
				//definition有两种形态：如果是函数，那么子类原型，父类原型、子类构造器、父类构造传进去；如果是对象则直接extensions
				if(isFunction(def)){
					extensions = def.call(C, proto, _super, C, _superclass);
				} else if (isObject(def)) {
					extensions = def;
				}

				//最后混入子类的原型中
				if (isObject(extensions)){
					for(var ext in extensions){
						if(ownProperty.call(extensions, ext)) {
							proto[ext] = extensions[ext];
						}
					}
				}

				//确保init为一个函数
				if(!isFunction(proto.init)) {
					proto.init = _superclass;
				}

				return C;
			})(definition);
		//这个为一个自动执行的函数表达式，相当于
		//C.open = function(){/*...*/} or C.open(definition) or return C;  
		//换而言之，返回的子类才能在3个成员，Base, minxin, open
		}
		return sFactory;//暴露全局变量
	})('prototype',({}).hasOwnProperty);