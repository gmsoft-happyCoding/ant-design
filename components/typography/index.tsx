import OriginTypography from './Typography';
import Text from './Text';
import Title from './Title';
import GMTitle from './GMTitle';
import Paragraph from './Paragraph';

type TypographyProps = typeof OriginTypography & {
  Text: typeof Text;
  GMTitle: typeof GMTitle;
  Title: typeof Title;
  Paragraph: typeof Paragraph;
};

const Typography = OriginTypography as TypographyProps;
Typography.Text = Text;
Typography.GMTitle = GMTitle;
Typography.Title = Title;
Typography.Paragraph = Paragraph;

export default Typography;
