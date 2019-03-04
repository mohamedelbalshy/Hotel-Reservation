/* function printString(string, callback){
    setTimeout(()=>{
        console.log(string);
        callback();
    }, Math.floor(Math.random()*100) +1)
}

function printAll(){
    printString("A", ()=>{
        printString("B", ()=>{
            printString("C",()=>{})
        });
    });
};

function printString2(string) {
    setTimeout(() => {
        console.log(string);
        
    }, Math.floor(Math.random() * 100) + 1)
}

function printAll2(){
    printString2("A");
    printString2("B");
    printString2("C");
}
printAll2(); */


function printString(string){
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            console.log(string);
            resolve();
        }, Math.floor(Math.random() * 100) + 1 )
    })
}
/* function printAll(){
    printString('A')
        .then(()=>{
            return printString('B')
        })
        .then(()=>{
            return printString('C');
        })
} */

/* function printAll(){
    printString('A')
        .then(()=> printString('B'))
        .then(()=> printString('C'))
} */

async function printAll() {
    await printString("A")
    await printString("B")
    await printString("C")
}
printAll();

