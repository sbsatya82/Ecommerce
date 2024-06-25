import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, TextField, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { Box, Typography } from '@mui/material';
import '../../dashboard/Dashboard.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserRole, setSelectedUserRole] = useState('');
  const [userToEdit, setUserToEdit] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/v1/users'); // Replace with your API endpoint
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteClick = (userId) => {
    setSelectedUserId(userId);
    setOpenDeleteDialog(true);
  };

  const handleEditClick = (user) => {
    setUserToEdit(user);
    setSelectedUserRole(user.role);
    setOpenEditDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/user/${selectedUserId}`);
      console.log(data);
      if (data.success === true) {
        setUsers(users.filter(user => user._id !== selectedUserId));
        setOpenDeleteDialog(false);
        setSelectedUserId(null);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditConfirm = async () => {
    try {
      const { data } = await axios.put(`/api/v1/user/${userToEdit._id}`, { role: selectedUserRole });
      console.log(data);
      if (data.success === true) {
        setUsers(users.map(user => user._id === userToEdit._id ? { ...user, role: selectedUserRole } : user));
        setOpenEditDialog(false);
        setUserToEdit(null);
        setSelectedUserRole('');
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleDialogClose = () => {
    setOpenDeleteDialog(false);
    setSelectedUserId(null);
  };

  const handleEditDialogClose = () => {
    setOpenEditDialog(false);
    setUserToEdit(null);
    setSelectedUserRole('');
  };

  return (
    <Box className="dashboard-container">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>Avatar</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user._id}</TableCell>
                <TableCell>
                  <img src={user.avatar.url} alt={user.name} width="50" height="50" />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEditClick(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteClick(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDialogClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Role Dialog */}
      <Dialog open={openEditDialog} onClose={handleEditDialogClose}>
        <DialogTitle>Edit User Role</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Role"
            value={selectedUserRole}
            onChange={(e) => setSelectedUserRole(e.target.value)}
            fullWidth
            margin="normal"
          >
            <MenuItem value="user">User</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleEditConfirm} color="secondary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserList;
