document.querySelector("#navbar").addEventListener('click',function(evt){
    if(evt.target.nodeName!=='A')return;
    console.log(evt.target, evt.currentTarget)
    evt.currentTarget.querySelectorAll('#navbar .active').forEach(function(element){element.classList.remove('active')})
    evt.target.parentNode.classList.add('active')
    switch(evt.target.attributes['href'].value){
        case '#/editor':console.log('editor');loadDOMEditor();break;
        case '#/thumbnail':console.log('editor');loadDOMThumbnail();break;
        case '#/':console.log('home');loadDOMHome();break;
        default:break;
    }
})

function loadDOMHome(){
   commonPageLoader('/pages/home/home.html');
}
function loadDOMEditor(){
   commonPageLoader('/pages/editor/editor.html')
}
function loadDOMThumbnail(){
   commonPageLoader('/pages/thumbnail/thumbnail.html')
}

function commonPageLoader(pageUrl){
     var xhr=new XMLHttpRequest()
    xhr.open('GET',pageUrl,)
    xhr.onreadystatechange=function(evt){
        if(evt.target.readyState<XMLHttpRequest.DONE)return;
        if(evt.target.status!==200){
             document.querySelector('#wrapper').innerHTML='<div id="error"><h1>'+evt.target.status+':'+evt.target.statusText+'</h1>malheuresement la page charger :'+evt.target.responseURL+' n\'a pas pu etre chargée</div>'
             return;
        }
        document.querySelector('#wrapper').innerHTML=evt.target.responseText;
    }
    xhr.send()
}