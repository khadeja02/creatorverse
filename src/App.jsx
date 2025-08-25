import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { supabase } from './client';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';
import './App.css';

function App() {
  const [creators, setCreators] = useState([]);

  const fetchCreators = async () => {
    try {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching creators:', error);
      } else {
        setCreators(data || []);
      }
    } catch (error) {
      console.error('Error fetching creators:', error);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, []);

  // Define routes
  const element = useRoutes([
    {
      path: '/',
      element: <ShowCreators creators={creators} refreshCreators={fetchCreators} />
    },
    {
      path: '/view/:id',
      element: <ViewCreator />
    },
    {
      path: '/edit/:id',
      element: <EditCreator refreshCreators={fetchCreators} />
    },
    {
      path: '/add',
      element: <AddCreator refreshCreators={fetchCreators} />
    }
  ]);

  return (
    <div className="App">
      {element}
    </div>
  );
}

export default App;