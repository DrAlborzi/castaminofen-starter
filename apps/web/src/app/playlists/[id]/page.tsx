'use client';

import { PlaylistDetailsPage } from '@/features/playlists';
import { PageContainer } from '@/components/design-system';

export default function PlaylistDetailRoutePage() {
  return (
    <main>
      <PageContainer>
        <PlaylistDetailsPage />
      </PageContainer>
    </main>
  );
}
