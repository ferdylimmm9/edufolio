import { Card } from '@mantine/core';
import classNames from 'classnames';
import { Brand } from 'common/constants/brand';
import Text from 'components/elements/text';
import BrandIconDirectHome from 'modules/components/brand-icon-home';
import structuralStyles from 'styles/layout.css';

export default function Footer() {
  return (
    <Card
      className={classNames(
        structuralStyles.fill({
          width: true,
        }),
      )}
      withBorder
      shadow="xl"
      radius={0}
    >
      <BrandIconDirectHome w={64} m="auto" mb={16} />
      <Text textVariant="body1Semibold" ta="center">
        &copy; {Brand.copyright} {Brand.name} -{' '}
        <a href="https://github.com/ferdylimmm9/edufolio" target="_blank">
          Ferdy Lim
        </a>
      </Text>
    </Card>
  );
}
