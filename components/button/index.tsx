import Button from './button';
import ButtonGroup from './button-group';
import {
  Save,
  Submit,
  Cancel,
  Delete,
  Upload,
  Download,
  Edit,
  Search,
  View,
} from './button-custom';

export { ButtonProps, ButtonShape, ButtonSize, ButtonType } from './button';
export { ButtonGroupProps } from './button-group';
export { CustomButtonProps } from './button-custom';

Button.Group = ButtonGroup;

Button.Save = Save;
Button.Submit = Submit;
Button.Cancel = Cancel;
Button.Delete = Delete;
Button.Upload = Upload;
Button.Download = Download;
Button.Edit = Edit;
Button.Search = Search;
Button.View = View;

export default Button;
