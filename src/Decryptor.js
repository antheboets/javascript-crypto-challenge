const nacl = require('libsodium-wrappers');
let myKey;
exports.decrypt = async function (ciphertext, nonce){
    if(myKey == null){
        throw "no key";
    }
    return  nacl.crypto_secretbox_open_easy(ciphertext,nonce,myKey);
}
exports.setKey = async function (key){
    myKey = key;
}