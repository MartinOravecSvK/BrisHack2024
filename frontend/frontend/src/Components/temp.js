import { useEffect } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

const AddDataComponent = () => {
  useEffect(() => {
    // Get a reference to the database
    const database = getDatabase();

    // Prepare the data to add to the database
    const newData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    };

    // Add the data to the database
    const databaseRef = ref(database, 'users'); // Reference to the 'users' node in the database
    push(databaseRef, newData); // Add newData to the 'users' node, generating a unique key for the new data

    // You can also use set() or update() method to add or update data:
    // set(databaseRef, newData); // Set newData to the 'users' node, overwriting any existing data
    // update(databaseRef, newData); // Update the data at 'users' node with newData properties

    // Clean up function (optional)
    return () => {
      // Perform any cleanup if needed
    };
  }, []);

  return (
    <div>
      <h2>Add Data to Firebase Realtime Database</h2>
      {/* Add any additional components or UI elements as needed */}
    </div>
  );
};

export default AddDataComponent;
