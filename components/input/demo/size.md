---
order: 1
title:
  zh-CN: 三种大小
  en-US: Three sizes of Input
---

## zh-CN

我们为 `<Input />` 输入框定义了三种尺寸（大、默认、小），高度分别为 `40px`、`32px` 和 `24px`。

## en-US

There are three sizes of an Input box: `large` (40px), `default` (32px) and `small` (24px).

```jsx
import { Input } from 'antd';

ReactDOM.render(
  <div className="example-input">
    <Input size="large" placeholder="large size" allowClear />
    <Input placeholder="default size" allowClear />
    <Input size="small" placeholder="small size" allowClear />
  </div>,
  mountNode,
);
```

```css
.example-input .ant-input-affix-wrapper {
  margin: 0 8px 8px 0;
}
```
