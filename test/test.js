let buffer = new ArrayBuffer(16);
let int32view = new Int32Array(buffer);
let int16view = new Int16Array(buffer);
for (let i = 0; i < int32view.length; i++) {
    int32view[i] = i * 2;
}

for(let val of int16view){
    console.info(val);
}
console.info(int32view.length);
console.info(int16view.length);
