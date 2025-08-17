import { LucideKanban } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme/theme-switcher';
import { buttonVariants } from '@/components/ui/button';
import { homePath, ticketsPath } from '@/paths';

const Header = () => {
  return (
    <>
      <nav className="supports-backdrop-blur:bg-background/60 bg-background/95 fixed top-0 right-0 left-0 z-20 flex w-full justify-between border-b px-5 py-2.5 backdrop-blur">
        <div className="items-center flex gap-x-2">
          <Link
            href={homePath()}
            className={buttonVariants({ variant: 'ghost' })}
          >
            <LucideKanban />
            <h1 className="text-lg font-semibold">TicketBounty</h1>
          </Link>
        </div>
        <div className="align-items flex gap-x-2">
          <ThemeSwitcher />
          <Link
            href={ticketsPath()}
            className={buttonVariants({ variant: 'default' })}
          >
            Tickets
          </Link>
        </div>
      </nav>
    </>
  );
};

export { Header };
