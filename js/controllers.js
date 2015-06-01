angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
})

.controller('TesteCtrl', function($scope, Lista, $http) {
    $scope.chats = Lista.all();

        $http.get('http://blogs.universal.org/renatocardoso/blog/').
            success(function(data, status, headers, config) {
                console.log(data);
                // this callback will be called asynchronously
                // when the response is available
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
})

.controller('TesteDetailCtrl', function($scope, $stateParams, Lista) {
    $scope.chat = Lista.get($stateParams.testeId);
    console.log($scope);
})

.controller('NotaDetailCtrl', function($scope, $stateParams, Notas) {
    $scope.nota = Notas.get($stateParams.notaId);
    console.log($scope.nota);

        $scope.editar = function(id){

            var titulo= document.getElementById("titulo").value;
            var descricao= document.getElementById("descricao").value;

            var  database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
            database.transaction(function(tx){
                editarNota(tx, titulo, descricao, id);
            }, errorNota, successNota);
        };

        $scope.doRefresh = function() {
            $http.get('/tab/nota')

                .success(function(newItems) {
                    $scope.nota = newItems;
                    $window.location.reload(true);
                })
                .finally(function() {
                    // Stop the ion-refresher from spinning
                    $scope.$broadcast('scroll.refreshComplete');
                });
        };

        function editarNota(tx, titulo, descricao, id){

            var now= new Date();
            var data= now.getFullYear()+now.getMonth()+now.getDay();
            var hora= now.getHours()+now.getMinutes()+now.getSeconds();

            query= "UPDATE nota SET titulo = '"+titulo+"' , descricao = '"+descricao+"' WHERE titulo =  '"+id+"'; ";
            //alert(query);
            tx.executeSql(query);
            var nota= [{
                id: 0,
                titulo: titulo,
                descricao: descricao
            }];
            Notas.change($scope.nota, nota);
        }

        function errorNota(error){
            alert("Erro ao inserir no banco: " + error);
        }

        function successNota(){
            window.open("index.html#/tab/nota", "_self");
        }

    })



.controller('TarefaCtrl', function($scope, Tarefas) {

    $scope.tarefas = Tarefas.all();
    console.log($scope.tarefas);
    $scope.data = {
        showDelete: false
    };

    $scope.delete = function(item) {
        //alert('Edit Item: ' + item.id);
        Tarefas.remove(item);
        //$scope.items.splice($scope.items.indexOf(item), 1);
    };
    $scope.share = function(item) {
        alert('Share Item: ' + item.id);
        console.log(items);
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
        $scope.items.splice(fromIndex, 1);
        $scope.items.splice(toIndex, 0, item);
    };

    $scope.onItemDelete = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
    };

    $scope.addNota = function(){

    };

})

.controller('NovaTarefaCtrl', function($scope, Tarefas, $location) {

    $scope.salvar = function(){

        console.log("teste");
        var descricao= document.getElementById("descricao").value;
        var descricao= document.getElementById("data").value;

        var  database= window.openDatabase("banco", "1.0", "banco de dados", 200000);
        database.transaction(function(tx){
            novoTarefa(tx, descricao);
        }, errorTarefa, successTarefa);
    };


    function novoTarefa(tx, descricao){

        var now= new Date();
        var data= now.getFullYear()+now.getMonth()+now.getDay();
        var hora= now.getHours()+now.getMinutes()+now.getSeconds();

        query= "INSERT INTO tarefa (  DESCRICAO, DT_CRIACAO, HR_CRIACAO) VALUES ('"+descricao+"', "+ data +", "+ hora +")";
        //alert(query);
        tx.executeSql(query);
        var tarefa= [{
            id: 0,
            descricao: descricao,
            dt_criacao: data,
            hr_criacao: hora
        }];
        Tarefas.set(tarefa);
        //console.log(nota);

    }

    function errorTarefa(error){
        alert("Erro ao inserir no banco: " + error);
    }

    function successTarefa(){
        window.history.back();
    }



})


.controller('TarefaDetailCtrl', function($scope, $stateParams, Tarefas) {
    $scope.tarefas = Tarefas.get($stateParams.tarefaId);
    //console.log($scope.tarefas);

    $scope.editar = function(id){

    };

    $scope.doRefresh = function() {
        $http.get('/tab/tarefa')

            .success(function(newItems) {
                $scope.nota = newItems;
                $window.location.reload(true);
            })
            .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.$broadcast('scroll.refreshComplete');
            });
    };

})




;
