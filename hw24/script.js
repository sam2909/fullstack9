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
var tabSection = document.querySelectorAll('[tabSection]');
var divContent = document.querySelectorAll('[tabContent]');
tabSection.forEach((ts) => {
    let currentTs = document.getElementById(ts.id)
    let tabBtns = currentTs.querySelectorAll('[tabBtn');
    let tabContents = currentTs.querySelectorAll('[tabContent');
    let tabContentChild = tabContents[0].children;
    tabBtns.forEach((tab)=>{
        let currContentId = null
        tab.onclick = (e) =>{
            tabBtns.forEach((otherTabs)=>{
                otherTabs.classList.remove('active')
            }) 
            e.target.classList.add('active')
            currContentId = e.target.dataset.collTarget;
            for (let [key, value] of Object.entries(tabContentChild)) {
                (value.id == currContentId) ? value.classList.remove('hidden') : value.classList.add('hidden')
            }
        }
    })
    
});
