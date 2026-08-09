import { Button, EmptyState } from '@/components/design-system';

export function PlaylistEmptyState({ onCreate }: { onCreate?: () => void }) {
  return (
    <EmptyState
      title="هنوز لیست پخش ندارید"
      description="برای شروع، اولین لیست پخش خود را بسازید و اپیزودها را در آن مرتب کنید."
      action={
        <Button type="button" variant="primary" onClick={onCreate}>
          ساخت لیست پخش جدید
        </Button>
      }
    />
  );
}
