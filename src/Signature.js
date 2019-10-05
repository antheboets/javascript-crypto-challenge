const nacl = require('libsodium-wrappers');
let myKeypairObj;

beforeAll(async() => {
    await nacl.ready;
    myKeypairObj = nacl.crypto_sign_keypair();
});

exports.verifyingKey = async function(){
    return myKeypairObj.publicKey;
}
exports.sign = async function(msg){
    return nacl.crypto_sign(msg, myKeypairObj.privateKey);
}