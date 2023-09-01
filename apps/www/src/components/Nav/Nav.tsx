// UI Components
import { Button } from 'ui';

// Styles
import s from './Nav.module.scss';

// Interfaces
interface INavProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setHover: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Nav = ({ open, setOpen, setHover }: INavProps) => {
  return (
    <header className={s.Nav}>
      <div>
        <Button
          onMouseEnter={(e) => {
            e.preventDefault();
            setHover(true);
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            setHover(false);
          }}
          onClick={() => {
            setOpen(!open);
          }}
          style={{
            padding: '1rem',
          }}
        >
          Open
        </Button>
      </div>
      <h1>Nav</h1>
    </header>
  );
};
