import React, { useEffect } from 'react';

import MaterialTable from 'material-table';

export default function Trainingslist() {
    const [trainings, setTrainings] = React.useState([]);

    useEffect(() => fetchData(), []);

    const fetchData = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings', {method: 'GET'})
        .then(response => response.json())
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const deleteTraining = (rowData) => {
        fetch('https://customerrest.herokuapp.com/api/trainings/' + rowData.id, {method: 'DELETE'})
        .then(res => fetchData())
        .catch(err => console.error(err))
    }

    return (
        <div>
           <div style={{ maxWidth: '100%' }}>
                <MaterialTable
                columns={[
                    { title: 'Activity', field: 'activity' },
                    { title: 'Date', field: 'date', type: 'datetime' },
                    { title: 'Duration (min)', field: 'duration' },
                    { title: 'Customer', render: (d) => d.customer.firstname + " " + d.customer.lastname }
                ]}
                data={ trainings }
                title="Trainings"
                editable={{
                    onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                           deleteTraining(oldData)
                            resolve();
                        }, 1000);
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
        </div>
    );
};