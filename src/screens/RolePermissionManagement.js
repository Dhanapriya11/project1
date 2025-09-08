import React, { useState } from 'react';
import './RolePermissionManagement.css';

const RolePermissionManagement = () => {
  // Initial roles data
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full access to all system features',
      usersCount: 2,
      permissions: 'Full Access'
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access with limitations',
      usersCount: 5,
      permissions: 'Manage Users, Content, Reports'
    },
    {
      id: 3,
      name: 'Teacher',
      description: 'Access to teaching materials and student data',
      usersCount: 25,
      permissions: 'Create Content, Assign Tasks, Grade'
    },
    {
      id: 4,
      name: 'Student',
      description: 'Access to learning materials and assignments',
      usersCount: 500,
      permissions: 'View Content, Submit Assignments'
    }
  ]);

  // State for form handling
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: ''
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRole({
      ...newRole,
      [name]: value
    });
  };

  // Create new role
  const handleCreateRole = () => {
    if (newRole.name && newRole.description && newRole.permissions) {
      const role = {
        id: roles.length + 1,
        ...newRole,
        usersCount: 0
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: '' });
      setShowCreateForm(false);
    }
  };

  // Edit role
  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({
      name: role.name,
      description: role.description,
      permissions: role.permissions
    });
    setShowCreateForm(true);
  };

  // Update role
  const handleUpdateRole = () => {
    if (newRole.name && newRole.description && newRole.permissions) {
      setRoles(roles.map(role =>
        role.id === editingRole.id
          ? { ...role, ...newRole }
          : role
      ));
      setNewRole({ name: '', description: '', permissions: '' });
      setEditingRole(null);
      setShowCreateForm(false);
    }
  };

  // Delete role
  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowCreateForm(false);
    setEditingRole(null);
    setNewRole({ name: '', description: '', permissions: '' });
  };

  return (
    <div className="role-permission-management">
      <h1>Role & Permission Management</h1>
      <p>Define and control access rights for different roles</p>
      
      <div className="role-actions">
        <button className="primary-button" onClick={() => setShowCreateForm(true)}>
          Create New Role
        </button>
        <button className="secondary-button" onClick={() => alert('Edit permissions functionality to be implemented')}>
          Edit Permissions
        </button>
      </div>
      
      {/* Create/Edit Role Form */}
      {showCreateForm && (
        <div className="role-form">
          <h2>{editingRole ? 'Edit Role' : 'Create New Role'}</h2>
          <div className="form-group">
            <label htmlFor="roleName">Role Name</label>
            <input
              type="text"
              id="roleName"
              name="name"
              value={newRole.name}
              onChange={handleInputChange}
              placeholder="Enter role name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="roleDescription">Description</label>
            <textarea
              id="roleDescription"
              name="description"
              value={newRole.description}
              onChange={handleInputChange}
              placeholder="Enter role description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="rolePermissions">Permissions</label>
            <input
              type="text"
              id="rolePermissions"
              name="permissions"
              value={newRole.permissions}
              onChange={handleInputChange}
              placeholder="Enter permissions (comma separated)"
            />
          </div>
          <div className="form-actions">
            <button className="primary-button" onClick={editingRole ? handleUpdateRole : handleCreateRole}>
              {editingRole ? 'Update Role' : 'Create Role'}
            </button>
            <button className="secondary-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="role-table">
        <h2>Roles List</h2>
        <table>
          <thead>
            <tr>
              <th>Role Name</th>
              <th>Description</th>
              <th>Users Count</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id}>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.usersCount}</td>
                <td>{role.permissions}</td>
                <td>
                  <button className="action-button" onClick={() => handleEditRole(role)}>
                    Edit
                  </button>
                  <button className="action-button" onClick={() => handleDeleteRole(role.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RolePermissionManagement;