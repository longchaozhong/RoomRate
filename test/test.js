/**
 * Created by lcz on 2017/10/30.
 */
import co from 'co';
function* generator() {
    yield 'hello';
    yield 'generator';
    return 'ending';
}

const gen = generator();
console.info(gen.next());
console.info(gen.next());
console.info(gen.next());
console.info(gen.next());
console.info(gen.next());

function p1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.info('p1');
            reject();
        }, 1000);
    });
}
function p2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.info('p2');
            resolve();
        }, 1000);
    });
}

co(function* (){
    yield p1().catch(()=>{
        console.info('in catch');
        throw new Error('test');
    });
    yield p2();
}).catch(()=>{
    console.info('out catch');
});

