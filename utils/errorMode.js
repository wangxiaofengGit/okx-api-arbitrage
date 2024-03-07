// error handling
global.errorMode = function( errorTargetName, result ){
    const { sCode, sMsg } = result.data[0];
    console.log(errorTargetName, sCode, sMsg);
}