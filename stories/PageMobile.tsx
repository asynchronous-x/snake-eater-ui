import React, { useState } from 'react';
import { Button } from './Button/Button';
import { Card } from './Card/Card';
import { SubCard } from './SubCard/SubCard';
import { Input } from './Input/Input';
import { Badge } from './Badge/Badge';
import { Modal } from './Modal/Modal';
import { Toast } from './Toast/Toast';
import { IconButton } from './IconButton/IconButton';
import { Menu } from './Menu/Menu';
import { Link } from './Link/Link';
import { Heading } from './Heading/Heading';
import { Text } from './Text/Text';
import { Divider } from './Divider/Divider';
import { Progress } from './Progress/Progress';
import { Stat } from './Stat/Stat';
import { Toggle } from './Toggle/Toggle';
import { Accordion } from './Accordion/Accordion';
import { Alert } from './Alert/Alert';
import './page.css';

// Icon components from pixel-icon-library
const BarsIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="22 11 23 11 23 13 22 13 22 14 2 14 2 13 1 13 1 11 2 11 2 10 22 10 22 11"/>
    <polygon points="22 19 23 19 23 21 22 21 22 22 2 22 2 21 1 21 1 19 2 19 2 18 22 18 22 19"/>
    <polygon points="23 3 23 5 22 5 22 6 2 6 2 5 1 5 1 3 2 3 2 2 22 2 22 3 23 3"/>
  </svg>
);

const SearchIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="16 17 15 17 15 18 13 18 13 19 7 19 7 18 5 18 5 17 4 17 4 16 3 16 3 15 2 15 2 13 1 13 1 7 2 7 2 5 3 5 3 4 4 4 4 3 5 3 5 2 7 2 7 1 13 1 13 2 15 2 15 3 16 3 16 4 17 4 17 5 18 5 18 7 19 7 19 13 18 13 18 15 17 15 17 16 16 16 16 17"/>
    <polygon points="23 20 23 22 22 22 22 23 20 23 20 22 19 22 19 21 18 21 18 20 17 20 17 19 16 19 16 18 17 18 17 17 18 17 18 16 19 16 19 17 20 17 20 18 21 18 21 19 22 19 22 20 23 20"/>
  </svg>
);

const BellIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <polygon points="15 20 15 22 14 22 14 23 10 23 10 22 9 22 9 20 15 20"/>
    <polygon points="22 17 22 18 21 18 21 19 3 19 3 18 2 18 2 17 3 17 3 16 4 16 4 14 5 14 5 8 6 8 6 6 7 6 7 5 8 5 8 4 10 4 10 3 11 3 11 1 13 1 13 3 14 3 14 4 16 4 16 5 17 5 17 6 18 6 18 8 19 8 19 14 20 14 20 16 21 16 21 17 22 17"/>
  </svg>
);

