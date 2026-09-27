document.querySelector("#navbar").addEventListener('click',function(evt){
    if(evt.target.nodeName!=='A')return;
    console.log(evt.target, evt.currentTarget)
    evt.currentTarget.querySelectorAll('#navbar .active').forEach(function(element){element.classList.remove('active')})
    evt.target.parentNode.classList.add('active')
    switch(evt.target.attributes['href'].value){
        case '#/editor':console.log('editor');loadDOMEditor();break;
        case '#/':console.log('home');loadDOMHome();break;
        default:break;
    }
})

function loadDOMHome(){
    var xhr=new XMLHttpRequest()
    xhr.open('GET','/pages/home/home.html',)
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
function loadDOMEditor(){
    document.querySelector('#wrapper').innerHTML='<div id="editor"><div id="viewer"><canvas id="canvas"></canvas></div><div id="memeform"><form><label for="titre"><h1>Titre</h1></label><br /><input name="titre" id="titre" /><hr /><label for="image"><h2>Image</h2></label><br /><select name="image" id="image"><option value="1">futurama1.jpg</option><option value="2">futurama2.png</option><option value="3">futurama3.png</option><option value="4">gwenadu.jpg</option></select><hr /><label for="text"><h2>texte</h2></label><br /><input name="text" id="text" type="text" /><br /><h2>Position</h2><div class="inline-block"><div><label for="x" class="bold block">x</label><input class="small-number" name="x" id="x" type="number" /></div><div><label for="y" class="bold block">y </label><input class="small-number" name="y" id="y" type="number" /></div></div><hr /><br /><h2>Decorations</h2><label for="color"><h2 class="inline">color :</h2></label><input name="color" id="color" type="color" value="#FFFFFF" /><br /><label for="fontSize"><h2 class="inline">font-size :</h2></label><input class="small-number" name="fontSize" id="fontSize" type="number" min="0" value="73" />px <br /><label for="fontWeight"><h2 class="inline">font-weight :</h2></label><input class="small-number" name="fontWeight" id="fontWeight" type="number" min="100" step="100" max="900" value="900" /><br /><input name="underline" id="underline" type="checkbox" />&nbsp; <label for="underline"><h2 class="inline">underline</h2></label>&nbsp;<h2 class="inline">/</h2>&nbsp; <label for="italic"><h2 class="inline">italic</h2></label>&nbsp; <input name="italic" id="italic" type="checkbox" /><hr /><br /><h2 class="inline">frame size</h2><div class="inline-block"><div><label for="frameSizeX" class="bold block">X </label><input class="small-number block" name="frameSizeX" id="frameSizeX" type="number" min="0" value="0" /></div><div><label for="frameSizeY" class="bold block">y </label><input class="small-number block" name="frameSizeY" id="frameSizeY" type="number" min="0" value="0" /></div></div><hr /><div class="center-flex"><button class="btn btn-danger" type="reset">Annul.</button><button class="btn btn-primary" type="submit">Valider</button></div></form></div></div>'
}