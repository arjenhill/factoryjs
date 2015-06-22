# factoryjs

在javascript中，我们希望提供一个专门的方法，只要用户传入相应的参数，或按照一定简单格式就能创建一个类。特别是子类。

一个精巧的类工厂也不过百行左右，由于主流框架的类工厂太依赖他们庞杂的工具函数，导致使用起来特别复杂。

1.使用示范：

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

2.尝试创建更简洁的定义方式

```
	var Snake = sFactory (Dog, function(snake, animal){
		snake.init = function(name, eyes){
			animal.init.call(this, arguments); //调运父类构造器
			this.eyes = 2;
		}
		snake.move = function() {
			console.log('slithering...');
			animal.move.call(this, 5); //调运父类同名方法
		}
	});
	var s = new Snake("snake", 1);
	s.move();
	console.log(s.name);
	console.log(s.eyes);
	
```
3.私有属性演示，由于放在函数体内集中定义，因此安全可靠！

```
	var Cobra = sFactory(Snake, function(cobra){
		var age = 1;//私有属性
		//这里还可以编写私有方法
		cobra.glow = function(){ //长大
			return age++;
		}
	});
	var c = new Cobra("cobra");
	console.log(c.glow()); //1
	console.log(c.glow()); //2
	console.log(c.glow()); //3
	
```