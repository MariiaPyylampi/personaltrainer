import React, { useEffect } from 'react';
import MaterialTable from 'material-table';

export default function Customerlist() {
    const [customers, setCustomers] = React.useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
        .then(response => response.json())
        .then(data => setCustomers(data.content))
    }

    const deleteCustomer = (rowData) => {
        if(window.confirm("You want to delete " + rowData.firstname + " " + rowData.lastname)) {
            fetch(rowData.links[0].href, {method: 'DELETE'})
            .then(res => fetchData())
            .catch(err => console.error(err))
        }
    }

    return (
        <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'First name', field: 'firstname' },
            { title: 'Last name', field: 'lastname' },
            { title: 'Email', field: 'email' },
            { title: 'Phone', field: 'phone' },
            { title: 'Address', field: 'streetaddress' },
            { title: 'Postcode', field: 'postcode' },
            { title: 'City', field: 'city' },
            { title: 'CustomerID', field: 'links[0].href' }            
          ]}
          data={ customers }
          title="Customers"
          actions={[
            {
              icon: 'delete',
              tooltip: 'Delete Customer',
              onClick: (event, rowData) => deleteCustomer(rowData)
            },
          ]}
      
        />
        </div>
    );
}