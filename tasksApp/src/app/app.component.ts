import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TaskService } from './task.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My App';
  tasks = [];
  selectedTask = null; 
  editTask = null; 
  newTask: any;
  constructor(private _taskService: TaskService){
  }

  ngOnInit() {
    this.newTask = {title:"", description:""};
  }
  getAll() {
    let observable = this._taskService.getTasks();
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our tasks in the component!", data);
      if ( 'tasks' in data ) {
        console.log("got some tasks")
        this.tasks = data['tasks'];
      }
      console.log(this.tasks);
    });    
  }
  edit(task) {
    this.editTask = Object.assign({},task);
  }
  choose(task) {
    this.selectedTask = task;
  }
  createTask() {
    console.log("Create  newTask!");
      let observable = this._taskService.createTask(this.newTask);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Created new task!", data);
      this.getAll();
    });    
  }
  updateTask() {
    console.log("update  Task!");
      let observable = this._taskService.updateTask(this.editTask._id, this.editTask);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Updated new task!", data);
      this.getAll();
    }); 
    this.editTask = null;   
  }
  delete(id) {
    let observable = this._taskService.deleteTask(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our tasks in the component!", data);
      if ( 'tasks' in data ) {
        console.log("got some tasks")
        this.tasks = data['tasks'];
      }
      console.log(this.tasks);
      this.getAll();
    });    
  }

}
