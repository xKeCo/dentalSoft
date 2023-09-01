// Styles
import s from './Sidebar.module.scss';

// Interfaces
interface ISidebarProps {
  open: boolean;
  hover: boolean;
}

export const Sidebar = ({ open, hover }: ISidebarProps) => {
  return (
    <div
      className={`${s.Sidebar__container} ${open && s.Sidebar__container__closed}`}
      style={{
        left: hover && '0px',
      }}
    >
      <div className={`${s.Sidebar} ${open && s.Sidebar__closed}`}>
        <h1>Sidebar</h1>
      </div>
    </div>
  );
};
