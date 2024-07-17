import { Pen, Plus } from '@phosphor-icons/react';
import { NavigationRoute } from 'common/routes/routes';
import ActionButton from 'components/action-button';
import { useRouter } from 'next/router';
import React from 'react';

interface NavigateButtonProps {
  type: 'button' | 'icon';
  route: NavigationRoute;
  id?: string;
}

export default function NavigationButton(props: NavigateButtonProps) {
  const { push } = useRouter();

  const query = props.id ? { id: props.id } : undefined;
  const onNavigate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    push({
      pathname: props.route,
      query,
    });
  };

  const icon = query ? <Pen size={16} /> : <Plus size={16} />;
  const label = query ? 'Ubah' : 'Buat';

  if (props.type === 'button') {
    return (
      <ActionButton type={props.type} onClick={onNavigate} rightSection={icon}>
        {label}
      </ActionButton>
    );
  } else {
    return (
      <ActionButton type={props.type} onClick={onNavigate} children={icon} />
    );
  }
}
