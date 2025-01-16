import {DefaultFooter} from '@ant-design/pro-components';
import '@umijs/max';
// import React from 'react';

const Footer: React.FC = () => {
  const defaultMessage = 'xiaofei.site';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // @ts-ignore
      copyright={
        <>
          {`${currentYear} ${defaultMessage}`}
          {}
        </>
      }
    />
  );
};
export default Footer;
