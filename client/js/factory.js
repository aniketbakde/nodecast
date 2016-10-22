nodeCast.factory('filesFactory', function($http) {
  var urlBase = '/api/files';
  var _fileService = {};
 
  _fileService.getFiles = function() {
    return $http.get(urlBase);
  };
 
  // _todoService.saveTodo = function(todo) {
    // return $http.post(urlBase, todo);
  // };
 
  // _todoService.updateTodo = function(todo) {
    // return $http.put(urlBase, todo);
  // };
 
  // _todoService.deleteTodo = function(id) {
    // return $http.delete(urlBase + '/' + id);
  // };
 
  return _fileService;
});