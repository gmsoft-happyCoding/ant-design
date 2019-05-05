---
order: 1
title:
  zh-CN: 按照行数省略
  en-US: Truncate according to the number of rows
---

## zh-CN

通过设置 `lines` 属性指定最大行数，如果超过这个行数的文本会自动截取。但是在这种模式下所有 `children` 将会被转换成纯文本。

并且注意在这种模式下，外容器需要有指定的宽度（或设置自身宽度）。

## en-US

`lines` attribute specifies the maximum number of rows where the text will automatically be truncated when exceeded. In this mode, all children will be converted to plain text.

Also note that, in this mode, the outer container needs to have a specified width (or set its own width).

```jsx
import { InputNumber, Ellipsis } from 'antd';

const article = (
  <p>
    There were injuries alleged in three <a href="#cover">cases in 2015</a>, and a fourth incident
    in September, according to the safety recall report. After meeting with US regulators in
    October, the firm decided to issue a voluntary recall.
  </p>
);

class Lines extends React.Component {
  state = {
    lines: 1,
  };

  handleLineChange = val => {
    this.setState({ lines: val });
  };

  render() {
    
    return (
      <>
        <div style={{ width: 200 }}>
          <InputNumber value={this.state.lines} onChange={this.handleLineChange} />
        </div>
        <div style={{ width: 200 }}>
          <Ellipsis tooltip lines={this.state.lines}>
            {article}
          </Ellipsis>
        </div>
      </>
    );
  }
}
ReactDOM.render(<Lines />, mountNode);
```
