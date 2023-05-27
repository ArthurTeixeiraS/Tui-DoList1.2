const localStorageKey = 'tui-do-list' //define a localStorageKey
function validateIfExistsNewTask(){ // esta função verifica se uma nova tarefa já existe na lista.
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") // obtem os valores armazenados no localStorage usando a chave criada acima
    let inputValue = document.getElementById('input-newTask').value // obtem o valor do input
    let exists = values.find(x => x.name == inputValue) // verifica se existe uma tarefa com o mesmo nome na lista
    return !exists ? false : true //retorna true se já existe, false se não existe
}

function newTask(){ //Função chamada quando o usuário deseja adicionar uma tarefa
    let input = document.getElementById('input-newTask') //obtenção do valor de input
    input.style.border= '' // remove a borda vermelha (caso ela já exista, claro)
    if (!input.value){ //validações
        input.style.border= '1px solid red' //se o valor for false (ou inválido) é aplicado a borda vermelha ao input
        alert('Digite algo para anotar em sua lista') // alerta
    } 
    else if (validateIfExistsNewTask()){ // executa a função e caso retorne true...
        alert('Essa tarefa já esta registrada!!'); //exibe-se um alerta
    }
    else //se não...
    {
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") //obtem o valor armazenado no localStorage usando a chave
        values.push({ // adiciona um novo objeto a matriz values contendo o nome da nova tarefa
            name: input.value 
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values)) // atualiza o localStorage com os novos valores convertendo a matriz para uma String JSON
        showValues() //chama a showValues()
    }
    input.value = '' //remove o texto do input
   
}
function showValues(){ //exibe os valores armazenados
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") // obtem os valores armazenados no LS, usando a chave
    let list = document.getElementById('todo-list') //obtem o elemento "todo-list"
    list.innerHTML = '' // zera a lista
    for(let i = 0; i < values.length ; i++){ //repetição por todos os valores presentes em "values"
         list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
         <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/>
         </svg></button></li>` // adiciona uma <li> contendo o nome da tarefa e um botão, que ao ativar o evento "click" ativa a função removeItem()
    }
}
function removeItem(data){ //responsável por remover o item da lista
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]") //pega o valor através da chave do LS
    let index = values.findIndex(x => x.name == data) //Encontra o índice do objeto que contem o nome da tarefa a ser removida
    values.splice(index,1) // remove usando splice
    localStorage.setItem(localStorageKey,JSON.stringify(values)) //Atualiza o LS com os novos valores, convertendo a matriz para strings
    showValues() //chama a função showvalues()
}


showValues() //chama showValues()