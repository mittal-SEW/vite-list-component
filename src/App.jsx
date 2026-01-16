import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ListComponent from './components/ListComponent';
import Lists from './components/Lists';

const LIST_CONFIG = [
  { id: 'List1', title: 'List One' },
  { id: 'List2', title: 'List Two' },
  { id: 'List3', title: 'List Three' },
  { id: 'List4', title: 'List Four' },
  { id: 'List5', title: 'List Five' },
  { id: 'List6', title: 'List Six' },
];

function App() {
  const [items, setItems] = useState([]);

  const addItem = (text, source) => {
    const newItem = {
      id: `${source}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text,
      source,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        {LIST_CONFIG.map((list) => (
          <Box key={list.id} sx={{ flex: '1 1 300px', minWidth: 0 }}>
            <ListComponent
              title={list.title}
              source={list.id}
              items={items.filter((item) => item.source === list.id)}
              onAdd={addItem}
              onRemove={removeItem}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4 }}>
        <Lists items={items} />
      </Box>
    </Container>
  );
}

export default App;
