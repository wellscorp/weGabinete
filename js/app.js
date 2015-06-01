// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }


      var db= window.openDatabase("banco", "1.0", "banco de dados", 200000);
      //database= createOpen("teste", "1.0", "testando selecao", 200000);
      db.transaction(PopulateDatabase, errorDB, successDB);



      function PopulateDatabase(tx){

          //tx.executeSql("DROP TABLE pasta");
          //tx.executeSql("DROP TABLE tarefa");
          tx.executeSql("Create TABLE IF NOT EXISTS pasta (ID_PASTA INTEGER PRIMARY KEY  AUTOINCREMENT , NOME text,  DT_CRIACAO numeric, HR_CRIACAO numeric)");
          tx.executeSql("Create TABLE IF NOT EXISTS tarefa (" +
                                    "ID_TAREFA INTEGER PRIMARY KEY  AUTOINCREMENT  , " +
                                    "DESCRICAO text,  " +
                                      "DT_CRIACAO numeric, " +
                                      "DATA numeric, " +
                                      "HORA numeric, " +
                                    "HR_CRIACAO numeric," +
                                    "ID_PASTA INTEGER," +
                                    "FOREIGN KEY (ID_PASTA) REFERENCES pasta (ID_PASTA)" +
          ")");
          //tx.executeSql("INSERT INTO tarefa (DESCRICAO, ID_PASTA) VALUES ('TAREFA 02', 1)");


      }

      function errorDB(error){
          alert("Erro ao criar banco: " + error);
      }

      function successDB(){
          //alert("Informações inseridas com sucesso!");
      }



  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
      url: '/account',
      views: {
          'tab-account': {
              templateUrl: 'templates/tab-account.html',
              controller: 'AccountCtrl'
          }
      }
  })

      .state('tab.teste', {
          url: '/teste',
          views: {
              'tab-teste': {
                  templateUrl: 'templates/tab-teste.html',
                  controller: 'TesteCtrl'
              }
          }
      })

      .state('tab.tarefa', {
          url: '/tarefa',
          views: {
              'tab-tarefa': {
                  templateUrl: 'templates/tab-tarefa.html',
                  controller: 'TarefaCtrl'
              }
          }
      })
      .state('tab.nova-tarefa', {
          url: '/tarefa/inserir',
          views: {
              'tab-tarefa': {
                  templateUrl: 'templates/nova-tarefa.html',
                  controller: 'NovaTarefaCtrl'
              }
          }
      })
      .state('tab.teste-detail', {
          url: '/teste/:testeId',
          views: {
              'tab-teste': {
                  templateUrl: 'templates/teste-detail.html',
                  controller: 'TesteDetailCtrl'
              }
          }
      })
        .state('tab.tarefa-detail', {
            url: '/tarefa/:tarefaId',
            views: {
                'tab-tarefa': {
                    templateUrl: 'templates/tarefa-detail.html',
                    controller: 'TarefaDetailCtrl'
                }
            }
        });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
