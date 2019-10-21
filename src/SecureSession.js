const nacl = require('libsodium-wrappers');

let myServerPrivateKey = null;
let myServerPublicKey = null;
let myClientPublicKey = null;

let rx = null;
let tx = null;

let init = async () =>{
    await nacl.ready;
}


exports.setClientPublicKey = function(clientPublicKey){

    if (myClientPublicKey === clientPublicKey){
        return;
    }
        
    if ((myClientPublicKey !== null) && (myClientPublicKey !== clientPublicKey)){
        throw("client public key already set");
    }
    
    myClientPublicKey = clientPublicKey;

    const keypair = nacl.crypto_kx_keypair();
    myServerPrivateKey = keypair.privateKey;
    myServerPublicKey = keypair.publicKey;

    sharedKeys = nacl.crypto_kx_server_session_keys(myServerPublicKey,myServerPrivateKey,clientPublicKey);  

    rx = sharedKeys.sharedRx;
    tx = sharedKeys.sharedTx;

}
exports.serverPublicKey = async function(){
    await init();
    return myServerPublicKey;
}
exports.decrypt = async function (ciphertext, nonce){
    await init();
    return nacl.crypto_secretbox_open_easy(ciphertext, nonce, rx);
}
exports.encrypt = async function(msg){
    await init();
    nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES)
    ciphertext = nacl.crypto_secretbox_easy(msg, nonce, tx)
    return { ciphertext, nonce }
}