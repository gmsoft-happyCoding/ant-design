---
order: 0
title:
  zh-CN: 基础用法
  en-US: basic
---

## zh-CN

啥子都不设置

## en-US

no props

```jsx
import { Ellipsis } from 'antd';

const article = (
  <p>
    There were injuries alleged in three <a href="#cover">cases in 2015</a>, and a fourth incident
    in September, according to the safety recall report. After meeting with US regulators in
    October, the firm decided to issue a voluntary recall.
  </p>
);

ReactDOM.render(
  <div style={{ width: 200 }}>
    <Ellipsis>{article}</Ellipsis>
  </div>,
  mountNode,
);
```
