import React, {useState, useEffect} from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import moment from 'moment';
import Button from '@material-ui/core/Button';


export default function TrainingList() {

  const trainings_api = 	"https://customerrest.herokuapp.com/api/trainings";
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(trainings_api)
    .then(response => response.json())
    .then(data => {
      fetchCustomers(data.content);
    })
    .catch(err => console.error(err))
  };

  const fetchCustomers = (trainings) => {
    for(let i = 0; i < trainings.length; i++) {
      let training = trainings[i];
      fetch(training.links[2].href)
      .then(response => response.json())
      .then(data => {
        training.customerName = data.firstname + " " + data.lastname;

        setTrainings(array => [...array, training])
      })
      .catch(err => console.error(err))
    }
  };


  const deleteTraining = (link) => {
    if(window.confirm("Delete this training from the database?")) {
      fetch(link, {method : 'DELETE'})
      .then(res => {
        setTrainings([]);
        fetchData();
      })
      .catch(err => console.error(err))
    }
  };

  const columns = [
    {
      Header : 'Date',
      id : 'date',
      accessor : row => moment(row.date).format('MMMM Do YYYY, h:mm:ss')
    },
    {
      Header : 'Duration',
      accessor : 'duration'
    },
    {
      Header : 'Activity',
      accessor : 'activity'
    },
    {
      Header : 'Customer',
      accessor : 'customerName'
    },
    {
      sortable : false,
      filterable : false,
      width : 100,
      accessor : 'links.0.href',
      Cell: row => <Button size="small" color="secondary" onClick={() => deleteTraining(row.value)}>Delete</Button>
    }
  ]
  return (
    <div>
      <ReactTable filterable={true} data={trainings} columns={columns} />
    </div>
  );
}