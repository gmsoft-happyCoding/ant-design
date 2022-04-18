---
order: 99
title:
  zh-CN: 分隔符
  en-US: Split
---

## zh-CN

相邻组件分隔符。

## en-US

Crowded components split.

```jsx
import { Space, Typography, Divider, ConfigProvider } from 'antd';

function SpaceSplit() {
  return (
    <ConfigProvider space={{size: "small"}}>
      <Space split={<Divider type="vertical" />}>
        <Typography.Text>Text</Typography.Text>
        <Typography.Text>Text</Typography.Text>
        <Typography.Text>Text</Typography.Text>
      </Space>
    </ConfigProvider>
  );
}

ReactDOM.render(<SpaceSplit />, mountNode);
```
