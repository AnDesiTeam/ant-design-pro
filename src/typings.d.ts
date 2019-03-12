declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare var APP_TYPE: string;
declare module 'ant-design-pro' {
  import React from 'react';
  import { INoticeIconProps } from 'ant-design-pro/lib/NoticeIcon';
  import { INoticeIconTabProps } from 'ant-design-pro/lib/NoticeIcon/NoticeIconTab';

  type PartialNoticeIconProps = {
    [K in Exclude<keyof INoticeIconProps, 'locale'>]?: INoticeIconProps[K]
  };
  interface MixinNoticeIconProps extends PartialNoticeIconProps {
    locale?: {
      emptyText: string;
      clear: string;
      viewMore: string;
      [key: string]: string;
    };
    onViewMore?: (tabProps: INoticeIconProps) => void;
  }
  interface MixinNoticeIconTabProps extends Partial<INoticeIconTabProps> {
    showViewMore?: boolean;
  }
  class NoticeIconTab extends React.Component<MixinNoticeIconTabProps, any> {}
  export class NoticeIcon extends React.Component<MixinNoticeIconProps, any> {
    public static Tab: typeof NoticeIconTab;
  }
}
