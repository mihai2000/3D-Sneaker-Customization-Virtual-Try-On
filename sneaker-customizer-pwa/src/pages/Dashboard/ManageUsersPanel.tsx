import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  getAllUsers,
  deleteUserById,
  createAppUser,
} from '../../services/users';
import { useThemeContext } from '../../hooks/useTheme';

export const ManageUsersPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (uid: string) => {
    await deleteUserById(uid);
    fetchUsers();
  };

  const handleCreate = async () => {
    if (!name || !email || !password) return;
    await createAppUser(email, password, name);
    setName('');
    setEmail('');
    setPassword('');
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const { theme } = useThemeContext();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" sx={{ color: '#80D0FF', mb: 2 }}>
        👥 Manage Users
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          mb: 3,
        }}
      >
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={theme.textFieldStyles}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={theme.textFieldStyles}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={theme.textFieldStyles}
        />
        <Button
          startIcon={<PersonAddAltIcon />}
          variant="contained"
          onClick={handleCreate}
          sx={{ height: '100%' }}
        >
          Create
        </Button>
      </Box>

      <List
        sx={{
          color: '#fff',
          bgcolor: 'rgba(255, 255, 255, 0.03)',
          borderRadius: 2,
          px: 1,
          py: 1,
          border: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        {users.map((user) => (
          <React.Fragment key={user.id}>
            <ListItem
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <ListItemText
                primary={
                  <Typography sx={{ color: theme.titleColor, fontWeight: 500 }}>
                    Name: {user.name}
                  </Typography>
                }
                secondary={
                  <Typography sx={{ color: '#aaa' }}>
                    Email: {user.email}
                  </Typography>
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  color="error"
                  onClick={() => handleDelete(user.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.05)',
                mx: 2,
              }}
            />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};
