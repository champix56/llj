document.querySelector("#navbar").addEventListener('click',function(evt){
    console.log(evt.target, evt.currentTarget)
    evt.currentTarget.querySelectorAll('#navbar .active').forEach(function(element){element.classList.remove('active')})
    evt.target.parentNode.classList.add('active')
})
