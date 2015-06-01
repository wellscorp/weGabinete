angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})



    .factory('Lista', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'welton lima',
            lastText: 'oque quer?',
            face: 'http://www.lcfc.com/images/common/bg_player_profile_default_big.png'
        }, {
            id: 1,
            name: 'taise',
            lastText: 'bonita',
            face: 'img/10420230_420103848139941_6706339062094710568_n.jpg'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(testeId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(testeId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })

    .factory('Notas', function() {
        // Might use a resource here that returns a JSON array

        // ----------- SELECT BANCO -------------------
        function getNota(){
            database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
            database.transaction(SelectNota, resultError, resultSuccess);
        }
        function removeNota(){
            database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
            database.transaction(DeleteNota, deleteError, deleteSuccess);
        }

        function SelectNota(tx){
            tx.executeSql("SELECT * FROM nota", [], resultSuccess,resultError);
        }
        // APAGA A NOTA
        function DeleteNota(tx, id){
            tx.executeSql("DELETE FROM nota WHERE titulo = '"+ id +"' ");
        }
        function resultSuccess(tx, responde){
            //alert("Resposta : " +responde.rows.item(3).titulo);
            for(var i=0; i< responde.rows.length; i++ ) {
                notas.push({
                    id: responde.rows.item(i).rowid,
                    titulo: responde.rows.item(i).titulo,
                    descricao: responde.rows.item(i).descricao
                });
                //console.log(responde.rows.item(i).rowid);
            }
            //$scope.notas= notas;
        }

        function resultError(error){
            alert("error ocorreu2: "+error);
        }
        function deleteError(error){
            alert("error ocorreu2: "+error);
        }
        function deleteSuccess(error){
            //alert("error ocorreu2: "+error);
        }

        notas= [];
        getNota();
        //console.log(notas);

        return {
            all: function() {
                return notas;
            },
            remove: function(chat) {
                notas.splice(notas.indexOf(chat), 1);

                var  database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
                database.transaction(function(tx){
                    DeleteNota(tx, chat.titulo);
                }, deleteError, deleteSuccess);
            },
            get: function(notaId) {
                for (var i = 0; i < notas.length; i++) {
                    if (notas[i].titulo === notaId) {
                        return notas[i];
                    }
                }
                return null;
            },
            set: function(novo) {
                notas.splice(notas.length, 0, novo[0]);
                console.log(novo[0]);
                console.log(notas);
            },
            change: function(item, novo) {
                notas.splice(notas.indexOf(item), 1, novo[0]);
            }
        };
    })




    .factory('Tarefas', function() {
        // Might use a resource here that returns a JSON array

        // ----------- SELECT BANCO -------------------
        function getTarefa(){
            database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
            database.transaction(SelectTarefa, resultError, resultSuccess);
        }
        function removeTarefa(){
            database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
            database.transaction(DeleteTarefa, deleteError, deleteSuccess);
        }

        function SelectTarefa(tx){
            tx.executeSql("SELECT * FROM tarefa", [], resultSuccess,resultError);
        }
        // APAGA A Tarefa
        function DeleteTarefa(tx, id){
            tx.executeSql("DELETE FROM tarefa WHERE ID_TAREFA = '"+ id +"' ");
        }
        function resultSuccess(tx, responde){
            //alert("Resposta : " +responde.rows.item(3).titulo);
            for(var i=0; i< responde.rows.length; i++ ) {
                tarefas.push({
                    id: responde.rows.item(i).ID_TAREFA,
                    descricao: responde.rows.item(i).DESCRICAO,
                    dt_criacao: responde.rows.item(i).DT_CRIACAO
                });
                //console.log(responde.rows.item(i).rowid);
            }
            //$scope.notas= notas;
        }


        function editarTarefa(tx, descricao, id){


            query= "UPDATE tarefa SET DESCRICAO = '"+descricao+"'  WHERE ID_TAREFA =  '"+id+"'; ";
            //alert(query);
            tx.executeSql(query);
            //Notas.change($scope.nota, nota);
        }

        function errorTarefa(error){
            alert("Erro ao inserir no banco: " + error);
        }

        function successTarefa(){
            window.open("index.html#/tab/nota", "_self");
        }

        function resultError(error){
            alert("error ocorreu2: "+error);
        }
        function deleteError(error){
            alert("error ocorreu2: "+error);
        }
        function deleteSuccess(error){
            //alert("error ocorreu2: "+error);
        }

        tarefas= [];
        getTarefa();
        //console.log(tarefas);

        return {
            all: function() {
                return tarefas;
            },
            remove: function(chat) {
                tarefas.splice(tarefas.indexOf(chat), 1);

                var  database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
                database.transaction(function(tx){
                    DeleteTarefa(tx, chat.ID_TAREFA);
                }, deleteError, deleteSuccess);
            },
            get: function(tarefaId) {
                for (var i = 0; i < tarefas.length; i++) {
                    //console.log(tarefaId);
                    if (tarefas[i].id == tarefaId) {
                        return tarefas[i];
                    }
                }
                return null;
            },
            set: function(novo) {
                tarefas.splice(tarefas.length, 0, novo[0]);
                console.log(novo[0]);
                console.log(tarefas);
            },
            change: function(item, novo) {
                var nota= [{
                    id: 0,
                    titulo: titulo,
                    descricao: descricao
                }];
                tarefas.splice(tarefas.indexOf(item), 1, novo[0]);
                var  database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
                database.transaction(function(tx){
                    editarTarefa(tx, novo.descricao, novo.id);
                }, errorTarefa, successTarefa);
            }
        };
    })
;
