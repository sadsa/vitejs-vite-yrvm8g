import { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { AlertCircle, Settings, LogOut } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

// SignIn Component
const SignIn = ({ onSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn(username, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white rounded shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border rounded"
        />
        <button
          type="submit"
          className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

// CoreHubNotDiscovered Component
const CoreHubNotDiscovered = ({ onDiscover }) => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">CoreHub - Not Discovered</h2>
      <button
        onClick={onDiscover}
        className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
      >
        Discover CoreHub
      </button>
    </div>
  );
};

// CoreHubDiscoveredNotInstalled Component
const CoreHubDiscoveredNotInstalled = ({ onInstall, onReplace }) => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">
        CoreHub - Discovered - Not Installed
      </h2>
      <button
        onClick={onInstall}
        className="px-4 py-2 mr-4 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Install CoreHub
      </button>
      <button
        onClick={onReplace}
        className="px-4 py-2 text-white bg-yellow-500 rounded hover:bg-yellow-600"
      >
        Replace CoreHub
      </button>
    </div>
  );
};

// CoreHubDiscoveredInstalled Component
const CoreHubDiscoveredInstalled = ({
  onDiagnostics,
  onManageDevices,
  onUninstall,
}) => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">
        CoreHub - Discovered - Installed
      </h2>
      <button
        onClick={onDiagnostics}
        className="px-4 py-2 mr-4 text-white bg-purple-500 rounded hover:bg-purple-600"
      >
        Diagnostics
      </button>
      <button
        onClick={onManageDevices}
        className="px-4 py-2 mr-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
      >
        Manage Devices
      </button>
      <button
        onClick={onUninstall}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Uninstall CoreHub
      </button>
    </div>
  );
};

// AccountManagement Component
const AccountManagement = () => {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Account Management</h2>
      <p>
        Here you can manage your account details, change password, and set
        preferences.
      </p>
    </div>
  );
};

// Main App Component
const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [coreHubStatus, setCoreHubStatus] = useState('not-discovered');

  const handleSignIn = (username, password) => {
    // Implement actual authentication logic here
    setIsSignedIn(true);
  };

  const handleSignOut = () => {
    setIsSignedIn(false);
    setCoreHubStatus('not-discovered');
  };

  const handleDiscover = () => {
    setCoreHubStatus('discovered-not-installed');
  };

  const handleInstall = () => {
    setCoreHubStatus('discovered-installed');
  };

  const handleUninstall = () => {
    setCoreHubStatus('discovered-not-installed');
  };

  if (!isSignedIn) {
    return <SignIn onSignIn={handleSignIn} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="p-4 bg-white shadow">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold">CoreHub App</h1>
            <div>
              <button
                onClick={() => (window.location.href = '/account')}
                className="mr-4"
              >
                <Settings size={24} />
              </button>
              <button onClick={handleSignOut}>
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </nav>

        <div className="container p-4 mx-auto">
          <Route path="/account">
            <AccountManagement />
          </Route>
          <Route path="/">
            {coreHubStatus === 'not-discovered' && (
              <CoreHubNotDiscovered onDiscover={handleDiscover} />
            )}
            {coreHubStatus === 'discovered-not-installed' && (
              <CoreHubDiscoveredNotInstalled
                onInstall={handleInstall}
                onReplace={handleInstall}
              />
            )}
            {coreHubStatus === 'discovered-installed' && (
              <CoreHubDiscoveredInstalled
                onDiagnostics={() => {}}
                onManageDevices={() => {}}
                onUninstall={handleUninstall}
              />
            )}
          </Route>
        </div>

        <Alert className="fixed bottom-0 right-0 m-4">
          <AlertCircle className="w-4 h-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>
            CoreHub Status: {coreHubStatus.replace(/-/g, ' ')}
          </AlertDescription>
        </Alert>
      </div>
    </Router>
  );
};

export default App;
