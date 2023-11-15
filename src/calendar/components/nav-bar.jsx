import { useAuthStore } from '../../hooks/use-auth-store';
import { Offline, Online } from 'react-detect-offline';

export const Navbar = () => {
  const { user, startLogout } = useAuthStore();

  return (
    <div className="navbar navbar-dark bg-dark px-4 mb-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user?.name}
      </span>
      <Online>
        <span class="badge rounded-pill bg-success">Online</span>
      </Online>
      <Offline>
        <span class="badge rounded-pill bg-danger">
          Offline - Tus cambios serán guardados
        </span>
      </Offline>
      <button className="btn btn-outline-danger" onClick={startLogout}>
        <span>
          <i className="fas fa-sign-out-alt"></i>
          &nbsp; Salir
        </span>
      </button>
    </div>
  );
};
