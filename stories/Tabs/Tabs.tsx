import React, { useState } from 'react';
import './tabs.css';

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface TabsProps {
  /** Tab items */
  tabs: Tab[];
  /** Active tab ID */
  activeTab?: string;
  /** Change handler */
  onChange?: (tabId: string) => void;
  /** Visual variant */
  variant?: 'default' | 'boxed' | 'underline';
  /** Size variant */
  size?: 'small' | 'medium' | 'large';
  /** Full width tabs */
  fullWidth?: boolean;
  /** Additional CSS classes */
  className?: string;
}

/** Tabs component for organizing content */
export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab: controlledActiveTab,
  onChange,
  variant = 'default',
  size = 'medium',
  fullWidth = false,
  className = '',
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  const handleTabClick = (tabId: string) => {
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  const tabsClasses = [
    'snake-tabs',
    `snake-tabs--${variant}`,
    `snake-tabs--${size}`,
    fullWidth && 'snake-tabs--full-width',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={tabsClasses}>
      <div className="snake-tabs__header">
        <div className="snake-tabs__list" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              className={[
                'snake-tabs__tab',
                activeTab === tab.id && 'snake-tabs__tab--active',
                tab.disabled && 'snake-tabs__tab--disabled',
              ]
                .filter(Boolean)
                .join(' ')}
              onClick={() => !tab.disabled && handleTabClick(tab.id)}
              disabled={tab.disabled}
            >
              {tab.icon && <span className="snake-tabs__icon">{tab.icon}</span>}
              <span className="snake-tabs__label">{tab.label}</span>
            </button>
          ))}
        </div>
        <div className="snake-tabs__indicator" />
      </div>

      <div className="snake-tabs__content">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            id={`tabpanel-${tab.id}`}
            role="tabpanel"
            aria-labelledby={tab.id}
            className={['snake-tabs__panel', activeTab === tab.id && 'snake-tabs__panel--active']
              .filter(Boolean)
              .join(' ')}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
