import { Grid, Skeleton, Box, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';

export default function SavedDesignsSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Grid container spacing={3}>
        {Array.from({ length: 6 }).map((_, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <Card
              sx={{
                borderRadius: 3,
                background: 'radial-gradient(circle at top, #1f1f28, #0c0c12)',
                border: '1px solid rgba(255,255,255,0.05)',
                boxShadow: '0 0 24px rgba(58, 94, 255, 0.2)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Skeleton
                variant="rectangular"
                height={180}
                animation="wave"
                sx={{ bgcolor: 'rgba(255,255,255,0.03)' }}
              />
              <CardContent>
                <Skeleton
                  variant="text"
                  width="60%"
                  sx={{ bgcolor: 'rgba(255,255,255,0.06)' }}
                />
                <Skeleton
                  variant="text"
                  width="40%"
                  sx={{ bgcolor: 'rgba(255,255,255,0.06)' }}
                />
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={36}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}
                  />
                  <Skeleton
                    variant="rectangular"
                    width={80}
                    height={36}
                    sx={{ bgcolor: 'rgba(255,255,255,0.05)' }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
}
