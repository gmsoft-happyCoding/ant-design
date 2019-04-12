---
order: 1
title:
  zh-CN: 定制标题组件
  en-US: GMTitle Component
---

## zh-CN

展示不同级别的标题。

## en-US

Display custom title in different level.

```jsx
import { Typography } from 'antd';

const { GMTitle } = Typography;

ReactDOM.render(
  <div>
    <GMTitle size="large">large. Gmsoft</GMTitle>
    <GMTitle>default. Gmsoft</GMTitle>
    <GMTitle size="small">default. Gmsoft</GMTitle>
  </div>,
  mountNode
);
```
