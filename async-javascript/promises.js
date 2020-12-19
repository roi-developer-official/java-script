
const setTimer = (duration) => {
    const promise = new Promise((resolve, reject) => {
        try{
            setTimeout(() => {
                resolve('Done!');
            }, duration);
        }
        catch{
            reject('Wrong!')
        }
    });
    return promise;
}

setTimer(300).then(() => {
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done Again!')
        }, 300)
        return promise;
    }).then(res =>{
        console.log(res)
    },err =>{
        console.log(err)
    }).catch(err=>{
        return err;
    }).then(passedErr=> console.log(passedErr));

});

Promise.race([]).then(res=>{});
Promise.all([]).then(res=>{});

