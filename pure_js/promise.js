const pr = new Promise((resolve, reject)=>{

    setTimeout(()=>{
        resolve(()=>{
            console.log("this is a cb inside resolve")
        });
    },5000)
})

console.log(pr);

pr.then((data)=>{
    data();
})

//console.log(pr);
