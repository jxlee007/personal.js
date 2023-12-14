
function promise(){
    var ans = new Promise((res, rej )=> {
        if(true){
           return res(); 
        }
        else{
            return rej();
        }
    })
    
    ans
    .then(function () {
        console.log("resolve hogaya");
    })
    .catch(function () {
        console.log("reject hogaya");
    })
}


// Single task
/* user  will ask for a number between 0 or 9 
    and if the number is below 5 resolve 
        if not reject*/

function prac_1(user){
// (res = user > 5) ? console.log(`resolve : ${user}`) : console.log(`reject : ${user}`);
    

   var ans = new Promise((res, rej) => {
        if(user < 5){
            return res();
        }
        else{
            return rej();
        }
   })  

   ans
   .then(function(){
        console.log("resolve hogaya : " + user);
   })
   .catch(function () {
        console.log("reject hogaya : " + user)
   })

}

// Multiple tasks
/*  4 tasks
    -- get
    -- shit
    -- done
    */  

function prac_2(){

    var ans = new Promise((res, rej) => {
        return res("get")
    })

    var p1 = ans.then(function(data){
        console.log(data)
        return new Promise ((res, rej) => {
            return res("shit")
        })
    })

    var p2 = p1.then(function(data){
        console.log(data)
        return new Promise ((res, rej) => {
            return res("done")
        })
    }) 

    var p3 = p2.then(function(data){
        console.log(data)
    })
}


// promise()
// prac_1(Math.floor(Math.random()*10))
// prac_2()
