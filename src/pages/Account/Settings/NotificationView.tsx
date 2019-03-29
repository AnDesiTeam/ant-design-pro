import { List, Switch } from 'antd';
import React, { Component, Fragment } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';

interface NotificationViewItem {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode[];
}

class NotificationView extends Component {
  getData = (): NotificationViewItem[] => {
    const Action = (
      <Switch
        checkedChildren={formatMessage({ id: 'app.settings.open' })}
        unCheckedChildren={formatMessage({ id: 'app.settings.close' })}
        defaultChecked={true}
      />
    );
    return [
      {
        title: formatMessage({ id: 'app.settings.notification.password' }, {}),
        description: formatMessage({ id: 'app.settings.notification.password-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'app.settings.notification.messages' }, {}),
        description: formatMessage({ id: 'app.settings.notification.messages-description' }, {}),
        actions: [Action],
      },
      {
        title: formatMessage({ id: 'app.settings.notification.todo' }, {}),
        description: formatMessage({ id: 'app.settings.notification.todo-description' }, {}),
        actions: [Action],
      },
    ];
  };

  render() {
    return (
      <Fragment>
        <List
          itemLayout="horizontal"
          dataSource={this.getData()}
          renderItem={(item: NotificationViewItem) => (
            <List.Item actions={item.actions}>
              <List.Item.Meta title={item.title} description={item.description} />
            </List.Item>
          )}
        />
      </Fragment>
    );
  }
}

export default NotificationView;
