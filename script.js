class Character{
    
    constructor(){
        
        this.id = 1
        this.nome= ''
        this.profissao= ''
        this.altura = 0
        this.peso = 0
        this.img = ''
        this.arrayCharacter = []
        this.editId = null
    }
    add(){
        
        if(this.editId != null){
            
            this.salvar(this.editId)
        }
        else{
            this.lerDados()
            this.criarChar()
        }
        this.limpar()
        console.log(this.editId)
    }

    lerDados(){
        this.nome=document.getElementById('nome').value
        this.profissao =document.getElementById('profissao').value
        this.altura =document.getElementById('altura').value
        this.peso =document.getElementById('peso').value

        let selectValue = document.getElementById('profissao').value

        switch (selectValue){
            case 'arqueiro':
                this.img = './public/archer-removebg-preview.png';
                break
            
            case 'guerreiro':
                this.img = './public/kina-removebg-preview.png';
                break

            case 'mago':
                this.img = './public/mage-removebg-preview.png'
                break

            case 'druida':
                this.img = './public/druid2-removebg-preview.png'
                break
}

        let obj = {}
        obj.nome= this.nome,
        obj.profissao = this.profissao,
        obj.altura = this.altura,
        obj.peso = this.peso,
        obj.img = this.img        
        
        let verificar = !Object.values(obj).every(x => x !== '' && x !== null)
        if(verificar){
            alert('Campo Vazio')
            return;
        }
        else{
            this.arrayCharacter.push(obj)
            obj.id = this.arrayCharacter.length
            let data = JSON.stringify(this.arrayCharacter)
            localStorage.setItem('save',data)
           
        }
        return obj
        
        
    }

    criarChar(){
        
        let tbody= document.getElementById('tbody')
        let getData = localStorage.getItem('save')
        let obj2 = JSON.parse(getData)
        tbody.innerHTML ='';
        for(let i = 0; i < obj2.length; i++){
        
        tbody.innerHTML += ` <tr id="${obj2[i].id}">
        <td> <img style="width: 50px; height: 50px;" src="${obj2[i].img}"></td>
        <td id="tdId">${obj2[i].id}</td>
        <td id="tdNome">${obj2[i].nome}</td>
        <td id="tdProf">${obj2[i].profissao}</td>
        <td id="tdAltura">${obj2[i].altura}</td>
        <td id="tdPeso">${obj2[i].peso}</td>
        <td>
            <img id="botaoExcluir" src="./public/remove.png" onclick="char.excluir(${obj2[i].id})" alt="excluir">
            <img id="botaoEditar" src="./public/edit.png" onclick='char.editar( ${JSON.stringify(obj2[i])} )' alt="editar">
        </td>
        </tr>`
        
    }

    }
    
    limpar(){
        document.getElementById('nome').value = ''
        document.getElementById('profissao').value = ''
        document.getElementById('altura').value =''
        document.getElementById('peso').value =''

    }

    excluir(id){
        let getData = localStorage.getItem('save')
        let obj2 = JSON.parse(getData)
        
        if(confirm(`Deseja deletar o char id:${id}?`)){
        for(let i = 0; i < obj2.length; i++){
            if(obj2[i].id == id){            
                obj2.splice(obj2[i].id-1,1)
                this.arrayCharacter = obj2

                for(let i = 0; i < obj2.length; i++){
                    obj2[i].id = i+1
                }       

            }
        }
            let data = JSON.stringify(obj2)            
            localStorage.setItem('save',data)
            this.criarChar()
        }   
    }

    editar(dados){
        this.editId = dados.id
        document.getElementById('nome').focus()
        document.getElementById('nome').value = dados.nome
        document.getElementById('profissao').value = dados.profissao
        document.getElementById('altura').value = dados.altura
        document.getElementById('peso').value = dados.peso

        document.getElementById('botaoAdd').setAttribute('value','Salvar')

        console.log(this.editId)

}

    salvar(editId){

    let getData = localStorage.getItem('save')
    let obj2 = JSON.parse(getData)

    for(let i = 0; i < obj2.length; i++){
            if(obj2[i].id == editId){
                
                obj2[i].nome = document.getElementById('nome').value     
                obj2[i].profissao = document.getElementById('profissao').value
                obj2[i].altura = document.getElementById('altura').value
                obj2[i].peso =  document.getElementById('peso').value
                this.arrayCharacter = obj2
                }
                
                switch (obj2[i].profissao){
                    case 'arqueiro':
                        obj2[i].img = './public/archer-removebg-preview.png';
                        break
                    
                    case 'guerreiro':
                        obj2[i].img = './public/kina-removebg-preview.png';
                        break

                    case 'mago':
                        obj2[i].img = './public/mage-removebg-preview.png'
                        break

                    case 'druida':
                        obj2[i].img = './public/druid2-removebg-preview.png'
                        break
                    }
            let verificar = !Object.values(obj2[i]).every(x => x !== "" && x !== null)
            if(verificar){
            alert('Campo Vazio')
            return;}
            }
            
            this.editId = null
            localStorage.setItem('save',JSON.stringify(obj2))
            document.getElementById('botaoAdd').setAttribute('value','Adicionar')
            this.criarChar()

}
}
let char = new Character()