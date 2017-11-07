const test = async() => {
    try {
        await new Promise((resolve, reject) => {
            reject('error');
        }).then(msg => {
            console.info(msg);
        });
    } catch (e) {
        console.info(`in : ${e}`);
    }

    await new Promise((resolve, reject) => {
        resolve('sucess');
    }).then(msg => {
        console.info(msg);
    });

    return "haha";
};


test().catch(msg => {
    console.info(`out : ${msg}`);
});