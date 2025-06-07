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
  FormControlLabel,
  Checkbox,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import {
  getAllUsers,
  deleteUserById,
  createAppUser,
} from '../../services/users';
import { useThemeContext } from '../../hooks/useTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

export const ManageUsersPanel: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fetchUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  const handleDelete = async (uid: string) => {
    await deleteUserById(uid);
    fetchUsers();
  };

  const handleCreate = async () => {
    if (!name || !email || !password) {
      toast.error('⚠️ Please fill out all fields before creating a user');
      return;
    }
    try {
      await createAppUser(
        email,
        password,
        name,
        isAdmin ? 'admin' : 'user'
      );
      setName('');
      setEmail('');
      setPassword('');
      setIsAdmin(false);
      fetchUsers();
      toast.success('✅ User created successfully');
    } catch (err: any) {
      console.error(err);
      toast.error(`❌ Failed to create user: ${err.message}`);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  const { theme } = useThemeContext();

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h2" sx={{ color: '#80D0FF', mb: 2 }}>
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
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
          sx={theme.textFieldStyles}
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={theme.textFieldStyles}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword((prev) => !prev)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOff sx={{ color: '#fff' }} />
                  ) : (
                    <Visibility sx={{ color: '#fff' }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              sx={{ color: '#80D0FF' }}
            />
          }
          label="Admin"
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
