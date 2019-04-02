---
order: 10
title:
  zh-CN: 预定义按钮
  en-US: custom-button
---

## zh-CN

预定义按钮了一些常用的按钮.

## en-US

Predefined buttons have some commonly used buttons.

````jsx
import { Button } from 'antd';

const { Save, Submit, Cancel, Delete, Upload, Download, Edit, Search, View } = Button;

ReactDOM.render(
  <div>
    <Save />
    <Submit />
    <Cancel />
    <Delete />
    <Upload />
    <Download />
    <Edit />
    <Search />
    <View />
  </div>,
  mountNode
);
````
