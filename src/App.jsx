import { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ListOne from './components/ListOne';
import ListTwo from './components/ListTwo';
import ListThree from './components/ListThree';
import Lists from './components/Lists';

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

  const list1Items = items.filter((i) => i.source === 'List1');
  const list2Items = items.filter((i) => i.source === 'List2');
  const list3Items = items.filter((i) => i.source === 'List3');

  return (
    <Container maxWidth="xl" sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Typography variant="h3" component="h1" gutterBottom align="center" sx={{ mb: 6, fontWeight: 700, color: 'primary.main' }}>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <ListOne items={list1Items} onAdd={(text) => addItem(text, 'List1')} onRemove={removeItem} />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <ListTwo items={list2Items} onAdd={(text) => addItem(text, 'List2')} onRemove={removeItem} />
        </Box>
        <Box sx={{ flex: '1 1 300px', minWidth: 0 }}>
          <ListThree items={list3Items} onAdd={(text) => addItem(text, 'List3')} onRemove={removeItem} />
        </Box>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Lists items={items} />
      </Box>
    </Container>
  );
}

export default App;
