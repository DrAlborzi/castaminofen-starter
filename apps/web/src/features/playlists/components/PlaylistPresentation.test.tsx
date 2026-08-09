import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { PlaylistEpisodeList } from './PlaylistEpisodeList';
import { PlaylistFormDialog } from './PlaylistFormDialog';

describe('playlist presentation contracts', () => {
  it('uses the canonical no-items state for an empty playlist', () => {
    const html = renderToStaticMarkup(
      <PlaylistEpisodeList items={[]} onPlay={() => {}} onQueue={() => {}} onRemove={() => {}} />,
    );

    expect(html).toContain('role="status"');
    expect(html).toContain('data-category="no-items"');
    expect(html).toContain('این لیست هنوز اپیزودی ندارد');
  });

  it('associates playlist fields and exposes loading submit semantics', () => {
    const html = renderToStaticMarkup(
      <PlaylistFormDialog
        open
        mode="create"
        onClose={() => {}}
        onSubmit={() => {}}
        isSubmitting
      />,
    );

    expect(html).toContain('for="playlist-title"');
    expect(html).toContain('id="playlist-title"');
    expect(html).toContain('for="playlist-image-url"');
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain('disabled');
  });
});
