import { Link } from 'react-router-dom';
import { LogIn, UserPlus, MessageCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { SearchBar } from '../ui/search-bar';
import { useAuth } from '../../hooks/use-auth';
import { supabase } from '../../lib/supabase';
import { useUserStore, toggleUserRole, getCurrentUser } from '../../lib/store/user-store';

export function Header() {
  const { user } = useAuth();
  const currentRole = useUserStore((state) => state.currentRole);
  const currentUser = getCurrentUser();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const handleRoleToggle = () => {
    toggleUserRole();
  };

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold">
          SAMAAS
        </Link>
        
        <div className="flex-1 mx-8">
          <SearchBar />
        </div>
        
        <nav className="flex items-center space-x-4">
          {/* Add role switcher for testing */}
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRoleToggle}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            {currentRole === 'guest' ? 'Switch to Host' : 'Switch to Guest'}
          </Button>

          {user ? (
            <>
              <Link to="/messages">
                <Button variant="outline" size="sm">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Messages
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSignOut}
              >
                Sign Out ({currentUser.name})
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" size="sm">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Register
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}