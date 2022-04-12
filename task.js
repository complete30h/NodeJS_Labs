   
const tasks = [];
module.exports = class Task {
    constructor(taskname,status,deadline,attached,iscomplete) {
        this.taskname = taskname;
        this.status = status;
        this.deadline = deadline;
        this.attached = attached;
        this.iscomplete = iscomplete
        tasks.push(this);

    }
    static get()
    {
        return tasks;
    }

}