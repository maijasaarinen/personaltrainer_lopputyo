import React, {useState, useEffect} from 'react';
import ReactTable from "react-table-6";  
import "react-table-6/react-table.css";
import Button from '@material-ui/core/Button';
import moment from 'moment';

export default function CustomerList() {

  const trainings_api = 	"https://customerrest.herokuapp.com/api/trainings";
  const customer_api = 	"https://customerrest.herokuapp.com/api/customers";
  const [customers, setCustomers] = useState([]);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(customer_api)
    .then(response => response.json())
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  };

  const deleteCustomer = (link) => {
    if(window.confirm("Delete this customer from the database? This action is irreversible.")) {
      fetch(link, {method : 'DELETE'})
      .then(res => {
        fetchData();
      })
      .catch(err => console.error(err))
    }
  };

  const saveCustomer = (customer) => {
    fetch(customer_api, 
      {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(customer)
      }      

    )
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const saveTraining = (training) => {

    training.date = moment(training.date);
    console.log(training.date);
    fetch(trainings_api, 
      {
        method : 'POST',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(training)
      }      

    )
    .then(res => fetchData())
    .catch(err => console.error(err))
  }
  const updateCustomer = (customer, link) => {
    fetch(link, 
      {
        method : 'PUT',
        headers: {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(customer)
      }      

    )
    .then(res => fetchData())
    .catch(err => console.error(err))
  }

  const columns = [
    {
      Header : 'First name',
      accessor : 'firstname'
    },
    {
      Header : 'Last name',
      accessor : 'lastname'
    },
    {
      Header : 'Street address',
      accessor : 'streetaddress'
    },
    {
      Header : 'Postcode',
      accessor : 'postcode'
    },
    {
      Header : 'City',
      accessor : 'city'
    },
    {
      Header : 'Email',
      accessor : 'email'
    },
    {
      Header : 'Phone',
      accessor : 'phone'
    },
    {
      sortable : false,
      filterable : false,
      width : 200
    }, 
    {
      sortable : false,
      filterable : false,
      width : 120
    },
    {
      sortable : false,
      filterable : false,
      width : 100,
      accessor : 'links.0.href'
    }

  ]
  return (
    <div>
       <ReactTable filterable={true} data={customers} columns={columns} />
    </div>
  );
}