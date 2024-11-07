import React, { useState, useEffect } from 'react';
import { useAppContext } from 'src/context';
import { ConnectButton } from 'src/components/ConnectButton';
import { getUser } from 'src/services';
import { Container, Typography, Button, Box } from '@mui/material';

const TemplatePage = () => {
  const { isAuthorized, setDisplayName } = useAppContext();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Function to check if user is an admin
    const checkAdminStatus = async () => {
      const { profile } = await getUser();
      if (profile?.role === 'admin') {
        setIsAdmin(true);
        setDisplayName(profile.display_name);
      }
    };

    checkAdminStatus();
  }, [setDisplayName]);

  if (!isAdmin) {
    return (
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h5" color="error">
          You are not authorized to view this page.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Template Management
        </Typography>
        <Typography variant="body1" gutterBottom>
          Connect your Canva account to manage and integrate templates.
        </Typography>

        <ConnectButton />

        {isAuthorized && (
          <Box sx={{ marginTop: 4 }}>
            <Typography variant="body1">
              You are connected as {profile?.display_name}.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TemplatePage;
