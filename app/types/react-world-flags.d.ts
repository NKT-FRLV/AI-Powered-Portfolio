declare module 'react-world-flags' {
  import React from 'react';
  
  interface FlagsProps {
    code: string;
    style?: React.CSSProperties;
    className?: string;
    [key: string]: any;
  }
  
  const Flags: React.FC<FlagsProps>;
  
  export default Flags;
} 