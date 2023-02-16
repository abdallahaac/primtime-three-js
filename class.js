function bitteNoire() {
	console.log("bitteNoire");
}

// bitteNoire();

class Rectangle {
	constructor(height, width, noire) {
		this.height = height;
		this.width = width;
	}
	area() {
		console.log("area");
	}

	multiply() {
		console.log("multiply");
	}
}

let myRect = new Rectangle(111231312, 2);
myRect.area();
myRect.multiply();
