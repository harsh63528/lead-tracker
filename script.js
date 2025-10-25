        // creating shortfunction for dom
        let el= (e)=>{
            return document.querySelector(`${e}`);
        }

        // dom manuplation
        const btn=el('.inputbtn');
        const input=el('#input');
        const container=el('#container')
        const unorder=el('#unorder')
        const clear=el('.clearbtn')
        const grab=el('.grab')

        // checking local storage for data 
        const inputValue=JSON.parse(localStorage.getItem('data'))||[];
        // if exist then display it on screen
          display()

        // grabing url from browser navbar
        grab.addEventListener('click',()=>{
        //    it will only work in extension environment
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        let currentURL = tabs[0].url; 
        input.value = currentURL;
        console.log(currentURL);
    });
});

    

        clear.addEventListener('click',()=>{
             if (inputValue.length !== 0)
             {
                inputValue.splice(0,inputValue.length)
                store()
                display()
             }
        })

      
        btn.addEventListener('click',()=>{
            if(input.value.length===0){
                    alert('input field is empty')
                }
            else{
                    inputValue.push(input.value);
                    store()
                    display()
                    input.value='';
                }
            
        })

        function display() {
    unorder.innerHTML = '';

    inputValue.forEach((element, index) => {
        let disli = document.createElement('li');

        let link = document.createElement('a');
        link.href = element;
        link.textContent = element;
        link.target = "_blank"; // open in new tab
        disli.appendChild(link);

        let btn = document.createElement('button');
        btn.textContent = 'Remove';
        btn.className = 'remove lightgreen';
        btn.addEventListener('click', () => {
            remove(index);
        });
        disli.appendChild(btn);

        unorder.appendChild(disli);
    });
}


        function remove(i){
            inputValue.splice(i,1)
            store()
            display()
        }

        function store(){
            let data=JSON.stringify(inputValue)
            localStorage.setItem('data',data)
        }