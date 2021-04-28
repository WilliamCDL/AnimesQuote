
complemento = "/quotes/anime?title=";
listaIteracao =[];
listaCitacao =[];
antigo=0;
/*
 * Função AJAX base do tipo assíncrona
 * 'params' é o id do usuário enviado apenas, quando necessário.
 * [Importante!] Você não pode alterar a função xhttpAssincrono.
 */
function xhttpAssincrono(callBackFunction, params, name) {
    var xhttp;
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
          // Chama a função em callback e passa a resposta da requisição
          callBackFunction(this.responseText);
      }
    };
    // Path completo para a requisição AJAX.
    var url = "https://animechan.vercel.app/api";
    if(!isNaN(params)){
        url = url + name;
    }else{
        url = url + "/available/anime"
    }
    // Requisição do tipo POST
    xhttp.open("GET", url, true);
    // Definindo o tipo de cabeçalho da requisição.
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
}


function buscar(){
    xhttpAssincrono(escreverBusca);
    //$.get("https://animechan.vercel.app/api/available/anime", (data) => { console.log(data) }) 
    
}

function escreverBusca(resposta){

    animeList = JSON.parse(resposta);
    //retorna os nomes porém não estão ordenados em ordem alfabetica
    animeList.sort()

    var selectAnime = $('#listar');
    selectAnime.change(function(){
        getTodo(this.value)
    });
    //document.getElementById("listar");
    //criando select
    // colocando id = mySelect
    //selectAnime.setAttribute("onchange","getTodo(this.value)");

    for (let i = 1; i < animeList.length; i++) {
        // iniciam "vazias" simbolizando com 0
        listaIteracao.push(0);
        listaCitacao.push(0);
        //criando opção Volvo, de valor volvocar
        var z = document.createElement("option");
        z.setAttribute("value", i);
        z.setAttribute("id", i);
        //z.setAttribute("onclick","getTodo(this.value)");
        //criando parte textual Volvo a qual fica visivel pro usuario
        var t = document.createTextNode(animeList[i]);
        //colocando o texto na opção
        z.appendChild(t);
        //colocando a opção no select
        selectAnime.append(z);
        //selectAnime.appendChild(z);
      }
    listaIteracao.push(0);
    listaCitacao.push(0);

    

}






function getTodo(e){
    //console.log(e);
    
    if(listaCitacao[e]!=0){
        listarQuote(e);
    }else{
        a=e;
        xhttpAssincrono(pegarQuote,1,complemento+animeList[e]);
    }
    
}

function pegarQuote(resultado){

    listaCitacao[a] = JSON.parse(resultado);
    listarQuote(a);
   /*  var contador=0;
    for (let i = 0; i < clienteTodo.length; i++) {
        if(clienteTodo[i].completed){
            contador=contador+1;
        }
    }

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Todo'],
        ['TODOS \nCompleted', contador],
        ['NOT \nCompleted', clienteTodo.length-contador]
      ]);
      
        // Optional; add a title and set the width and height of the chart
        var options = {'title':'Dayly Activities', 'width':550, 'height':400};
      
        // Display the chart inside the <div> element with id="piechart"
        var chart = new google.visualization.PieChart(document.getElementById('pizza'));
        chart.draw(data, options); */

}

function listarQuote(indice){
    
    if(listaIteracao[indice]==0){
        listaIteracao[indice]=1;
    }else{
        valor = listaIteracao[indice];
        listaIteracao[indice]  = valor+1;
    }

    const tbody = $("#informacoes");
    //document.getElementById("informacoes");
    const data = listaCitacao[indice];
    tbody.html("");
    data.forEach(element => {
        const tr = document.createElement("tr");
        const td0 = document.createElement("td");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");

        td0.innerHTML = element.anime;
        td1.innerHTML = element.character;
        td2.innerHTML = element.quote;

        tr.appendChild(td0);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tbody.append(tr);
    });
    
}

function criaElemento(){

    indice1 = 0;
    indice2 = 0;
    indice3 = 0;

    valor1=0;
    valor2=0;
    valor3=0;

    for (let index = 1; index < listaIteracao.length; index++) {
        const element = listaIteracao[index];
        if(element>valor1){
            if(valor1>valor2){
                if(valor2>valor3){
                    valor3=valor2;
                    indice3=indice2;
                }
                valor2=valor1;
                indice2=indice1;
            }else if(valor1>valor3){
                if(valor3>valor2){
                    valor2=valor3;
                    indice2=indice3;
                }
                valor3=valor1;
                indice3=indice1;
            }
            valor1=element;
            indice1=index;
        }else if (element>valor2) {
            if(valor2>valor3){
                valor3=valor2;
                indice3=indice2;
            }
            valor2=element;
            indice2=index;
        } else if (element>valor3) {
            valor3=element;
            indice3=index;
        }
        
    }

    var data = google.visualization.arrayToDataTable([
        ['Anime', 'Visitação'],
        [animeList[indice1], valor1],
        [animeList[indice2],valor2],
        [animeList[indice3],valor3]
      ]);

      // Optional; add a title and set the width and height of the chart
      var options = {'title':'Top 3 animes visitados', 'width':550, 'height':400};
      
      // Display the chart inside the <div> element with id="piechart"
      var chart = new google.visualization.PieChart(document.getElementById('pizza'));
      chart.draw(data, options);

}

function vazio(){}

