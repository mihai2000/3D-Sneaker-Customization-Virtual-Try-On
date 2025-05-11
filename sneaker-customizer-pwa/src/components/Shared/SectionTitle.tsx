import { Typography } from '@mui/material';

export default function SectionTitle({ title }: { title: string }) {
  return (
    <Typography variant="h5" sx={{ mt: 3, mb: 2 }}>
      {title}
    </Typography>
  );
}
