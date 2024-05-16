import React, { ReactNode } from 'react';
import { TabBarIcon } from '../components/navigation/TabBarIcon';
import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      {/* Layout content */}
      {children}
    </div>
  );
};

export default Layout;
