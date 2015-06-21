# factoryjs

在javascript中，我们希望提供一个专门的方法，只要用户传入相应的参数，或按照一定简单格式就能创建一个类。特别是子类。

一个精巧的类工厂也不过百行左右，由于主流框架的类工厂太依赖他们庞杂的工具函数，导致使用起来特别复杂。

使用示范：

```
	var Dog = sFactory(function(proto, superProto){
		proto.init = function(name) { //构造函数
			this.name = name;
		}
		proto.move = function(meters){ //原型方法
			console.log(this.name + " moved " + meters + " m.")
		}
	});
	var a = new Dog("aaa")
	var b = new Dog("bbb"); //无实例变化
	a.move(1);
	b.move(2);
	
```

