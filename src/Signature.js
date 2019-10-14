const nacl = require('libsodium-wrappers');
let myKeypairObj;

let init = () =>{
    if(!myKeypairObj){
        await nacl.ready
        myKeypairObj =  nacl.crypto_sign_keypair();
    }
}

exports.verifyingKey = async function(){
    await init();
    return myKeypairObj.publicKey;
}
exports.sign = async function(msg){
    return nacl.crypto_sign(msg, myKeypairObj.privateKey);
}