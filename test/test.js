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
       resolve();
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

Promise.all([
    new Promise((resolve,reject)=>{
        reject();
    }).catch(()=>{
        return 'error'
    }),
    new Promise((resolve,reject)=>{
        resolve('success');
    }).catch(()=>{
        //
    })
]).then(result=>{
    console.info(result);
}).catch(()=>{
    console.info('failed');
});
