import { useState, useEffect } from 'react';
import React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function App() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [id, setId] = useState(0);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Drunk",
      task: 'Task1',
      description: "hvubusbcu"
    },
  ]);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('taskmaster'));
    if (Array.isArray(task)) {
      setData(task);
    }
  }, []);

  const addLocalStorage = (task) => {
    localStorage.setItem('taskmaster', JSON.stringify(task));
  }

  const addTask = () => {
    const randomId = Math.floor(Math.random() * 1000);

    const obj = {
      id: randomId,
      name,
      task,
      description
    };
   
    if (name && task && description) {
      const newList = [...data, obj];
      setData(newList);
      setName('');
      setTask('');
      setDescription('');
      addLocalStorage(newList);
      handleClose();
      alert("Plan added succesfully")
    } else {
      alert("Please fill all the fields");
    }
  }

  const removetask = (id) => {
    const filteredTasks = data.filter((task) => task.id !== id);
    setData(filteredTasks);
    addLocalStorage(filteredTasks);
  }

  const updateTaskInfo = () => {
   
    const indexUpdate = data.findIndex((task) => task.id === id);

    const updatedTask = {
      id,
      name,
      task,
      description,
    };
    
    const updatedData = [...data];
    updatedData[indexUpdate] = updatedTask;
    setData(updatedData);
    addLocalStorage(updatedData);
    handleClose();
    setId(0);
    setName('');
    setTask('');
    setDescription('');
    setIsEdit(false);
  };

  const editTask = (task) => {
    setId(task.id);
    setName(task.name);
    setTask(task.task);
    setDescription(task.description);
    setIsEdit(true);
    handleClickOpen();
  };


  return (
   <>

<React.Fragment>
     
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
       
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CancelSharpIcon sx={{marginRight:"10px", marginTop:"10px", fontSize:"29px", color:"rgb(107 114 131)"}}/>
        </IconButton>
        <DialogContent dividers>
        <div className='form'>

<p className='add-name'>
  Add Task📝
</p>
<input
  type="text"
  className='input'
  placeholder='Enter Task Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
/>

<input
  type="text"
  className='input'
  placeholder='Task'
  value={task}
  onChange={(e) => setTask(e.target.value)}
/>

<input
  type="text"
  className='input'
  placeholder='Description'
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>

<button
  type='button'
  className='add-btn'
  onClick={isEdit ? updateTaskInfo : addTask}
>
  {isEdit ? 'Update Task' : 'Add Task'}
</button>


</div>
        </DialogContent>
       
      </BootstrapDialog>
    </React.Fragment>
   
    <div className="App">
      <div>
        <h1 className='nav'>TASK MASTER</h1>
      </div>
      
      <div className='container'>
      

        <div className='form sss'>
          <p className='add-name'>
            Your Task📃
            
          </p>
          <Button variant="outlined" sx={{position:"absolute",right:"10px", top:"10px",fontWeight:"bold", color:"rgb(107 114 131)"}} onClick={handleClickOpen}>
        Add Task +
      </Button>
          <div  className='tsk-container'>
          {
            data.map((item) => {
              const { id, name, task, description } = item;
              return (
                <div key={id} className='task'>
    
                  <p className='task-name'>Name : {name}</p>
                  <p className='tasks'>Task : {task}</p>
                  <p className='description'>Description : {description}</p>
                  <button className='delete-btn'  type='button' onClick={() => removetask(id)}>🗑️</button>
                  <button
                   type='button'
                    className='edit-btn'
                    onClick={() => editTask(item)}
                  >✏️</button>

                </div>
              )
            })
          }
          </div>
        </div>
        
      </div>
     
    </div>
    <div className='extrs-div'>

</div>
   </>
    
  );
}

export default App;