const CogIcon = ({ className = '' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="m21,10v-1h-1v-2h1v-2h-1v-1h-1v-1h-2v1h-2v-1h-1V1h-4v2h-1v1h-2v-1h-2v1h-1v1h-1v2h1v2h-1v1H1v4h2v1h1v2h-1v2h1v1h1v1h2v-1h2v1h1v2h4v-2h1v-1h2v1h2v-1h1v-1h1v-2h-1v-2h1v-1h2v-4h-2Zm-11,0v-1h4v1h1v4h-1v1h-4v-1h-1v-4h1Z"/>
  </svg>
);

export const PageMobile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  const mobileStats = [
    { label: 'Active Users', value: '2.4K', change: '+12%' },
    { label: 'Daily Sessions', value: '8.7K', change: '+5%' },
    { label: 'Avg. Time', value: '4m 32s', change: '-8%' },
    { label: 'Conversion', value: '3.2%', change: '+18%' },
  ];

  const menuItems = [
    { label: 'Home', icon: '🏠' },
    { label: 'Profile', icon: '👤' },
    { label: 'Messages', icon: '💬', badge: '3' },
    { label: 'Notifications', icon: <BellIcon />, badge: '12' },
    { label: 'Settings', icon: <CogIcon /> },
    { label: 'Help', icon: '❓' },
    { label: 'Logout', icon: '🚪' },
  ];

  const activities = [
    { user: 'Alex Johnson', action: 'completed task', target: 'Mobile UI Update', time: '2m ago', avatar: '👤' },
    { user: 'Sarah Chen', action: 'commented on', target: 'Navigation Design', time: '15m ago', avatar: '👤' },
    { user: 'Mike Davis', action: 'uploaded', target: '3 new mockups', time: '1h ago', avatar: '👤' },
    { user: 'Emma Wilson', action: 'started', target: 'User Testing Session', time: '2h ago', avatar: '👤' },
  ];

  const navItems = [
    { key: 'home', label: '🏠', title: 'Home' },
    { key: 'explore', label: <SearchIcon />, title: 'Explore' },
    { key: 'create', label: '➕', title: 'Create' },
    { key: 'inbox', label: '📥', title: 'Inbox' },
    { key: 'profile', label: '👤', title: 'Profile' },
  ];

  return (
    <div className="snake-page snake-page--mobile">
      {/* Mobile Header */}
      <div className="snake-mobile__header">
        <div className="snake-mobile__header-left">
          <IconButton variant="ghost" size="small" onClick={() => setShowMenu(true)}>
            <BarsIcon />
          </IconButton>
          <Heading as="h1" size="lg">Snake UI</Heading>
        </div>
        <div className="snake-mobile__header-right">
          <IconButton variant="ghost" size="small" onClick={() => setShowSearch(!showSearch)}>
            <SearchIcon />
          </IconButton>
          <IconButton variant="ghost" size="small" onClick={() => setShowNotification(true)}>
            <BellIcon />
            <Badge variant="danger" size="small" className="snake-mobile__notification-badge">3</Badge>
          </IconButton>
        </div>
      </div>

      {/* Search Bar (collapsible) */}
      {showSearch && (
        <div className="snake-mobile__search">
          <Input 
            placeholder="Search..." 
            fullWidth 
            size="small"
            style={{ marginBottom: '16px' }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="snake-mobile__content">
        {/* Stats Grid */}
        <div className="snake-mobile__stats">
          {mobileStats.map((stat, index) => (
            <div key={index} className="snake-mobile__stat">
              <Stat 
                label={stat.label} 
                value={stat.value} 
                helpText={stat.change}
                variant={stat.change.startsWith('+') ? 'success' : 'danger'}
                size="small"
              />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="snake-mobile__section">
          <Heading as="h2" size="md">Quick Actions</Heading>
          <div className="snake-mobile__actions">
            <Button variant="primary" size="small" fullWidth>New Post</Button>
            <Button variant="secondary" size="small" fullWidth>Upload Media</Button>
            <Button variant="ghost" size="small" fullWidth>Share Link</Button>
          </div>
        </Card>

        {/* Activity Feed */}
        <Card className="snake-mobile__section">
          <Heading as="h2" size="md">Recent Activity</Heading>
          <div className="snake-mobile__activity-feed">
            {activities.map((activity, index) => (
              <React.Fragment key={index}>
                <div className="snake-mobile__activity-item">
                  <div className="snake-mobile__activity-avatar">{activity.avatar}</div>
                  <div className="snake-mobile__activity-content">
                    <Text size="small">
                      <strong>{activity.user}</strong> {activity.action} <Link>{activity.target}</Link>
                    </Text>
                    <Text size="small" variant="muted">{activity.time}</Text>
                  </div>
                </div>
                {index < activities.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </div>
        </Card>

        {/* Progress Tracking */}
        <Card className="snake-mobile__section">
          <Heading as="h2" size="md">Today's Progress</Heading>
          <div className="snake-mobile__progress-items">
            <div>
              <Text size="small">Tasks Completed</Text>
              <Progress value={75} size="small" variant="success" />
            </div>
            <div>
              <Text size="small">Time Tracked</Text>
              <Progress value={60} size="small" variant="warning" />
            </div>
            <div>
              <Text size="small">Goals Achieved</Text>
              <Progress value={90} size="small" variant="primary" />
            </div>
          </div>
        </Card>

        {/* Settings Preview */}
        <Card className="snake-mobile__section">
          <Heading as="h2" size="md">Settings</Heading>
          <Accordion items={[
            {
              title: 'Notifications',
              content: (
                <div className="snake-mobile__setting">
                  <Text size="small">Push Notifications</Text>
                  <Toggle checked={notifications} onChange={setNotifications} size="small" />
                </div>
              )
            },
            {
              title: 'Appearance',
              content: (
                <div className="snake-mobile__setting">
                  <Text size="small">Dark Mode</Text>
                  <Toggle checked={darkMode} onChange={setDarkMode} size="small" />
                </div>
              )
            },
            {
              title: 'Privacy',
              content: (
                <div style={{ padding: '12px 0' }}>
                  <Button variant="ghost" size="small" fullWidth>Manage Privacy Settings</Button>
                </div>
              )
            }
          ]} />
        </Card>

        {/* Alert Example */}
        <Alert 
          variant="info" 
          dismissible 
          style={{ marginTop: '16px' }}
        >
          <Text size="small">Pull down to refresh for latest updates</Text>
        </Alert>
      </div>

      {/* Mobile Navigation (Bottom Tab Bar) */}
      <div className="snake-mobile__nav">
        <div className="snake-mobile__nav-tabs">
          {navItems.map((item) => (
            <button
              key={item.key}
              className={`snake-mobile__nav-tab ${activeTab === item.key ? 'snake-mobile__nav-tab--active' : ''}`}
              onClick={() => setActiveTab(item.key)}
              title={item.title}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side Menu Modal */}
      <Modal 
        isOpen={showMenu} 
        onClose={() => setShowMenu(false)}
        title="Menu"
        className="snake-mobile__menu-modal"
      >
        <div className="snake-mobile__menu">
          {menuItems.map((item, index) => (
            <div key={index} className="snake-mobile__menu-item">
              <Button 
                variant="ghost" 
                fullWidth 
                style={{ justifyContent: 'flex-start', gap: '12px' }}
                onClick={() => setShowMenu(false)}
              >
                <span>{item.icon}</span>
                <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>
                {item.badge && <Badge variant="danger" size="small">{item.badge}</Badge>}
              </Button>
            </div>
          ))}
        </div>
      </Modal>

      {/* Notification Toast */}
      {showNotification && (
        <Toast
          variant="success"
          onDismiss={() => setShowNotification(false)}
          style={{ 
            position: 'fixed', 
            top: '70px', 
            right: '20px', 
            left: '20px',
            maxWidth: 'calc(100% - 40px)'
          }}
        >
          <Text size="small">New message from Sarah Chen</Text>
        </Toast>
      )}
    </div>
  );
};