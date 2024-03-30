document.title = document.getElementById('docTitle').innerText


var parMenu = document.querySelectorAll('[toggleParMenu]');

parMenu.forEach((nav)=>{
    let childNavId = nav.dataset.toggleTarget
    let childNav = document.getElementById(childNavId)
    nav.addEventListener('click',()=>{
        childNav.classList.toggle('hidden');
		childNav.classList.toggle('show');
    })
   
})

// tab section
var tabBtn = document.querySelectorAll('[tabBtn]')
var divContent = document.getElementById('tabs-content');
tabBtn.forEach((tab)=>{
    let id = tab.dataset.collTarget
    
    let tabContent = document.getElementById(id)
    tab.onclick = (e)=>{
        divContent.innerHTML = tabContent.innerHTML
        tabBtn.forEach((e)=>{
            e.classList.remove('active')
        })
        e.target.classList.add('active')
    }
})