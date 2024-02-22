
import AES from "../common/AES.js"
const loadFile = function (name, isEncrypt) {
    let xhr = new XMLHttpRequest,
    okStatus = document.location.protocol === "file" ? 0 : 200;
    var now = new Date().getTime();
    xhr.open('GET', name+"?t="+now, false);
    xhr.overrideMimeType("text/html;charset=utf-8");
    xhr.send(null);
    if(xhr.status === okStatus)
    {
        let nonce = xhr.responseText;
        if(isEncrypt)
        {
            nonce = AES.decrypt(nonce, 'SbIUB6l7gyslKJ97GvoxcJRONurvuzb6')
        }
        const json = JSON.parse(nonce)
        return json;
    }
}
export default loadFile;