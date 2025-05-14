import { Paper, Stack, Box, Typography } from '@mui/material';

export default function CartSkeleton() {
  return (
    <Paper sx={{ p: 4, maxWidth: 900, mx: 'auto', mt: 6, borderRadius: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Shopping Cart
      </Typography>
      <Stack spacing={2} sx={{ mt: 3 }}>
        {[1, 2, 3].map((i) => (
          <Box
            key={i}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              py: 2,
              px: 1,
            }}
          >
            <Box sx={{ width: 64, height: 64, bgcolor: '#e0e0e0', borderRadius: 2 }} />
            <Box sx={{ flexGrow: 1 }}>
              <Box sx={{ width: '60%', height: 16, bgcolor: '#e0e0e0', mb: 1, borderRadius: 1 }} />
              <Box sx={{ width: '40%', height: 14, bgcolor: '#e0e0e0', borderRadius: 1 }} />
            </Box>
            <Box sx={{ width: 80, height: 32, bgcolor: '#e0e0e0', borderRadius: 1 }} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}
