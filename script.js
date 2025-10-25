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
             let currentURL = window.location.href;
                input.value=currentURL;
        }
    )


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

        function display(){
        if (unorder.textContent.length !==0) {
            unorder.innerHTML='';
        }
            
            inputValue.forEach((element,index)=>{
                let disli= `<li><a href='${element}'>${element}</a> <button class='remove lightgreen' onclick='remove(${index})'>remove</button></li>`
               
                unorder.innerHTML+=disli;
            })
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