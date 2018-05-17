import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private _http: HttpClient){
  }

  getTasks(){
    console.log("getTask:");
    return this._http.get('/tasks');
  }

  createTask(data){
    console.log("createTask:");
    return this._http.post('/tasks', data);
  }

  updateTask(id, data) {
    console.log("updateTask:", data);  
    return this._http.put('/tasks/' + id, data);
  }
   
  deleteTask(id) {
    console.log("deleteTask:");  
    return this._http.delete('/tasks/' + id);
  }
}
