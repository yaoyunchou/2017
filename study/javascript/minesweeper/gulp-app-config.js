const config = {
    root:__dirname+""
}
function transformScript(path){
    console.log(path);
    return '<script type="text/javascript" charset="utf-8" src="'+path+'"></script>';
}
module.exports = {
    config,
    transformScript,
}