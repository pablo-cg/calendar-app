import { useAuthStore } from '../../hooks/use-auth-store';

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark px-4 mb-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user?.name}
      </span>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <span>
          <i className="fas fa-sign-out-alt"></i>
          &nbsp; Salir
        </span>
      </button>
    </div>
  );
};
