var mune=document.getElementById("mune"),mask=document.getElementById("ts_mask"),title=document.getElementById("title_cd_main"),
    ts_mask=document.getElementById("ts_mask");
mune.onclick=function(){
    mask.style.height=document.body.scrollHeight+"px";
    if(mask.style.display=="block"){
        mask.style.display=title.style.display="none";
    }else{
        mask.style.display=title.style.display="block";
    }
};
ts_mask.onclick=function(e){
    e.stopPropagation();
    mask.style.display=title.style.display="none";
};
function setHeight(ifm) {
    ifm.height=document.body.scrollHeight-document.getElementById("footer").scrollHeight-document.getElementById("header").scrollHeight;
}
