const nacl = require('libsodium-wrappers');
let myKey;

exports.setClientPublicKey = async function(clientPublicKey){

}
exports.serverPublicKey = async function(){

}
exports.decrypt = async function (ciphertext, nonce){
    if(myKey == null){
        throw "no key";
    }
    return  nacl.crypto_secretbox_open_easy(ciphertext,nonce,myKey);
}
exports.encrypt = async function(msg){

}