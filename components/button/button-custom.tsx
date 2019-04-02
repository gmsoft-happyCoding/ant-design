/* eslint-disable import/prefer-default-export */
import * as React from 'react';
import Button, { NativeButtonProps } from './button';
import { Omit } from '../_util/type';

export type CustomButtonProps = Omit<NativeButtonProps, 'type' | 'icon' | 'children'>;
export type CustomButton = React.SFC<CustomButtonProps>;

const Save: CustomButton = props => (
  <Button icon="save" type="primary" {...props}>
    保存
  </Button>
);

const Submit: CustomButton = props => (
  <Button icon="check" type="primary" {...props}>
    提交
  </Button>
);

const Cancel: CustomButton = props => (
  <Button icon="rollback" type="default" {...props}>
    取消
  </Button>
);

const Delete: CustomButton = props => (
  <Button icon="close-circle" type="danger" {...props}>
    删除
  </Button>
);

const Upload: CustomButton = props => (
  <Button icon="upload" type="primary" {...props}>
    上传
  </Button>
);

const Download: CustomButton = props => (
  <Button icon="download" type="primary" {...props}>
    下载
  </Button>
);

const Edit: CustomButton = props => (
  <Button icon="edit" type="primary" {...props}>
    编辑
  </Button>
);

const Search: CustomButton = props => (
  <Button icon="search" type="primary" {...props}>
    搜索
  </Button>
);

const View: CustomButton = props => (
  <Button icon="schedule" type="primary" {...props}>
    查看
  </Button>
);

export { Save, Submit, Cancel, Delete, Upload, Download, Edit, Search, View };
