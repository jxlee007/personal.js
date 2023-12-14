
 async function abcd(){
    let raw = await fetch(`https://randomuser.me/api`)
    let ans = await raw.json()
    console.log(ans);
}

abcd()

// through promise
/*
    function abcd(){
    fetch(`https://randomuser.me/api`)
    .then(function(raw){
        return raw.json()
    })
    .then(function (data) {
        console.log(data)
    })
}

    
*/