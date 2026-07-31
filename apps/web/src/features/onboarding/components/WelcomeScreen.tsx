"use client";

import Link from 'next/link';
import Image from 'next/image';

export function WelcomeScreen() {
  return (
    <section className="flex min-h-[70vh] w-full flex-col items-center justify-center px-4 py-8 text-center sm:px-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6">
        <Image src="/branding/mobile-logo.png" alt="Castaminofen" width={96} height={96} className="h-24 w-auto sm:h-28" />

        <div className="space-y-2">
          <h1 className="text-heading text-2xl sm:text-3xl">برای شروع، فقط یک گوش دادن ساده کافی است</h1>
          <p className="text-sm leading-7 text-text-secondary">
            Castaminofen به تو کمک می‌کند پادکست‌های مرتبط را کشف کنی، گوش دادن را ادامه بدهی و در بازگشت‌ها به مسیر شخصی‌ات برگردی.
          </p>
        </div>

        <Link href="/login" className="button button-primary w-full max-w-xs justify-center rounded-full px-6 py-4 text-base shadow-lg">
          شروع کردن
        </Link>

        <Link href="/offline-library" className="text-sm font-medium text-text-secondary transition hover:text-accent">
          ادامه‌ی آفلاین
        </Link>
      </div>
    </section>
  );
}

export default WelcomeScreen;
