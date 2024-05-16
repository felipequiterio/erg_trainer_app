import { Link } from 'expo-router';
import { openBrowserAsync } from 'expo-web-browser';
import React, { ComponentProps } from 'react';
import { Platform } from 'react-native';

// Your component implementation
const ExternalLink: React.FC<ComponentProps<typeof Link>> = (props) => {
  const { href, ...rest } = props;

  return (
    <Link
      href={href}
      onPress={(event) => {
        if (Platform.OS !== 'web') {
          event.preventDefault();
          openBrowserAsync(href as string);
        }
      }}
      {...rest}
    />
  );
};

export default ExternalLink;
