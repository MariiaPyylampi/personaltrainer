import React, { useEffect } from 'react';
import MaterialTable from 'material-table';
import Addtraining from './Addtraining';

export default function Customerlist() {
    const [customers, setCustomers] = React.useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const deleteCustomer = (rowData) => {
            fetch(rowData.links[0].href, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
    }

    const editCustomer = (newData, link) => {
      fetch(link, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newData)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
      fetch('https://customerrest.herokuapp.com/api/customers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    const saveTraining = (training) => {
      fetch('https://customerrest.herokuapp.com/api/trainings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(training)
      })
      .then(res => fetchData())
      .catch(err => console.error(err))
    }

    return (
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: ' ', editable: 'onAdd', field: 'links[0].href', render: rowData => <Addtraining saveTraining={saveTraining} rowData={rowData}/>},//editable: 'never' rikkoo onRowAddin
            { title: 'First name', field: 'firstname' },
            { title: 'Last name', field: 'lastname' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Address', field: 'streetaddress' },
            { title: 'Postcode', field: 'postcode' },
            { title: 'City', field: 'city' }     
          ]}
          data={ customers }
          title="Customers"
          editable={{
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                saveCustomer(newData)          
                resolve()
              }, 1000)
            }),
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
                setTimeout(() => {
                   deleteCustomer(oldData)
                    resolve();
                }, 1000);
            }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  editCustomer(newData, oldData.links[0].href)
                  resolve()                 
                }, 1000)
              }),
          }}
          options={{
            headerStyle: {
              backgroundColor: '#ccc',
              color: 'black'
            }
          }}
        />
        </div>
    );
}