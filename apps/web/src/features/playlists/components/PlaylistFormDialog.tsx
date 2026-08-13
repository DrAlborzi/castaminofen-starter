'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Checkbox, Dialog, Field, Input, Textarea } from '@/components/design-system';
import type { PlaylistFormValues } from '../types';

export function PlaylistFormDialog({
  open,
  mode,
  initialValues,
  onClose,
  onSubmit,
  isSubmitting,
}: {
  open: boolean;
  mode: 'create' | 'edit';
  initialValues?: PlaylistFormValues;
  onClose: () => void;
  onSubmit: (values: PlaylistFormValues) => Promise<void> | void;
  isSubmitting: boolean;
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PlaylistFormValues>({
    defaultValues: initialValues ?? { title: '', description: '', imageUrl: '', isPublic: false },
  });

  useEffect(() => {
    if (open) {
      reset(initialValues ?? { title: '', description: '', imageUrl: '', isPublic: false });
    }
  }, [initialValues, open, reset]);

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          onClose();
        }
      }}
      title={mode === 'create' ? 'ایجاد لیست پخش' : 'ویرایش لیست پخش'}
      description="برای حفظ ساده و کاربرپسند، فقط عنوان و توضیحات اصلی لازم است."
      footer={
        <>
          <Button type="button" variant="secondary" onClick={onClose} disabled={isSubmitting}>
            انصراف
          </Button>
          <Button type="submit" variant="primary" loading={isSubmitting} form="playlist-form" >
            {mode === 'create' ? 'ایجاد' : 'ذخیره'}
          </Button>
        </>
      }
    >
      <form id="playlist-form" className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <Field id="playlist-title" label="عنوان" error={errors.title?.message}>
          <Input id="playlist-title" {...register('title', { required: 'عنوان الزامی است.' })} />
        </Field>

        <div className="form-field">
          <label className="form-label" htmlFor="playlist-description">توضیحات</label>
          <Textarea id="playlist-description" rows={4} {...register('description')} />
        </div>

        <Field id="playlist-image-url" label="آدرس تصویر">
          <Input id="playlist-image-url" {...register('imageUrl')} />
        </Field>

        <label className="flex items-center gap-2 text-sm text-text-secondary">
          <Checkbox {...register('isPublic')} />
          عمومی شود
        </label>
      </form>
    </Dialog>
  );
}
